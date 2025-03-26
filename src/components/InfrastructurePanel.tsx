
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import QualysSeverityBar from "./ui/QualysSeverityBar";
import { Layers, Server, ShieldAlert, ExternalLink, Info } from "lucide-react";
import { OsintData } from "@/types/data";
import StatCard from "./ui/StatCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { sampleQualysData, severityColors, getSeverityLabel } from "@/utils/qualysParser";

interface InfrastructurePanelProps {
  data: OsintData;
}

const InfrastructurePanel: React.FC<InfrastructurePanelProps> = ({ data }) => {
  const { openPorts, qualysScan } = data;
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  
  const totalVulnerabilities = 
    qualysScan.severity_1 + 
    qualysScan.severity_2 + 
    qualysScan.severity_3 + 
    qualysScan.severity_4;

  const handleCardClick = (detail: string) => {
    setActiveDetail(detail);
    setSheetOpen(true);
  };

  const renderDetailContent = () => {
    switch (activeDetail) {
      case "ports":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Open Ports Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openPorts.map((port) => (
                  <div key={port} className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold">Port {port}</h4>
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Open
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {port === 80 ? (
                        <span>HTTP - Web server</span>
                      ) : port === 443 ? (
                        <span>HTTPS - Secure web server</span>
                      ) : (
                        <span>Unknown service</span>
                      )}
                    </div>
                    <div className="mt-4 text-xs text-gray-500">
                      {port === 80 ? (
                        <p>Standard port for HTTP web traffic. Consider implementing HTTPS to enhance security.</p>
                      ) : port === 443 ? (
                        <p>Standard port for HTTPS encrypted web traffic. Verify TLS/SSL configuration is up to date.</p>
                      ) : (
                        <p>Check if this port is necessary for your operations.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">Recommendations</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Consider implementing a Web Application Firewall (WAF) to protect HTTP/HTTPS services.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Configure proper TLS settings and keep certificates up to date.</p>
                </div>
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Implement regular vulnerability scanning of web servers.</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "vulnerabilities":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Vulnerability Distribution</h3>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-red-600 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{qualysScan.severity_1}</div>
                  <div className="text-xs">Critical</div>
                </div>
                <div className="bg-orange-500 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{qualysScan.severity_2}</div>
                  <div className="text-xs">High</div>
                </div>
                <div className="bg-yellow-500 text-black p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{qualysScan.severity_3}</div>
                  <div className="text-xs">Medium</div>
                </div>
                <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">{qualysScan.severity_4}</div>
                  <div className="text-xs">Low</div>
                </div>
              </div>
              
              <QualysSeverityBar data={qualysScan} />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Recent Vulnerabilities</h3>
              <div className="space-y-3">
                {sampleQualysData.slice(0, 3).map((vuln) => (
                  <div key={vuln.qid} className="border p-3 rounded-lg">
                    <div className="flex items-start">
                      <div className={`rounded-full h-6 w-6 flex items-center justify-center ${severityColors[vuln.severity]} mr-3 flex-shrink-0`}>
                        {vuln.severity}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-medium">{vuln.title}</h4>
                          <div className="text-xs text-gray-500">{vuln.cveId || `QID: ${vuln.qid}`}</div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{vuln.threat}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "critical":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">!</div>
                <h3 className="text-lg font-medium">Critical Vulnerabilities ({qualysScan.severity_1})</h3>
              </div>
              
              {sampleQualysData.filter(v => v.severity === 1).map(vuln => (
                <div key={vuln.qid} className="border border-red-200 bg-red-50 p-4 rounded-lg mb-4">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-semibold">{vuln.title}</h4>
                        <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {vuln.cveId || `QID: ${vuln.qid}`}
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-3">
                        <div>
                          <h5 className="text-sm font-medium">Description</h5>
                          <p className="text-sm text-gray-700 mt-1">{vuln.threat}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium">Impact</h5>
                          <p className="text-sm text-gray-700 mt-1">{vuln.impact}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium">Solution</h5>
                          <p className="text-sm text-gray-700 mt-1">{vuln.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {qualysScan.severity_1 > sampleQualysData.filter(v => v.severity === 1).length && (
                <div className="text-center text-sm text-gray-500 mt-4">
                  {qualysScan.severity_1 - sampleQualysData.filter(v => v.severity === 1).length} more critical vulnerabilities not shown
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <GlassPanel className="mb-6" animationDelay={300}>
        <div className="flex items-center mb-4">
          <Layers className="h-5 w-5 mr-2 text-osint-blue" />
          <h2 className="text-xl font-semibold">Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            value={openPorts.length}
            label="Open Ports"
            icon={<Server className="h-5 w-5" />}
            animationDelay={400}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("ports")}
          />
          <StatCard 
            value={totalVulnerabilities}
            label="Total Vulnerabilities"
            icon={<ShieldAlert className="h-5 w-5" />}
            animationDelay={500}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("vulnerabilities")}
          />
          <StatCard 
            value={qualysScan.severity_1}
            label="Critical Vulnerabilities"
            className="bg-red-50 cursor-pointer hover:shadow-md transition-shadow"
            animationDelay={600}
            onClick={() => handleCardClick("critical")}
          />
        </div>

        <div className="bg-white/70 p-4 rounded-lg">
          <h3 className="text-base font-medium mb-3">Vulnerability Severity Distribution</h3>
          <QualysSeverityBar data={qualysScan} />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium">Open Ports</h3>
            <button 
              className="text-xs text-osint-blue flex items-center"
              onClick={() => handleCardClick("ports")}
            >
              View Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {openPorts.map((port) => (
              <div 
                key={port}
                className="px-3 py-1 bg-osint-blue/10 text-osint-blue rounded-full text-xs font-medium cursor-pointer hover:bg-osint-blue/20"
                onClick={() => handleCardClick("ports")}
              >
                Port {port}
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
      
      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full md:max-w-4xl sm:max-w-xl p-0 overflow-y-auto">
          <div className="h-full flex flex-col">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle className="text-lg font-semibold">
                {activeDetail === "ports" 
                  ? "Open Ports Analysis" 
                  : activeDetail === "vulnerabilities"
                    ? "Vulnerability Analysis"
                    : "Critical Vulnerabilities"}
              </SheetTitle>
              <SheetDescription>
                {activeDetail === "ports"
                  ? `${openPorts.length} open ports detected on the target system`
                  : activeDetail === "vulnerabilities"
                    ? `${totalVulnerabilities} vulnerabilities detected across all severity levels`
                    : `${qualysScan.severity_1} critical vulnerabilities requiring immediate attention`}
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 p-6 overflow-y-auto">
              {renderDetailContent()}
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default InfrastructurePanel;
