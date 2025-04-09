
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Database, Brain, BarChart3, Info, MapPin, Users, Building, Globe, Briefcase, Shield, AlertTriangle } from "lucide-react";
import InfrastructurePanel from "@/components/InfrastructurePanel";
import TechStackPanel from "@/components/TechStackPanel";
import DataLeaksPanel from "@/components/DataLeaksPanel";
import FileSearchPanel from "@/components/FileSearchPanel";
import ContactInformationPanel from "@/components/ContactInformationPanel";
import SocialIntelPanel from "@/components/SocialIntelPanel";
import ShodanPanel from "@/components/ShodanPanel";
import SecurityPanel from "@/components/SecurityPanel";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import ExplanationDialog from "@/components/ui/ExplanationDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getSecurityAssessment } from "@/utils/osint-helpers";

export interface DataDiscoveryProps {
  data: OsintData;
}

const DataDiscovery: React.FC<DataDiscoveryProps> = ({ data }) => {
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

  const showExplanation = (title: string, description: string, content: React.ReactNode) => {
    setExplanationContent({
      title,
      description,
      content: <>{content}</>
    });
    setExplanationOpen(true);
  };

  const securityAssessment = getSecurityAssessment(data);

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
            onClick={() => navigate("/correlated-intelligence")}
            className="flex items-center gap-1"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Correlated</span> Intelligence
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/intelligence-reporting")}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligence</span> Reporting
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <Database className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Data Discovery</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>About Data Discovery</DialogTitle>
              <DialogDescription>
                This view presents comprehensive intelligence data collected from various sources in a single unified view.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p>This view shows:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Organization overview and executive intelligence</li>
                <li>Surface exposure including infrastructure details and open ports</li>
                <li>Vulnerability inventory and technology fingerprinting</li>
                <li>Credential & data leaks and potential vulnerabilities</li>
                <li>Discovered files and organizational details</li>
                <li>News mentions and social intelligence</li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Organization Overview Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-osint-blue" />
            <h2 className="text-xl font-semibold">Organization Overview</h2>
          </div>
          <Badge 
            variant={securityAssessment.score >= 70 ? "success" : securityAssessment.score >= 50 ? "warning" : "destructive"}
            className="text-xs"
          >
            Security Rating: {securityAssessment.label}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <MapPin className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Location & Jurisdiction</h3>
            </div>
            <p className="text-gray-700">Primary: Hong Kong, SAR China</p>
            <p className="text-sm text-gray-500 mt-1">Financial Services Authority, HK</p>
            <p className="text-xs text-gray-500 mt-2">Secondary Jurisdictions:</p>
            <ul className="text-xs text-gray-500 list-disc pl-4 mt-1">
              <li>Singapore (Monetary Authority)</li>
              <li>United Kingdom (FCA)</li>
              <li>United States (SEC, FINRA)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Users className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Personnel</h3>
            </div>
            <p className="text-gray-700">{data.organizationStructure[0]} Employees</p>
            <p className="text-sm text-gray-500 mt-1">Across 9 global offices</p>
            <div className="mt-2">
              <p className="text-xs text-gray-500">Executive Team: 12 members</p>
              <p className="text-xs text-gray-500">Board: 8 directors (3 independent)</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Globe className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Global Presence</h3>
            </div>
            <p className="text-gray-700">9 Office Locations</p>
            <div className="text-xs text-gray-500 mt-2 space-y-1">
              <p>APAC: Hong Kong (HQ), Singapore, Tokyo, Sydney</p>
              <p>EMEA: London, Frankfurt, Dubai</p>
              <p>Americas: New York, San Francisco</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Executive Intelligence</h3>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-medium">CEO: Michael Chen</p>
              <p className="text-xs text-gray-500 mt-1">Former JP Morgan executive, 15+ years in investment banking</p>
              
              <p className="font-medium mt-2">CIO: Sarah Williams</p>
              <p className="text-xs text-gray-500 mt-1">Ex-Goldman Sachs, specializes in algorithmic trading systems</p>
              
              <p className="font-medium mt-2">CISO: Robert Tanaka</p>
              <p className="text-xs text-gray-500 mt-1">Previous role at Citigroup, cybersecurity background</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center mb-2">
              <Shield className="h-4 w-4 text-gray-600 mr-2" />
              <h3 className="font-medium text-gray-800">Risk Profile</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Cyber Exposure:</p>
                <Badge variant={securityAssessment.score >= 70 ? "success" : securityAssessment.score >= 50 ? "warning" : "destructive"}>
                  {securityAssessment.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Regulatory Compliance:</p>
                <Badge variant="info">Moderate Risk</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Reputation Monitor:</p>
                <Badge variant="success">Low Risk</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">Competitor Intelligence:</p>
                <Badge variant="info">43 Tracked Entities</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-gray-600 mr-2" />
            <h3 className="font-medium text-gray-800">Organization Highlights</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-3">
              <li>SC Lowy is a leading alternative asset manager with $1.6 billion in assets under management, specializing in opportunistic credit and private credit across global markets.</li>
              <li>Founded in 2009, the firm operates from nine global offices with over 50 professionals, focusing on capital preservation through senior secured lending backed by hard assets.</li>
            </ul>
            
            <div className="mt-3 space-y-1">
              <p className="text-sm text-gray-600 flex items-center">
                <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                <span>Executive insight: Potential M&A activity detected from public filings and press references</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                <span>Strategic indicators suggest expansion into cryptocurrency trading services</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                <span>Regulatory inquiries ongoing in Singapore operations (MAS documentation)</span>
              </p>
            </div>
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
                <TableHead>Executive Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Company Website</TableCell>
                <TableCell>Primary</TableCell>
                <TableCell>2023-11-15</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
                <TableCell>Medium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bloomberg Terminal</TableCell>
                <TableCell>Financial</TableCell>
                <TableCell>2023-12-01</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
                <TableCell>High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SEC Filings</TableCell>
                <TableCell>Regulatory</TableCell>
                <TableCell>2023-10-22</TableCell>
                <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">High</Badge></TableCell>
                <TableCell>High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>LinkedIn</TableCell>
                <TableCell>Social</TableCell>
                <TableCell>2023-12-10</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge></TableCell>
                <TableCell>Medium</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Internal Memo Leaks</TableCell>
                <TableCell>Confidential</TableCell>
                <TableCell>2023-09-05</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge></TableCell>
                <TableCell>Very High</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Dark Web Monitoring</TableCell>
                <TableCell>Threat Intel</TableCell>
                <TableCell>2023-12-15</TableCell>
                <TableCell><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium</Badge></TableCell>
                <TableCell>High</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Surface Exposure Section */}
      <div id="surface-exposure" className="scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-osint-blue" />
          Surface Exposure
        </h2>
        <ErrorBoundary>
          <InfrastructurePanel data={data} />
          {data.shodanData && <ShodanPanel data={data.shodanData} />}
        </ErrorBoundary>
      </div>

      {/* Vulnerability Inventory Section */}
      <div id="vulnerability-inventory" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-osint-blue" />
          Vulnerability Inventory
        </h2>
        <ErrorBoundary>
          <SecurityPanel data={data} />
        </ErrorBoundary>
      </div>

      {/* Social Intelligence Section */}
      <div id="social-intelligence" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-osint-blue" />
          Social Intelligence
        </h2>
        <ErrorBoundary>
          <SocialIntelPanel data={data} />
        </ErrorBoundary>
      </div>

      {/* Credential & Data Leaks Section */}
      <div id="data-leaks" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Database className="h-5 w-5 mr-2 text-osint-blue" />
          Credential & Data Leaks
        </h2>
        <ErrorBoundary>
          <DataLeaksPanel data={data} />
        </ErrorBoundary>
      </div>

      {/* Technology Fingerprinting Section */}
      <div id="technology" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-osint-blue" />
          Technology Fingerprinting
        </h2>
        <ErrorBoundary>
          <TechStackPanel data={data} />
        </ErrorBoundary>
      </div>

      {/* Discovered Files Section */}
      <div id="files" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Info className="h-5 w-5 mr-2 text-osint-blue" />
          Discovered Files
        </h2>
        <ErrorBoundary>
          <FileSearchPanel data={data} />
        </ErrorBoundary>
      </div>

      {/* News Mentions Section */}
      <div id="news" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-osint-blue" />
          News Mentions
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 mb-4">Recent news and mentions related to SC Lowy across global media outlets.</p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4 py-2">
              <div className="flex justify-between">
                <h3 className="font-medium">SC Lowy Expands Asian Debt Trading Operations</h3>
                <span className="text-sm text-gray-500">Financial Times - 2 weeks ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">The firm announced a 30% expansion of its trading desk in Hong Kong and Singapore to capitalize on distressed opportunities.</p>
            </div>
            
            <div className="border-l-4 border-green-400 pl-4 py-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Q3 Financial Results Above Expectations</h3>
                <span className="text-sm text-gray-500">Bloomberg - 1 month ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">SC Lowy reported Q3 earnings 15% above analyst expectations, citing strong performance in distressed debt markets.</p>
            </div>
            
            <div className="border-l-4 border-amber-400 pl-4 py-2">
              <div className="flex justify-between">
                <h3 className="font-medium">New Cryptocurrency Trading Division Launched</h3>
                <span className="text-sm text-gray-500">CoinDesk - 2 months ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">SC Lowy has entered the cryptocurrency market with a new division focused on institutional trading of digital assets.</p>
            </div>
            
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <div className="flex justify-between">
                <h3 className="font-medium">Key Executive Hire from Goldman Sachs</h3>
                <span className="text-sm text-gray-500">Wall Street Journal - 3 months ago</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">SC Lowy has hired former Goldman Sachs Managing Director Jennifer Liu to head its new structured products group.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information Section */}
      <div id="contact-information" className="mt-8 scroll-mt-16">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-osint-blue" />
          Contact Information
        </h2>
        <ErrorBoundary>
          <ContactInformationPanel data={data} />
        </ErrorBoundary>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Discovery data from multiple intelligence sources. For security assessment purposes only.</p>
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

export default DataDiscovery;
