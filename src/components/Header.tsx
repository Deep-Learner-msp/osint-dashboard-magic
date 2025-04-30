
import React from "react";
import { Shield } from "lucide-react";

interface HeaderProps {
  organizationName: string;
}

const Header: React.FC<HeaderProps> = ({ organizationName }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" />
          <div>
            <h1 className="text-lg font-bold">{organizationName} Security Assessment</h1>
            <p className="text-sm opacity-80">OSINT Intelligence Report</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm opacity-80">Generated on {new Date().toLocaleDateString()}</p>
          <p className="text-xs opacity-70">Confidential – For authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
