
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ErrorBoundary from "./ui/error-boundary";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/formatters";
import LoadingSpinner from "./ui/loading-spinner";

interface DashboardProps {
  data: OsintData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const scanDate = new Date();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dashboard Loaded",
        description: "OSINT intelligence data has been loaded successfully.",
        duration: 3000,
      });
    }, 800);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading OSINT Data</h2>
          <p className="text-muted-foreground">Gathering intelligence information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header organizationName="SC Lowy" />
      
      <Alert className="mb-6 bg-yellow-50 border-yellow-200">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Intelligence Report</AlertTitle>
        <AlertDescription className="text-yellow-700">
          This dashboard displays sensitive OSINT data collected on {formatDate(scanDate)}. For security assessment purposes only.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <div>
            <InfrastructurePanel data={data} />
            <OverviewPanel data={data} />
            <ShodanPanel data={data.shodanData} />
            <TechStackPanel data={data} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div>
            <SecurityPanel data={data} />
            <DataLeaksPanel data={data} />
            <FileSearchPanel data={data} />
            <ContactInformationPanel data={data} />
          </div>
        </ErrorBoundary>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "1500ms" }}>
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-osint-blue" />
          <span>OSINT Dashboard</span>
        </div>
        <p>Intelligence data gathered on {formatDate(scanDate)}. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
