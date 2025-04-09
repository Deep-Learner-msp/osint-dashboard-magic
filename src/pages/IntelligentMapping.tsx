
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  Brain, 
  Shield, 
  Database, 
  BarChart3, 
  Network, 
  Globe, 
  ArrowUpRight, 
  AlertTriangle, 
  Target, 
  Server,
  UserCheck,
  FileText,
  Download,
  Search,
  Bug,
  Key,
  Code,
  File,
  Building,
  Newspaper,
  Zap,
  Users,
  LineChart,
  FileOutput
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getDataCompleteness } from "@/utils/osint-helpers";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreatIntelligencePanel from "@/components/ThreatIntelligencePanel";
import AttackVectorPanel from "@/components/AttackVectorPanel";
import IpEnumerationPanel from "@/components/IpEnumerationPanel";
import SocialIntelPanel from "@/components/SocialIntelPanel";
import ReportGenerator from "@/components/ReportGenerator";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

interface IntelligentMappingProps {
  data: OsintData;
}

const IntelligentMapping: React.FC<IntelligentMappingProps> = ({ data }) => {
  const navigate = useNavigate();
  const dataCompletenessScore = getDataCompleteness(data);
  const [activeTab, setActiveTab] = useState("data-discovery");
  const [activeDiscoverySubTab, setActiveDiscoverySubTab] = useState("surface-exposure");
  const [activeCorrelatedSubTab, setActiveCorrelatedSubTab] = useState("vulnerability-intelligence");
  const [activeReportingSubTab, setActiveReportingSubTab] = useState("executive-summary");

  // Generate threat data for visualization
  const threatData = [
    { name: "Critical", value: data.qualysScan.severity_1, color: "#ef4444" },
    { name: "High", value: data.qualysScan.severity_2, color: "#f97316" },
    { name: "Medium", value: data.qualysScan.severity_3, color: "#eab308" },
    { name: "Low", value: data.qualysScan.severity_4, color: "#22c55e" }
  ];

  // Attack vector data
  const attackVectorData = [
    { name: "Web App", value: 35 + Math.floor(Math.random() * 20) },
    { name: "Network", value: 25 + Math.floor(Math.random() * 15) },
    { name: "Social Eng", value: 20 + Math.floor(Math.random() * 10) },
    { name: "Insider", value: 15 + Math.floor(Math.random() * 10) },
    { name: "Physical", value: 5 + Math.floor(Math.random() * 5) }
  ];

  // Timeline data for potential exploits
  const timelineData = [
    { day: "Day 1", probability: 10 },
    { day: "Week 1", probability: 25 },
    { day: "Month 1", probability: 45 },
    { day: "Month 3", probability: 65 },
    { day: "Month 6", probability: 80 }
  ];

  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

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
            onClick={() => navigate("/extracted-data")}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Processed</span> Data
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
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <Brain className="h-5 w-5 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligent Mapping</h1>
      </div>

      <Alert className="mb-6 bg-purple-50 border-purple-200">
        <Brain className="h-4 w-4 text-purple-600" />
        <AlertTitle className="text-purple-800">AI-Powered Intelligence Analysis</AlertTitle>
        <AlertDescription className="text-purple-700">
          Our AI has analyzed the raw OSINT data to extract actionable intelligence, identify attack vectors, map potential threats, 
          and provide security intelligence that goes beyond simple data collection.
        </AlertDescription>
      </Alert>
      
      {/* Intelligence Coverage indicator */}
      <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Intelligence Coverage</div>
          <div className="text-sm font-medium">{dataCompletenessScore}%</div>
        </div>
        <Progress value={dataCompletenessScore} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Based on data correlation across multiple intelligence sources including OSINT, infrastructure, and data leak analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-red-600 mt-2">
                {data.qualysScan.severity_1 + data.qualysScan.severity_2}
              </div>
              <div className="text-sm text-gray-600 text-center">Critical & High Vulnerabilities</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-orange-500 mt-2">
                {data.dataLeaksCompliance.length}
              </div>
              <div className="text-sm text-gray-600 text-center">Data Leaks Detected</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-500 mt-2">
                {data.openPorts.length}
              </div>
              <div className="text-sm text-gray-600 text-center">Attack Surface Points</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-purple-500 mt-2">
                {Math.floor(Math.random() * 5) + 3}
              </div>
              <div className="text-sm text-gray-600 text-center">Potential Attack Vectors</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="data-discovery" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="data-discovery" className="flex items-center gap-1">
            <Search className="h-4 w-4" />
            <span>Data Discovery</span>
          </TabsTrigger>
          <TabsTrigger value="correlated-intelligence" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span>Correlated Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="intelligence-reporting" className="flex items-center gap-1">
            <FileOutput className="h-4 w-4" />
            <span>Intelligence Reporting</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Data Discovery Tab */}
        <TabsContent value="data-discovery" className="space-y-4">
          <Tabs defaultValue="surface-exposure" onValueChange={setActiveDiscoverySubTab}>
            <TabsList className="mb-4 flex flex-wrap">
              <TabsTrigger value="surface-exposure" className="text-xs">
                Surface Exposure
              </TabsTrigger>
              <TabsTrigger value="vulnerability-inventory" className="text-xs">
                Vulnerability Inventory
              </TabsTrigger>
              <TabsTrigger value="credential-leaks" className="text-xs">
                Credential & Data Leaks
              </TabsTrigger>
              <TabsTrigger value="technology-fingerprinting" className="text-xs">
                Technology Fingerprinting
              </TabsTrigger>
              <TabsTrigger value="discovered-files" className="text-xs">
                Discovered Files
              </TabsTrigger>
              <TabsTrigger value="org-overview" className="text-xs">
                Organisational Overview
              </TabsTrigger>
              <TabsTrigger value="news-mentions" className="text-xs">
                News Mentions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="surface-exposure">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Surface Exposure
                  </CardTitle>
                  <CardDescription>
                    IPs, domains, ports, Shodan data, DNS, SSL, WHOIS information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <IpEnumerationPanel data={data} />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="vulnerability-inventory">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bug className="h-5 w-5 text-red-500" />
                    Vulnerability Inventory
                  </CardTitle>
                  <CardDescription>
                    CVEs from Qualys, severity, exploitability, affected assets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={threatData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {threatData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <ErrorBoundary>
                    <ThreatIntelligencePanel data={data} />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="credential-leaks">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Key className="h-5 w-5 text-amber-500" />
                    Credential & Data Leaks
                  </CardTitle>
                  <CardDescription>
                    Leaked emails/passwords from HIBP, DeHashed; reuse detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* This would be replaced with a more specific component for credential leaks */}
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Data from HIBP, DeHashed, and other breach sources showing exposed credentials and sensitive data
                      </p>
                      {data.dataLeaksCompliance && data.dataLeaksCompliance.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-medium mb-2">Leaked Credentials Found</h3>
                          <div className="overflow-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="py-2 px-4 text-left">Email</th>
                                  <th className="py-2 px-4 text-left">Source</th>
                                  <th className="py-2 px-4 text-left">Password Exposed</th>
                                  <th className="py-2 px-4 text-left">Detection Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.dataLeaksCompliance.slice(0, 5).map((leak, i) => (
                                  <tr key={i} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{leak.email}</td>
                                    <td className="py-2 px-4">{leak.database_name}</td>
                                    <td className="py-2 px-4">{leak.hashed_password ? "Hashed" : leak.password ? "Yes" : "No"}</td>
                                    <td className="py-2 px-4">{leak.leak_date || "Unknown"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                          <p>No credential leaks found</p>
                        </div>
                      )}
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="technology-fingerprinting">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="h-5 w-5 text-green-500" />
                    Technology Fingerprinting
                  </CardTitle>
                  <CardDescription>
                    CMS, APIs, JS libs, tech stack from web scans and headers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* This would integrate with a technology stack component */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {data.technologies.map((tech, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="text-sm font-medium">{tech}</div>
                        </div>
                      ))}
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discovered-files">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <File className="h-5 w-5 text-indigo-500" />
                    Discovered Files
                  </CardTitle>
                  <CardDescription>
                    PDFs, DOCs, XLS files found online; metadata and sensitive keywords
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* Replace with a more specific file discovery component */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">PDF Documents</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {data.fileSearch.PDF.map((pdf, index) => (
                            <li key={index}>{pdf}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Excel Spreadsheets</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {data.fileSearch.XLS.map((xls, index) => (
                            <li key={index}>{xls}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Word Documents</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {data.fileSearch.DOC.map((doc, index) => (
                            <li key={index}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Presentations</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {data.fileSearch.PPt.map((ppt, index) => (
                            <li key={index}>{ppt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="org-overview">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    Organisational Overview
                  </CardTitle>
                  <CardDescription>
                    Basic company info: domains, HQ, subsidiaries, industry, infra base
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* This would be replaced with a more specific org overview component */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">Organisation Profile</h3>
                        <p className="text-gray-700">{data.organizationDescription[0]}</p>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-1">Industry Sectors</h4>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Financial Services</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Investment Banking</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">Asset Management</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">Key Assets</h3>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Domains</h4>
                            <div className="text-sm">sclowy.com, sc-lowy.com, sclowy.hk</div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Primary IP Ranges</h4>
                            <div className="text-sm">192.168.1.0/24, 10.0.0.0/16</div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Infrastructure</h4>
                            <div className="text-sm">AWS (Primary), Azure (Secondary), On-premise (HK Office)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news-mentions">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-gray-500" />
                    News Mentions
                  </CardTitle>
                  <CardDescription>
                    SERP/news scraping, breach news, breach timeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* This would be replaced with a more specific news component */}
                    <div className="space-y-4">
                      {data.recentNews && data.recentNews.map((item, index) => (
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
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                item.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                                item.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">{item.summary}</p>
                        </div>
                      ))}
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Correlated Intelligence Tab */}
        <TabsContent value="correlated-intelligence" className="space-y-4">
          <Tabs defaultValue="vulnerability-intelligence" onValueChange={setActiveCorrelatedSubTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="vulnerability-intelligence" className="text-xs">
                Vulnerability Intelligence
              </TabsTrigger>
              <TabsTrigger value="predicted-attack-vectors" className="text-xs">
                Predicted Attack Vectors
              </TabsTrigger>
              <TabsTrigger value="brand-executive-exposure" className="text-xs">
                Brand & Executive Exposure
              </TabsTrigger>
              <TabsTrigger value="news-narrative-intelligence" className="text-xs">
                News & Narrative Intelligence
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="vulnerability-intelligence">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    Vulnerability Intelligence
                  </CardTitle>
                  <CardDescription>
                    CVEs (Qualys), mapped MITRE techniques, D3FEND mitigations, exploit likelihood
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <ThreatIntelligencePanel data={data} />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="predicted-attack-vectors">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-500" />
                    Predicted Attack Vectors
                  </CardTitle>
                  <CardDescription>
                    AI-predicted attack paths from leaked data + exposures; MITRE flow + success probability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <AttackVectorPanel data={data} />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="brand-executive-exposure">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Brand & Executive Exposure
                  </CardTitle>
                  <CardDescription>
                    Execs/staff exposure via LinkedIn, GitHub, social; leaked creds & impersonation risk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <SocialIntelPanel data={data} />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="news-narrative-intelligence">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-purple-500" />
                    News & Narrative Intelligence
                  </CardTitle>
                  <CardDescription>
                    AI-parsed news sentiment and public narrative around breaches, incidents, layoffs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    {/* This would be replaced with a more specific news narrative component */}
                    <div className="space-y-4">
                      <div className="h-64 mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[
                            { month: 'Jan', sentiment: 65 },
                            { month: 'Feb', sentiment: 70 },
                            { month: 'Mar', sentiment: 68 },
                            { month: 'Apr', sentiment: 45 },
                            { month: 'May', sentiment: 52 },
                            { month: 'Jun', sentiment: 60 }
                          ]}>
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sentiment" name="Sentiment Score" stroke="#8884d8" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {data.recentNews && data.recentNews.map((item, index) => (
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
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                item.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                                item.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 mt-2">{item.summary}</p>
                          
                          <div className="mt-3">
                            <h4 className="text-xs font-medium mb-1">AI Narrative Analysis</h4>
                            <p className="text-xs text-gray-600">
                              {item.sentiment === 'positive' 
                                ? 'This news is likely to have a positive impact on stakeholder perception.' 
                                : item.sentiment === 'negative'
                                ? 'This news presents a reputational risk and may require communications response.'
                                : 'This news has a neutral impact on organizational reputation.'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Intelligence Reporting Tab */}
        <TabsContent value="intelligence-reporting" className="space-y-4">
          <Tabs defaultValue="executive-summary" onValueChange={setActiveReportingSubTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="executive-summary" className="text-xs">
                Executive Summary
              </TabsTrigger>
              <TabsTrigger value="technical-dashboard" className="text-xs">
                Technical Dashboard
              </TabsTrigger>
              <TabsTrigger value="downloadable-reports" className="text-xs">
                Downloadable Reports
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="executive-summary">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Executive Summary
                  </CardTitle>
                  <CardDescription>
                    High-level scorecard, top risks, business impact summary for executives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">Security Posture Summary</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Overall Security Rating</span>
                              <span className="text-sm font-medium text-amber-600">Moderate Risk</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Critical Vulnerabilities</span>
                              <span className="text-sm font-medium text-red-600">High Risk</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Data Exposure</span>
                              <span className="text-sm font-medium text-amber-600">Moderate Risk</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Attack Surface</span>
                              <span className="text-sm font-medium text-amber-600">Moderate Risk</span>
                            </div>
                            <Progress value={55} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">Top Business Risks</h3>
                        <div className="space-y-3">
                          <div className="p-2 border-l-2 border-red-500 bg-red-50">
                            <h4 className="text-sm font-medium text-red-800">Critical: Data Breach Risk</h4>
                            <p className="text-xs text-red-700 mt-1">
                              Multiple exposed credentials and critical vulnerabilities create high likelihood of data breach.
                            </p>
                          </div>
                          <div className="p-2 border-l-2 border-amber-500 bg-amber-50">
                            <h4 className="text-sm font-medium text-amber-800">High: Regulatory Compliance</h4>
                            <p className="text-xs text-amber-700 mt-1">
                              Current security posture may not meet GDPR and HKMA regulatory requirements.
                            </p>
                          </div>
                          <div className="p-2 border-l-2 border-blue-500 bg-blue-50">
                            <h4 className="text-sm font-medium text-blue-800">Medium: Reputation Damage</h4>
                            <p className="text-xs text-blue-700 mt-1">
                              Recent negative news coverage and potential for data leaks presents reputation risks.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="technical-dashboard">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    Technical Dashboard
                  </CardTitle>
                  <CardDescription>
                    Heatmaps, ATT&CK chain visualisation, asset-by-asset breakdowns for SOC/devs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">MITRE ATT&CK Coverage</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center">
                          <div className="p-2 bg-red-100 rounded">
                            <div className="text-lg font-bold text-red-700">24%</div>
                            <div className="text-xs text-red-600">Initial Access</div>
                          </div>
                          <div className="p-2 bg-orange-100 rounded">
                            <div className="text-lg font-bold text-orange-700">45%</div>
                            <div className="text-xs text-orange-600">Execution</div>
                          </div>
                          <div className="p-2 bg-amber-100 rounded">
                            <div className="text-lg font-bold text-amber-700">38%</div>
                            <div className="text-xs text-amber-600">Persistence</div>
                          </div>
                          <div className="p-2 bg-green-100 rounded">
                            <div className="text-lg font-bold text-green-700">67%</div>
                            <div className="text-xs text-green-600">Defense Evasion</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-2">Vulnerability Distribution by Asset</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { asset: 'Web Server', critical: 3, high: 7, medium: 12, low: 15 },
                              { asset: 'Database', critical: 2, high: 5, medium: 8, low: 10 },
                              { asset: 'API Gateway', critical: 1, high: 3, medium: 6, low: 9 },
                              { asset: 'Internal Apps', critical: 0, high: 2, medium: 4, low: 11 },
                            ]}>
                              <XAxis dataKey="asset" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="critical" name="Critical" fill="#ef4444" />
                              <Bar dataKey="high" name="High" fill="#f97316" />
                              <Bar dataKey="medium" name="Medium" fill="#eab308" />
                              <Bar dataKey="low" name="Low" fill="#22c55e" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="downloadable-reports">
              <Card className="bg-white shadow-sm mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileOutput className="h-5 w-5 text-blue-500" />
                    Downloadable Reports
                  </CardTitle>
                  <CardDescription>
                    Exportable PDFs, XLS, JSON, STIX, MITRE Navigator JSON, IOC tables
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ErrorBoundary>
                    <ReportGenerator data={data} companyName="SC Lowy" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => navigate("/executive-view")}
                      >
                        <BarChart3 className="h-4 w-4" />
                        Executive Intelligence Report
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Full Technical Report (PDF)
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export MITRE ATT&CK Data
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export IOC List
                      </Button>
                    </div>
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
      
      <Card className="p-6 bg-white shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-base font-medium flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Intelligence Mapping Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Our AI has analyzed the raw data and created an intelligence map highlighting key security concerns and actionable insights.
              View the complete report for executive or technical stakeholders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/executive-view")}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Intelligence Report
            </Button>
            
            <ReportGenerator data={data} companyName="SC Lowy" />
          </div>
        </div>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center mb-2">
          <Brain className="h-4 w-4 mr-1 text-purple-600" />
          <span>Intelligence Mapping Analysis</span>
        </div>
        <p>AI-powered analysis of intelligence data gathered from multiple sources. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default IntelligentMapping;
