import { TimeSlot, Booking } from "./types";
import { currentUser, facilities } from "./mock-data";
import { parse, isWithinInterval, set } from 'date-fns';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check if a time is within restricted hours
const isWithinRestrictedHours = (facility: typeof facilities[0], time: Date) => {
  // Create restricted time points for comparison using the same date as the input time
  const restrictedStart = set(new Date(time), {
    hours: parseInt(facility.restrictedHours.start.split(':')[0]),
    minutes: parseInt(facility.restrictedHours.start.split(':')[1]),
    seconds: 0,
    milliseconds: 0
  });

  const restrictedEnd = set(new Date(time), {
    hours: parseInt(facility.restrictedHours.end.split(':')[0]),
    minutes: parseInt(facility.restrictedHours.end.split(':')[1]),
    seconds: 0,
    milliseconds: 0
  });

  // If restricted period crosses midnight (start time is later than end time)
  if (restrictedStart.getTime() > restrictedEnd.getTime()) {
    // Check if time is NOT between end and start (meaning it IS restricted)
    return !(time >= restrictedEnd && time < restrictedStart);
  }
  
  // Normal case - check if time is between start and end
  return time >= restrictedStart && time < restrictedEnd;
};

// Generate time slots for a given date
export const generateTimeSlots = async (facilityId: string, date: Date): Promise<TimeSlot[]> => {
  await delay(500); // Simulate API call

  const facility = facilities.find(f => f.id === facilityId);
  if (!facility) throw new Error('Facility not found');

  const slots: TimeSlot[] = [];
  // Generate slots for full 24 hours
  for (let hour = 0; hour < 24; hour++) {
    const startTime = new Date(date);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(hour + 1, 0, 0, 0);
    
    // Check if this time slot is within restricted hours
    const isRestricted = isWithinRestrictedHours(facility, startTime);
    
    // Generate random availability only if not restricted
    const isRandomlyAvailable = Math.random() > 0.3; // 70% chance of being available
    
    slots.push({
      id: `${facilityId}-${startTime.toISOString()}`,
      facilityId,
      startTime,
      endTime,
      isAvailable: !isRestricted, // If restricted, never available. If not restricted, use random availability
      isBooked: !isRestricted && !isRandomlyAvailable // Only mark as booked if not restricted and not randomly available
    });
  }
  
  return slots;
};

// Check if a time slot is available
export const checkSlotAvailability = async (facilityId: string, slotId: string): Promise<boolean> => {
  await delay(300); // Simulate API call
  return Math.random() > 0.3; // 70% chance of being available
};

// Book a time slot
export const bookTimeSlot = async (facilityId: string, slotId: string): Promise<Booking> => {
  await delay(1000); // Simulate API call
  
  if (await checkSlotAvailability(facilityId, slotId)) {
    const booking: Booking = {
      id: `b-${Date.now()}`,
      facilityId,
      userId: currentUser.id,
      timeSlot: {
        id: slotId,
        facilityId,
        startTime: new Date(),
        endTime: new Date(),
        isAvailable: false,
        isBooked: true
      },
      status: 'confirmed',
      createdAt: new Date(),
    };
    
    // In a real app, save to backend
    return booking;
  }
  
  throw new Error('Time slot is not available');
};

// Get user's bookings
export const getUserBookings = async (): Promise<Booking[]> => {
  await delay(500); // Simulate API call
  
  // In a real app, fetch from backend
  return [];
}; 