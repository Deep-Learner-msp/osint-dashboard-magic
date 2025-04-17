
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { OsintData } from "@/types/data";
import { 
  Code, 
  Search, 
  AlertTriangle, 
  FileWarning, 
  Check, 
  PieChart, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Calendar,
  Timer
} from "lucide-react";
import { Badge } from "./ui/badge";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface WebsiteAnalyticsPanelProps {
  data: OsintData;
}

const WebsiteAnalyticsPanel: React.FC<WebsiteAnalyticsPanelProps> = ({ data }) => {
  // Risk data for pie chart
  const riskData = [
    { name: "Critical", value: 25, color: "#ef4444" },
    { name: "High", value: 30, color: "#f97316" },
    { name: "Medium", value: 35, color: "#facc15" },
    { name: "Low", value: 10, color: "#22c55e" }
  ];

  // CVE data
  const cveData = [
    { id: "CVE-2022-1329", component: "WordPress", severity: "High", description: "Authentication bypass vulnerability in core API" },
    { id: "CVE-2021-44224", component: "Apache", severity: "Medium", description: "Request smuggling in mod_proxy" }
  ];

  return (
    <GlassPanel className="mb-6" animationDelay={500}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="bg-blue-600 p-2.5 rounded-lg mr-3 text-white shadow-md">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Threat Exposure Report</h2>
            <p className="text-sm text-muted-foreground">Digital footprint analysis & vulnerability assessment</p>
          </div>
        </div>
        
        <Tabs defaultValue="executive" className="w-full md:w-auto mt-2 md:mt-0">
          <TabsList className="grid w-full md:w-[300px] grid-cols-2">
            <TabsTrigger value="executive" className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Executive View
            </TabsTrigger>
            <TabsTrigger value="technical" className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              Technical View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Tabs defaultValue="assessment" className="mb-6">
        <TabsList className="bg-background/90 backdrop-blur-sm">
          <TabsTrigger value="assessment" className="text-xs">Risk Assessment</TabsTrigger>
          <TabsTrigger value="analytics" className="text-xs">Analytics Tracking</TabsTrigger>
          <TabsTrigger value="domains" className="text-xs">Domain Intelligence</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assessment" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Security Score Card */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Security Posture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="rounded-full bg-blue-600 text-white h-16 w-16 flex items-center justify-center text-2xl font-bold mr-3 shadow-md">
                    7.8
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Critical Risk</div>
                    <div className="flex items-center">
                      <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600 font-medium">3% improvement since last scan</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Overall Risk</span>
                      <div className="flex items-center">
                        <span className="font-medium">78%</span>
                        <TrendingDown className="h-3 w-3 text-green-500 ml-1" />
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Vulnerability Exposure</span>
                      <div className="flex items-center">
                        <span className="font-medium">65%</span>
                        <TrendingDown className="h-3 w-3 text-green-500 ml-1" />
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Data Breach Risk</span>
                      <div className="flex items-center">
                        <span className="font-medium">82%</span>
                        <TrendingUp className="h-3 w-3 text-red-500 ml-1" />
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Risk Breakdown Chart */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-600" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Risk Level']} 
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px -1px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Action Plan */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Action Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-red-500 pl-3 py-1 bg-red-50 rounded-r-md">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-800">
                    <Timer className="h-4 w-4" />
                    Immediate (0-7 days)
                  </div>
                  <ul className="text-xs text-red-700 mt-1 pl-5 list-disc">
                    <li>Patch WordPress vulnerabilities (CVE-2022-1329)</li>
                    <li>Force reset of compromised credentials</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-3 py-1 bg-amber-50 rounded-r-md">
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                    <Timer className="h-4 w-4" />
                    Short-term (30 days)
                  </div>
                  <ul className="text-xs text-amber-700 mt-1 pl-5 list-disc">
                    <li>Implement multi-factor authentication</li>
                    <li>Review open ports and firewall configurations</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-3 py-1 bg-blue-50 rounded-r-md">
                  <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                    <Timer className="h-4 w-4" />
                    Medium-term (90 days)
                  </div>
                  <ul className="text-xs text-blue-700 mt-1 pl-5 list-disc">
                    <li>Deploy web application firewall (WAF)</li>
                    <li>Implement security awareness training</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Domain info */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-md bg-white/90">
                <CardHeader className="bg-gradient-to-r from-blue-50 pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Code className="h-5 w-5 mr-2 text-blue-600" />
                    Digital Analytics Profile
                  </CardTitle>
                  <CardDescription>
                    Analysis of tracking technologies and digital footprint
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Code className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">sclowy.com</h3>
                        <p className="text-xs text-muted-foreground">Primary web domain</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                      <ExternalLink className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-slate-100">WordPress 6.0</Badge>
                          <Badge variant="secondary" className="bg-slate-100">PHP 7.4</Badge>
                          <Badge variant="secondary" className="bg-slate-100">Apache 2.4</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Analytics IDs</h4>
                        <ul className="text-sm space-y-1.5">
                          <li className="flex items-center text-slate-700">
                            <span className="inline-block w-32">Google Analytics:</span>
                            <Badge variant="outline" className="font-mono text-xs">UA-12345678</Badge>
                          </li>
                          <li className="flex items-center text-slate-700">
                            <span className="inline-block w-32">Facebook Pixel:</span>
                            <Badge variant="outline" className="font-mono text-xs">FB-987654321</Badge>
                          </li>
                          <li className="flex items-center text-slate-700">
                            <span className="inline-block w-32">Hotjar:</span>
                            <Badge variant="outline" className="font-mono text-xs">HJ-000111222</Badge>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                          Suspicious Linked Domains
                        </h4>
                        <div className="bg-amber-50 rounded-md p-3 border border-amber-100">
                          <ul className="text-sm space-y-1.5 text-amber-800">
                            <li className="flex items-center">
                              <ExternalLink className="h-3 w-3 mr-1.5" />
                              malicious-typo-example.net
                            </li>
                            <li className="flex items-center">
                              <ExternalLink className="h-3 w-3 mr-1.5" />
                              phishing-mirror-example.org
                            </li>
                          </ul>
                          <p className="text-xs text-amber-700 mt-2 italic">
                            These domains share the same analytics ID
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1">Embedded Metadata</h4>
                        <div className="flex flex-wrap gap-2">
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-md">
                            <span className="text-slate-500">userRole:</span> internal-dev
                          </div>
                          <div className="text-xs bg-slate-100 px-2 py-1 rounded-md">
                            <span className="text-slate-500">experimentGroup:</span> betaUI
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right column - Risk assessment */}
            <div>
              <Card className="overflow-hidden border-0 shadow-md bg-white/90 h-full">
                <CardHeader className="bg-gradient-to-r from-purple-50 pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-purple-600" />
                    Key Findings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="mb-4">
                    <Badge variant="destructive" className="mb-2 text-sm">Risk Score: 7.8 / 10</Badge>
                    <p className="text-sm text-slate-600">
                      Analysis revealed significant security concerns requiring immediate action.
                    </p>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-slate-700 mb-1 font-medium">Risk Score Trend</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-xs text-green-500 ml-2 whitespace-nowrap flex items-center">
                        <TrendingDown className="h-3 w-3 mr-1" />
                        3% last week
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded-md border border-red-100 mt-5">
                    <p className="font-medium flex items-center text-sm text-red-800 mb-2">
                      <AlertTriangle className="h-4 w-4 mr-1.5 text-red-600" /> Critical Concerns
                    </p>
                    <ul className="text-xs text-red-700 list-disc pl-5 space-y-1">
                      <li>Authentication bypass vulnerability detected</li>
                      <li>Suspicious domains linked to main website</li>
                      <li>Outdated Apache version with known CVEs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-md border border-green-100 mt-4">
                    <p className="font-medium flex items-center text-sm text-green-800 mb-1">
                      <Check className="h-4 w-4 mr-1.5 text-green-600" /> Recommendations
                    </p>
                    <ul className="text-xs text-green-700 list-disc pl-5 space-y-1">
                      <li>Patch outdated WordPress components immediately</li>
                      <li>Update Apache to latest version</li>
                      <li>Investigate suspicious linked domains</li>
                      <li>Implement WAF for additional protection</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="domains" className="pt-4">
          <Card className="overflow-hidden border-0 shadow-md bg-white/90">
            <CardHeader className="bg-gradient-to-r from-blue-50 pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileWarning className="h-5 w-5 mr-2 text-red-600" />
                Potential Vulnerabilities
              </CardTitle>
              <CardDescription>
                CVEs and security issues identified in domain analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="bg-white rounded-md border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">CVE ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Component</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Severity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {cveData.map((cve, index) => (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="px-4 py-2 text-xs font-mono text-slate-700">{cve.id}</td>
                          <td className="px-4 py-2 text-xs text-slate-700">{cve.component}</td>
                          <td className="px-4 py-2 text-xs">
                            <Badge 
                              className={
                                cve.severity === 'Critical' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                cve.severity === 'High' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' :
                                cve.severity === 'Medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                                'bg-green-100 text-green-800 hover:bg-green-200'
                              }
                            >
                              {cve.severity}
                            </Badge>
                          </td>
                          <td className="px-4 py-2 text-xs text-slate-700">{cve.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-5 bg-purple-50 p-4 rounded-md border border-purple-100">
                <h4 className="text-sm font-medium text-purple-800 mb-2">Vulnerability Impact Assessment</h4>
                <p className="text-xs text-purple-700">
                  The identified vulnerabilities affect multiple components of your technology stack and could potentially allow 
                  unauthorized access to sensitive systems. The impact score considers both the severity of the vulnerabilities 
                  and their prevalence across your infrastructure.
                </p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-800">Overall Impact</span>
                    <span className="font-medium text-purple-800">High (8.2/10)</span>
                  </div>
                  <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </GlassPanel>
  );
};

export default WebsiteAnalyticsPanel;
