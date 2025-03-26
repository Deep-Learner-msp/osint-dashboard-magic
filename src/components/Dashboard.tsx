
import React from "react";
import { Shield } from "lucide-react";
import { OsintData } from "@/types/data";
import Header from "./Header";
import InfrastructurePanel from "./InfrastructurePanel";
import OverviewPanel from "./OverviewPanel";
import TechStackPanel from "./TechStackPanel";
import SecurityPanel from "./SecurityPanel";
import DataLeaksPanel from "./DataLeaksPanel";
import FileSearchPanel from "./FileSearchPanel";
import ContactInformationPanel from "./ContactInformationPanel";

interface DashboardProps {
  data: OsintData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Header organizationName="SC Lowy" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <InfrastructurePanel data={data} />
          <OverviewPanel data={data} />
          <TechStackPanel data={data} />
        </div>
        
        <div>
          <SecurityPanel data={data} />
          <DataLeaksPanel data={data} />
          <FileSearchPanel data={data} />
          <ContactInformationPanel data={data} />
        </div>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "1500ms" }}>
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-osint-blue" />
          <span>OSINT Dashboard</span>
        </div>
        <p>Intelligence data gathered on {new Date().toLocaleDateString()}. For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
