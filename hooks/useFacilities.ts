import { useQuery } from '@tanstack/react-query';
import { Facility } from '@/libs/types';
import { facilities as mockFacilities } from '@/libs/mock-data';

const fetchFacilities = async (): Promise<Facility[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (!mockFacilities || mockFacilities.length === 0) {
      throw new Error('No facilities found');
    }
    return mockFacilities;
  } catch (error) {
    console.error('Error fetching facilities:', error);
    throw error;
  }
};

export const useFacilities = () => {
  const { 
    data: facilities = [], 
    isLoading: loading, 
    error 
  } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
    retry: 3,
    retryDelay: 1000,
  });

  const getFacilityById = (id: string) => {
    return facilities.find(facility => facility.id === id);
  };

  return {
    facilities,
    loading,
    error: error ? (error as Error).message : null,
    getFacilityById,
  };
}; 