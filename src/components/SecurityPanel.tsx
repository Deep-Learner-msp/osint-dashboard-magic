
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { ShieldAlert, Mail, Database, ExternalLink, AlertTriangle } from "lucide-react";
import { OsintData } from "@/types/data";
import StatCard from "./ui/StatCard";
import { countUniqueDatabases, countUniqueEmails } from "@/utils/formatters";
import InfoDrawer from "./ui/InfoDrawer";
import { Button } from "./ui/button";
import { QualysVulnerability, sampleQualysData, severityColors, getSeverityLabel } from "@/utils/qualysParser";

interface SecurityPanelProps {
  data: OsintData;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ data }) => {
  const { dataLeaksCompliance } = data;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeVulnerability, setActiveVulnerability] = useState<QualysVulnerability | null>(null);
  
  // Analytics for leaks
  const uniqueEmails = countUniqueEmails(dataLeaksCompliance);
  const uniqueDatabases = countUniqueDatabases(dataLeaksCompliance);
  const passwordLeaks = dataLeaksCompliance.filter(leak => leak.password).length;
  
  const openVulnerabilityDetails = (vulnerability: QualysVulnerability) => {
    setActiveVulnerability(vulnerability);
    setDrawerOpen(true);
  };

  return (
    <GlassPanel className="mb-6" animationDelay={600}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <ShieldAlert className="h-5 w-5 mr-2 text-osint-blue" />
          <h2 className="text-xl font-semibold">Security Findings</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => {
            setActiveVulnerability(null);
            setDrawerOpen(true);
          }}
        >
          View Full Report
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatCard 
          value={uniqueEmails}
          label="Compromised Accounts"
          icon={<Mail className="h-5 w-5" />}
          animationDelay={700}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            // Open data leaks details in drawer
            setActiveVulnerability(null);
            setDrawerOpen(true);
          }}
        />
        <StatCard 
          value={uniqueDatabases}
          label="Breach Databases"
          icon={<Database className="h-5 w-5" />}
          animationDelay={800}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => {
            // Open data leaks details in drawer
            setActiveVulnerability(null);
            setDrawerOpen(true);
          }}
        />
        <StatCard 
          value={passwordLeaks}
          label="Password Leaks"
          className="bg-red-50 cursor-pointer hover:shadow-md transition-shadow"
          animationDelay={900}
          onClick={() => {
            // Open data leaks details in drawer
            setActiveVulnerability(null);
            setDrawerOpen(true);
          }}
        />
      </div>

      <div className="bg-white/70 p-4 rounded-lg">
        <h3 className="text-base font-medium mb-2">Vulnerability Scan Results</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Recent Qualys scan detected {sampleQualysData.length} security vulnerabilities.
        </p>
        
        <div className="space-y-3">
          {sampleQualysData.map((vuln, index) => (
            <div 
              key={vuln.qid} 
              className="flex items-start p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => openVulnerabilityDetails(vuln)}
            >
              <div className={`rounded-full h-6 w-6 flex items-center justify-center ${severityColors[vuln.severity]} mr-3 flex-shrink-0`}>
                {vuln.severity}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{vuln.title}</h4>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="mr-2">QID: {vuln.qid}</span>
                  {vuln.cveId && (
                    <span className="mr-2 text-osint-blue">{vuln.cveId}</span>
                  )}
                  {vuln.port && (
                    <span>Port: {vuln.port}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Vulnerability Drawer */}
      {activeVulnerability ? (
        <InfoDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={activeVulnerability.title}
          description={activeVulnerability.cveId ? `${activeVulnerability.cveId} | QID: ${activeVulnerability.qid}` : `QID: ${activeVulnerability.qid}`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`rounded-full h-6 w-6 flex items-center justify-center ${severityColors[activeVulnerability.severity]}`}>
                  {activeVulnerability.severity}
                </div>
                <span className="font-medium">{getSeverityLabel(activeVulnerability.severity)} Severity</span>
              </div>
              {activeVulnerability.cvssBase && (
                <div className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  CVSS: {activeVulnerability.cvssBase.split(" ")[0]}
                </div>
              )}
            </div>

            {activeVulnerability.threat && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Threat</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{activeVulnerability.threat}</p>
              </div>
            )}

            {activeVulnerability.impact && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Impact</h4>
                <p className="text-sm text-gray-700">{activeVulnerability.impact}</p>
              </div>
            )}

            {activeVulnerability.solution && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Solution</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{activeVulnerability.solution}</p>
              </div>
            )}

            {activeVulnerability.results && (
              <div>
                <h4 className="text-sm font-semibold mb-1">Scan Results</h4>
                <pre className="text-xs bg-gray-50 p-3 rounded whitespace-pre-wrap">{activeVulnerability.results}</pre>
              </div>
            )}

            {activeVulnerability.category && (
              <div className="mt-4">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Category: {activeVulnerability.category}</span>
              </div>
            )}
          </div>
        </InfoDrawer>
      ) : (
        <InfoDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Security Analysis Report"
          description="Comprehensive overview of all security findings"
        >
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Vulnerability Summary</h3>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-red-600 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs">Critical</div>
                </div>
                <div className="bg-orange-500 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs">High</div>
                </div>
                <div className="bg-yellow-500 text-black p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs">Medium</div>
                </div>
                <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-xs">Low</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Data Breach Analysis</h3>
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center text-red-600 mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h4 className="font-medium">High Risk: Password Reuse</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {passwordLeaks} plaintext passwords have been exposed across {uniqueDatabases} breach databases.
                    Multiple users are reusing the same passwords across different services.
                  </p>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center text-orange-600 mb-2">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h4 className="font-medium">Medium Risk: Executive Exposure</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Executive team members have exposed credentials, including email addresses and personal information.
                    This increases the risk of targeted social engineering attacks.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="h-4 w-4 rounded-full bg-red-600"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Critical Priority</h4>
                    <p className="text-sm text-gray-600">Implement a corporate password manager and enforce unique passwords for all accounts.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">High Priority</h4>
                    <p className="text-sm text-gray-600">Update OpenSSH to the latest version to mitigate multiple vulnerabilities.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-yellow-100 rounded-full p-1 mr-3 mt-0.5">
                    <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Medium Priority</h4>
                    <p className="text-sm text-gray-600">Conduct security awareness training for all employees with focus on credential security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </InfoDrawer>
      )}
    </GlassPanel>
  );
};

export default SecurityPanel;
