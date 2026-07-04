import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  total: number;
  icon: LucideIcon;
  colorClass: string;
}

export function StatCard({ title, value, total, icon: Icon, colorClass }: StatCardProps) {
  const percentage = Math.round((value / total) * 100) || 0;

  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h4 className="text-3xl font-bold text-slate-900">{value}</h4>
            <span className="text-sm font-medium text-slate-500">/ {total}</span>
          </div>
        </div>
        <div className="relative h-16 w-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-100"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={cn("stroke-current", colorClass)}
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className={cn("absolute flex items-center justify-center", colorClass)}>
             <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
