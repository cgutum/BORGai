'use client';

import { Card } from '@/components/ui/card';
import { hardcodedCalendarEvents } from '@/lib/data/calendar-events';
import { Calendar } from 'lucide-react';

export function CalendarWidget() {
  // Get current date
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate days for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Check if date has event
  const hasEvent = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return hardcodedCalendarEvents.some(event => event.date === dateStr);
  };

  const getEventType = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const event = hardcodedCalendarEvents.find(event => event.date === dateStr);
    return event?.type;
  };

  return (
    <Card className="p-4 border-[#D3D0CC]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-4 w-4 text-[#0065BD]" />
        <h3 className="text-sm font-semibold text-[#0065BD]">
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs text-[#6E685F] font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Blank days */}
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} />
        ))}

        {/* Actual days */}
        {days.map((day) => {
          const isToday = day === currentDay;
          const hasEventOnDay = hasEvent(day);
          const eventType = getEventType(day);

          return (
            <div
              key={day}
              className={`
                aspect-square flex items-center justify-center text-xs rounded-full cursor-pointer
                transition-colors relative
                ${isToday ? 'bg-[#0065BD] text-white font-semibold' : ''}
                ${hasEventOnDay && !isToday ? 'bg-[#C01530] text-white' : ''}
                ${!isToday && !hasEventOnDay ? 'text-[#000000] hover:bg-[#F5F5F5]' : ''}
              `}
            >
              {day}
              {hasEventOnDay && (
                <span className="absolute -top-1 -right-1 text-[10px]">
                  {eventType === 'delivery' ? '🚚' : eventType === 'alert' ? '⚠️' : '📊'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-[#D3D0CC] space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-[#0065BD]" />
          <span className="text-[#6E685F]">Today</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-[#C01530]" />
          <span className="text-[#6E685F]">Critical Event</span>
        </div>
      </div>
    </Card>
  );
}
