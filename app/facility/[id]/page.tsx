'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { format, addDays, isSameDay, isAfter, isBefore, startOfToday } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { TimeSlot } from '@/components/TimeSlot';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useBookings } from '@/hooks/useBookings';
import { useFacilities } from '@/hooks/useFacilities';
import { generateTimeSlots } from '@/libs/api';
import { TimeSlot as TimeSlotType } from '@/libs/types';
import { toast } from 'sonner';
import { Users, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FacilityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getFacilityById } = useFacilities();
  const { createBooking } = useBookings();

  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<TimeSlotType[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const facility = getFacilityById(params.id as string);

  // Calculate the maximum allowed date (5 days from today)
  const maxDate = useMemo(() => addDays(startOfToday(), 5), []);

  // Calculate available dates (next 5 days)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = startOfToday();
    for (let i = 0; i < 5; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, []);

  if (!facility) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Facility not found</h1>
        <Button
          className="mt-4"
          onClick={() => router.push('/')}
        >
          Go back home
        </Button>
      </div>
    );
  }

  const handleDateSelect = async (newDate: Date) => {
    setDate(newDate);
    setSelectedSlots([]);
    setIsLoading(true);
    try {
      const slots = await generateTimeSlots(facility.id, newDate);
      setTimeSlots(slots);
    } catch (error) {
      toast.error('Failed to load time slots');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlotSelect = (slot: TimeSlotType) => {
    const slotIndex = timeSlots.findIndex(s => s.id === slot.id);
    
    // If no slots are selected, just select this one
    if (selectedSlots.length === 0) {
      setSelectedSlots([slot]);
      return;
    }

    // Find the continuous range of selected slots
    const selectedIndices = selectedSlots.map(s => timeSlots.findIndex(ts => ts.id === s.id));
    const minIndex = Math.min(...selectedIndices);
    const maxIndex = Math.max(...selectedIndices);

    // Check if the new slot is adjacent to the selected range
    if (slotIndex === minIndex - 1 || slotIndex === maxIndex + 1) {
      // Check if adding this slot would exceed 4 hours
      if (selectedSlots.length < 4) {
        setSelectedSlots([...selectedSlots, slot].sort((a, b) => 
          a.startTime.getTime() - b.startTime.getTime()
        ));
      } else {
        toast.error('Maximum booking duration is 4 hours');
      }
    } else if (slotIndex >= minIndex && slotIndex <= maxIndex) {
      // If clicking within the range, deselect from that point onwards
      const newSelectedSlots = selectedSlots.filter(s => 
        timeSlots.findIndex(ts => ts.id === s.id) < slotIndex
      );
      setSelectedSlots(newSelectedSlots);
    } else {
      // If clicking a non-adjacent slot, start a new selection
      setSelectedSlots([slot]);
    }
  };

  const isSlotDisabled = (slot: TimeSlotType) => {
    if (slot.isBooked) return true;
    
    const slotIndex = timeSlots.findIndex(s => s.id === slot.id);
    if (selectedSlots.length === 0) return false;

    const selectedIndices = selectedSlots.map(s => timeSlots.findIndex(ts => ts.id === s.id));
    const minIndex = Math.min(...selectedIndices);
    const maxIndex = Math.max(...selectedIndices);

    // Only allow selecting adjacent slots
    return !(slotIndex === minIndex - 1 || slotIndex === maxIndex + 1 || 
             (slotIndex >= minIndex && slotIndex <= maxIndex));
  };

  const isSlotPartOfSelection = (slot: TimeSlotType) => {
    return selectedSlots.some(s => s.id === slot.id);
  };

  const handleBooking = async () => {
    if (selectedSlots.length === 0) return;

    setIsBooking(true);
    try {
      // In a real app, you'd want to book all slots in one request
      for (const slot of selectedSlots) {
        await createBooking(facility.id, slot.id);
      }
      router.push('/bookings');
    } catch (error) {
      // Error is handled in useBookings
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <main className="container py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src={facility.image}
              alt={facility.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{facility.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {facility.capacity} people
              </Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {facility.location}
              </span>
            </div>
            <p className="mt-4 text-muted-foreground">
              {facility.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {facility.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
          <div className="rounded-lg border p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CalendarIcon className="h-5 w-5" />
              Select Date & Time
            </h2>
            
            {/* Mobile Date Picker */}
            <div className="md:hidden mt-4">
              <DatePicker
                dates={availableDates}
                selectedDate={date}
                onSelect={handleDateSelect}
              />
            </div>
            
            {/* Desktop Calendar */}
            <div className="hidden md:block">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && handleDateSelect(newDate)}
                className="mt-4 p-3 bg-white rounded-lg"
                disabled={(date) => {
                  const today = startOfToday();
                  return isBefore(date, today) || isAfter(date, maxDate);
                }}
                modifiers={{
                  today: new Date(),
                  available: {
                    from: startOfToday(),
                    to: maxDate,
                  },
                }}
                modifiersStyles={{
                  today: {
                    fontWeight: 'bold'
                  },
                  available: {
                    backgroundColor: 'var(--success-50)',
                    color: 'var(--success-900)',
                  },
                  disabled: {
                    backgroundColor: 'var(--destructive-50)',
                    color: 'var(--destructive-900)',
                  },
                }}
              />
            </div>
            <div className="mt-6 space-y-2">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-10 animate-pulse rounded bg-muted" />
                  ))}
                </div>
              ) : timeSlots.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select up to 4 consecutive hours
                  </p>
                  {timeSlots.map((slot) => (
                    <TimeSlot
                      key={slot.id}
                      slot={slot}
                      isSelected={selectedSlots.some(s => s.id === slot.id)}
                      isPartOfSelection={isSlotPartOfSelection(slot)}
                      isDisabled={isSlotDisabled(slot)}
                      onSelect={handleSlotSelect}
                    />
                  ))}
                </>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  Select a date to view available time slots
                </p>
              )}
            </div>
            <Button
              className="mt-6 w-full"
              disabled={selectedSlots.length === 0 || isBooking}
              onClick={() => setIsBooking(true)}
            >
              {isBooking ? 'Booking...' : 'Book Now'}
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={isBooking} onOpenChange={setIsBooking}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Confirm Booking</SheetTitle>
            <SheetDescription>
              Please review your booking details below
            </SheetDescription>
          </SheetHeader>
          {selectedSlots.length > 0 && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-medium">{facility.name}</h3>
                <p className="text-sm text-muted-foreground">{facility.location}</p>
              </div>
              <div>
                <h3 className="font-medium">Date & Time</h3>
                <p className="text-sm text-muted-foreground">
                  {format(date, 'PPPP')}
                  <br />
                  {format(selectedSlots[0].startTime, 'h:mm a')} - {format(selectedSlots[selectedSlots.length - 1].endTime, 'h:mm a')}
                  <br />
                  Duration: {selectedSlots.length} hour{selectedSlots.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}
          <SheetFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsBooking(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={isBooking}
            >
              Confirm Booking
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
} 