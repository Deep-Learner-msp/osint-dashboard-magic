
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings as SettingsIcon } from "lucide-react";

const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-600 mr-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Button>
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
          <SettingsIcon className="h-5 w-5 text-gray-600" />
        </div>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Application Settings</h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Settings page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
