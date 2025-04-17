
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { OsintData } from "@/types/data";
import { Code, Search, AlertTriangle, FileWarning, Check, PieChart, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "./ui/card";

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
      <div className="flex items-center mb-4">
        <div className="bg-blue-50 p-2.5 rounded-full mr-3">
          <Search className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Website Analytics & Tracking Insight</h2>
          <p className="text-sm text-muted-foreground">Analyzing digital footprint and vulnerability exposure</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Domain info */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-0 shadow-md bg-white/90">
            <CardContent className="p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
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
              
              <div className="border-t pt-4 mt-2">
                <h4 className="text-sm font-medium flex items-center gap-1.5 mb-2">
                  <FileWarning className="h-3.5 w-3.5 text-red-500" />
                  Potential Vulnerabilities
                </h4>
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
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Risk assessment */}
        <div>
          <Card className="overflow-hidden border-0 shadow-md bg-white/90 h-full">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-slate-700" />
                  Risk Assessment
                </h3>
                <Badge variant="destructive" className="text-sm">7.8 / 10</Badge>
              </div>
              
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
                    >
                      {riskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Risk Level']} 
                      contentStyle={{ 
                        borderRadius: '6px', 
                        border: 'none', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
              
              <div className="mt-2">
                <p className="text-sm text-slate-700 mb-1">Risk Score Trend</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">-3% last week</span>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-md border border-green-100 mt-5">
                <p className="font-medium flex items-center text-sm text-green-800 mb-1">
                  <Check className="h-4 w-4 mr-1.5 text-green-600" /> Recommendation
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
    </GlassPanel>
  );
};

export default WebsiteAnalyticsPanel;
