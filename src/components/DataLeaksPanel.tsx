
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { AlertTriangle } from "lucide-react";
import { OsintData } from "@/types/data";
import LeakTable from "./ui/LeakTable";

interface DataLeaksPanelProps {
  data: OsintData;
}

const DataLeaksPanel: React.FC<DataLeaksPanelProps> = ({ data }) => {
  const { dataLeaksCompliance } = data;
  
  return (
    <GlassPanel className="mb-6" animationDelay={700}>
      <div className="flex items-center mb-4">
        <AlertTriangle className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Data Leaks & Compliance</h2>
      </div>
      
      <div className="bg-white/70 rounded-lg p-4">
        <LeakTable leaks={dataLeaksCompliance} />
      </div>
    </GlassPanel>
  );
};

export default DataLeaksPanel;
