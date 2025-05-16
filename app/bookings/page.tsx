'use client';

import { useBookings } from "@/hooks/useBookings";
import { useFacilities } from "@/hooks/useFacilities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatTime } from "@/libs/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function BookingsPage() {
  const { bookings, loading, error, cancelBooking } = useBookings();
  const { getFacilityById } = useFacilities();

  return (
    <main className="container py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage your facility bookings
        </p>
      </div>

      {loading ? (
        <div className="mt-8 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[200px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 text-center text-destructive">
          Failed to load bookings
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">You have no bookings</p>
          <Button asChild className="mt-4">
            <Link href="/">Browse Facilities</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => {
            const facility = getFacilityById(booking.facilityId);
            if (!facility) return null;

            return (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{facility.name}</span>
                    <Badge
                      variant={booking.status === 'confirmed' ? 'default' : 'destructive'}
                    >
                      {booking.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {facility.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(booking.timeSlot.startTime)} at{' '}
                      {formatTime(booking.timeSlot.startTime)} -{' '}
                      {formatTime(booking.timeSlot.endTime)}
                    </span>
                  </div>
                </CardContent>
                {booking.status === 'confirmed' && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </CardFooter>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
} 