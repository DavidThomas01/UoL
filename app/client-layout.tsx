'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Toaster } from "sonner";
import { useState } from "react";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // Create a client instance that persists across re-renders
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // Data stays fresh for 1 minute
        gcTime: 5 * 60 * 1000, // Garbage collection time (previously cacheTime)
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
} 