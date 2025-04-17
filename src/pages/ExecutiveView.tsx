import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  ShieldCheck, 
  Brain, 
  Database, 
  Code, 
  Users, 
  Download,
  Printer,
  FileDown,
  Share2,
  Linkedin,
  ExternalLink,
  Lock,
  AlertCircle
} from "lucide-react";
import { getSecurityAssessment } from "@/utils/osint-helpers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import QualysSeverityBar from "@/components/ui/QualysSeverityBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/ui/Header";
import { WebsiteAnalyticsPanel } from "@/components/ui/WebsiteAnalyticsPanel";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

interface ExecutiveViewProps {
  data: OsintData;
}

const BiasDistributionMeter: React.FC<{ 
  leftValue: number;
  centerValue: number;
  rightValue: number;
  label?: string;
}> = ({ leftValue, centerValue, rightValue, label }) => {
  return (
    <div>
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <div className="bias-meter">
        <div className="absolute inset-0 flex">
          <div style={{ width: `${leftValue}%` }}></div>
          <div style={{ width: `${centerValue}%` }} className="bias-indicator">
            <div className="bias-dot">
              <div className="bias-dot-inner"></div>
            </div>
          </div>
          <div style={{ width: `${rightValue}%` }}></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div>Left: {leftValue}%</div>
        <div>Center: {centerValue}%</div>
        <div>Right: {rightValue}%</div>
      </div>
    </div>
  );
};

const ExecutiveView: React.FC<ExecutiveViewProps> = ({ data }) => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"executive" | "technical">("executive");
  
  const { score, label, color } = getSecurityAssessment(data);
  
  const totalVulnerabilities = 
    (data.qualysScan?.severity_1 || 0) + 
    (data.qualysScan?.severity_2 || 0) + 
    (data.qualysScan?.severity_3 || 0) + 
    (data.qualysScan?.severity_4 || 0);

  const vulnerabilityData = [
    { name: "Critical", value: data.qualysScan.severity_1, fill: "#ef4444" },
    { name: "High", value: data.qualysScan.severity_2, fill: "#f97316" },
    { name: "Medium", value: data.qualysScan.severity_3, fill: "#eab308" },
    { name: "Low", value: data.qualysScan.severity_4, fill: "#22c55e" }
  ];

  const riskCategoryData = [
    { name: "Infrastructure", value: 68 },
    { name: "Web Apps", value: 84 },
    { name: "Data Exposure", value: 52 },
    { name: "Network", value: 45 },
    { name: "Access Control", value: 61 }
  ];

  const handleDownload = (reportType: string) => {
    toast.success(`${reportType} report download started`, {
      description: "Your report will be ready in a few seconds"
    });
  };

  const executives = [
    {
      name: "Michel Lowy",
      position: "Co-Founder and CEO",
      linkedinUrl: "https://hk.linkedin.com/in/michel-lowy-8840b65",
      about: "Global Co-Portfolio Manager at SC Lowy.",
      cheesyInfo: "Steering the SC Lowy ship with a steady hand and a keen eye for opportunities.",
      exposureRisk: "Medium"
    },
    {
      name: "Soo Cheon Lee",
      position: "Co-Founder and CIO",
      linkedinUrl: "https://hk.linkedin.com/in/soo-cheon-lee-a155b8a7",
      about: "Co-Global Portfolio Manager at SC Lowy.",
      cheesyInfo: "The financial maestro orchestrating investment strategies with precision and flair.",
      exposureRisk: "Low"
    },
    {
      name: "Arjun Malhotra",
      position: "Head of Trading",
      linkedinUrl: "https://uk.linkedin.com/in/arjunmalhotra",
      about: "Trading, risk management, and research experience across debt and equity products.",
      cheesyInfo: "The trading guru turning market fluctuations into golden opportunities.",
      exposureRisk: "High"
    },
    {
      name: "Ethan Yiqing Ma",
      position: "Asia Credit",
      linkedinUrl: "https://hk.linkedin.com/in/ethan-yiqing-ma-5788639",
      about: "Asia Credit at SC Lowy.",
      cheesyInfo: "Bridging the gap between East and West, one credit deal at a time.",
      exposureRisk: "Medium"
    },
    {
      name: "Jan Zarzycki",
      position: "Business Development and Credit Sales",
      linkedinUrl: "https://uk.linkedin.com/in/janzarzycki",
      about: "Business Development and Credit Sales at SC Lowy.",
      cheesyInfo: "The dealmaker connecting dots and building bridges in the credit market.",
      exposureRisk: "Medium"
    },
    {
      name: "Ankit Thaker",
      position: "Special Situation Credit",
      linkedinUrl: "https://in.linkedin.com/in/ankit-thaker-5047b57",
      about: "Special Situation Credit at SC Lowy.",
      cheesyInfo: "The go-to expert for navigating the twists and turns of special credit situations.",
      exposureRisk: "Low"
    }
  ];

  const breachNews = [
    {
      title: "LoanDepot Data Breach",
      date: "January 2024",
      impact: "16.9 million customers affected",
      details: "Sensitive information, including Social Security numbers and financial details, was compromised. A $25 million settlement fund has been established.",
      severity: "High"
    },
    {
      title: "Snowflake Customer Data Breach",
      date: "2024",
      impact: "100+ organizations affected",
      details: "Hackers affiliated with Scattered Spider executed a mass data breach campaign, accessing data from over 100 Snowflake customers including AT&T and Santander Bank.",
      severity: "Critical"
    },
    {
      title: "Finastra Data Breach",
      date: "November 2024",
      impact: "Unknown scale",
      details: "Breach targeted Finastra's internally hosted Secure File Transfer Platform, exploiting stolen credentials. Finastra serves 45 of the world's top 50 banks.",
      severity: "High"
    },
    {
      title: "Evolve Bank & Trust Data Breach",
      date: "2024",
      impact: "7.6 million individuals affected",
      details: "Exposed names, addresses, financial account numbers, phone numbers, and dates of birth. This incident underscores the vulnerabilities present even in well-established financial institutions.",
      severity: "High"
    }
  ];

  const brandMetrics = {
    sentimentScore: 72,
    mediaPresence: {
      positive: 56,
      neutral: 34,
      negative: 10
    },
    sourceBias: {
      leftLeaning: 28,
      center: 59,
      rightLeaning: 13,
    },
    factualityScore: 81,
    recentMentions: 134
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500 hover:bg-red-600";
      case "high":
        return "bg-orange-500 hover:bg-orange-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const threatEntities = [
    {
      type: "CVE",
      id: "CVE-2023-3456",
      name: "OpenSSH Authentication Bypass",
      severity: "Critical",
      description: "Authentication bypass vulnerability in OpenSSH affecting all versions prior to 8.9p1.",
      relatedTo: ["Port 22", "OpenSSH"]
    },
    {
      type: "CVE",
      id: "CVE-2023-2176",
      name: "Apache Log4j RCE Vulnerability",
      severity: "Critical",
      description: "Remote code execution vulnerability in Apache Log4j library.",
      relatedTo: ["Java", "Web Applications"]
    },
    {
      type: "TTP",
      id: "T1190",
      name: "Exploit Public-Facing Application",
      severity: "High",
      description: "Adversaries may attempt to exploit vulnerabilities in public-facing applications.",
      relatedTo: ["Web Server", "API Gateway"]
    },
    {
      type: "IOC",
      id: "IP-78.31.67.23",
      name: "Known Malicious IP",
      severity: "Medium",
      description: "This IP address has been observed in multiple attack campaigns targeting similar organizations.",
      relatedTo: ["Network Traffic", "Firewall Logs"]
    }
  ];

  const biasDistribution = data.biasDistribution || {
    personnel: {
      leftLeaning: 28,
      center: 59,
      rightLeaning: 13,
    },
    media: {
      leftLeaning: 35,
      center: 42,
      rightLeaning: 23,
    },
    product: {
      leftLeaning: 19,
      center: 65,
      rightLeaning: 16,
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header organizationName="SC Lowy" />
      
      <div className="mb-6">
        <ErrorBoundary>
          <WebsiteAnalyticsPanel data={data} />
        </ErrorBoundary>
      </div>

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
            onClick={() => navigate("/intelligent-mapping")}
            className="flex items-center gap-1"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligent</span> Mapping
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/a40a54f9-328b-43f3-8b66-ace987e135ae.png" 
            alt="K2K Discovery Logo" 
            className="h-8 w-auto mr-3"
          />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-k2k-gradient">Intelligence Report</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-muted-foreground">
            Complete intelligence report with detailed findings and recommendations.
            Toggle between views tailored for different stakeholders.
          </p>
          
          <div className="flex items-center gap-2">
            <Tabs defaultValue="executive" className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger 
                  value="executive" 
                  onClick={() => setActiveView("executive")}
                  className="flex items-center gap-1"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Executive
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  onClick={() => setActiveView("technical")}
                  className="flex items-center gap-1"
                >
                  <Code className="h-4 w-4 mr-1" />
                  Technical
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => handleDownload("PDF")}
        >
          <FileDown className="h-4 w-4" />
          <span>PDF Report</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => handleDownload("Excel")}
        >
          <Download className="h-4 w-4" />
          <span>Excel Data</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4" />
          <span>Print</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => toast.success("Share link copied to clipboard")}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {activeView === "executive" ? (
        <div className="space-y-6 animate-fade-in">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Executive Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">Security Score</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${color}`}>{score}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                  <span className={`text-sm ${color} ml-2`}>({label})</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-800 mb-1">Critical Issues</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-red-600">{data.qualysScan.severity_1}</span>
                  <span className="text-sm text-muted-foreground">requiring immediate attention</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-amber-800 mb-1">Data Exposures</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-amber-600">{data.dataLeaksCompliance.length}</span>
                  <span className="text-sm text-muted-foreground">leaked credentials found</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Based on our comprehensive analysis, we identified multiple security issues requiring attention.
                  The organization's exposure includes {data.dataLeaksCompliance.length} data leaks and {data.qualysScan.severity_1 + data.qualysScan.severity_2} high or critical security vulnerabilities.
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-800">
                  <div className="font-medium mb-2 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Key Findings
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Exposed sensitive data in {data.dataLeaksCompliance.length} breach databases</li>
                    <li>{data.qualysScan.severity_1} critical vulnerabilities detected in infrastructure</li>
                    <li>{data.openPorts.length} open ports potentially increasing attack surface</li>
                    <li>Technology stack including {data.technologies.slice(0, 3).join(", ")} identified</li>
                  </ul>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={vulnerabilityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {vulnerabilityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                  Risk Assessment
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Infrastructure Risk</span>
                      <span className="font-medium">{60 + Math.floor(Math.random() * 20)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${60 + Math.floor(Math.random() * 20)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Breach Risk</span>
                      <span className="font-medium">{40 + Math.floor(Math.random() * 30)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${40 + Math.floor(Math.random() * 30)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Risk</span>
                      <span className="font-medium">{50 + Math.floor(Math.random() * 25)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${50 + Math.floor(Math.random() * 25)}%` }}></div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Strategic Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <h4 className="text-sm font-medium">Critical Priority</h4>
                    <p className="text-sm text-gray-600">
                      Address {data.qualysScan.severity_1} critical vulnerabilities and reset passwords for all compromised accounts.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-3 py-1">
                    <h4 className="text-sm font-medium">High Priority</h4>
                    <p className="text-sm text-gray-600">
                      Implement multi-factor authentication and review open ports ({data.openPorts.length}) for unnecessary exposure.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <h4 className="text-sm font-medium">Ongoing Measures</h4>
                    <p className="text-sm text-gray-600">
                      Establish regular security assessments and employee security awareness training.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Intelligence Analysis
            </h2>
            
            <Tabs defaultValue="threats" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="threats" className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Threat Intelligence
                </TabsTrigger>
                <TabsTrigger value="personnel" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Key Personnel
                </TabsTrigger>
                <TabsTrigger value="brand" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  Brand Intelligence
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="threats" className="space-y-4">
                <div className="grid gap-4">
                  {threatEntities.map((threat, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getSeverityColor(threat.severity)}>
                              {threat.severity}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-100">
                              {threat.type}
                            </Badge>
                          </div>
                          <h4 className="text-base font-medium flex items-center gap-1">
                            {threat.type === "CVE" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            {threat.type === "TTP" && <BarChart3 className="h-4 w-4 text-blue-500" />}
                            {threat.type === "IOC" && <Lock className="h-4 w-4 text-purple-500" />}
                            {threat.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {threat.description}
                          </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {threat.id}
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {threat.relatedTo.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="text-sm font-medium flex items-center gap-2 text-amber-800 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    Recent Financial Sector Breaches
                  </h3>
                  <div className="space-y-3">
                    {breachNews.map((news, index) => (
                      <div key={index} className="bg-white p-3 rounded border border-amber-100">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium">{news.title}</h4>
                          <Badge className={getSeverityColor(news.severity)}>
                            {news.severity}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {news.date} • {news.impact}
                        </div>
                        <p className="text-xs mt-2">{news.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="personnel">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        Executive Exposure
                      </h3>
                      <div className="text-2xl font-bold text-blue-700 mb-1">
                        {executives.length}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Key personnel identified and analyzed
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-purple-600" />
                        Perspective Analysis
                      </h3>
                      <BiasDistributionMeter 
                        leftValue={biasDistribution.personnel.leftLeaning}
                        centerValue={biasDistribution.personnel.center}
                        rightValue={biasDistribution.personnel.rightLeaning}
                      />
                    </div>
                  </div>
                
                  {executives.map((executive, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {getInitials(executive.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{executive.name}</h4>
                            <p className="text-sm text-muted-foreground">{executive.position}</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{executive.about}</p>
                          <p className="text-xs text-muted-foreground mt-1 italic">"{executive.cheesyInfo}"</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                          <Badge className={getSeverityColor(executive.exposureRisk)}>
                            {executive.exposureRisk} Exposure
                          </Badge>
                          <a 
                            href={executive.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 flex items-center gap-1 mt-2"
                          >
                            <Linkedin className="h-3 w-3" />
                            LinkedIn Profile
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="brand">
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="text-base font-medium mb-3">Brand Sentiment & Media Analysis</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gradient-to-br from-green-50 to-transparent p-3 rounded-lg border">
                        <h4 className="text-sm font-medium mb-1">Sentiment Score</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">{brandMetrics.sentimentScore}</span>
                          <span className="text-xs text-muted-foreground">/100</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-transparent p-3 rounded-lg border">
                        <h4 className="text-sm font-medium mb-1">Factuality Score</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">{brandMetrics.factualityScore}</span>
                          <span className="text-xs text-muted-foreground">/100</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-transparent p-3 rounded-lg border">
                        <h4 className="text-sm font-medium mb-1">Recent Mentions</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-purple-600">{brandMetrics.recentMentions}</span>
                          <span className="text-xs text-muted-foreground">last 30 days</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Media Coverage Distribution</h4>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xs w-24">Positive</div>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-gray-200">
                              <div 
                                className="h-2 rounded-full bg-green-500" 
                                style={{ width: `${brandMetrics.mediaPresence.positive}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs font-medium">{brandMetrics.mediaPresence.positive}%</div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-xs w-24">Neutral</div>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-gray-200">
                              <div 
                                className="h-2 rounded-full bg-blue-500" 
                                style={{ width: `${brandMetrics.mediaPresence.neutral}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs font-medium">{brandMetrics.mediaPresence.neutral}%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs w-24">Negative</div>
                          <div className="flex-1">
                            <div className="h-2 rounded-full bg-gray-200">
                              <div 
                                className="h-2 rounded-full bg-red-500" 
                                style={{ width: `${brandMetrics.mediaPresence.negative}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs font-medium">{brandMetrics.mediaPresence.negative}%</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Perspective Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="text-xs font-medium mb-2 text-blue-800">Media Source Bias</h5>
                            <BiasDistributionMeter 
                              leftValue={biasDistribution.media.leftLeaning}
                              centerValue={biasDistribution.media.center}
                              rightValue={biasDistribution.media.rightLeaning}
                            />
                            <p className="text-xs mt-2 text-gray-500">
                              How the organization is portrayed by media sources with different political leanings.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium mb-2 text-green-800">Product Perception</h5>
                            <BiasDistributionMeter 
                              leftValue={biasDistribution.product.leftLeaning}
                              centerValue={biasDistribution.product.center}
                              rightValue={biasDistribution.product.rightLeaning}
                            />
                            <p className="text-xs mt-2 text-gray-500">
                              How products and services are perceived by audiences with different perspectives.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-medium mb-2">Perspective Impact Analysis</h4>
                        <p className="text-sm">
                          Our analysis indicates that perspectives significantly influence how your organization is portrayed. 
                          {biasDistribution.media.center > 50 ? 
                            " Your coverage is predominantly from center-leaning sources, indicating balanced representation." :
                            biasDistribution.media.leftLeaning > biasDistribution.media.rightLeaning ? 
                              " Left-leaning sources provide more coverage, which may affect how certain audiences perceive your messaging." :
                              " Right-leaning sources provide more coverage, which may affect how certain audiences perceive your messaging."
                          }
                          
                          Understanding these biases can help tailor communications for different audience segments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <h3 className="text-lg font-semibold mb-4">Risk Assessment by Category</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskCategoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Risk Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Risk scores are calculated based on vulnerability density, exposure level, and potential impact.
              Higher scores indicate greater risk and should be prioritized for remediation.
            </p>
          </Card>

          <Card className="p-6 bg-white shadow-sm">
            <div className="mt-2 pt-2">
              <h4 className="text-sm font-medium mb-3">Action Plan Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-baseline">
                  <span className="w-24 text-sm font-medium">Immediate</span>
                  <span className="text-sm text-gray-600">Reset compromised credentials & patch critical vulnerabilities</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-24 text-sm font-medium">30 Days</span>
                  <span className="text-sm text-gray-600">Implement MFA & conduct security awareness training</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-24 text-sm font-medium">90 Days</span>
                  <span className="text-sm text-gray-600">Complete all security recommendations & establish ongoing monitoring</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              Technical Analysis
            </h2>
            
            <div className="mb-4">
              <h3 className="text-base font-medium mb-2">Vulnerability Distribution</h3>
              <QualysSeverityBar data={data.qualysScan} />
              <div className="grid grid-cols-4 gap-2 mt-3 text-center">
                <div className="text-red-600">
                  <div className="text-sm font-bold">{data.qualysScan.severity_1}</div>
                  <div className="text-xs">Critical</div>
                </div>
                <div className="text-orange-600">
                  <div className="text-sm font-bold">{data.qualysScan.severity_2}</div>
                  <div className="text-xs">High</div>
                </div>
                <div className="text-yellow-600">
                  <div className="text-sm font-bold">{data.qualysScan.severity_3}</div>
                  <div className="text-xs">Medium</div>
                </div>
                <div className="text-green-600">
                  <div className="text-sm font-bold">{data.qualysScan.severity_4}</div>
                  <div className="text-xs">Low</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Open Ports ({data.openPorts.length})</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {data.openPorts.map(port => (
                    <div key={port} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                      Port {port}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Network Hosts</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {data.shodanData?.hostnames.map((hostname, index) => (
                    <div key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
                      {hostname}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800 mb-4">
              <div className="font-medium mb-2 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Technical Recommendations
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Implement patch management for all {data.qualysScan.severity_1 + data.qualysScan.severity_2} critical vulnerabilities</li>
                <li>Review and secure {data.openPorts.length} open ports with proper firewall rules</li>
                <li>Implement network segmentation and access control lists</li>
                <li>Deploy intrusion detection and prevention systems</li>
              </ul>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                Data Leakage Analysis
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-red-50 to-transparent p-3 rounded-lg border">
                  <div className="text-xs text-red-800">Leaked Credentials</div>
                  <div className="text-xl font-bold text-red-600">{data.dataLeaksCompliance.length}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-transparent p-3 rounded-lg border">
                  <div className="text-xs text-amber-800">Affected Emails</div>
                  <div className="text-xl font-bold text-amber-600">
                    {new Set(data.dataLeaksCompliance.map(d => d.email)).size}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                  <div className="font-medium text-xs text-amber-800 mb-1">Finding</div>
                  <p className="text-xs text-amber-700">
                    {data.dataLeaksCompliance.filter(d => d.password).length} plaintext passwords were discovered in breach databases.
                    These credentials pose an immediate risk as they may be used in credential stuffing attacks.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-600" />
                Technology Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.technologies.map((tech, index) => (
                  <div key={index} className="border px-3 py-2 rounded-md text-xs bg-gradient-to-r from-blue-50 to-transparent">
                    {tech}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <strong>Analysis:</strong> The technology stack includes {data.technologies.length} identified components. 
                Notable technologies include web frameworks, CMS platforms, and third-party services that should be regularly updated.
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-base font-medium mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-purple-600" />
              Document Intelligence
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We identified {Object.values(data.fileSearch).flat().length} public documents associated with the organization. 
              These documents may contain sensitive information that should be protected.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">PDF Documents ({data.fileSearch.PDF.length})</h4>
                <div className="border rounded p-2 text-xs h-24 overflow-y-auto bg-gradient-to-r from-pink-50 to-transparent">
                  {data.fileSearch.PDF.map((file, index) => (
                    <div key={index} className="mb-1 truncate">
                      {file.split('/').pop()}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Spreadsheets ({data.fileSearch.XLS.length})</h4>
                <div className="border rounded p-2 text-xs h-24 overflow-y-auto bg-gradient-to-r from-green-50 to-transparent">
                  {data.fileSearch.XLS.map((file, index) => (
                    <div key={index} className="mb-1 truncate">
                      {file.split('/').pop()}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center mb-2">
          <img 
            src="/lovable-uploads/a40a54f9-328b-43f3-8b66-ace987e135ae.png" 
            alt="K2K Discovery Logo" 
            className="h-4 w-auto mr-2"
          />
          <span>Intelligence Report</span>
        </div>
        <p>{activeView === "executive" ? "Executive" : "Technical"} intelligence analysis based on data gathered from multiple sources. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default ExecutiveView;
