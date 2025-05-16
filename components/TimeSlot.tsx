'use client';

import { format } from 'date-fns';
import { cn } from '@/libs/utils';
import { TimeSlot as TimeSlotType } from '@/libs/types';
import { Lock } from 'lucide-react';

interface TimeSlotProps {
  slot: TimeSlotType;
  isSelected: boolean;
  isPartOfSelection: boolean;
  isDisabled: boolean;
  onSelect: (slot: TimeSlotType) => void;
}

export function TimeSlot({
  slot,
  isSelected,
  isPartOfSelection,
  isDisabled,
  onSelect,
}: TimeSlotProps) {
  // A slot is restricted if it's not available (this is set in the API for restricted hours)
  const isRestricted = !slot.isAvailable;
  
  return (
    <button
      className={cn(
        "w-full rounded-md px-4 py-2 text-sm transition-colors",
        "hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary",
        isPartOfSelection && "bg-primary/20 hover:bg-primary/30",
        (isDisabled || isRestricted || slot.isBooked) && "cursor-not-allowed opacity-50 hover:bg-transparent",
        isRestricted && "bg-destructive/10 text-destructive hover:bg-destructive/20",
        slot.isBooked && "bg-muted text-muted-foreground",
        !isDisabled && !isSelected && !isPartOfSelection && !isRestricted && !slot.isBooked && "bg-card"
      )}
      onClick={() => !isDisabled && !isRestricted && !slot.isBooked && onSelect(slot)}
      disabled={isDisabled || isRestricted || slot.isBooked}
    >
      <div className="flex items-center justify-between">
        <span>
          {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
        </span>
        {slot.isBooked ? (
          <span className="text-xs text-muted-foreground">Booked</span>
        ) : isRestricted ? (
          <span className="flex items-center gap-1 text-xs text-destructive">
            <Lock className="h-3 w-3" />
            Restricted
          </span>
        ) : null}
      </div>
    </button>
  );
} 