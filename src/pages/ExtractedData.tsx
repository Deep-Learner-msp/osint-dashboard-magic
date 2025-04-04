import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Database, Brain, BarChart3, Info, MapPin, Users, Building } from "lucide-react";
import InfrastructurePanel from "@/components/InfrastructurePanel";
import TechStackPanel from "@/components/TechStackPanel";
import DataLeaksPanel from "@/components/DataLeaksPanel";
import FileSearchPanel from "@/components/FileSearchPanel";
import ContactInformationPanel from "@/components/ContactInformationPanel";
import SocialIntelPanel from "@/components/SocialIntelPanel";
import ShodanPanel from "@/components/ShodanPanel";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ExplanationDialog from "@/components/ui/ExplanationDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-4">
          <Building className="h-5 w-5 mr-2 text-osint-blue" />
          <h2 className="text-xl font-semibold">Organization Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Location & Jurisdiction</h3>
            </div>
            <p className="text-gray-700">Hong Kong, SAR China</p>
            <p className="text-sm text-gray-500 mt-1">Financial Services Authority, HK</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Employee Count</h3>
            </div>
            <p className="text-gray-700">{data.organizationStructure[0]} Employees</p>
            <p className="text-sm text-gray-500 mt-1">Across 9 global offices</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Founded</h3>
            </div>
            <p className="text-gray-700">2010</p>
            <p className="text-sm text-gray-500 mt-1">Independent investment bank</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Organization Highlights</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-700">{data.organizationDescription[0]}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Intelligence Sources</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Reliability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Company Website</TableCell>
                <TableCell>Primary</TableCell>
                <TableCell>2023-11-15</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bloomberg Terminal</TableCell>
                <TableCell>Financial</TableCell>
                <TableCell>2023-12-01</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SEC Filings</TableCell>
                <TableCell>Regulatory</TableCell>
                <TableCell>2023-10-22</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LinkedIn</TableCell>
                <TableCell>Social</TableCell>
                <TableCell>2023-12-10</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
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
            <SocialIntelPanel data={data} />
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
