
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import QualysSeverityBar from "./ui/QualysSeverityBar";
import { Layers, Server, ShieldAlert } from "lucide-react";
import { OsintData } from "@/types/data";
import StatCard from "./ui/StatCard";

interface InfrastructurePanelProps {
  data: OsintData;
}

const InfrastructurePanel: React.FC<InfrastructurePanelProps> = ({ data }) => {
  const { openPorts, qualysScan } = data;
  
  const totalVulnerabilities = 
    qualysScan.severity_1 + 
    qualysScan.severity_2 + 
    qualysScan.severity_3 + 
    qualysScan.severity_4;

  return (
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
        />
        <StatCard 
          value={totalVulnerabilities}
          label="Total Vulnerabilities"
          icon={<ShieldAlert className="h-5 w-5" />}
          animationDelay={500}
        />
        <StatCard 
          value={qualysScan.severity_1}
          label="Critical Vulnerabilities"
          className="bg-red-50"
          animationDelay={600}
        />
      </div>

      <div className="bg-white/70 p-4 rounded-lg">
        <h3 className="text-base font-medium mb-3">Vulnerability Severity Distribution</h3>
        <QualysSeverityBar data={qualysScan} />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-medium mb-2">Open Ports</h3>
        <div className="flex flex-wrap gap-2">
          {openPorts.map((port) => (
            <div 
              key={port}
              className="px-3 py-1 bg-osint-blue/10 text-osint-blue rounded-full text-xs font-medium"
            >
              Port {port}
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
};

export default InfrastructurePanel;
