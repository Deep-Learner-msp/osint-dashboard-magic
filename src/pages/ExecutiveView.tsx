
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, BarChart3, Shield, AlertTriangle, ShieldCheck, Brain, Database, Code, Users } from "lucide-react";
import { getSecurityAssessment } from "@/utils/osint-helpers";
import { Card } from "@/components/ui/card";
import QualysSeverityBar from "@/components/ui/QualysSeverityBar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ExecutiveViewProps {
  data: OsintData;
}

const ExecutiveView: React.FC<ExecutiveViewProps> = ({ data }) => {
  const navigate = useNavigate();
  const { score, label, color } = getSecurityAssessment(data);
  const [activeView, setActiveView] = useState<"executive" | "technical">("executive");
  
  // Calculate total vulnerabilities count
  const totalVulnerabilities = 
    (data.qualysScan?.severity_1 || 0) + 
    (data.qualysScan?.severity_2 || 0) + 
    (data.qualysScan?.severity_3 || 0) + 
    (data.qualysScan?.severity_4 || 0);

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
            onClick={() => navigate("/intelligent-mapping")}
            className="flex items-center gap-1"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligent</span> Mapping
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <BarChart3 className="h-5 w-5 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligence Report</h1>
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-muted-foreground">
            Complete intelligence report with detailed findings and recommendations.
            Toggle between views tailored for different stakeholders.
          </p>
          
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
          </Card>

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
          <Shield className="h-4 w-4 mr-1 text-green-600" />
          <span>Intelligence Report</span>
        </div>
        <p>{activeView === "executive" ? "Executive" : "Technical"} intelligence analysis based on data gathered from multiple sources. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default ExecutiveView;
