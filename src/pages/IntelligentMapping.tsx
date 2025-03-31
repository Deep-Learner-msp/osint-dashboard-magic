
import React from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Brain, Shield, AlertTriangle } from "lucide-react";
import AiInsightPanel from "@/components/ui/AiInsightPanel";
import SecurityPanel from "@/components/SecurityPanel";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getDataCompleteness } from "@/utils/osint-helpers";
import ErrorBoundary from "@/components/ui/error-boundary";

interface IntelligentMappingProps {
  data: OsintData;
}

const IntelligentMapping: React.FC<IntelligentMappingProps> = ({ data }) => {
  const navigate = useNavigate();
  const dataCompletenessScore = getDataCompleteness(data);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/extracted-data")}
            className="text-blue-700 border-blue-300"
          >
            Extracted Data
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/executive-view")}
            className="text-green-700 border-green-300"
          >
            Executive View
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <MapPin className="h-5 w-5 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligent Mapping</h1>
      </div>

      <Alert className="mb-6 bg-purple-50 border-purple-200">
        <Brain className="h-4 w-4 text-purple-600" />
        <AlertTitle className="text-purple-800">AI-Powered Intelligence Analysis</AlertTitle>
        <AlertDescription className="text-purple-700">
          This view provides advanced AI-powered analysis of the collected data, correlating intelligence 
          from various sources to identify security risks and actionable insights.
        </AlertDescription>
      </Alert>
      
      {/* Data completeness indicator */}
      <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Data Coverage Score</div>
          <div className="text-sm font-medium">{dataCompletenessScore}%</div>
        </div>
        <Progress value={dataCompletenessScore} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Based on comprehensive analysis across multiple intelligence source categories
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Insights Panel - takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <ErrorBoundary>
            <AiInsightPanel data={data} />
          </ErrorBoundary>
        </div>
        
        {/* Security Panel - takes up 1/3 of the space */}
        <ErrorBoundary>
          <SecurityPanel data={data} />
        </ErrorBoundary>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-purple-600" />
          <span>Intelligence Mapping Analysis</span>
        </div>
        <p>AI-powered analysis of intelligence data gathered from multiple sources. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default IntelligentMapping;
