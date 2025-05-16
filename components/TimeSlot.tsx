'use client';

import { format } from 'date-fns';
import { cn } from '@/libs/utils';
import { TimeSlot as TimeSlotType } from '@/libs/types';

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
  return (
    <button
      className={cn(
        "w-full rounded-md px-4 py-2 text-sm transition-colors",
        "hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary",
        isPartOfSelection && "bg-primary/20 hover:bg-primary/30",
        isDisabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
        !isDisabled && !isSelected && !isPartOfSelection && "bg-card"
      )}
      onClick={() => !isDisabled && onSelect(slot)}
      disabled={isDisabled}
    >
      <div className="flex items-center justify-between">
        <span>
          {format(slot.startTime, 'h:mm a')} - {format(slot.endTime, 'h:mm a')}
        </span>
        {slot.isBooked && (
          <span className="text-xs text-muted-foreground">Booked</span>
        )}
      </div>
    </button>
  );
} 