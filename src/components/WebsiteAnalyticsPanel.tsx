
import React from "react";
import { OsintData } from "@/types/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, Code, Server, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WebsiteAnalyticsPanelProps {
  data: OsintData;
}

const WebsiteAnalyticsPanel: React.FC<WebsiteAnalyticsPanelProps> = ({ data }) => {
  return (
    <Card className="border-t-4 border-t-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          Website Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <Code className="h-4 w-4 mt-1 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Domain</p>
              <p className="text-sm text-gray-600">sclowy.com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Server className="h-4 w-4 mt-1 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Technology Stack</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.technologies.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Search className="h-4 w-4 mt-1 text-gray-500" />
            <div>
              <p className="text-sm font-medium">SEO Status</p>
              <div className="flex items-center mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                <span className="text-sm text-amber-700">Medium risk</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebsiteAnalyticsPanel;
