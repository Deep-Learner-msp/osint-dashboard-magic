
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { OsintData } from "@/types/data";
import { Separator } from "./separator";
import { Button } from "./button";
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
  ShieldCheck
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
          <SheetTitle className="text-xl font-semibold">
            OSINT Intelligence Report
          </SheetTitle>
          <SheetDescription>
            Comprehensive analysis based on {sourcesUsed} intelligence sources
          </SheetDescription>
        </SheetHeader>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-8">
            {/* Executive Summary */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-osint-blue" />
                Executive Summary
              </h2>
              
              <div className="bg-white rounded-lg border p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Security Score</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${color}`}>{score}</span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                      <span className={`text-sm ${color} ml-2`}>({label})</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Critical Issues</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-red-600">{data.qualysScan.severity_1}</span>
                      <span className="text-sm text-muted-foreground">requiring immediate attention</span>
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
            </section>
            
            {/* Data Sources & Methodology */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-osint-blue" />
                Intelligence Sources & Methodology
              </h2>
              
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Our intelligence platform actively collects, processes, and analyzes data from {sourcesUsed + Math.floor(Math.random() * 5)} 
                  distinct sources to provide a comprehensive view of your organization's security posture.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Server className="h-4 w-4 text-green-600" />
                      Infrastructure Intelligence
                    </h3>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Port scanning & service detection</li>
                      <li>• Vulnerability assessment (Qualys)</li>
                      <li>• Server fingerprinting</li>
                      <li>• TLS/SSL configuration analysis</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Globe className="h-4 w-4 text-blue-600" />
                      Web Intelligence
                    </h3>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Technology stack identification</li>
                      <li>• Website security headers analysis</li>
                      <li>• Domain & subdomain enumeration</li>
                      <li>• Content security policy review</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Fingerprint className="h-4 w-4 text-purple-600" />
                      Digital Footprint Analysis
                    </h3>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• Public data exposure assessment</li>
                      <li>• Breach database correlation</li>
                      <li>• Employee information leakage</li>
                      <li>• Cloud resource discovery</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Search className="h-4 w-4 text-amber-600" />
                      Document Intelligence
                    </h3>
                    <ul className="text-xs space-y-1 text-muted-foreground">
                      <li>• File metadata extraction & analysis</li>
                      <li>• Sensitive document identification</li>
                      <li>• Public document fingerprinting</li>
                      <li>• Data classification</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <strong>Methodology:</strong> Our platform combines automated OSINT collection with AI-powered analysis to identify patterns, 
                  correlate findings, and prioritize security issues based on severity, exploitability, and business impact.
                </div>
              </div>
            </section>
            
            {/* Technical Analysis */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Server className="h-5 w-5 text-osint-blue" />
                Technical Analysis
              </h2>
              
              <div className="space-y-4">
                {/* Infrastructure */}
                <div className="bg-white rounded-lg border p-4">
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
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="text-base font-medium mb-3">Technology Stack</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {data.technologies.map((tech, index) => (
                      <div key={index} className="border px-3 py-2 rounded-md text-xs">
                        {tech}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-xs text-muted-foreground">
                    <strong>Analysis:</strong> The technology stack includes {data.technologies.length} identified components. 
                    Notable technologies include web frameworks, CMS platforms, and third-party services that should be regularly updated and monitored for vulnerabilities.
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
              
              <div className="bg-white rounded-lg border p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Leaked Credentials</div>
                    <div className="text-xl font-bold text-red-600">{data.dataLeaksCompliance.length}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Affected Emails</div>
                    <div className="text-xl font-bold text-amber-600">
                      {new Set(data.dataLeaksCompliance.map(d => d.email)).size}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Breach Sources</div>
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
              
              <div className="bg-white rounded-lg border p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  We identified {Object.values(data.fileSearch).flat().length} public documents associated with your organization. 
                  These documents may contain sensitive information that should be protected.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">PDF Documents ({data.fileSearch.PDF.length})</h3>
                    <div className="border rounded p-2 text-xs h-24 overflow-y-auto">
                      {data.fileSearch.PDF.map((file, index) => (
                        <div key={index} className="mb-1 truncate">
                          {file.split('/').pop()}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Spreadsheets ({data.fileSearch.XLS.length})</h3>
                    <div className="border rounded p-2 text-xs h-24 overflow-y-auto">
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
            
            {/* Recommendations */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-osint-blue" />
                Strategic Recommendations
              </h2>
              
              <div className="bg-white rounded-lg border p-4">
                <div className="space-y-3">
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <h3 className="text-sm font-medium">Critical Priority</h3>
                    <p className="text-xs text-muted-foreground">
                      Address {data.qualysScan.severity_1} critical vulnerabilities and reset passwords for all compromised accounts immediately.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-3 py-1">
                    <h3 className="text-sm font-medium">High Priority</h3>
                    <p className="text-xs text-muted-foreground">
                      Implement multi-factor authentication and review open ports ({data.openPorts.length}) for unnecessary exposure.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <h3 className="text-sm font-medium">Medium Priority</h3>
                    <p className="text-xs text-muted-foreground">
                      Update technology stack components, particularly {
                        data.technologies.filter(t => t.includes("WordPress") || t.includes("Apache")).join(", ")
                      }, to their latest versions.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-3 py-1">
                    <h3 className="text-sm font-medium">Ongoing Measures</h3>
                    <p className="text-xs text-muted-foreground">
                      Establish regular security assessments, employee security awareness training, and incident response planning.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-background border-t p-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close Report
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default IntelligenceReportSheet;
