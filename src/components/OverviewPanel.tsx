
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
        title="Organization Highlights"
        icon={<Info className="h-5 w-5" />}
        animationDelay={700}
      >
        <ul className="text-sm leading-relaxed space-y-2">
          <li className="flex items-start">
            <span className="text-osint-blue mr-2">•</span>
            <span>Leading alternative asset manager specializing in opportunistic credit across APAC, Middle East, and Europe</span>
          </li>
          <li className="flex items-start">
            <span className="text-osint-blue mr-2">•</span>
            <span>Potential M&A activity detected from public filings and press references</span>
          </li>
          <li className="flex items-start">
            <span className="text-osint-blue mr-2">•</span>
            <span>Strategic indicators suggest expansion into cryptocurrency trading services</span>
          </li>
          <li className="flex items-start">
            <span className="text-osint-blue mr-2">•</span>
            <span>Regulatory inquiries ongoing in Singapore operations (MAS documentation)</span>
          </li>
          <li className="flex items-start">
            <span className="text-osint-blue mr-2">•</span>
            <span>Analysis of public financial data suggests preparation for significant capital raise in Q2 2025</span>
          </li>
        </ul>
      </InfoCard>
    </GlassPanel>
  );
};

export default OverviewPanel;
