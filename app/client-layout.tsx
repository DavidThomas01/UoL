'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data stays fresh for 1 minute
      cacheTime: 5 * 60 * 1000, // Cache is kept for 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
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