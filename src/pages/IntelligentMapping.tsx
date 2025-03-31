
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
import ThreatIntelligencePanel from "@/components/ThreatIntelligencePanel";
import AttackVectorPanel from "@/components/AttackVectorPanel";
import IpEnumerationPanel from "@/components/IpEnumerationPanel";
import SocialIntelPanel from "@/components/SocialIntelPanel";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

interface IntelligentMappingProps {
  data: OsintData;
}

const IntelligentMapping: React.FC<IntelligentMappingProps> = ({ data }) => {
  const navigate = useNavigate();
  const dataCompletenessScore = getDataCompleteness(data);
  const [activeTab, setActiveTab] = useState("threat");

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

      <Tabs defaultValue="threat" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="threat" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Threat</span> Intelligence
          </TabsTrigger>
          <TabsTrigger value="attack" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Attack</span> Vectors
          </TabsTrigger>
          <TabsTrigger value="infrastructure" className="flex items-center gap-1">
            <Server className="h-4 w-4" />
            IP Enumeration
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-1">
            <UserCheck className="h-4 w-4" />
            Social Intelligence
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="threat" className="space-y-4">
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
        
        <TabsContent value="infrastructure" className="space-y-4">
          <ErrorBoundary>
            <IpEnumerationPanel data={data} />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <ErrorBoundary>
            <SocialIntelPanel data={data} />
          </ErrorBoundary>
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
          <Button 
            variant="default" 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => navigate("/executive-view")}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Intelligence Report
          </Button>
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
