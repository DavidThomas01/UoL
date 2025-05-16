'use client';

import { format, isSameDay } from 'date-fns';
import { cn } from '@/libs/utils';

interface DatePickerProps {
  dates: Date[];
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function DatePicker({ dates, selectedDate, onSelect }: DatePickerProps) {
  return (
    <div className="flex overflow-x-auto pb-2 -mx-6 px-6 scrollbar-none">
      <div className="flex gap-2">
        {dates.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const dayName = format(date, 'EEE');
          const dayNumber = format(date, 'd');
          const month = format(date, 'MMM');
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelect(date)}
              className={cn(
                "flex flex-col items-center justify-center rounded-lg p-2 min-w-[72px]",
                "transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                isSelected 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card hover:bg-primary/10"
              )}
            >
              <span className="text-sm font-medium">{dayName}</span>
              <span className="text-2xl font-bold">{dayNumber}</span>
              <span className="text-xs opacity-70">{month}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
} 