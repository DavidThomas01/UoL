import { TimeSlot, Booking } from "./types";
import { currentUser } from "./mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate time slots for a given date
export const generateTimeSlots = async (facilityId: string, date: Date): Promise<TimeSlot[]> => {
  await delay(500); // Simulate API call

  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = new Date(date);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(date);
    endTime.setHours(hour + 1, 0, 0, 0);
    
    slots.push({
      id: `${facilityId}-${startTime.toISOString()}`,
      facilityId,
      startTime,
      endTime,
      isAvailable: Math.random() > 0.3, // 70% chance of being available
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