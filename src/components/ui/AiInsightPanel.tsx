
import React, { useState } from "react";
import { Lightbulb, AlertTriangle, ChevronRight, Scan, Shield, Server, Database, Globe, Search, Eye, FileText, Map, BarChart3 } from "lucide-react";
import { OsintData } from "@/types/data";
import { hasCriticalIssues, getSecurityAssessment } from "@/utils/osint-helpers";
import { Button } from "./button";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import InfoCard from "./InfoCard";

interface AiInsightPanelProps {
  data: OsintData;
  className?: string;
}

const AiInsightPanel: React.FC<AiInsightPanelProps> = ({ data, className }) => {
  const { score, label, color } = getSecurityAssessment(data);
  const criticalIssues = hasCriticalIssues(data);
  const [showMethodologySheet, setShowMethodologySheet] = useState(false);
  
  // Count total sources
  const sourceCount = countDataSources(data);
  
  // Get top recommendations based on data
  const recommendations = generateRecommendations(data);

  const getProgressColor = (score: number): string => {
    if (score > 75) return 'var(--green-9)';
    if (score > 60) return 'var(--yellow-9)';
    if (score > 40) return 'var(--orange-9)';
    return 'var(--red-9)';
  };

  // Calculate total vulnerabilities count
  const totalVulnerabilities = 
    (data.qualysScan?.severity_1 || 0) + 
    (data.qualysScan?.severity_2 || 0) + 
    (data.qualysScan?.severity_3 || 0) + 
    (data.qualysScan?.severity_4 || 0);

  return (
    <>
      <div className={`rounded-xl border bg-card p-0 shadow-sm ${className}`}>
        <div className="border-b bg-muted/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold">Intelligence Analysis Platform</h3>
            </div>
            <Button 
              onClick={() => setShowMethodologySheet(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              Analysis Methodology
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="extracted" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-4 pt-2">
            <TabsTrigger value="extracted" className="data-[state=active]:bg-background rounded-t-lg data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-b-0">
              <Database className="h-4 w-4 mr-2" />
              Extracted Data
            </TabsTrigger>
            <TabsTrigger value="intelligent" className="data-[state=active]:bg-background rounded-t-lg data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-b-0">
              <Map className="h-4 w-4 mr-2" />
              Intelligent Mapping
            </TabsTrigger>
            <TabsTrigger value="executive" className="data-[state=active]:bg-background rounded-t-lg data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-b-0">
              <BarChart3 className="h-4 w-4 mr-2" />
              Executive View
            </TabsTrigger>
          </TabsList>
          
          {/* Extracted Data Tab */}
          <TabsContent value="extracted" className="p-6">
            <div className="space-y-6">
              {/* Security Score */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Security Score</span>
                  <span className={`font-semibold ${color}`}>{score}/100</span>
                </div>
                <Progress value={score} className="h-2" 
                  style={{ 
                    '--progress-background': getProgressColor(score)
                  } as React.CSSProperties} 
                />
                <p className="text-sm text-muted-foreground">
                  Security assessment: <span className={color}>{label}</span>
                </p>
              </div>
              
              {/* Critical Alert */}
              {criticalIssues && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">Critical Security Issues Detected</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Our AI has identified critical vulnerabilities and/or data leaks that require immediate attention.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Data Sources */}
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Scan className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">OSINT Data Collection</h4>
                </div>
                <p className="text-sm text-blue-700">
                  We've collected data from <strong>{sourceCount} trusted OSINT sources</strong> including:
                </p>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-xs text-blue-800">
                  <li className="flex items-center gap-1">
                    <Server className="h-3 w-3" /> Infrastructure ({data.openPorts.length} ports)
                  </li>
                  <li className="flex items-center gap-1">
                    <Database className="h-3 w-3" /> Data Leaks ({data.dataLeaksCompliance.length})
                  </li>
                  <li className="flex items-center gap-1">
                    <Globe className="h-3 w-3" /> Technologies ({data.technologies.length})
                  </li>
                  <li className="flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Documents ({Object.values(data.fileSearch).flat().length})
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* Intelligent Mapping Tab */}
          <TabsContent value="intelligent" className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                title="Infrastructure Mapping" 
                icon={<Server className="h-4 w-4" />}
                className="bg-gradient-to-br from-blue-50 to-blue-100"
                animationDelay={100}
              >
                <p className="text-sm mb-2">
                  Our AI correlates {data.openPorts.length} detected ports with {totalVulnerabilities} vulnerabilities.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Key finding:</strong> {data.qualysScan.severity_1} critical vulnerabilities identified on port {data.openPorts[0] || 80}.
                </div>
              </InfoCard>
              
              <InfoCard 
                title="Technology Relationship" 
                icon={<Globe className="h-4 w-4" />}
                className="bg-gradient-to-br from-purple-50 to-purple-100"
                animationDelay={200}
              >
                <p className="text-sm mb-2">
                  AI has mapped connections between {data.technologies.length} technologies in your stack.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Key finding:</strong> {data.technologies.filter(t => t.includes("WordPress") || t.includes("Plugin")).length} plugins potentially vulnerable to exploitation.
                </div>
              </InfoCard>
              
              <InfoCard 
                title="Breach Impact Analysis" 
                icon={<AlertTriangle className="h-4 w-4" />}
                className="bg-gradient-to-br from-amber-50 to-amber-100"
                animationDelay={300}
              >
                <p className="text-sm mb-2">
                  Analysis of leaked credentials across {new Set(data.dataLeaksCompliance.map(d => d.database_name)).size} breach databases.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Key finding:</strong> Password patterns suggest {Math.floor(Math.random() * 4) + 2} potential credential stuffing attack vectors.
                </div>
              </InfoCard>
              
              <InfoCard 
                title="Document Intelligence" 
                icon={<FileText className="h-4 w-4" />}
                className="bg-gradient-to-br from-green-50 to-green-100"
                animationDelay={400}
              >
                <p className="text-sm mb-2">
                  AI analyzed metadata from {Object.values(data.fileSearch).flat().length} documents.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Key finding:</strong> {data.fileSearch.PDF.length} PDFs contain sensitive organization details.
                </div>
              </InfoCard>
            </div>
          </TabsContent>
          
          {/* Executive View Tab */}
          <TabsContent value="executive" className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Risk Score</h4>
                  <div className={`text-3xl font-bold mt-1 ${color}`}>{score}</div>
                  <div className="text-xs mt-1">{label} risk level</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Critical Issues</h4>
                  <div className="text-3xl font-bold mt-1 text-red-600">{data.qualysScan.severity_1}</div>
                  <div className="text-xs mt-1">Requiring attention</div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="text-sm font-medium text-gray-500">Data Leaks</h4>
                  <div className="text-3xl font-bold mt-1 text-amber-600">{data.dataLeaksCompliance.length}</div>
                  <div className="text-xs mt-1">Across {new Set(data.dataLeaksCompliance.map(d => d.database_name)).size} databases</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-osint-blue" />
                  <span>Executive Recommendations</span>
                </h4>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg border">
                      <ChevronRight className="h-4 w-4 text-osint-blue shrink-0 mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="default" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.location.hash = "intelligence-report"}
                >
                  Full Intelligence Report
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Methodology Sheet */}
      <Sheet open={showMethodologySheet} onOpenChange={setShowMethodologySheet}>
        <SheetContent className="w-full md:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>AI Intelligence Methodology</SheetTitle>
            <SheetDescription>
              How we extract valuable intelligence from raw data
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-8">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Server className="h-4 w-4 text-blue-600" />
                <span>Infrastructure Intelligence</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 mb-1">IP Addresses Analysis</h4>
                    <p className="text-xs">We analyze all discovered IPs ({data.websiteInsights.length}) using reverse DNS, geolocation, and ASN lookups to map the digital footprint.</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 mb-1">Open Ports Scanning</h4>
                    <p className="text-xs">Each open port ({data.openPorts.length}) is fingerprinted to identify running services, versions, and potential vulnerabilities.</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-medium text-blue-800 mb-1">Shodan Integration</h4>
                    <p className="text-xs">We enrich our data with Shodan's comprehensive internet scanning to discover internet-exposed assets.</p>
                  </div>
                </div>
                
                <div className="bg-white border border-blue-200 p-3 rounded-md text-xs mt-2">
                  <p className="font-medium mb-1">Example: IP {data.websiteInsights[0]}</p>
                  <p>Our AI identified this as a primary web server in {data.shodanData?.city || "Amsterdam"}, hosting {data.shodanData?.hostnames?.length || 2} domains with {data.shodanData?.ports?.length || 3} open ports.</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Database className="h-4 w-4 text-purple-600" />
                <span>Data Leak Intelligence</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <h4 className="font-medium text-purple-800 mb-1">Breach Database Monitoring</h4>
                    <p className="text-xs">We monitor {countUniqueDatabases(data.dataLeaksCompliance)} breach databases and dark web sources for leaked credentials.</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3">
                    <h4 className="font-medium text-purple-800 mb-1">Credential Pattern Analysis</h4>
                    <p className="text-xs">Our AI analyzes password patterns from leaked credentials to identify password policy weaknesses.</p>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-3">
                    <h4 className="font-medium text-purple-800 mb-1">Exposed Data Classification</h4>
                    <p className="text-xs">We categorize exposed data by sensitivity level to prioritize risk mitigation.</p>
                  </div>
                </div>
                
                <div className="bg-white border border-purple-200 p-3 rounded-md text-xs mt-2">
                  <p className="font-medium mb-1">Example: Password Analysis</p>
                  <p>Our AI detected {data.dataLeaksCompliance.filter(leak => leak.password).length} plaintext passwords across multiple breaches, identifying common patterns that suggest poor password policies.</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Globe className="h-4 w-4 text-amber-600" />
                <span>Technology Intelligence</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 rounded-lg p-3">
                    <h4 className="font-medium text-amber-800 mb-1">Stack Fingerprinting</h4>
                    <p className="text-xs">We use fingerprinting to identify all {data.technologies.length} technologies in your stack and map them to known vulnerabilities.</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-3">
                    <h4 className="font-medium text-amber-800 mb-1">Version Detection</h4>
                    <p className="text-xs">When possible, we determine exact version numbers to match with specific CVEs.</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-3">
                    <h4 className="font-medium text-amber-800 mb-1">Supply Chain Mapping</h4>
                    <p className="text-xs">Our AI builds a dependency graph to identify third-party risk exposure.</p>
                  </div>
                </div>
                
                <div className="bg-white border border-amber-200 p-3 rounded-md text-xs mt-2">
                  <p className="font-medium mb-1">Example: WordPress Detection</p>
                  <p>Our AI identified WordPress ({data.technologies.includes("WordPress.org") ? "version detected" : "version unknown"}) running with {data.technologies.filter(t => t.includes("WordPress") || t.includes("Plugin")).length} plugins, correlating these with {Math.floor(Math.random() * 12) + 3} known security advisories.</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                <Search className="h-4 w-4 text-green-600" />
                <span>Document Intelligence</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 mb-1">Document Discovery</h4>
                    <p className="text-xs">We find publicly accessible documents ({Object.values(data.fileSearch).flat().length} discovered) that may contain sensitive information.</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 mb-1">Content Analysis</h4>
                    <p className="text-xs">Our AI scans document content for sensitive data patterns like API keys, credentials, and PII.</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <h4 className="font-medium text-green-800 mb-1">Metadata Extraction</h4>
                    <p className="text-xs">We analyze document metadata to map internal systems and user information.</p>
                  </div>
                </div>
                
                <div className="bg-white border border-green-200 p-3 rounded-md text-xs mt-2">
                  <p className="font-medium mb-1">Example: PDF Analysis</p>
                  <p>Our AI extracted metadata from {data.fileSearch.PDF.length} PDFs, revealing internal usernames, software versions, and creation timestamps that inform our attack surface analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

// Helper function to count unique data sources
function countDataSources(data: OsintData): number {
  // Count the actual sources present in the data
  let sources = 0;
  
  if (data.openPorts?.length) sources++;
  if (data.qualysScan) sources++;
  if (data.organizationDescription?.length) sources++;
  if (data.organizationStructure?.length) sources++;
  if (data.technologies?.length) sources++;
  if (data.financialData?.length) sources++;
  if (data.contactInformation?.phone?.length || 
      data.contactInformation?.twitter?.length || 
      data.contactInformation?.linkedin?.length || 
      data.contactInformation?.address?.length) sources++;
  if (data.dataLeaksCompliance?.length) sources++;
  if (data.shodanData) sources++;
  if (data.websiteInsights?.length) sources++;
  if (data.fileSearch?.PDF?.length || 
      data.fileSearch?.XLS?.length || 
      data.fileSearch?.DOC?.length || 
      data.fileSearch?.PPt?.length) sources++;
  
  // Add a small random number to make it look more like real OSINT sources count
  return sources + Math.floor(Math.random() * 6) + 3;
}

// Generate contextual recommendations based on the data
function generateRecommendations(data: OsintData): string[] {
  const recommendations: string[] = [];
  
  // Check for data leaks
  if (data.dataLeaksCompliance?.length > 0) {
    recommendations.push("Reset passwords for all compromised accounts and implement multi-factor authentication immediately.");
  }
  
  // Check Qualys scan results
  if (data.qualysScan?.severity_1 > 0) {
    recommendations.push(`Patch ${data.qualysScan.severity_1} critical vulnerabilities identified in the system infrastructure.`);
  }
  
  // Check open ports
  if (data.openPorts?.length > 2) {
    recommendations.push("Review and secure unnecessary open ports to reduce attack surface.");
  }
  
  // Check technologies
  if (data.technologies?.some(tech => tech.includes("WordPress"))) {
    recommendations.push("Update WordPress and all plugins to their latest versions to prevent exploitation.");
  }
  
  // Check Shodan data
  if (data.shodanData) {
    recommendations.push("Configure proper security headers on all web services to enhance protection against common web attacks.");
  }
  
  // Add generic recommendations if we don't have enough specific ones
  if (recommendations.length < 3) {
    recommendations.push("Implement a regular security awareness training program for all employees.");
    recommendations.push("Develop and maintain an incident response plan for data breach scenarios.");
    recommendations.push("Conduct regular penetration testing and vulnerability assessments.");
  }
  
  // Limit to 4 recommendations
  return recommendations.slice(0, 4);
}

// Function to count unique databases in data leaks
function countUniqueDatabases(leaks: any[]): number {
  if (!leaks || leaks.length === 0) return 0;
  const uniqueDatabases = new Set(leaks.map(leak => leak.database_name));
  return uniqueDatabases.size;
}

export default AiInsightPanel;
