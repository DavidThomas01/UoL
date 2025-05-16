'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FacilityCard } from "@/components/FacilityCard";
import { useFacilities } from "@/hooks/useFacilities";
import { FacilityCardSkeleton } from "@/components/SkeletonLoader";

export default function HomePage() {
  const { facilities, loading, error } = useFacilities();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Book a Facility</h1>
        <p className="text-muted-foreground">
          Browse and book our available facilities
        </p>
        <div className="w-full max-w-sm">
          <Input
            type="search"
            placeholder="Search facilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <FacilityCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="mt-8 text-center text-destructive">
          Failed to load facilities
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
          {filteredFacilities.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground">
              No facilities found
            </div>
          )}
        </div>
      )}
    </main>
  );
} 