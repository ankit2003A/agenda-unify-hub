
import React from 'react';
import { Calendar, Plus, Filter, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onCreateMeeting: () => void;
  onFilterToggle: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onCreateMeeting,
  onFilterToggle,
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Agenda Hub</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onPrevMonth} className="p-2">
              <span className="sr-only">Previous month</span>
              ←
            </Button>
            <h2 className="text-lg font-semibold text-gray-800 min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" onClick={onNextMonth} className="p-2">
              <span className="sr-only">Next month</span>
              →
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={onFilterToggle} className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button onClick={onCreateMeeting} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>New Meeting</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
