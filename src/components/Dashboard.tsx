
import React from 'react';
import { Calendar, Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardProps {
  onViewSchedule: () => void;
  onCreateMeeting: () => void;
  onOpenChat: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onViewSchedule, onCreateMeeting, onOpenChat }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Agenda Hub</h1>
          <p className="text-gray-600">Manage your meetings and connect with your team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onViewSchedule}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>View Schedule</CardTitle>
              <CardDescription>See all your scheduled meetings in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Open Calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onCreateMeeting}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Create New Meeting</CardTitle>
              <CardDescription>Schedule a new meeting with your team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onOpenChat}>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Team Chat</CardTitle>
              <CardDescription>Connect and chat with team members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Open Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
