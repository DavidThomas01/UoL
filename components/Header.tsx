'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';
import { currentUser } from '@/libs/mock-data';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link 
          href="/" 
          className="text-lg md:text-xl font-bold tracking-tight"
        >
          BookMyHall
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Facilities
          </Link>
          <Link
            href="/bookings"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/bookings" ? "text-primary" : "text-muted-foreground"
            )}
          >
            My Bookings
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentUser.name}
            </span>
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </nav>

        {/* Mobile Profile Button */}
        <div className="md:hidden flex items-center gap-3">
          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {currentUser.name}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
} 