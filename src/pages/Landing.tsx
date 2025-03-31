
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Database, Brain, BarChart3 } from "lucide-react";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">OSINT Intelligence Platform</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive intelligence gathering, analysis, and reporting for security assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Processed Data</h2>
            <p className="text-muted-foreground mb-4">
              Raw intelligence data collected from various sources including infrastructure details, technologies, and data leaks.
            </p>
            <Button 
              className="w-full"
              onClick={() => navigate("/extracted-data")}
            >
              View Processed Data
            </Button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Intelligent Mapping</h2>
            <p className="text-muted-foreground mb-4">
              AI-powered analysis correlating intelligence from multiple sources to identify patterns, threats, and insights.
            </p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={() => navigate("/intelligent-mapping")}
            >
              Explore AI Insights
            </Button>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Intelligence Report</h2>
            <p className="text-muted-foreground mb-4">
              Comprehensive intelligence report with executive and technical views for decision-making and remediation.
            </p>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/executive-view")}
            >
              View Intelligence Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <p className="text-sm text-muted-foreground mb-2">
            Need a full dashboard overview?
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="text-muted-foreground"
          >
            Go to Legacy Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
