
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { ShieldAlert, Mail, Database, ExternalLink, AlertTriangle } from "lucide-react";
import { OsintData } from "@/types/data";
import StatCard from "./ui/StatCard";
import { countUniqueDatabases, countUniqueEmails } from "@/utils/formatters";
import InfoSheet from "./ui/InfoSheet";
import { Button } from "./ui/button";
import { QualysVulnerability, sampleQualysData, severityColors, getSeverityLabel } from "@/utils/qualysParser";

interface SecurityPanelProps {
  data: OsintData;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ data }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeVulnerability, setActiveVulnerability] = useState<QualysVulnerability | null>(null);
  
  // Function to open a specific vulnerability
  const openVulnerability = (vuln: QualysVulnerability) => {
    setActiveVulnerability(vuln);
    setAccordionOpen(true);
  };
  
  // Calculate the percentage of critical vulnerabilities
  const totalVulnerabilities = 
    data.qualysScan.severity_1 + 
    data.qualysScan.severity_2 + 
    data.qualysScan.severity_3 + 
    data.qualysScan.severity_4;
  
  const criticalPercentage = Math.round(
    (data.qualysScan.severity_1 / totalVulnerabilities) * 100
  );
  
  // Get uniqueEmails count from the data leaks
  const uniqueEmails = countUniqueEmails(data.dataLeaksCompliance);
  
  // Get uniqueDatabases count from the data leaks
  const uniqueDatabases = countUniqueDatabases(data.dataLeaksCompliance);

  return (
    <>
      <GlassPanel 
        title="Security & Vulnerabilities" 
        icon={<ShieldAlert className="h-5 w-5 text-red-500" />}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <StatCard 
            value={<span className="text-red-600">{data.qualysScan.severity_1}</span>}
            label="Critical Vulnerabilities"
            icon={<AlertTriangle className="h-4 w-4" />}
            animationDelay={600}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setActiveVulnerability(null);
              setAccordionOpen(true);
            }}
          />
          
          <StatCard 
            value={uniqueEmails}
            label="Affected Accounts"
            icon={<Mail className="h-4 w-4" />}
            animationDelay={700}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setActiveVulnerability(null);
              setAccordionOpen(true);
            }}
          />
          
          <StatCard 
            value={uniqueDatabases}
            label="Breach Sources"
            icon={<Database className="h-4 w-4" />}
            animationDelay={800}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setActiveVulnerability(null);
              setAccordionOpen(true);
            }}
          />
          
          <StatCard 
            value={`${criticalPercentage}%`}
            label="Critical Severity Rate"
            icon={<AlertTriangle className="h-4 w-4" />}
            className="bg-red-50 cursor-pointer hover:shadow-md transition-shadow"
            animationDelay={900}
            onClick={() => {
              setActiveVulnerability(null);
              setAccordionOpen(true);
            }}
            trend={{
              value: 12,
              label: "vs. industry average"
            }}
          />
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium text-sm mb-3">Top Vulnerabilities</h3>
          <div className="space-y-2">
            {sampleQualysData.slice(0, 3).map((vuln, index) => (
              <div 
                key={index}
                onClick={() => openVulnerability(vuln)}
                className="p-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3"
              >
                <div 
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${severityColors[vuln.severity]}`}
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm leading-5">{vuln.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${severityColors[vuln.severity]} bg-opacity-10`}>
                      {getSeverityLabel(vuln.severity)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {vuln.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={() => {
                setActiveVulnerability(null);
                setAccordionOpen(true);
              }}
            >
              <span>View all vulnerabilities</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </GlassPanel>

      {/* Detailed Vulnerability Sheet */}
      {activeVulnerability ? (
        <InfoSheet
          open={accordionOpen}
          onClose={() => setAccordionOpen(false)}
          title={activeVulnerability.title}
          description={`Severity: ${getSeverityLabel(activeVulnerability.severity)}`}
          sourcesCount={3}
          sourcesNames={["Qualys Scan", "NVD", "CVE Database"]}
          lastUpdated={new Date(activeVulnerability.detected)}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{activeVulnerability.description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Impact</h3>
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">{activeVulnerability.impact}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Affected Systems</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {activeVulnerability.affectedSystems.map((system, index) => (
                  <li key={index}>{system}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Remediation Steps</h3>
              <ul className="space-y-2">
                {activeVulnerability.remediation.map((step, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <div className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 text-xs">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {activeVulnerability.cve && (
              <div>
                <h3 className="text-sm font-medium mb-2">CVE Information</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                  <p className="text-sm mb-1">
                    <span className="font-mono text-blue-800">{activeVulnerability.cve}</span>
                  </p>
                  <a 
                    href={`https://nvd.nist.gov/vuln/detail/${activeVulnerability.cve}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View in National Vulnerability Database</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </InfoSheet>
      ) : (
        <InfoSheet
          open={accordionOpen}
          onClose={() => setAccordionOpen(false)}
          title="Security Analysis Report"
          description="Comprehensive security assessment based on multiple data sources"
          sourcesCount={5}
          sourcesNames={["Qualys Scan", "Shodan", "HaveIBeenPwned", "DataBreaches.net", "CVE Database"]}
          lastUpdated={new Date()}
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Vulnerability Summary</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                    <div className="text-xl font-semibold text-red-600">{data.qualysScan.severity_1}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">High</div>
                    <div className="text-xl font-semibold text-orange-500">{data.qualysScan.severity_2}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                    <div className="text-xl font-semibold text-yellow-500">{data.qualysScan.severity_3}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Low</div>
                    <div className="text-xl font-semibold text-green-500">{data.qualysScan.severity_4}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Critical Vulnerabilities</h3>
              <div className="space-y-3">
                {sampleQualysData.filter(v => v.severity === 1).map((vuln, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-md border border-gray-200 bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{vuln.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {vuln.description.length > 120 
                            ? `${vuln.description.substring(0, 120)}...` 
                            : vuln.description}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs ml-2"
                        onClick={() => openVulnerability(vuln)}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Data Leak Analysis</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Affected Accounts</div>
                    <div className="text-xl font-semibold text-osint-blue">{uniqueEmails}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Leaked Passwords</div>
                    <div className="text-xl font-semibold text-osint-red">
                      {data.dataLeaksCompliance.filter(leak => leak.password && leak.password.length > 0).length}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Breach Sources</div>
                    <div className="text-xl font-semibold">{uniqueDatabases}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Personal Info Exposed</div>
                    <div className="text-xl font-semibold">
                      {data.dataLeaksCompliance.filter(leak => 
                        leak.address || leak.phone || leak.name
                      ).length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InfoSheet>
      )}
    </>
  );
};

export default SecurityPanel;
