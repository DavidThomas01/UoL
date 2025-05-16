import Image from 'next/image';
import Link from 'next/link';
import { Facility } from '@/libs/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin } from 'lucide-react';

interface FacilityCardProps {
  facility: Facility;
}

export function FacilityCard({ facility }: FacilityCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{facility.name}</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {facility.capacity}
          </Badge>
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {facility.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{facility.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {facility.amenities.map((amenity) => (
            <Badge key={amenity} variant="outline">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/facility/${facility.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 