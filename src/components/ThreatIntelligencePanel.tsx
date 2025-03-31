
import React from "react";
import { Shield, AlertTriangle, Lock, BarChart } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThreatIntelligencePanelProps {
  data: OsintData;
}

const ThreatIntelligencePanel: React.FC<ThreatIntelligencePanelProps> = ({ data }) => {
  // Generate sample threat intelligence data
  const threatEntities = [
    {
      type: "CVE",
      id: "CVE-2023-3456",
      name: "OpenSSH Authentication Bypass",
      severity: "Critical",
      description: "Authentication bypass vulnerability in OpenSSH affecting all versions prior to 8.9p1.",
      relatedTo: ["Port 22", "OpenSSH"]
    },
    {
      type: "CVE",
      id: "CVE-2023-2176",
      name: "Apache Log4j RCE Vulnerability",
      severity: "Critical",
      description: "Remote code execution vulnerability in Apache Log4j library.",
      relatedTo: ["Java", "Web Applications"]
    },
    {
      type: "TTP",
      id: "T1190",
      name: "Exploit Public-Facing Application",
      severity: "High",
      description: "Adversaries may attempt to exploit vulnerabilities in public-facing applications.",
      relatedTo: ["Web Server", "API Gateway"]
    },
    {
      type: "IOC",
      id: "IP-78.31.67.23",
      name: "Known Malicious IP",
      severity: "Medium",
      description: "This IP address has been observed in multiple attack campaigns targeting similar organizations.",
      relatedTo: ["Network Traffic", "Firewall Logs"]
    }
  ];

  // Function to get badge color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-500 hover:bg-red-600";
      case "high":
        return "bg-orange-500 hover:bg-orange-600";
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "low":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-blue-500 hover:bg-blue-600";
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-500" />
          Threat Intelligence Analysis
        </CardTitle>
        <CardDescription>
          AI-correlated threat intelligence from multiple sources relevant to your infrastructure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden">
          <div className="grid gap-4">
            {threatEntities.map((threat, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-100">
                        {threat.type}
                      </Badge>
                    </div>
                    <h4 className="text-base font-medium flex items-center gap-1">
                      {threat.type === "CVE" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {threat.type === "TTP" && <BarChart className="h-4 w-4 text-blue-500" />}
                      {threat.type === "IOC" && <Lock className="h-4 w-4 text-purple-500" />}
                      {threat.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {threat.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {threat.id}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {threat.relatedTo.map((item, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatIntelligencePanel;
