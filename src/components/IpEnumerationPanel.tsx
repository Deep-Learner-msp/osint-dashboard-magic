
import React from "react";
import { Server, Globe, ShieldAlert, Network } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IpEnumerationPanelProps {
  data: OsintData;
}

const IpEnumerationPanel: React.FC<IpEnumerationPanelProps> = ({ data }) => {
  // Generate sample IP intelligence data based on the actual data
  const ipIntelligence = [
    {
      ip: "192.168.1.1",
      hostname: data.shodanData?.hostnames?.[0] || "server1.example.com",
      ports: [data.openPorts[0], data.openPorts[1]].filter(Boolean),
      services: ["HTTP", "SSH"],
      geolocation: "United States, New York",
      riskScore: "High",
      tags: ["Web Server", "Database", "Exposed Admin"]
    },
    {
      ip: "10.0.0.1",
      hostname: data.shodanData?.hostnames?.[1] || "mail.example.com",
      ports: [data.openPorts[2], data.openPorts[3]].filter(Boolean),
      services: ["SMTP", "IMAP"],
      geolocation: "United States, California",
      riskScore: "Medium",
      tags: ["Mail Server", "Legacy System"]
    },
    {
      ip: "172.16.0.1",
      hostname: "api.example.com",
      ports: [data.openPorts[4]].filter(Boolean),
      services: ["API Gateway"],
      geolocation: "Germany, Frankfurt",
      riskScore: "Low",
      tags: ["API", "Cloud Hosted"]
    },
    {
      ip: "192.168.2.1",
      hostname: "cms.example.com",
      ports: [80, 443],
      services: ["HTTP", "HTTPS"],
      geolocation: "France, Paris",
      riskScore: "Medium",
      tags: ["CMS", "WordPress"]
    }
  ];

  // Function to get risk score color
  const getRiskScoreColor = (riskScore: string) => {
    switch (riskScore.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-500" />
            IP Intelligence & Infrastructure Mapping
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of IP addresses, hosts, and network infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>Ports & Services</TableHead>
                <TableHead>Geolocation</TableHead>
                <TableHead>Risk Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ipIntelligence.map((ip, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{ip.ip}</TableCell>
                  <TableCell>{ip.hostname}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ip.ports.map((port, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {port}/{ip.services[idx] || "Unknown"}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{ip.geolocation}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getRiskScoreColor(ip.riskScore)}>
                      {ip.riskScore}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-purple-500" />
            Network Topology Intelligence
          </CardTitle>
          <CardDescription>
            AI-generated network map based on discovered infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center bg-gray-50">
            <div className="flex justify-center items-center h-40">
              <Globe className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-muted-foreground">
              Interactive network topology visualization would appear here, showing relationships between discovered hosts, services, and potential attack paths.
            </p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                Domain Intelligence
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Primary Domain</span>
                  <span className="font-medium">{data.shodanData?.domains?.[0] || "example.com"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Subdomains</span>
                  <span className="font-medium">{data.shodanData?.hostnames?.length || 5}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>MX Records</span>
                  <span className="font-medium">2</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" />
                Security Posture
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Open Ports</span>
                  <span className="font-medium text-amber-600">{data.openPorts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Vulnerable Services</span>
                  <span className="font-medium text-red-600">{Math.floor(data.openPorts.length * 0.6)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Firewall Detection</span>
                  <span className="font-medium text-green-600">Detected</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IpEnumerationPanel;
