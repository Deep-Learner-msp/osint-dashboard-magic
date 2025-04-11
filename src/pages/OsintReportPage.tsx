
import React from 'react';
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, FileText } from "lucide-react";

interface OsintReportPageProps {
  data: OsintData;
}

const OsintReportPage: React.FC<OsintReportPageProps> = ({ data }) => {
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
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">OSINT Report</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Full OSINT Report</h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">Report page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default OsintReportPage;
