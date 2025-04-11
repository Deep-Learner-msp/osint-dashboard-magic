
import React, { useState } from "react";
import { OsintData, NewsItem } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Database, Brain, BarChart3, Info, MapPin, Users, Building, Globe, Briefcase, Shield, AlertTriangle, ExternalLink, Newspaper } from "lucide-react";
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
import { getSecurityAssessment } from "@/utils/osint-helpers";

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

  const showExplanation = (title: string, description: string, content: React.ReactNode) => {
    setExplanationContent({
      title,
      description,
      content: <>{content}</>
    });
    setExplanationOpen(true);
  };

  const securityAssessment = getSecurityAssessment(data);

  const recentNews: NewsItem[] = data.recentNews || [
    {
      title: "TradeFi Global Expands Cryptocurrency Trading Services",
      date: "2023-12-10",
      source: "Financial Times",
      url: "#",
      summary: "TradeFi Global announced plans to expand its cryptocurrency trading services, adding support for NFTs and DeFi protocols starting Q1 2024.",
      sentiment: "positive",
      relevance: 0.95,
      tags: ["cryptocurrency", "expansion", "strategic", "trading"]
    },
    {
      title: "Regulatory Inquiry into TradeFi's Singapore Operations",
      date: "2023-11-28",
      source: "Bloomberg",
      url: "#",
      summary: "The Monetary Authority of Singapore (MAS) has opened an inquiry into TradeFi Global's compliance procedures following a series of high-volume transactions.",
      sentiment: "negative",
      relevance: 0.89,
      tags: ["regulatory", "compliance", "risk", "singapore"]
    },
    {
      title: "TradeFi in Advanced Talks to Acquire Asian Fintech Startup",
      date: "2023-12-05",
      source: "Reuters",
      url: "#",
      summary: "Sources close to the matter reveal TradeFi is in advanced negotiations to acquire a Singapore-based fintech startup specializing in AI-driven trading algorithms.",
      sentiment: "positive",
      relevance: 0.92,
      tags: ["acquisition", "M&A", "fintech", "AI"]
    },
    {
      title: "Executive Shuffle: TradeFi Appoints New CTO from Google",
      date: "2023-11-15",
      source: "Wall Street Journal",
      url: "#",
      summary: "TradeFi Global has appointed Dr. Lisa Xu, former Google Cloud engineering director, as its new Chief Technology Officer to lead its digital transformation efforts.",
      sentiment: "positive",
      relevance: 0.88,
      tags: ["executive", "leadership", "technology", "digital transformation"]
    },
    {
      title: "Data Breach Investigation at TradeFi Subsidiary",
      date: "2023-12-02",
      source: "CyberSecurity Today",
      url: "#",
      summary: "A TradeFi subsidiary is investigating a potential data breach after unusual activity was detected in their client portal system. No confirmation of compromised data yet.",
      sentiment: "negative",
      relevance: 0.97,
      tags: ["security", "breach", "risk", "data protection"]
    }
  ];

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
            <p className="text-gray-700">{data.organizationDescription[0]}</p>
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
          <div className="flex items-center mb-4">
            <Newspaper className="h-5 w-5 mr-2 text-osint-blue" />
            <h2 className="text-xl font-semibold">Recent News & Media Intelligence</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2" 
              onClick={() => showExplanation(
                "About News Intelligence", 
                "News intelligence provides insights into recent media coverage, market perception, and potential reputation impacts.",
                <div className="space-y-4">
                  <p>News intelligence monitoring helps executives:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Track company mentions across global publications</li>
                    <li>Analyze sentiment trends and reputation signals</li>
                    <li>Identify emerging risks and opportunities</li>
                    <li>Monitor competitor activities and market movements</li>
                    <li>Support strategic decision-making with timely information</li>
                  </ul>
                  <p className="text-sm text-gray-500 mt-4">Data sources include major financial publications, industry news, regulatory filings, press releases, and social media monitoring.</p>
                </div>
              )}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentNews.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{item.source}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={item.sentiment === 'positive' ? "success" : item.sentiment === 'negative' ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Relevance: {Math.round(item.relevance * 100)}%
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-2">{item.summary}</p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs flex items-center" asChild>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      View Source <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>Intelligence gathered from 50+ global news sources, financial publications, and industry reports</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              View Full Media Analysis
            </Button>
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
        <p>Data Discovery from multiple intelligence sources. For security assessment purposes only.</p>
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
