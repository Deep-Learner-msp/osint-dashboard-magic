
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ArrowUpRight, 
  BarChart3, 
  Brain, 
  ChevronLeft, 
  Database, 
  Download, 
  FileText,
  Shield,
  ClipboardCheck,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ErrorBoundary from "@/components/ui/error-boundary";
import ReportGenerator from "@/components/ReportGenerator";
import { formatDate } from "@/utils/formatters";
import { getDataCompleteness, getSecurityAssessment } from "@/utils/osint-helpers";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";

interface IntelligenceReportingProps {
  data: OsintData;
}

const IntelligenceReporting: React.FC<IntelligenceReportingProps> = ({ data }) => {
  const navigate = useNavigate();
  const scanDate = new Date();
  const dataCompletenessScore = getDataCompleteness(data);
  const securityAssessment = getSecurityAssessment(data);
  
  // Executive summary metrics
  const executiveSummaryData = [
    { name: "Security Posture", value: dataCompletenessScore, color: "#8884d8" },
    { name: "Breach Likelihood", value: 100 - dataCompletenessScore, color: "#e0e0e0" }
  ];
  
  // Attack surface data
  const attackSurfaceData = [
    { name: "Web Apps", value: 35 },
    { name: "API Endpoints", value: 23 },
    { name: "Cloud Assets", value: 42 },
    { name: "Network Infra", value: 18 },
    { name: "Mobile Apps", value: 12 }
  ];
  
  // Vulnerability metrics
  const vulnerabilityData = [
    { name: "Critical", value: data.qualysScan.severity_1 },
    { name: "High", value: data.qualysScan.severity_2 },
    { name: "Medium", value: data.qualysScan.severity_3 },
    { name: "Low", value: data.qualysScan.severity_4 }
  ];
  
  // Attack radar data
  const attackRadarData = [
    { subject: "Initial Access", A: 65, B: 85 },
    { subject: "Execution", A: 70, B: 60 },
    { subject: "Persistence", A: 45, B: 75 },
    { subject: "Privilege Esc", A: 55, B: 90 },
    { subject: "Defense Evasion", A: 40, B: 65 },
    { subject: "Credential Access", A: 75, B: 55 },
    { subject: "Discovery", A: 60, B: 70 },
    { subject: "Lateral Movement", A: 50, B: 80 },
    { subject: "Collection", A: 65, B: 60 },
    { subject: "Exfiltration", A: 70, B: 40 }
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
            onClick={() => navigate("/data-discovery")}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span> Discovery
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/correlated-intelligence")}
            className="flex items-center gap-1"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Correlated</span> Intelligence
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligence Reporting</h1>
      </div>

      <Alert className="mb-6 bg-indigo-50 border-indigo-200">
        <BarChart3 className="h-4 w-4 text-indigo-600" />
        <AlertTitle className="text-indigo-800">Interactive Intelligence Report</AlertTitle>
        <AlertDescription className="text-indigo-700">
          This executive view presents key intelligence insights derived from comprehensive OSINT data analysis,
          highlighting risk factors, recommended actions, and technical findings for both executive and technical stakeholders.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="executive" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="executive" className="flex items-center gap-1">
            <ClipboardCheck className="h-4 w-4" />
            Executive Summary
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Technical Dashboard
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Downloadable Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="executive" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Executive Intelligence Summary
                </CardTitle>
                <CardDescription>
                  Key findings and metrics from SC Lowy intelligence analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Overall Security Posture</h3>
                    <p className="text-sm text-muted-foreground">Based on comprehensive analysis across multiple intelligence vectors</p>
                  </div>
                  <Badge 
                    variant={dataCompletenessScore >= 70 ? "success" : dataCompletenessScore >= 50 ? "warning" : "destructive"}
                    className="text-sm px-3 py-1"
                  >
                    {securityAssessment.label.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium mb-1">Security Posture</p>
                    <div className="flex items-center">
                      <Progress value={dataCompletenessScore} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-medium">{dataCompletenessScore}%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Breach Probability</p>
                    <div className="flex items-center">
                      <Progress value={35} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">GDPR Compliance Risk</p>
                    <div className="flex items-center">
                      <Progress value={45} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Attack Surface Growth</p>
                    <div className="flex items-center">
                      <Progress value={68} className="h-2 flex-1 mr-2" />
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Executive Action Items</h3>
                  
                  <div className="flex items-start gap-2 p-2 border-l-4 border-red-500 bg-red-50">
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Critical: Address exploitable vulnerabilities</p>
                      <p className="text-sm text-gray-600">
                        {data.qualysScan.severity_1} critical and {data.qualysScan.severity_2} high vulnerabilities
                        require immediate remediation due to active exploitation risk.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 border-l-4 border-amber-500 bg-amber-50">
                    <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">High: Credential exposure remediation</p>
                      <p className="text-sm text-gray-600">
                        {data.dataLeaksCompliance.length} leaked credentials found on the dark web.
                        Force password resets and enable MFA for all affected accounts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 p-2 border-l-4 border-green-500 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Recommended: Improve public data hygiene</p>
                      <p className="text-sm text-gray-600">
                        Implement better document sanitization procedures - {data.fileSearch.PDF.length + data.fileSearch.DOC.length + data.fileSearch.XLS.length} 
                        files with potentially sensitive metadata found.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Risk Overview
                </CardTitle>
                <CardDescription>
                  Security posture visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={executiveSummaryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        {executiveSummaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-2xl font-bold"
                        fill="#333"
                      >
                        {dataCompletenessScore}%
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <p className="font-medium mb-3">Security Snapshot</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Critical vulnerabilities:</span>
                      <Badge variant="destructive">{data.qualysScan.severity_1}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Exposed credentials:</span>
                      <Badge variant="destructive">{data.dataLeaksCompliance.length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Open ports:</span>
                      <Badge variant="warning">{data.openPorts.length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Sensitive files exposed:</span>
                      <Badge variant="warning">{data.fileSearch.PDF.length + data.fileSearch.DOC.length + data.fileSearch.XLS.length}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Business Impact Analysis
                </CardTitle>
                <CardDescription>
                  Potential business impacts of identified security issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Impact Area</TableHead>
                      <TableHead>Likelihood</TableHead>
                      <TableHead>Severity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Operational Disruption</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Regulatory Fines</TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Reputational Damage</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Data Breach Costs</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Client Confidence Loss</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Strategic Recommendations
                </CardTitle>
                <CardDescription>
                  Top strategic security initiatives to improve posture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">1</div>
                    <div>
                      <p className="font-medium">Implement robust vulnerability management</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Deploy continuous vulnerability scanning and implement a risk-based patching program with clear SLAs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">2</div>
                    <div>
                      <p className="font-medium">Enhance identity security</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Deploy MFA across all systems, implement least privilege access controls, and conduct regular access reviews.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">3</div>
                    <div>
                      <p className="font-medium">Improve security awareness</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Implement targeted security awareness training focusing on social engineering and phishing prevention.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
                    <div>
                      <p className="font-medium">Enhance data protection</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Implement DLP controls, encrypt sensitive data, and improve document sanitization procedures.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">5</div>
                    <div>
                      <p className="font-medium">Network security hardening</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Close unnecessary ports, implement network segmentation, and deploy advanced threat detection.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Vulnerability Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of vulnerabilities by severity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vulnerabilityData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" name="Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Attack Surface Analysis
                </CardTitle>
                <CardDescription>
                  Distribution of attack surface components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attackSurfaceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attackSurfaceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                MITRE ATT&CK Chain Visualization
              </CardTitle>
              <CardDescription>
                Current attack techniques vs industry average
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={attackRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Organization" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Industry Average" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Critical & High Vulnerabilities
                </CardTitle>
                <CardDescription>
                  Top vulnerability details for remediation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CVE</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Exploitability</TableHead>
                      <TableHead>Affected Assets</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CVE-2021-44228</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Critical</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">Actively Exploited</Badge>
                      </TableCell>
                      <TableCell>12 systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CVE-2022-22965</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Critical</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">Actively Exploited</Badge>
                      </TableCell>
                      <TableCell>8 systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CVE-2021-34473</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Critical</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning">PoC Available</Badge>
                      </TableCell>
                      <TableCell>3 systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CVE-2022-1388</TableCell>
                      <TableCell>
                        <Badge variant="warning">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="warning">PoC Available</Badge>
                      </TableCell>
                      <TableCell>5 systems</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CVE-2022-26809</TableCell>
                      <TableCell>
                        <Badge variant="warning">High</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="success">Theoretical</Badge>
                      </TableCell>
                      <TableCell>15 systems</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  Asset Risk Heatmap
                </CardTitle>
                <CardDescription>
                  Risk mapping across key assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Key Issues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Trading Platform</TableCell>
                      <TableCell>Web App</TableCell>
                      <TableCell>
                        <Badge variant="destructive">Critical (92)</Badge>
                      </TableCell>
                      <TableCell>Vulnerabilities, Exposed APIs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Customer Portal</TableCell>
                      <TableCell>Web App</TableCell>
                      <TableCell>
                        <Badge variant="destructive">High (78)</Badge>
                      </TableCell>
                      <TableCell>Authentication issues, Old framework</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Document Repository</TableCell>
                      <TableCell>Storage</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium (65)</Badge>
                      </TableCell>
                      <TableCell>Access controls, Data leakage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Corporate Email</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>
                        <Badge variant="warning">Medium (58)</Badge>
                      </TableCell>
                      <TableCell>Phishing susceptibility, Configuration</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Employee Portal</TableCell>
                      <TableCell>Web App</TableCell>
                      <TableCell>
                        <Badge variant="success">Low (35)</Badge>
                      </TableCell>
                      <TableCell>Minor vulnerabilities</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-white shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Downloadable Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Export detailed intelligence reports for various stakeholders and purposes
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-blue-500" />
                  Executive Reports
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Executive Dashboard PDF</p>
                      <p className="text-xs text-gray-500">High-level overview with key metrics and recommendations</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Board Presentation Slides</p>
                      <p className="text-xs text-gray-500">PowerPoint deck for board-level security briefing</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      PPTX
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Quarterly Risk Report</p>
                      <p className="text-xs text-gray-500">Comprehensive risk analysis with YoY comparisons</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-indigo-500" />
                  Technical Reports
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Vulnerability Detail Report</p>
                      <p className="text-xs text-gray-500">Full technical details of discovered vulnerabilities</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      XLS
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">MITRE ATT&CK Mapping</p>
                      <p className="text-xs text-gray-500">Attack vectors mapped to MITRE framework</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      JSON
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">IOC Intelligence Export</p>
                      <p className="text-xs text-gray-500">Indicators of compromise in STIX format</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      STIX
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <Database className="h-4 w-4 text-purple-500" />
                Complete Reports
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ReportGenerator data={data} companyName="SC Lowy" />
                
                <Button 
                  variant="default" 
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Schedule Regular Reports
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Reporting Schedule</h3>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Scheduled</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Executive Dashboard</TableCell>
                  <TableCell>Weekly</TableCell>
                  <TableCell>{formatDate(new Date(Date.now() + 86400000 * 3))}</TableCell>
                  <TableCell>Executive Team</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Technical Vulnerability Report</TableCell>
                  <TableCell>Daily</TableCell>
                  <TableCell>{formatDate(new Date(Date.now() + 86400000))}</TableCell>
                  <TableCell>Security Team</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Board Security Summary</TableCell>
                  <TableCell>Monthly</TableCell>
                  <TableCell>{formatDate(new Date(Date.now() + 86400000 * 15))}</TableCell>
                  <TableCell>Board Members</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Comprehensive Security Assessment</TableCell>
                  <TableCell>Quarterly</TableCell>
                  <TableCell>{formatDate(new Date(Date.now() + 86400000 * 45))}</TableCell>
                  <TableCell>All Stakeholders</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center mb-2">
          <BarChart3 className="h-4 w-4 mr-1 text-indigo-600" />
          <span>Intelligence Reporting Dashboard</span>
        </div>
        <p>Generated on {formatDate(scanDate)}. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default IntelligenceReporting;
