
import React from "react";
import { Shield, AlertTriangle, Lock } from "lucide-react";

interface HeaderProps {
  organizationName: string;
}

const Header: React.FC<HeaderProps> = ({ organizationName }) => {
  return (
    <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <div className="flex flex-col md-flex-row md-items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 mb-2">
            <Shield className="h-6 w-6 text-osint-blue animate-pulse-glow" />
            <h1 className="text-2xl font-bold">OSINT Dashboard</h1>
          </div>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold">{organizationName}</h2>
            <div className="ml-4 flex space-x-2">
              <span className="badge badge-info">
                Financial Services
              </span>
              <span className="badge badge-warning">
                <AlertTriangle className="h-3 w-3 mr-1" />
                38 Vulnerabilities
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <div className="badge badge-destructive flex items-center">
          <Lock className="h-3 w-3 mr-1" />
          <span>Critical Findings</span>
        </div>
        <div className="badge badge-warning">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default Header;
