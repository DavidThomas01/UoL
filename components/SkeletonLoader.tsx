import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function FacilityCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 animate-pulse bg-muted" />
      <CardHeader>
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-4 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

export function TimeSlotSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-muted" />
      ))}
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
} 