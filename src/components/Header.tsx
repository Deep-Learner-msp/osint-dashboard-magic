
import React from "react";
import { Shield, AlertTriangle, Lock } from "lucide-react";

interface HeaderProps {
  organizationName: string;
}

const Header: React.FC<HeaderProps> = ({ organizationName }) => {
  return (
    <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 mb-2">
            <Shield className="h-6 w-6 text-osint-blue animate-pulse-glow" />
            <h1 className="text-2xl font-bold tracking-tight">OSINT Dashboard</h1>
          </div>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight">{organizationName}</h2>
            <div className="ml-4 flex space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-osint-blue/10 text-osint-blue">
                Financial Services
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-osint-yellow/10 text-osint-yellow">
                <AlertTriangle className="mr-1 h-3 w-3" />
                38 Vulnerabilities
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-xs font-medium flex items-center">
          <Lock className="h-3 w-3 mr-1" />
          <span>Critical Findings</span>
        </div>
        <div className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-medium">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Header;
