
import React from "react";
import { Target, Shield, ArrowUpRight } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AttackVectorPanelProps {
  data: OsintData;
}

const AttackVectorPanel: React.FC<AttackVectorPanelProps> = ({ data }) => {
  // Generate sample attack vector data based on the analyzed OSINT data
  const attackVectors = [
    {
      name: "Web Application Attack",
      likelihood: "High",
      description: "Possible exploitation of vulnerabilities in web applications detected through port scanning and technology stack analysis.",
      technologies: data.technologies.filter(t => t.includes("Web") || t.includes("CMS")).slice(0, 2),
      mitigations: ["Update web application frameworks", "Implement WAF", "Regular security testing"]
    },
    {
      name: "Credential Stuffing",
      likelihood: "Critical",
      description: `Based on ${data.dataLeaksCompliance.length} leaked credentials found in breach databases. Attackers could use these to gain unauthorized access.`,
      technologies: ["Authentication Systems", "Login Portals"],
      mitigations: ["Implement MFA", "Password policy enforcement", "Account lockout after failed attempts"]
    },
    {
      name: "Infrastructure Exploitation",
      likelihood: "Medium",
      description: `${data.openPorts.length} open ports detected including commonly targeted services that could be exploited if vulnerable.`,
      technologies: ["Network Services", "Open Ports"],
      mitigations: ["Implement network segmentation", "Regular patching", "Reduce exposed services"]
    },
    {
      name: "Social Engineering",
      likelihood: "Medium",
      description: "Contact information and organizational structure discovered could be used in targeted phishing campaigns.",
      technologies: ["Email Systems", "Social Media"],
      mitigations: ["Security awareness training", "Email filtering", "DMARC implementation"]
    }
  ];

  // Function to get likelihood color
  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood.toLowerCase()) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-500" />
          AI-Identified Attack Vectors
        </CardTitle>
        <CardDescription>
          Potential attack paths identified by correlating vulnerabilities, exposed assets, and intelligence data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {attackVectors.map((vector, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className={`p-4 ${getLikelihoodColor(vector.likelihood)}`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-medium flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    {vector.name}
                  </h4>
                  <Badge className={
                    vector.likelihood === "Critical" ? "bg-red-500" : 
                    vector.likelihood === "High" ? "bg-orange-500" : 
                    vector.likelihood === "Medium" ? "bg-yellow-500" : "bg-green-500"
                  }>
                    {vector.likelihood} Likelihood
                  </Badge>
                </div>
                <p className="text-sm mt-2">
                  {vector.description}
                </p>
              </div>
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Affected Technologies</h5>
                    <div className="flex flex-wrap gap-2">
                      {vector.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Mitigation Strategies</h5>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {vector.mitigations.map((mitigation, idx) => (
                        <li key={idx}>{mitigation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttackVectorPanel;
