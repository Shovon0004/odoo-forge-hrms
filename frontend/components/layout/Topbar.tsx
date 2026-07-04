import { useAuthStore } from '@/store/authStore';
import { Bell, Menu } from 'lucide-react';

export function Topbar() {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center">
        <button className="text-gray-500 hover:text-gray-700 lg:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-500 relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden md:block text-sm">
            <p className="font-medium text-gray-700">{user?.name || 'Guest User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role || 'Guest'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
