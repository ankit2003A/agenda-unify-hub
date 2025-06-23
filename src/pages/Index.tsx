
import React, { useState, useEffect } from 'react';
import CalendarHeader from '../components/CalendarHeader';
import CalendarGrid from '../components/CalendarGrid';
import MeetingScheduler from '../components/MeetingScheduler';
import PlatformFilter from '../components/PlatformFilter';
import { mockMeetings } from '../data/mockMeetings';
import { Meeting } from '../types/Meeting';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['google', 'microsoft', 'zoom']);
  const { toast } = useToast();

  const filteredMeetings = meetings.filter(meeting => 
    selectedPlatforms.includes(meeting.platform)
  );

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleCreateMeeting = () => {
    setSelectedDate(undefined);
    setIsSchedulerOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsSchedulerOpen(true);
  };

  const handleMeetingClick = (meeting: Meeting) => {
    toast({
      title: meeting.title,
      description: `${meeting.time} on ${meeting.date} via ${meeting.platform}`,
    });
  };

  const handleSaveMeeting = (meetingData: any) => {
    const newMeeting: Meeting = {
      id: Date.now().toString(),
      title: meetingData.title,
      date: meetingData.date,
      time: meetingData.time,
      platform: meetingData.platform,
      participants: meetingData.participants.split(',').map((email: string) => email.trim()),
      agenda: meetingData.agenda,
      recurrence: meetingData.recurrence,
    };

    setMeetings([...meetings, newMeeting]);
    toast({
      title: "Meeting Scheduled",
      description: `${newMeeting.title} has been scheduled for ${newMeeting.date} at ${newMeeting.time}`,
    });
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterOpen) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onCreateMeeting={handleCreateMeeting}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
      />

      <div className="relative">
        <CalendarGrid
          currentDate={currentDate}
          meetings={filteredMeetings}
          onDateClick={handleDateClick}
          onMeetingClick={handleMeetingClick}
        />

        <PlatformFilter
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
        />
      </div>

      <MeetingScheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSave={handleSaveMeeting}
        selectedDate={selectedDate}
      />

      {/* Platform Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-600">Google Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Microsoft Calendar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Zoom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
