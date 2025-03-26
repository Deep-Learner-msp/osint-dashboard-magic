
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { Building, Users, DollarSign, Info } from "lucide-react";
import { OsintData } from "@/types/data";
import { formatCurrency, formatLargeNumber } from "@/utils/formatters";
import InfoCard from "./ui/InfoCard";

interface OverviewPanelProps {
  data: OsintData;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ data }) => {
  const { organizationDescription, organizationStructure, financialData } = data;
  
  return (
    <GlassPanel className="mb-6" animationDelay={400}>
      <div className="flex items-center mb-4">
        <Building className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Organization Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InfoCard 
          title="Employee Count"
          icon={<Users className="h-5 w-5" />}
          animationDelay={500}
          className="h-full"
        >
          <div className="text-3xl font-bold">{organizationStructure[0]}</div>
          <div className="text-sm text-muted-foreground mt-1">Professionals across 9 global offices</div>
        </InfoCard>
        
        <InfoCard 
          title="Financial Data"
          icon={<DollarSign className="h-5 w-5" />}
          animationDelay={600}
          className="h-full"
        >
          <div className="text-3xl font-bold">{formatCurrency(financialData[0])}</div>
          <div className="text-sm text-muted-foreground mt-1">Assets Under Management</div>
        </InfoCard>
      </div>

      <InfoCard 
        title="Description"
        icon={<Info className="h-5 w-5" />}
        animationDelay={700}
      >
        <div className="text-sm leading-relaxed max-h-40 overflow-y-auto pr-1">
          {organizationDescription[0]}
        </div>
      </InfoCard>
    </GlassPanel>
  );
};

export default OverviewPanel;
