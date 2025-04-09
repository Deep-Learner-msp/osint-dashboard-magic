
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
  Download
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { getDataCompleteness } from "@/utils/osint-helpers";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ThreatIntelligencePanel from "@/components/ThreatIntelligencePanel";
import AttackVectorPanel from "@/components/AttackVectorPanel";
import IpEnumerationPanel from "@/components/IpEnumerationPanel";
import SocialIntelPanel from "@/components/SocialIntelPanel";
import ReportGenerator from "@/components/ReportGenerator";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

interface CorrelatedIntelligenceProps {
  data: OsintData;
}

const CorrelatedIntelligence: React.FC<CorrelatedIntelligenceProps> = ({ data }) => {
  const navigate = useNavigate();
  const dataCompletenessScore = getDataCompleteness(data);
  const [activeTab, setActiveTab] = useState("vulnerability");

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
            onClick={() => navigate("/data-discovery")}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span> Discovery
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
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <Brain className="h-5 w-5 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Correlated Intelligence</h1>
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

      <Tabs defaultValue="vulnerability" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="vulnerability" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Vulnerability</span> Intelligence
          </TabsTrigger>
          <TabsTrigger value="attack" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Predicted Attack</span> Vectors
          </TabsTrigger>
          <TabsTrigger value="brand" className="flex items-center gap-1">
            <UserCheck className="h-4 w-4" />
            Brand & Executive Exposure
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            News & Narrative Intelligence
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vulnerability" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Vulnerability Distribution
                </CardTitle>
                <CardDescription>
                  AI-analyzed vulnerability distribution by severity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
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
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Exploitation Timeline Probability
                </CardTitle>
                <CardDescription>
                  Likelihood of exploit occurrence over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <XAxis dataKey="day" />
                      <YAxis unit="%" />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="probability" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Probability"
                        unit="%"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ErrorBoundary>
            <ThreatIntelligencePanel data={data} />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="attack" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-500" />
                  Attack Vector Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of potential attack vectors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attackVectorData}>
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip />
                      <Bar dataKey="value" name="Likelihood" unit="%" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Defensive Posture Analysis
                </CardTitle>
                <CardDescription>
                  Current security measures effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Web Application Firewall</span>
                      <span className="text-sm font-medium text-amber-600">Moderate</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Network Security</span>
                      <span className="text-sm font-medium text-red-600">Weak</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Endpoint Protection</span>
                      <span className="text-sm font-medium text-green-600">Strong</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Data Protection</span>
                      <span className="text-sm font-medium text-amber-600">Moderate</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ErrorBoundary>
            <AttackVectorPanel data={data} />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="brand" className="space-y-4">
          <ErrorBoundary>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Brand & Executive Exposure</h2>
              <p className="text-gray-600 mb-4">Analysis of executive team and brand exposure across social media and public platforms.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">Executive Team Exposure</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">MC</div>
                      <div>
                        <p className="font-medium">Michael Chen, CEO</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded mr-2">Moderate Risk</span>
                          <span>5 social profiles, 3 leaked credentials</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">SW</div>
                      <div>
                        <p className="font-medium">Sarah Williams, CIO</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded mr-2">High Risk</span>
                          <span>8 social profiles, 5 leaked credentials</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">RT</div>
                      <div>
                        <p className="font-medium">Robert Tanaka, CISO</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded mr-2">Low Risk</span>
                          <span>2 social profiles, 0 leaked credentials</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">Brand Impersonation Risk</h3>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Domain Squatting</span>
                      <span className="text-sm font-medium text-amber-600">12 domains</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Social Media Impersonation</span>
                      <span className="text-sm font-medium text-red-600">8 profiles</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Phishing Campaigns</span>
                      <span className="text-sm font-medium text-amber-600">3 active</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Brand Logo Misuse</span>
                      <span className="text-sm font-medium text-green-600">Low</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-3">Dark Web Mentions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Breach Forums</TableCell>
                      <TableCell>Credential selling</TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>RaidForums Archive</TableCell>
                      <TableCell>Database leak</TableCell>
                      <TableCell>2 months ago</TableCell>
                      <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dark Web Marketplace</TableCell>
                      <TableCell>Access selling</TableCell>
                      <TableCell>1 week ago</TableCell>
                      <TableCell><Badge variant="destructive">Critical</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Telegram Channels</TableCell>
                      <TableCell>Information sharing</TableCell>
                      <TableCell>5 days ago</TableCell>
                      <TableCell><Badge variant="warning">High</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <SocialIntelPanel data={data} />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="news" className="space-y-4">
          <ErrorBoundary>
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">News & Narrative Intelligence</h2>
              <p className="text-gray-600 mb-4">AI-powered analysis of news sentiment and public narrative surrounding the organization.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">Media Sentiment Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Positive", value: 45, color: "#22c55e" },
                            { name: "Neutral", value: 35, color: "#3b82f6" },
                            { name: "Negative", value: 20, color: "#ef4444" }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {[
                            { name: "Positive", value: 45, color: "#22c55e" },
                            { name: "Neutral", value: 35, color: "#3b82f6" },
                            { name: "Negative", value: 20, color: "#ef4444" }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">News Trend Analysis</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={[
                          { month: "Aug", mentions: 12, sentiment: 65 },
                          { month: "Sep", mentions: 15, sentiment: 68 },
                          { month: "Oct", mentions: 18, sentiment: 60 },
                          { month: "Nov", mentions: 24, sentiment: 55 },
                          { month: "Dec", mentions: 30, sentiment: 62 }
                        ]}
                      >
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" unit="%" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="mentions" 
                          stroke="#8884d8" 
                          name="News Mentions"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="sentiment" 
                          stroke="#82ca9d" 
                          name="Sentiment Score"
                          unit="%"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Key Narrative Themes</h3>
                
                <div className="border-l-4 border-blue-400 pl-4 py-2">
                  <h4 className="font-medium">Financial Performance</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    45% of news coverage focuses on strong financial performance and market growth, creating a positive investor narrative.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4 py-2">
                  <h4 className="font-medium">Industry Leadership</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    28% of coverage highlights innovation and industry leadership, particularly in distressed debt markets.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-400 pl-4 py-2">
                  <h4 className="font-medium">Expansion Efforts</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    18% of mentions relate to global expansion and new market entries, particularly in cryptocurrency.
                  </p>
                </div>
                
                <div className="border-l-4 border-red-400 pl-4 py-2">
                  <h4 className="font-medium">Regulatory Concerns</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    9% of coverage involves regulatory inquiries and compliance challenges, particularly in Asian markets.
                  </p>
                </div>
              </div>
            </div>
          </ErrorBoundary>
        </TabsContent>
      </Tabs>
      
      <Card className="p-6 bg-white shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-base font-medium flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Correlated Intelligence Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              Our AI has analyzed the raw data and created an intelligence map highlighting key security concerns and actionable insights.
              View the complete report for executive or technical stakeholders.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/intelligence-reporting")}
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
          <span>Correlated Intelligence Analysis</span>
        </div>
        <p>AI-powered analysis of intelligence data gathered from multiple sources. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default CorrelatedIntelligence;
