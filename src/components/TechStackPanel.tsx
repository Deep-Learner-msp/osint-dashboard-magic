
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { Code, Globe } from "lucide-react";
import { OsintData } from "@/types/data";

interface TechStackPanelProps {
  data: OsintData;
}

const TechStackPanel: React.FC<TechStackPanelProps> = ({ data }) => {
  const { technologies, websiteInsights } = data;
  
  // Group technologies by category
  const techCategories = {
    analytics: ["Google Tag Manager", "Adobe Media Optimizer", "Cedexis Radar"],
    cms: ["WordPress.org"],
    frontend: ["Google Font API", "Mobile Friendly", "Gravity Forms"],
    backend: ["Apache", "Nginx", "DigitalOcean"],
    security: ["reCAPTCHA"],
    services: ["Google Maps", "Outlook", "Vimeo", "Google Maps (Non Paid Users)"],
  };

  // Get category for each technology
  const getTechCategory = (tech: string): string => {
    for (const [category, techs] of Object.entries(techCategories)) {
      if (techs.some(t => tech.includes(t))) {
        return category;
      }
    }
    return "other";
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      analytics: "bg-purple-100 text-purple-800",
      cms: "bg-blue-100 text-blue-800",
      frontend: "bg-indigo-100 text-indigo-800",
      backend: "bg-green-100 text-green-800",
      security: "bg-red-100 text-red-800",
      services: "bg-amber-100 text-amber-800",
      other: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.other;
  };

  return (
    <GlassPanel className="mb-6" animationDelay={500}>
      <div className="flex items-center mb-4">
        <Code className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Technology Stack</h2>
      </div>
      
      <div className="bg-white/70 rounded-lg p-4 mb-4">
        <h3 className="text-base font-medium mb-3">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => {
            const category = getTechCategory(tech);
            const colorClass = getCategoryColor(category);
            
            return (
              <div 
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass} opacity-0 animate-fade-in`}
                style={{ animationDelay: `${600 + index * 50}ms` }}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/70 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Globe className="h-4 w-4 mr-2 text-osint-blue" />
          <h3 className="text-base font-medium">Website Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">IP Addresses</h4>
            <div className="space-y-2">
              {websiteInsights.map((ip, index) => (
                <div 
                  key={index}
                  className="px-3 py-2 bg-gray-50 rounded text-xs font-mono opacity-0 animate-fade-in"
                  style={{ animationDelay: `${800 + index * 100}ms` }}
                >
                  {ip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default TechStackPanel;
