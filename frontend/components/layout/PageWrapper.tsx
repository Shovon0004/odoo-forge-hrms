'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  // If not authenticated and not on an auth page, we might want to redirect.
  // For now, let's just render the dashboard layout if they are "authenticated"
  // Note: Actual routing protection should be handled in middleware or higher level,
  // but for mock UI we can enforce it here slightly.

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
