import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Booking } from '@/libs/types';
import { getUserBookings, bookTimeSlot } from '@/libs/api';
import { toast } from 'sonner';

const fetchUserBookings = async (): Promise<Booking[]> => {
  return getUserBookings();
};

export const useBookings = () => {
  const queryClient = useQueryClient();

  const { 
    data: bookings = [], 
    isLoading: loading, 
    error,
    refetch: refreshBookings
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: fetchUserBookings,
  });

  const createBookingMutation = useMutation({
    mutationFn: async ({ facilityId, slotId }: { facilityId: string, slotId: string }) => {
      return bookTimeSlot(facilityId, slotId);
    },
    onSuccess: (newBooking) => {
      queryClient.setQueryData(['bookings'], (old: Booking[] = []) => [...old, newBooking]);
      toast.success('Booking confirmed!');
    },
    onError: () => {
      toast.error('Failed to create booking');
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      // In a real app, call API to cancel booking
      await new Promise(resolve => setTimeout(resolve, 500));
      return bookingId;
    },
    onSuccess: (bookingId) => {
      queryClient.setQueryData(['bookings'], (old: Booking[] = []) => 
        old.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' as const } 
            : booking
        )
      );
      toast.success('Booking cancelled');
    },
    onError: () => {
      toast.error('Failed to cancel booking');
    },
  });

  const createBooking = (facilityId: string, slotId: string) => {
    return createBookingMutation.mutateAsync({ facilityId, slotId });
  };

  const cancelBooking = (bookingId: string) => {
    return cancelBookingMutation.mutateAsync(bookingId);
  };

  return {
    bookings,
    loading,
    error: error ? (error as Error).message : null,
    createBooking,
    cancelBooking,
    refreshBookings,
  };
}; 