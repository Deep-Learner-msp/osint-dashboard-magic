
import React from "react";
import { Shield, AlertTriangle, Lock, ExternalLink } from "lucide-react";

interface HeaderProps {
  organizationName: string;
}

const Header: React.FC<HeaderProps> = ({ organizationName }) => {
  return (
    <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/a40a54f9-328b-43f3-8b66-ace987e135ae.png" 
                alt="K2K Discovery Logo" 
                className="h-8 w-auto mr-3"
              />
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-k2k-gradient">K2K Discovery</h1>
            </div>
          </div>
          <div className="flex items-center">
            <h2 className="text-3xl font-bold tracking-tight">{organizationName}</h2>
            <div className="ml-4 flex space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-k2k-blue/10 text-k2k-blue">
                Financial Services
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-k2k-accent/10 text-k2k-accent">
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
