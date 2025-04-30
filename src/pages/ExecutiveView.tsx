
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
  AlertCircle,
  Globe,
  MapPin,
  Cpu,
  FileText
} from "lucide-react";
import { getSecurityAssessment } from "@/utils/osint-helpers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import QualysSeverityBar from "@/components/ui/QualysSeverityBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import WebsiteAnalyticsPanel from "@/components/WebsiteAnalyticsPanel";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Toggle } from "@/components/ui/toggle";

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

  // Generate risk trend data for past 30 days
  const generateRiskTrendData = () => {
    const result = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      let riskValue = 55 + Math.random() * 10;
      
      // Create some spikes for notable events
      if (i === 24) {
        riskValue = 78; // CVE discovery spike
      } else if (i === 12) {
        riskValue = 82; // Data breach spike
      } else if (i === 5) {
        riskValue = 75; // Vulnerability disclosure
      }
      
      result.push({
        date: date.toISOString().slice(0, 10),
        risk: riskValue,
        event: i === 24 ? "Critical CVE" : (i === 12 ? "Data Breach" : (i === 5 ? "Vuln Disclosed" : null))
      });
    }
    return result;
  };

  const riskTrendData = generateRiskTrendData();

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
  
  // Mock data for tables in the technical view
  const cveData = [
    { id: "CVE-2023-3456", cvss: 9.8, epss: "0.975", capec: "CAPEC-1", mitre: "Initial Access", asset: "Web Server" },
    { id: "CVE-2023-2176", cvss: 9.6, epss: "0.936", capec: "CAPEC-94", mitre: "Execution", asset: "App Server" },
    { id: "CVE-2023-5678", cvss: 8.4, epss: "0.852", capec: "CAPEC-242", mitre: "Defense Evasion", asset: "Database" },
    { id: "CVE-2023-9012", cvss: 7.5, epss: "0.714", capec: "CAPEC-169", mitre: "Credential Access", asset: "API Gateway" }
  ];
  
  const leakedCredentials = [
    { email: "info@sclowy.com", source: "LinkedIn Data Breach", type: "Hash (bcrypt)", vip: false },
    { email: "admin@sclowy.com", source: "Collection #1", type: "Plaintext", vip: true },
    { email: "j.smith@sclowy.com", source: "Adobe 2013", type: "Hash (SHA-1)", vip: true },
    { email: "tech@sclowy.com", source: "Canva 2019", type: "Hash (bcrypt)", vip: false }
  ];
  
  const spoofedDomains = [
    { domain: "sclowy-bank.com", similarity: "92%", legitimate: false, created: "2024-02-15" },
    { domain: "sc-lowy.com", similarity: "89%", legitimate: false, created: "2023-11-03" },
    { domain: "sclowysecure.com", similarity: "84%", legitimate: false, created: "2024-03-22" }
  ];
  
  const threatActors = [
    { name: "FIN7", target: "Financial Institutions", motivation: "Financial Gain", sophistication: "High" },
    { name: "Lazarus Group", target: "Banking Sector", motivation: "State Sponsored", sophistication: "Very High" }
  ];
  
  // Fix for the open ports data access
  const portData = Array.isArray(data.openPorts) ? data.openPorts : [];

  // Top 5 countries with highest exposure (for geo risk map)
  const geoRiskData = [
    { country: "Russia", risk: 72, incidents: 14 },
    { country: "China", risk: 68, incidents: 12 },
    { country: "United States", risk: 54, incidents: 9 },
    { country: "North Korea", risk: 49, incidents: 7 },
    { country: "Iran", risk: 42, incidents: 6 }
  ];

  return (
    <div className={`container mx-auto px-4 py-8 ${activeView === "technical" ? "bg-slate-100" : "bg-white"}`}>
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
            onClick={() => navigate("/data-discovery")}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Processed</span> Data
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/correlated-intelligence")}
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
            <div className="inline-flex items-center rounded-md border bg-muted p-1 text-muted-foreground">
              <Toggle 
                variant="outline" 
                pressed={activeView === "executive"} 
                onPressedChange={() => setActiveView("executive")}
                className={`flex items-center gap-1 ${activeView === "executive" ? "bg-primary text-white" : ""}`}
              >
                <Users className="h-4 w-4 mr-1" />
                Executive
              </Toggle>
              <Toggle 
                variant="outline" 
                pressed={activeView === "technical"} 
                onPressedChange={() => setActiveView("technical")}
                className={`flex items-center gap-1 ${activeView === "technical" ? "bg-primary text-white" : ""}`}
              >
                <Code className="h-4 w-4 mr-1" />
                Technical
              </Toggle>
            </div>
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
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <p className="text-gray-800">
                Our OSINT scan of <strong>sclowy.com</strong> has identified <strong>{data.qualysScan.severity_1}</strong> critical vulnerabilities and <strong>{data.dataLeaksCompliance.length}</strong> leaked credentials, 
                presenting a significant security risk. We've detected threat actor activity from <strong>FIN7</strong> and <strong>Lazarus Group</strong>, 
                both known to target financial institutions. Recent spikes in risk scores correlate with disclosed vulnerabilities in core infrastructure.
                Immediate action is recommended to address critical issues and protect brand integrity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-1">Exposure Score</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-3xl font-bold ${color}`}>{score}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                  <span className={`text-sm ${color} ml-2`}>({label})</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-800 mb-1">Critical CVEs</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-red-600">{data.qualysScan.severity_1}</span>
                  <span className="text-sm text-muted-foreground">critical</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-amber-800 mb-1">Leaked Credentials</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-amber-600">{data.dataLeaksCompliance.length}</span>
                  <span className="text-sm text-muted-foreground">accounts</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800 mb-1">Threat Actors</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-purple-600">2</span>
                  <span className="text-sm text-muted-foreground">active</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-1">Executive Mentions</h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-green-600">{executives.length}</span>
                  <span className="text-sm text-muted-foreground">found</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              <div className="md:col-span-7">
                <h3 className="text-base font-medium mb-3">Risk Trend (30 Days)</h3>
                <div className="h-64 border rounded-lg p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={riskTrendData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(tick) => tick.slice(5)} 
                      />
                      <YAxis domain={[40, 100]} />
                      <Tooltip 
                        formatter={(value, name) => [`${value}`, 'Risk Score']}
                        labelFormatter={(label) => `Date: ${label}`}
                      />
                      <Area type="monotone" dataKey="risk" stroke="#2563eb" fill="url(#colorRisk)" />
                      <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {riskTrendData.filter(item => item.event).map((item, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-800">
                      {item.date.slice(5)}: {item.event}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-5">
                <h3 className="text-base font-medium mb-3">Top Recommendations</h3>
                <Card className="p-4 bg-white shadow-sm">
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-500 pl-3 py-1">
                      <h4 className="text-sm font-medium">1. Patch Critical CVEs</h4>
                      <p className="text-sm text-gray-600">
                        Immediately patch {data.qualysScan.severity_1} critical vulnerabilities, prioritizing internet-facing assets.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-3 py-1">
                      <h4 className="text-sm font-medium">2. Reset Compromised Accounts</h4>
                      <p className="text-sm text-gray-600">
                        Force password reset for all {data.dataLeaksCompliance.length} compromised accounts and implement MFA.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-blue-500 pl-3 py-1">
                      <h4 className="text-sm font-medium">3. Third-Party Access Audit</h4>
                      <p className="text-sm text-gray-600">
                        Audit all vendor access to systems and implement least-privilege access controls.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-3 py-1">
                      <h4 className="text-sm font-medium">4. Executive Protection Program</h4>
                      <p className="text-sm text-gray-600">
                        Implement digital protection for {executives.length} key executives found in OSINT data.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <div className="mt-4">
                  <h3 className="text-base font-medium mb-3">Geo Risk Map</h3>
                  <div className="bg-white border rounded-lg p-4">
                    <div className="space-y-3">
                      {geoRiskData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-24 text-sm">{item.country}</div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${item.risk}%` }}></div>
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm">{item.risk}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Threat Intelligence
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
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <Card className="p-6 bg-slate-50 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                Technical Details
              </h2>
              <Badge variant="outline" className="bg-blue-50">
                For Security Teams
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="p-4 bg-slate-100 rounded-lg border">
                <h3 className="text-xs uppercase text-gray-500 mb-1">Asset Count</h3>
                <div className="text-2xl font-bold">{data.technologies.length}</div>
                <div className="text-xs text-gray-500">Discovered technologies</div>
              </div>
              
              <div className="p-4 bg-slate-100 rounded-lg border">
                <h3 className="text-xs uppercase text-gray-500 mb-1">CVEs by EPSS</h3>
                <div className="text-2xl font-bold text-red-600">{data.qualysScan.severity_1 + data.qualysScan.severity_2}</div>
                <div className="text-xs text-gray-500">High exploitation probability</div>
              </div>
              
              <div className="p-4 bg-slate-100 rounded-lg border">
                <h3 className="text-xs uppercase text-gray-500 mb-1">Exposed IPs</h3>
                <div className="text-2xl font-bold">{portData.length}</div>
                <div className="text-xs text-gray-500">With open ports</div>
              </div>
              
              <div className="p-4 bg-slate-100 rounded-lg border">
                <h3 className="text-xs uppercase text-gray-500 mb-1">Leaked Identities</h3>
                <div className="text-2xl font-bold text-amber-600">{data.dataLeaksCompliance.length}</div>
                <div className="text-xs text-gray-500">In breach databases</div>
              </div>
              
              <div className="p-4 bg-slate-100 rounded-lg border">
                <h3 className="text-xs uppercase text-gray-500 mb-1">Spoofed Domains</h3>
                <div className="text-2xl font-bold text-purple-600">{spoofedDomains.length}</div>
                <div className="text-xs text-gray-500">Potential phishing risk</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  CVE Details
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-3">CVE ID</th>
                        <th className="px-4 py-3">CVSS</th>
                        <th className="px-4 py-3">EPSS</th>
                        <th className="px-4 py-3">CAPEC</th>
                        <th className="px-4 py-3">MITRE Tactic</th>
                        <th className="px-4 py-3">Affected Asset</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cveData.map((cve, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                          <td className="px-4 py-3 text-blue-600">{cve.id}</td>
                          <td className="px-4 py-3">
                            <Badge className={cve.cvss >= 9.0 ? "bg-red-500" : cve.cvss >= 7.0 ? "bg-orange-500" : "bg-yellow-500"}>
                              {cve.cvss}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{cve.epss}</td>
                          <td className="px-4 py-3">{cve.capec}</td>
                          <td className="px-4 py-3">{cve.mitre}</td>
                          <td className="px-4 py-3">{cve.asset}</td>
                          <td className="px-4 py-3">
                            <Button variant="outline" size="sm" className="h-7 text-xs">Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    Credential Exposure
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-slate-200 text-slate-700">
                        <tr>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Breach Source</th>
                          <th className="px-4 py-3">Password Type</th>
                          <th className="px-4 py-3">VIP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leakedCredentials.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                            <td className="px-4 py-3">{item.email}</td>
                            <td className="px-4 py-3">{item.source}</td>
                            <td className="px-4 py-3">{item.type}</td>
                            <td className="px-4 py-3">
                              {item.vip ? (
                                <Badge className="bg-red-500">VIP</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-slate-50">Regular</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-purple-600" />
                    Spoofed Domains
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-slate-200 text-slate-700">
                        <tr>
                          <th className="px-4 py-3">Domain</th>
                          <th className="px-4 py-3">Similarity</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {spoofedDomains.map((domain, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                            <td className="px-4 py-3 text-blue-600">{domain.domain}</td>
                            <td className="px-4 py-3">{domain.similarity}</td>
                            <td className="px-4 py-3">
                              {domain.legitimate ? (
                                <Badge className="bg-green-500">Legitimate</Badge>
                              ) : (
                                <Badge className="bg-red-500">Suspicious</Badge>
                              )}
                            </td>
                            <td className="px-4 py-3">{domain.created}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-600" />
                  Infrastructure
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-200 text-slate-700">
                      <tr>
                        <th className="px-4 py-3">Port</th>
                        <th className="px-4 py-3">Service</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portData.map((port, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                          <td className="px-4 py-3">{port.port}</td>
                          <td className="px-4 py-3">{port.service}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={
                              port.state === "open" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                            }>
                              {port.state}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    Threat Actors
                  </h3>
                  
                  {threatActors.map((actor, index) => (
                    <div key={index} className={`p-3 rounded-lg mb-3 ${index % 2 === 0 ? 'bg-red-50 border border-red-100' : 'bg-amber-50 border border-amber-100'}`}>
                      <div className="flex justify-between">
                        <h4 className="text-base font-medium">{actor.name}</h4>
                        <Badge className={actor.sophistication === "Very High" ? "bg-red-500" : "bg-orange-500"}>
                          {actor.sophistication}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex gap-2">
                          <span className="font-medium w-24">Target:</span>
                          <span>{actor.target}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium w-24">Motivation:</span>
                          <span>{actor.motivation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Card>
                
                <Card className="p-4">
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    MITRE ATT&CK
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded bg-red-100 text-center text-xs font-medium">
                      Initial Access
                    </div>
                    <div className="p-2 rounded bg-red-100 text-center text-xs font-medium">
                      Execution
                    </div>
                    <div className="p-2 rounded bg-amber-100 text-center text-xs font-medium">
                      Persistence
                    </div>
                    <div className="p-2 rounded bg-green-100 text-center text-xs font-medium">
                      Privilege Escalation
                    </div>
                    <div className="p-2 rounded bg-green-100 text-center text-xs font-medium">
                      Defense Evasion
                    </div>
                    <div className="p-2 rounded bg-amber-100 text-center text-xs font-medium">
                      Credential Access
                    </div>
                    <div className="p-2 rounded bg-slate-100 text-center text-xs font-medium">
                      Discovery
                    </div>
                    <div className="p-2 rounded bg-slate-100 text-center text-xs font-medium">
                      Lateral Movement
                    </div>
                    <div className="p-2 rounded bg-slate-100 text-center text-xs font-medium">
                      Collection
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-600">
                    <p>Color indicates threat level detected:</p>
                    <div className="flex gap-2 mt-1">
                      <span className="w-4 h-4 bg-red-100 rounded"></span> High
                      <span className="w-4 h-4 bg-amber-100 rounded ml-2"></span> Medium
                      <span className="w-4 h-4 bg-green-100 rounded ml-2"></span> Low
                      <span className="w-4 h-4 bg-slate-100 rounded ml-2"></span> None
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600" />
                  Knowledge Graph
                </h3>
                
                <div className="bg-slate-100 border rounded-lg p-4 h-60 flex items-center justify-center">
                  <p className="text-slate-500">Knowledge Graph Visualization</p>
                  {/* In a real implementation, this would be a graph visualization showing relationship between entities */}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExecutiveView;
