
import React, { useState } from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UserProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{userEmail.split('@')[0]}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{userEmail.split('@')[0]}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
