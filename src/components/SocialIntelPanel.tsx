
import React from "react";
import { UserCheck, Users, Building, AtSign, Phone, Linkedin, Twitter } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SocialIntelPanelProps {
  data: OsintData;
}

const SocialIntelPanel: React.FC<SocialIntelPanelProps> = ({ data }) => {
  // Generate sample social intelligence data
  const employees = [
    {
      name: "John Smith",
      title: "Chief Technology Officer",
      email: "j.smith@example.com",
      phone: data.contactInformation.phone[0] || "+1-555-123-4567",
      socialProfiles: ["LinkedIn", "Twitter"],
      exposureRisk: "High",
      foundIn: ["LinkedIn", "Data Breach", "Company Website"]
    },
    {
      name: "Mary Johnson",
      title: "VP of Engineering",
      email: "m.johnson@example.com",
      phone: data.contactInformation.phone[1] || "+1-555-234-5678",
      socialProfiles: ["LinkedIn"],
      exposureRisk: "Medium",
      foundIn: ["LinkedIn", "Company Website"]
    },
    {
      name: "David Williams",
      title: "Senior DevOps Engineer",
      email: "d.williams@example.com",
      phone: "",
      socialProfiles: ["LinkedIn", "GitHub"],
      exposureRisk: "Critical",
      foundIn: ["LinkedIn", "Data Breach", "GitHub", "Password Reuse"]
    },
    {
      name: "Sarah Brown",
      title: "Information Security Officer",
      email: "s.brown@example.com",
      phone: "",
      socialProfiles: ["LinkedIn", "Twitter"],
      exposureRisk: "Low",
      foundIn: ["LinkedIn", "Company Website"]
    }
  ];

  // Function to get exposure risk color
  const getExposureRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const organizationMetadata = {
    employees: {
      identified: 45 + Math.floor(Math.random() * 20),
      withExposedData: 12 + Math.floor(Math.random() * 8)
    },
    socialPresence: {
      platforms: ["LinkedIn", "Twitter", "Facebook", "Instagram"],
      publicPosts: 324 + Math.floor(Math.random() * 100)
    },
    sensitiveDocuments: {
      count: Object.values(data.fileSearch).flat().length,
      mostRecent: "Financial Report Q2 2023"
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-500" />
            Human Intelligence (HUMINT) Analysis
          </CardTitle>
          <CardDescription>
            Organizational structure and key personnel information derived from OSINT sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Employee Intelligence
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Identified Employees</span>
                  <span className="font-medium">{organizationMetadata.employees.identified}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>With Exposed Data</span>
                  <span className="font-medium text-red-600">{organizationMetadata.employees.withExposedData}</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-purple-50">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Building className="h-4 w-4 text-purple-500" />
                Organizational Structure
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Departments Identified</span>
                  <span className="font-medium">{data.organizationStructure.length || 6}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Key Leadership</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-green-50">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <AtSign className="h-4 w-4 text-green-500" />
                Social Media Presence
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Platforms</span>
                  <span className="font-medium">{organizationMetadata.socialPresence.platforms.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Public Posts Analyzed</span>
                  <span className="font-medium">{organizationMetadata.socialPresence.publicPosts}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Key Personnel with Exposure Risk</h4>
            {employees.map((employee, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-medium">{employee.name}</h5>
                    <p className="text-sm text-muted-foreground">{employee.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {employee.socialProfiles.includes("LinkedIn") && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
                          <Linkedin className="h-3 w-3" />
                          LinkedIn
                        </Badge>
                      )}
                      {employee.socialProfiles.includes("Twitter") && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
                          <Twitter className="h-3 w-3" />
                          Twitter
                        </Badge>
                      )}
                      {employee.socialProfiles.includes("GitHub") && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
                          GitHub
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{employee.phone}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Badge className={getExposureRiskColor(employee.exposureRisk)}>
                    {employee.exposureRisk} Risk
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-2">
                    Found in: {employee.foundIn.join(", ")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialIntelPanel;
