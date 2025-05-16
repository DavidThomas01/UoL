'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/libs/utils';
import { Building2, CalendarCheck } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div className="container flex h-16">
        <Link
          href="/"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-primary",
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Building2 className="h-5 w-5" />
          Facilities
        </Link>
        <Link
          href="/bookings"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors hover:text-primary",
            pathname === "/bookings" ? "text-primary" : "text-muted-foreground"
          )}
        >
          <CalendarCheck className="h-5 w-5" />
          My Bookings
        </Link>
      </div>
    </nav>
  );
} 