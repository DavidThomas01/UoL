import { useQuery } from '@tanstack/react-query';
import { Facility } from '@/libs/types';
import { facilities as mockFacilities } from '@/libs/mock-data';

const fetchFacilities = async (): Promise<Facility[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockFacilities;
};

export const useFacilities = () => {
  const { 
    data: facilities = [], 
    isLoading: loading, 
    error 
  } = useQuery({
    queryKey: ['facilities'],
    queryFn: fetchFacilities,
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