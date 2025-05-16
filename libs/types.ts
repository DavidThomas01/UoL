export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: number;
  location: string;
  amenities: string[];
}

export interface TimeSlot {
  id: string;
  facilityId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  facilityId: string;
  userId: string;
  timeSlot: TimeSlot;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
} 