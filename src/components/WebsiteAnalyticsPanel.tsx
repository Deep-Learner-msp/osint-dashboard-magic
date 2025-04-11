
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { OsintData } from "@/types/data";
import { Code, Search, AlertTriangle, FileWarning, Check } from "lucide-react";
import { Badge } from "./ui/badge";

interface WebsiteAnalyticsPanelProps {
  data: OsintData;
}

const WebsiteAnalyticsPanel: React.FC<WebsiteAnalyticsPanelProps> = ({ data }) => {
  return (
    <GlassPanel className="mb-6" animationDelay={500}>
      <div className="flex items-center mb-4">
        <Search className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Website Analytics & Tracking Insight</h2>
      </div>
      
      <div className="bg-white/70 rounded-lg p-4 space-y-4">
        <div>
          <p className="font-medium">Domain: sclowy.com</p>
        </div>
        
        <div>
          <p className="font-medium flex items-center">
            <Code className="h-4 w-4 mr-2 text-osint-blue" /> Tech Stack:
          </p>
          <p className="text-sm ml-6">WordPress 6.0, PHP 7.4, Apache 2.4</p>
        </div>
        
        <div>
          <p className="font-medium">🎯 Analytics IDs:</p>
          <ul className="text-sm ml-6 space-y-1">
            <li>GA ID: UA-12345678</li>
            <li>Facebook Pixel: FB-987654321</li>
            <li>Hotjar: HJ-000111222</li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium">🧠 Embedded Metadata:</p>
          <ul className="text-sm ml-6 space-y-1">
            <li>userRole: internal-dev</li>
            <li>experimentGroup: betaUI</li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" /> Linked Domains (same GA ID):
          </p>
          <ul className="text-sm ml-6 space-y-1">
            <li>malicious-typo-example.net</li>
            <li>phishing-mirror-example.org</li>
          </ul>
        </div>
        
        <div>
          <p className="font-medium flex items-center">
            <FileWarning className="h-4 w-4 mr-2 text-red-500" /> Potential CVEs:
          </p>
          <ul className="text-sm ml-6 space-y-1">
            <li>CVE-2022-1329 (WordPress) – High</li>
            <li>CVE-2021-44224 (Apache) – Medium</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="font-medium">🧮 Risk Score:</p>
          <Badge variant="destructive" className="text-sm">7.8 / 10</Badge>
        </div>
        
        <div className="bg-green-50 p-3 rounded-md border border-green-100 mt-4">
          <p className="font-medium flex items-center mb-1">
            <Check className="h-4 w-4 mr-2 text-green-600" /> Recommendation:
          </p>
          <p className="text-sm">
            Patch outdated components and flag suspicious domains for deeper review.
          </p>
        </div>
      </div>
    </GlassPanel>
  );
};

export default WebsiteAnalyticsPanel;
