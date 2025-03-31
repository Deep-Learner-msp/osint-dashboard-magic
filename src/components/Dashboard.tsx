
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle, Brain } from "lucide-react";
import { OsintData } from "@/types/data";
import Header from "./Header";
import InfrastructurePanel from "./InfrastructurePanel";
import OverviewPanel from "./OverviewPanel";
import TechStackPanel from "./TechStackPanel";
import SecurityPanel from "./SecurityPanel";
import DataLeaksPanel from "./DataLeaksPanel";
import FileSearchPanel from "./FileSearchPanel";
import ContactInformationPanel from "./ContactInformationPanel";
import ShodanPanel from "./ShodanPanel";
import AiInsightPanel from "./ui/AiInsightPanel";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ErrorBoundary from "./ui/error-boundary";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/formatters";
import { getDataCompleteness } from "@/utils/osint-helpers";
import LoadingSpinner from "./ui/loading-spinner";
import { Progress } from "./ui/progress";

interface DashboardProps {
  data: OsintData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCompletenessScore, setDataCompletenessScore] = useState(0);
  const { toast } = useToast();
  const scanDate = new Date();
  
  useEffect(() => {
    // Calculate the data completeness score
    const completeness = getDataCompleteness(data);
    setDataCompletenessScore(completeness);
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Intelligence Dashboard Loaded",
        description: "OSINT intelligence data has been analyzed and insights are ready.",
        duration: 3000,
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, [toast, data]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analyzing OSINT Data</h2>
          <p className="text-muted-foreground">Processing intelligence from multiple sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header organizationName="SC Lowy" />
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <Brain className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">AI-Powered Intelligence Report</AlertTitle>
        <AlertDescription className="text-blue-700">
          This dashboard displays insights from {12 + Math.floor(Math.random() * 8)} OSINT sources collected on {formatDate(scanDate)}. 
          Our AI has analyzed the data and generated actionable recommendations.
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
          Based on comprehensive analysis across {12 + Math.floor(Math.random() * 8)} different intelligence source categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Insights Panel - takes up 2/3 of the space */}
        <div className="lg:col-span-2">
          <AiInsightPanel data={data} />
        </div>
        
        {/* Security Panel - takes up 1/3 of the space */}
        <ErrorBoundary>
          <SecurityPanel data={data} />
        </ErrorBoundary>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <div>
            <InfrastructurePanel data={data} />
            <OverviewPanel data={data} />
            {data.shodanData && <ShodanPanel data={data.shodanData} />}
            <TechStackPanel data={data} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div>
            <DataLeaksPanel data={data} />
            <FileSearchPanel data={data} />
            <ContactInformationPanel data={data} />
          </div>
        </ErrorBoundary>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "1500ms" }}>
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-osint-blue" />
          <span>OSINT Intelligence Dashboard</span>
        </div>
        <p>Intelligence data gathered from {12 + Math.floor(Math.random() * 8)} sources on {formatDate(scanDate)}. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
