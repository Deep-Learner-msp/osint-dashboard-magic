
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Database, Brain, BarChart3, Info } from "lucide-react";
import InfrastructurePanel from "@/components/InfrastructurePanel";
import TechStackPanel from "@/components/TechStackPanel";
import DataLeaksPanel from "@/components/DataLeaksPanel";
import FileSearchPanel from "@/components/FileSearchPanel";
import ContactInformationPanel from "@/components/ContactInformationPanel";
import ShodanPanel from "@/components/ShodanPanel";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ExplanationDialog from "@/components/ui/ExplanationDialog";

interface ExtractedDataProps {
  data: OsintData;
}

const ExtractedData: React.FC<ExtractedDataProps> = ({ data }) => {
  const navigate = useNavigate();
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [explanationContent, setExplanationContent] = useState<{
    title: string;
    description?: string;
    content: React.ReactElement;
  }>({
    title: "",
    description: "",
    content: <div />
  });

  // Function to open explanation dialog
  const showExplanation = (title: string, description: string, content: React.ReactNode) => {
    setExplanationContent({
      title,
      description,
      content: <>{content}</>
    });
    setExplanationOpen(true);
  };

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
            Back to Home
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/intelligent-mapping")}
            className="flex items-center gap-1"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligent</span> Mapping
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/executive-view")}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligence</span> Report
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Database className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Processed Data</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Processed Data</DialogTitle>
              <DialogDescription>
                This view presents raw intelligence data collected from various sources without advanced analysis.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p>This view shows:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Infrastructure details and open ports</li>
                <li>Technologies used across assets</li>
                <li>Data leaks and potential vulnerabilities</li>
                <li>Contact information found in public sources</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800">
          This view presents the raw intelligence data collected from various sources without advanced analysis. 
          It shows infrastructure details, technologies, data leaks, and other extracted information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <div>
            <InfrastructurePanel data={data} />
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
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Processed data from multiple intelligence sources. For security assessment purposes only.</p>
      </footer>

      <ExplanationDialog 
        open={explanationOpen}
        onClose={() => setExplanationOpen(false)}
        title={explanationContent.title}
        description={explanationContent.description || ""}
      >
        {explanationContent.content}
      </ExplanationDialog>
    </div>
  );
};

export default ExtractedData;
