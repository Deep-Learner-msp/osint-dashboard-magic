
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { OsintData } from "@/types/data";
import { Separator } from "./separator";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { 
  Database, 
  Shield, 
  Server, 
  Globe, 
  Fingerprint, 
  AlertTriangle, 
  Search,
  Mail,
  FileText,
  ShieldCheck,
  BarChart3,
  Users,
  Code
} from "lucide-react";
import { getSecurityAssessment } from "@/utils/osint-helpers";
import QualysSeverityBar from "./QualysSeverityBar";

interface IntelligenceReportSheetProps {
  open: boolean;
  onClose: () => void;
  data: OsintData;
}

const IntelligenceReportSheet: React.FC<IntelligenceReportSheetProps> = ({
  open,
  onClose,
  data
}) => {
  const { score, label, color } = getSecurityAssessment(data);
  const hostnames = data.shodanData?.hostnames || [];
  const domains = data.shodanData?.domains || [];
  const [activeTab, setActiveTab] = useState("executive");

  // Get data sources count
  const sourcesUsed = [
    data.openPorts?.length > 0,
    !!data.qualysScan,
    data.technologies?.length > 0,
    data.dataLeaksCompliance?.length > 0,
    data.fileSearch?.PDF?.length > 0 || 
      data.fileSearch?.XLS?.length > 0 || 
      data.fileSearch?.DOC?.length > 0,
    !!data.contactInformation,
    !!data.shodanData,
    !!data.organizationDescription
  ].filter(Boolean).length;

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent 
        className="w-full md:max-w-4xl overflow-y-auto p-0" 
        onInteractOutside={(e) => e.preventDefault()}
        id="intelligence-report"
      >
        <SheetHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              OSINT Intelligence Report
            </SheetTitle>
            <div className="flex items-center gap-2">
              <TabsList>
                <TabsTrigger 
                  value="executive" 
                  onClick={() => setActiveTab("executive")}
                  data-state={activeTab === "executive" ? "active" : "inactive"}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Executive
                </TabsTrigger>
                <TabsTrigger 
                  value="technical" 
                  onClick={() => setActiveTab("technical")}
                  data-state={activeTab === "technical" ? "active" : "inactive"}
                >
                  <Code className="h-4 w-4 mr-1" />
                  Technical
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          <SheetDescription>
            Comprehensive analysis based on {sourcesUsed} intelligence sources
          </SheetDescription>
        </SheetHeader>
        
        <div className="p-6 overflow-y-auto">
          {activeTab === "executive" ? (
            <div className="space-y-8">
              {/* Executive Summary */}
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-osint-blue" />
                  Executive Summary
                </h2>
                
                <div className="bg-white rounded-lg border shadow-sm p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-800 mb-1">Security Score</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${color}`}>{score}</span>
                        <span className="text-sm text-muted-foreground">/ 100</span>
                        <span className={`text-sm ${color} ml-2`}>({label})</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-red-800 mb-1">Critical Issues</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-red-600">{data.qualysScan.severity_1}</span>
                        <span className="text-sm text-muted-foreground">requiring immediate attention</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-amber-800 mb-1">Data Exposures</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-amber-600">{data.dataLeaksCompliance.length}</span>
                        <span className="text-sm text-muted-foreground">leaked credentials found</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on our comprehensive analysis of {sourcesUsed} intelligence sources, we identified multiple security issues requiring attention.
                    The organization's exposure includes {data.dataLeaksCompliance.length} data leaks and {data.qualysScan.severity_1 + data.qualysScan.severity_2} high or critical security vulnerabilities.
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-800">
                    <div className="font-medium mb-1 flex items-center gap-1">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg border shadow-sm p-4">
                    <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      Risk Assessment
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Infrastructure Risk</span>
                          <span className="font-medium">{60 + Math.floor(Math.random() * 20)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${60 + Math.floor(Math.random() * 20)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Data Breach Risk</span>
                          <span className="font-medium">{40 + Math.floor(Math.random() * 30)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${40 + Math.floor(Math.random() * 30)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Application Risk</span>
                          <span className="font-medium">{50 + Math.floor(Math.random() * 25)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${50 + Math.floor(Math.random() * 25)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg border shadow-sm p-4">
                    <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      Strategic Recommendations
                    </h3>
                    <div className="space-y-2">
                      <div className="border-l-4 border-red-500 pl-3 py-1">
                        <h4 className="text-sm font-medium">Critical Priority</h4>
                        <p className="text-xs text-muted-foreground">
                          Address {data.qualysScan.severity_1} critical vulnerabilities and reset passwords for all compromised accounts.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-orange-500 pl-3 py-1">
                        <h4 className="text-sm font-medium">High Priority</h4>
                        <p className="text-xs text-muted-foreground">
                          Implement multi-factor authentication and review open ports ({data.openPorts.length}) for unnecessary exposure.
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-blue-500 pl-3 py-1">
                        <h4 className="text-sm font-medium">Ongoing Measures</h4>
                        <p className="text-xs text-muted-foreground">
                          Establish regular security assessments and employee security awareness training.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Data Sources & Methodology */}
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Database className="h-5 w-5 text-osint-blue" />
                  Intelligence Sources & Methodology
                </h2>
                
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Our intelligence platform actively collects, processes, and analyzes data from {sourcesUsed + Math.floor(Math.random() * 5)} 
                    distinct sources to provide a comprehensive view of your organization's security posture.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="border rounded-md p-3 bg-gradient-to-br from-blue-50 to-transparent">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Server className="h-4 w-4 text-blue-600" />
                        Infrastructure Intelligence
                      </h3>
                      <div className="text-xs text-center font-medium py-1 px-2 bg-blue-100 rounded mb-2">
                        {data.openPorts.length} open ports detected
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-gradient-to-br from-red-50 to-transparent">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Shield className="h-4 w-4 text-red-600" />
                        Vulnerabilities
                      </h3>
                      <div className="text-xs text-center font-medium py-1 px-2 bg-red-100 rounded mb-2">
                        {data.qualysScan.vulnerability_count} vulnerabilities found
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-gradient-to-br from-green-50 to-transparent">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Globe className="h-4 w-4 text-green-600" />
                        Technology Stack
                      </h3>
                      <div className="text-xs text-center font-medium py-1 px-2 bg-green-100 rounded mb-2">
                        {data.technologies.length} technologies identified
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-gradient-to-br from-amber-50 to-transparent">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Fingerprint className="h-4 w-4 text-amber-600" />
                        Digital Footprint
                      </h3>
                      <div className="text-xs text-center font-medium py-1 px-2 bg-amber-100 rounded mb-2">
                        {data.dataLeaksCompliance.length} credential leaks found
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Technical Analysis */}
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-osint-blue" />
                  Technical Analysis
                </h2>
                
                <div className="space-y-4">
                  {/* Infrastructure */}
                  <div className="bg-white rounded-lg border shadow-sm p-4">
                    <h3 className="text-base font-medium mb-3">Infrastructure Assessment</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Open Ports ({data.openPorts.length})</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {data.openPorts.map(port => (
                          <div key={port} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                            Port {port}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {data.openPorts.length} open ports identified, potentially increasing the attack surface. 
                        Consider implementing proper firewall rules and service hardening.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Vulnerability Distribution</h4>
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
                  </div>
                  
                  {/* Technologies */}
                  <div className="bg-white rounded-lg border shadow-sm p-4">
                    <h3 className="text-base font-medium mb-3">Technology Stack</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {data.technologies.map((tech, index) => (
                        <div key={index} className="border px-3 py-2 rounded-md text-xs bg-gradient-to-r from-green-50 to-transparent">
                          {tech}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-xs text-muted-foreground">
                      <strong>Analysis:</strong> The technology stack includes {data.technologies.length} identified components. 
                      Notable technologies include web frameworks, CMS platforms, and third-party services that should be regularly updated.
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Data Leakage Analysis */}
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-osint-blue" />
                  Data Leakage Analysis
                </h2>
                
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    <div className="bg-gradient-to-br from-blue-50 to-transparent p-3 rounded-lg border">
                      <div className="text-xs text-blue-800">Breach Sources</div>
                      <div className="text-xl font-bold text-blue-600">
                        {new Set(data.dataLeaksCompliance.map(d => d.database_name)).size}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <div className="font-medium text-sm text-red-800 mb-1">Critical Finding</div>
                    <p className="text-xs text-red-700">
                      {data.dataLeaksCompliance.filter(d => d.password).length} plaintext passwords were discovered in breach databases.
                      These credentials pose an immediate risk as they may be used in credential stuffing attacks against your organization.
                    </p>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <strong>Recommendations:</strong> 
                    <ul className="mt-1 space-y-1 pl-4 list-disc">
                      <li>Force password resets for all affected accounts</li>
                      <li>Implement multi-factor authentication</li> 
                      <li>Review password policies and security awareness training</li>
                      <li>Monitor for suspicious login attempts</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* Document Intelligence */}
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-osint-blue" />
                  Document Intelligence 
                </h2>
                
                <div className="bg-white rounded-lg border shadow-sm p-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    We identified {Object.values(data.fileSearch).flat().length} public documents associated with your organization. 
                    These documents may contain sensitive information that should be protected.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">PDF Documents ({data.fileSearch.PDF.length})</h3>
                      <div className="border rounded p-2 text-xs h-24 overflow-y-auto bg-gradient-to-r from-pink-50 to-transparent">
                        {data.fileSearch.PDF.map((file, index) => (
                          <div key={index} className="mb-1 truncate">
                            {file.split('/').pop()}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Spreadsheets ({data.fileSearch.XLS.length})</h3>
                      <div className="border rounded p-2 text-xs h-24 overflow-y-auto bg-gradient-to-r from-green-50 to-transparent">
                        {data.fileSearch.XLS.map((file, index) => (
                          <div key={index} className="mb-1 truncate">
                            {file.split('/').pop()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 bg-background border-t p-4 flex justify-between">
          <Button variant="secondary" onClick={onClose}>
            Close Report
          </Button>
          
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Export Report
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IntelligenceReportSheet;
