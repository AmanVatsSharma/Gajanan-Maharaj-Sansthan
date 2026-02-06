/**
 * File: src/features/booking/components/VerticalDatePicker.tsx
 * Module: booking
 * Purpose: Vertical date picker as a scrollable list instead of calendar grid.
 * Author: Aman Sharma / Novologic/ Cursor AI
 * Last-updated: 2026-02-06
 * Notes:
 * - Mobile-friendly vertical selection
 * - Shows date in vertical list format
 */
"use client";

import { format, addDays, startOfToday } from "date-fns";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface VerticalDatePickerProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  numberOfDays?: number;
}

export function VerticalDatePicker({
  selected,
  onSelect,
  disabled,
  numberOfDays = 90,
}: VerticalDatePickerProps) {
  const today = startOfToday();
  const dates = Array.from({ length: numberOfDays }, (_, i) => addDays(today, i));

  return (
    <div className="max-h-[280px] overflow-y-auto overscroll-contain">
      <div className="flex flex-col gap-1 p-2">
        {dates.map((date) => {
          const isSelected = selected && format(date, "yyyy-MM-dd") === format(selected, "yyyy-MM-dd");
          const isDisabled = disabled?.(date);
          const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => !isDisabled && onSelect(date)}
              disabled={isDisabled}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all",
                "hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                !isSelected && !isDisabled && "bg-muted/30"
              )}
            >
              <div className="flex flex-col">
                <span className={cn(
                  "font-semibold text-base",
                  isSelected && "text-primary-foreground"
                )}>
                  {format(date, "dd MMM yyyy")}
                </span>
                <span className={cn(
                  "text-xs",
                  isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {format(date, "EEEE")}
                  {isToday && " (Today)"}
                </span>
              </div>
              {isSelected && (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
