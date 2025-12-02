'use client';

import { useState } from 'react';
import { hardcodedCalendarEvents } from '@/lib/data/calendar-events';
import { ChevronLeft, ChevronRight, AlertCircle, Calendar, Package } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function CalendarWidget() {
  // Start at December 2025
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  // Get today's date for highlighting
  const today = new Date();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();
  const currentDay = today.getDate();

  // Generate days for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return hardcodedCalendarEvents.filter(event => event.date === dateStr);
  };

  // Navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  return (
    <TooltipProvider>
      <div>
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={goToPreviousMonth}
            className="w-6 h-6 flex items-center justify-center rounded border border-[#E5E5E5] hover:bg-gray-50 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-[#000000]" />
          </button>
          
          <h3 className="text-sm font-semibold text-[#000000]">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          
          <button
            onClick={goToNextMonth}
            className="w-6 h-6 flex items-center justify-center rounded border border-[#E5E5E5] hover:bg-gray-50 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-[#000000]" />
          </button>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
            <div key={index} className="text-center text-[11px] text-[#6E685F] font-medium">
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
            const isToday = isCurrentMonth && day === currentDay;
            const events = getEventsForDay(day);
            const hasCritical = events.some(e => e.type === 'critical');
            const hasMeeting = events.some(e => e.type === 'meeting');
            const hasDelivery = events.some(e => e.type === 'delivery');

            const dayCell = (
              <div
                className={`
                  relative w-8 h-8 flex items-center justify-center text-xs rounded transition-colors
                  ${isToday ? 'bg-[#0065BD] text-white font-semibold' : 'text-[#000000]'}
                  ${!isToday && events.length === 0 ? 'hover:bg-gray-50' : ''}
                `}
              >
                {day}
                {/* Event Icons */}
                {hasCritical && (
                  <AlertCircle className="absolute top-0 right-0 w-3 h-3 text-[#C01530]" />
                )}
                {hasMeeting && (
                  <Calendar className="absolute top-0 right-0 w-3 h-3 text-[#6E685F]" />
                )}
                {hasDelivery && (
                  <Package className="absolute bottom-0 right-0 w-3 h-3 text-[#6E685F]" />
                )}
              </div>
            );

            if (events.length === 0) {
              return <div key={day}>{dayCell}</div>;
            }

            return (
              <Tooltip key={day}>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer">{dayCell}</div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] bg-[#000000] text-white">
                  {events.map((event, idx) => (
                    <p key={idx} className="text-[11px] leading-snug">
                      {event.description}
                    </p>
                  ))}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
