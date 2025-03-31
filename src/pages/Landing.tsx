
import React from "react";
import { useNavigate } from "react-router-dom";
import { Database, MapPin, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8 gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
            <div className="h-6 w-6 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"/>
                <path d="M12 18v4"/>
                <path d="M4.93 10.93l1.41 1.41"/>
                <path d="M17.66 11.34l1.41-1.41"/>
                <path d="M2 18h2"/>
                <path d="M20 18h2"/>
                <path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Intelligence Analysis Platform</h1>
        </div>

        <div className="mb-10">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4">Welcome to the OSINT Intelligence Dashboard</h2>
            <p className="text-gray-600 mb-6">
              This platform provides comprehensive intelligence analysis from multiple data sources.
              Choose one of the views below to explore different aspects of the gathered intelligence.
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
            onClick={() => navigate("/extracted-data")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Extracted Data</h3>
              <p className="text-sm text-gray-500 mb-4">
                Raw intelligence data extracted from various sources including infrastructure, technologies, and data leaks.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={() => navigate("/extracted-data")}
              >
                View Data
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
            onClick={() => navigate("/intelligent-mapping")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Intelligent Mapping</h3>
              <p className="text-sm text-gray-500 mb-4">
                AI-powered analysis and correlations between different data points, highlighting security concerns.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-purple-300 text-purple-700 hover:bg-purple-50"
                onClick={() => navigate("/intelligent-mapping")}
              >
                View Analysis
              </Button>
            </div>
          </Card>

          <Card 
            className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
            onClick={() => navigate("/executive-view")}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Executive View</h3>
              <p className="text-sm text-gray-500 mb-4">
                Summarized intelligence reports with strategic recommendations and risk assessments for executives.
              </p>
              <Button 
                variant="outline" 
                className="mt-auto border-green-300 text-green-700 hover:bg-green-50"
                onClick={() => navigate("/executive-view")}
              >
                View Summary
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
