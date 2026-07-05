const { Sequelize, Model, DataTypes, Op } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URI;
if (!databaseUrl) {
  console.error('DATABASE_URL is not set in env variables!');
  process.exit(1);
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

// Helper to convert Mongoose queries to Sequelize where clauses
function convertQuery(query) {
  if (!query) return {};
  if (typeof query === 'string') {
    return { _id: query };
  }
  
  const where = {};
  for (const key of Object.keys(query)) {
    const val = query[key];
    
    if (key === '$or') {
      where[Op.or] = val.map(convertQuery);
    } else if (key === '$and') {
      where[Op.and] = val.map(convertQuery);
    } else if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
      const operators = {};
      let hasOp = false;
      if ('$gte' in val) { operators[Op.gte] = val.$gte; hasOp = true; }
      if ('$lte' in val) { operators[Op.lte] = val.$lte; hasOp = true; }
      if ('$gt' in val) { operators[Op.gt] = val.$gt; hasOp = true; }
      if ('$lt' in val) { operators[Op.lt] = val.$lt; hasOp = true; }
      if ('$ne' in val) { operators[Op.ne] = val.$ne; hasOp = true; }
      if ('$in' in val) { operators[Op.in] = val.$in; hasOp = true; }
      
      if (hasOp) {
        where[key] = operators;
      } else {
        where[key] = val;
      }
    } else {
      where[key] = val;
    }
  }
  return where;
}

class MongooseQueryWrapper {
  constructor(model, type, query, options = {}) {
    this.model = model;
    this.type = type; // 'find', 'findOne', 'findById', 'countDocuments'
    this.query = query;
    this.options = { ...options };
    this.populates = [];
    this.sortOrder = null;
    this.selectedFields = null;
    this.limitVal = null;
    this.skipVal = null;
  }

  populate(path, select) {
    if (typeof path === 'string') {
      this.populates.push({ path, select });
    } else if (typeof path === 'object' && path !== null) {
      this.populates.push({ path: path.path, select: path.select });
    }
    return this;
  }

  sort(order) {
    this.sortOrder = order;
    return this;
  }

  select(fields) {
    this.selectedFields = fields;
    return this;
  }

  limit(val) {
    this.limitVal = val;
    return this;
  }

  skip(val) {
    this.skipVal = val;
    return this;
  }

  async execute() {
    const sequelizeOptions = {};

    // 1. Build Where Clause
    if (this.type === 'findById') {
      sequelizeOptions.where = { _id: this.query };
    } else {
      sequelizeOptions.where = convertQuery(this.query);
    }

    // 2. Select fields
    if (this.selectedFields) {
      if (typeof this.selectedFields === 'string') {
        const fields = this.selectedFields.split(/\s+/).filter(Boolean);
        const exclude = [];
        const include = [];
        for (let f of fields) {
          if (f.startsWith('-')) {
            exclude.push(f.slice(1));
          } else {
            include.push(f);
          }
        }
        if (include.length > 0) {
          if (!include.includes('_id')) include.push('_id');
          sequelizeOptions.attributes = include;
        }
        if (exclude.length > 0) {
          sequelizeOptions.attributes = { exclude };
        }
      }
    }

    // 3. Sort Order
    if (this.sortOrder) {
      if (typeof this.sortOrder === 'object') {
        sequelizeOptions.order = Object.entries(this.sortOrder).map(([k, v]) => [k, v === -1 ? 'DESC' : 'ASC']);
      } else if (typeof this.sortOrder === 'string') {
        const parts = this.sortOrder.split(/\s+/).filter(Boolean);
        sequelizeOptions.order = parts.map(p => {
          if (p.startsWith('-')) {
            return [p.slice(1), 'DESC'];
          }
          return [p, 'ASC'];
        });
      }
    }

    // 4. Include/Populate
    if (this.populates.length > 0) {
      const associationMap = {
        company_id: 'company_assoc',
        manager_id: 'manager_assoc',
        employee_id: 'employee_assoc'
      };
      
      sequelizeOptions.include = this.populates.map(pop => {
        const alias = associationMap[pop.path] || pop.path;
        const assoc = this.model.associations[alias];
        if (!assoc) {
          console.warn(`No association found for ${pop.path} (alias ${alias}) on model ${this.model.name}`);
          return null;
        }
        const inc = {
          model: assoc.target,
          as: alias
        };
        if (pop.select) {
          const fields = pop.select.split(/\s+/).filter(Boolean);
          if (!fields.includes('_id')) fields.push('_id');
          inc.attributes = fields;
        }
        return inc;
      }).filter(Boolean);
    }

    if (this.limitVal !== null) {
      sequelizeOptions.limit = this.limitVal;
    }
    if (this.skipVal !== null) {
      sequelizeOptions.offset = this.skipVal;
    }

    // Run query
    if (this.type === 'findOne' || this.type === 'findById') {
      return await this.model.findOne(sequelizeOptions);
    } else if (this.type === 'countDocuments') {
      return await this.model.count(sequelizeOptions);
    } else {
      return await this.model.findAll(sequelizeOptions);
    }
  }

  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

class MongooseCompatibleModel extends Model {
  isModified(fieldName) {
    return this.changed(fieldName);
  }

  get isNew() {
    return this.isNewRecord;
  }

  toJSON() {
    const values = { ...this.get() };
    
    const associationMap = {
      company_id: 'company_assoc',
      manager_id: 'manager_assoc',
      employee_id: 'employee_assoc'
    };
    
    for (const [col, alias] of Object.entries(associationMap)) {
      if (alias in values) {
        delete values[alias];
      }
    }
    
    delete values.password_hash;
    
    for (const key of Object.keys(values)) {
      if (values[key] === undefined) {
        delete values[key];
      }
    }
    
    return values;
  }

  static findOne(query) {
    return new MongooseQueryWrapper(this, 'findOne', query);
  }

  static findById(id) {
    return new MongooseQueryWrapper(this, 'findById', id);
  }

  static find(query) {
    return new MongooseQueryWrapper(this, 'find', query);
  }

  static countDocuments(query) {
    return new MongooseQueryWrapper(this, 'countDocuments', query);
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const instance = await this.findOne({ _id: id });
    if (!instance) return null;
    
    const actualUpdate = update.$set || update;
    Object.assign(instance, actualUpdate);
    
    await instance.save();
    return instance;
  }

  static async findByIdAndDelete(id) {
    const instance = await this.findOne({ _id: id });
    if (!instance) return null;
    await instance.destroy();
    return instance;
  }
}

module.exports = {
  sequelize,
  DataTypes,
  MongooseCompatibleModel
};
