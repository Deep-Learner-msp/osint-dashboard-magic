
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { ShieldAlert, Mail, Database } from "lucide-react";
import { OsintData } from "@/types/data";
import StatCard from "./ui/StatCard";
import { countUniqueDatabases, countUniqueEmails } from "@/utils/formatters";

interface SecurityPanelProps {
  data: OsintData;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ data }) => {
  const { dataLeaksCompliance } = data;
  
  // Analytics for leaks
  const uniqueEmails = countUniqueEmails(dataLeaksCompliance);
  const uniqueDatabases = countUniqueDatabases(dataLeaksCompliance);
  const passwordLeaks = dataLeaksCompliance.filter(leak => leak.password).length;
  
  return (
    <GlassPanel className="mb-6" animationDelay={600}>
      <div className="flex items-center mb-4">
        <ShieldAlert className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Security Findings</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatCard 
          value={uniqueEmails}
          label="Compromised Accounts"
          icon={<Mail className="h-5 w-5" />}
          animationDelay={700}
        />
        <StatCard 
          value={uniqueDatabases}
          label="Breach Databases"
          icon={<Database className="h-5 w-5" />}
          animationDelay={800}
        />
        <StatCard 
          value={passwordLeaks}
          label="Password Leaks"
          className="bg-red-50"
          animationDelay={900}
        />
      </div>

      <div className="bg-white/70 p-4 rounded-lg">
        <h3 className="text-base font-medium mb-1">Security Risk Summary</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Analysis of {dataLeaksCompliance.length} data breach records across {uniqueDatabases} databases.
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Password Reuse Risk</span>
              <span className="text-sm text-red-600 font-medium">High</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-red-500 h-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Email Exposure</span>
              <span className="text-sm text-orange-600 font-medium">Medium</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">PII Exposure</span>
              <span className="text-sm text-yellow-600 font-medium">Low</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-yellow-500 h-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default SecurityPanel;
