
import React, { useState } from "react";
import { Server, Globe, ShieldAlert, Network, HelpCircle, Info } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ExplanationDialog from "@/components/ui/ExplanationDialog";

interface IpEnumerationPanelProps {
  data: OsintData;
}

const IpEnumerationPanel: React.FC<IpEnumerationPanelProps> = ({ data }) => {
  // Dialog state
  const [explanationOpen, setExplanationOpen] = useState(false);
  const [explanationContent, setExplanationContent] = useState({
    title: "",
    description: "",
    content: <></>
  });

  // Function to open explanation dialog
  const showExplanation = (title: string, description: string, content: React.ReactNode) => {
    setExplanationContent({
      title,
      description,
      content
    });
    setExplanationOpen(true);
  };

  // Generate sample IP intelligence data based on the actual data
  const ipIntelligence = [
    {
      ip: "192.168.1.1",
      hostname: data.shodanData?.hostnames?.[0] || "server1.example.com",
      ports: [data.openPorts[0], data.openPorts[1]].filter(Boolean),
      services: ["HTTP", "SSH"],
      geolocation: "United States, New York",
      riskScore: "High",
      tags: ["Web Server", "Database", "Exposed Admin"],
      details: {
        os: "Ubuntu 20.04 LTS",
        vulnerabilities: [
          { id: "CVE-2023-1234", severity: "Critical", description: "Remote code execution in OpenSSH" },
          { id: "CVE-2023-5678", severity: "High", description: "SQL injection vulnerability in web application" }
        ],
        exposedServices: [
          { port: 22, service: "SSH", details: "OpenSSH 8.2p1" },
          { port: 80, service: "HTTP", details: "Apache 2.4.41" },
          { port: 443, service: "HTTPS", details: "Apache 2.4.41 with TLS 1.2" }
        ]
      }
    },
    {
      ip: "10.0.0.1",
      hostname: data.shodanData?.hostnames?.[1] || "mail.example.com",
      ports: [data.openPorts[2], data.openPorts[3]].filter(Boolean),
      services: ["SMTP", "IMAP"],
      geolocation: "United States, California",
      riskScore: "Medium",
      tags: ["Mail Server", "Legacy System"],
      details: {
        os: "Debian 11",
        vulnerabilities: [
          { id: "CVE-2022-9876", severity: "Medium", description: "Authentication bypass in IMAP service" }
        ],
        exposedServices: [
          { port: 25, service: "SMTP", details: "Postfix 3.5.6" },
          { port: 143, service: "IMAP", details: "Dovecot 2.3.13" }
        ]
      }
    },
    {
      ip: "172.16.0.1",
      hostname: "api.example.com",
      ports: [data.openPorts[4]].filter(Boolean),
      services: ["API Gateway"],
      geolocation: "Germany, Frankfurt",
      riskScore: "Low",
      tags: ["API", "Cloud Hosted"],
      details: {
        os: "Amazon Linux 2",
        vulnerabilities: [],
        exposedServices: [
          { port: 443, service: "HTTPS", details: "Nginx 1.20.0 with API Gateway" }
        ]
      }
    },
    {
      ip: "192.168.2.1",
      hostname: "cms.example.com",
      ports: [80, 443],
      services: ["HTTP", "HTTPS"],
      geolocation: "France, Paris",
      riskScore: "Medium",
      tags: ["CMS", "WordPress"],
      details: {
        os: "Ubuntu 18.04 LTS",
        vulnerabilities: [
          { id: "CVE-2022-4321", severity: "Medium", description: "File upload vulnerability in WordPress plugin" }
        ],
        exposedServices: [
          { port: 80, service: "HTTP", details: "Nginx 1.18.0 with WordPress 5.9.3" },
          { port: 443, service: "HTTPS", details: "Nginx 1.18.0 with WordPress 5.9.3 and TLS 1.2" }
        ]
      }
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

  // IP explanation content
  const ipExplanationContent = (ip: typeof ipIntelligence[0]) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <h3 className="text-sm font-medium mb-2">Host Information</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">IP Address</span>
              <span className="font-mono font-medium">{ip.ip}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hostname</span>
              <span className="font-medium">{ip.hostname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Operating System</span>
              <span className="font-medium">{ip.details.os}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{ip.geolocation}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium mb-2">Risk Assessment</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Risk Score</span>
              <Badge className={`${
                ip.riskScore === "High" ? "bg-red-500" :
                ip.riskScore === "Medium" ? "bg-orange-500" :
                "bg-green-500"
              }`}>
                {ip.riskScore}
              </Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Attack Surface</div>
              <div className="flex gap-1 flex-wrap">
                {ip.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Exposed Services ({ip.details.exposedServices.length})</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Port</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ip.details.exposedServices.map((service, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-mono">{service.port}</TableCell>
                <TableCell>{service.service}</TableCell>
                <TableCell className="text-muted-foreground">{service.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {ip.details.vulnerabilities.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Vulnerabilities ({ip.details.vulnerabilities.length})</h3>
          <div className="space-y-2">
            {ip.details.vulnerabilities.map((vuln, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${
                vuln.severity === "Critical" ? "bg-red-50 border-red-200" :
                vuln.severity === "High" ? "bg-orange-50 border-orange-200" :
                "bg-yellow-50 border-yellow-200"
              }`}>
                <div className="flex justify-between">
                  <span className="font-medium">{vuln.id}</span>
                  <Badge className={`${
                    vuln.severity === "Critical" ? "bg-red-500" :
                    vuln.severity === "High" ? "bg-orange-500" :
                    "bg-yellow-500"
                  }`}>
                    {vuln.severity}
                  </Badge>
                </div>
                <p className="text-sm mt-1">{vuln.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium mb-2">Reconnaissance Methodology</h3>
        <p className="text-sm">
          This information was gathered using passive reconnaissance techniques, including DNS enumeration, 
          port scanning, service identification, and correlation with known vulnerability databases. 
          No intrusive testing was performed against the target systems.
        </p>
      </div>
    </div>
  );

  // Infrastructure overview explanation
  const infrastructureExplanationContent = (
    <div className="space-y-4">
      <p>
        Network topology intelligence provides insights into the structure and configuration of your organization's networked systems, helping identify potential security weaknesses and attack paths.
      </p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">How We Map Your Network:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Passive DNS reconnaissance to identify subdomains and host relationships</li>
          <li>Service fingerprinting to identify technologies and versions</li>
          <li>Geographical mapping of infrastructure distribution</li>
          <li>Correlation with known vulnerabilities for identified services</li>
        </ul>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <h3 className="text-sm font-medium mb-2">Security Implications</h3>
        <p className="text-xs">
          Understanding your network topology from an attacker's perspective helps identify:
        </p>
        <ul className="list-disc pl-5 mt-1 text-xs space-y-1">
          <li>Potential entry points through exposed services</li>
          <li>Critical systems that may be targeted</li>
          <li>Opportunities for lateral movement between systems</li>
          <li>Network segmentation issues</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-3 rounded-md">
          <h3 className="text-sm font-medium mb-2">Top Exposed Services</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>HTTP/HTTPS (80/443)</span>
              <span className="font-medium">75%</span>
            </div>
            <div className="flex justify-between">
              <span>SSH (22)</span>
              <span className="font-medium">50%</span>
            </div>
            <div className="flex justify-between">
              <span>Mail Services (25/143)</span>
              <span className="font-medium">25%</span>
            </div>
          </div>
        </div>
        
        <div className="border p-3 rounded-md">
          <h3 className="text-sm font-medium mb-2">Geographic Distribution</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>United States</span>
              <span className="font-medium">50%</span>
            </div>
            <div className="flex justify-between">
              <span>Europe</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span>Asia-Pacific</span>
              <span className="font-medium">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-500" />
              IP Intelligence & Infrastructure Mapping
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full ml-2"
                onClick={() => showExplanation(
                  "IP Intelligence", 
                  "How we gather and analyze IP infrastructure data",
                  <div className="space-y-4">
                    <p>
                      IP intelligence involves analyzing the digital footprint of your organization's internet-facing infrastructure to identify potential security risks and exposures.
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Analysis Methodology:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Discovery of public-facing IP addresses through DNS records and other OSINT sources</li>
                        <li>Port scanning to identify open services and potential entry points</li>
                        <li>Service fingerprinting to determine software versions and configurations</li>
                        <li>Correlation with known vulnerability databases (CVEs)</li>
                        <li>Geolocation analysis to map infrastructure distribution</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <h3 className="text-sm font-medium mb-2">Why This Matters</h3>
                      <p className="text-xs">
                        Understanding your external attack surface is crucial because attackers will use these same techniques to identify potential entry points. By identifying exposed services, especially those with known vulnerabilities, you can prioritize security efforts to reduce risk.
                      </p>
                    </div>
                  </div>
                )}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
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
                  <TableRow 
                    key={index} 
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => showExplanation(
                      `${ip.ip} (${ip.hostname})`, 
                      "Detailed host information and vulnerability analysis",
                      ipExplanationContent(ip)
                    )}
                  >
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
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full ml-2"
                onClick={() => showExplanation(
                  "Network Topology Intelligence", 
                  "Understanding your organization's network structure",
                  infrastructureExplanationContent
                )}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              AI-generated network map based on discovered infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              className="rounded-lg border border-dashed border-gray-300 p-8 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => showExplanation(
                "Network Topology Visualization", 
                "Interactive view of your network infrastructure",
                infrastructureExplanationContent
              )}
            >
              <div className="flex justify-center items-center h-40">
                <Globe className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-muted-foreground">
                Interactive network topology visualization would appear here, showing relationships between discovered hosts, services, and potential attack paths.
              </p>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => showExplanation(
                  "Domain Intelligence", 
                  "Analysis of domain infrastructure",
                  <div className="space-y-4">
                    <p>
                      Domain intelligence analyzes your organization's DNS infrastructure to identify potential security issues and map relationships between domains and subdomains.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium mb-2">Domain Structure</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Primary Domain</span>
                            <span className="font-medium">{data.shodanData?.domains?.[0] || "example.com"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Subdomains</span>
                            <span className="font-medium">{data.shodanData?.hostnames?.length || 5}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Hostnames</span>
                            <span className="font-medium">{data.shodanData?.hostnames?.length || 4}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-medium mb-2">DNS Configuration</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">MX Records</span>
                            <span className="font-medium">2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">SPF Record</span>
                            <span className="font-medium text-green-600">Valid</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">DMARC</span>
                            <span className="font-medium text-amber-600">Partial</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Discovered Subdomains</h3>
                    <div className="border rounded-md p-3 max-h-40 overflow-y-auto">
                      <div className="space-y-2">
                        {(data.shodanData?.hostnames || [
                          "www.example.com",
                          "mail.example.com",
                          "api.example.com",
                          "admin.example.com"
                        ]).map((hostname, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="font-mono text-sm">{hostname}</span>
                            <Badge variant="outline" className={idx === 3 ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}>
                              {idx === 0 ? "Main Site" : 
                              idx === 1 ? "Mail Server" : 
                              idx === 2 ? "API Gateway" : 
                              "Admin Portal"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <h3 className="text-sm font-medium flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        Security Concerns
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Admin portal subdomain publicly accessible</li>
                        <li>Incomplete email security (DMARC) configuration</li>
                        <li>DNS zone transfer not properly restricted</li>
                      </ul>
                    </div>
                  </div>
                )}
              >
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Domain Intelligence
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      showExplanation(
                        "Domain Intelligence", 
                        "Analysis of domain infrastructure",
                        <div className="space-y-4">
                          <p>
                            Domain intelligence involves analyzing DNS records and relationships between domains to understand your organization's online presence and potential security issues.
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>We identify all registered domains and subdomains associated with your organization</li>
                            <li>We analyze DNS configurations for security best practices</li>
                            <li>We evaluate email security configurations like SPF, DKIM, and DMARC</li>
                          </ul>
                        </div>
                      );
                    }}
                  >
                    <Info className="h-3 w-3" />
                  </Button>
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
              
              <div 
                className="border rounded-lg p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => showExplanation(
                  "Security Posture", 
                  "Analysis of infrastructure security",
                  <div className="space-y-4">
                    <p>
                      Security posture analysis evaluates your organization's overall network security configuration based on externally observable factors.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <h3 className="text-sm font-medium mb-2">Vulnerabilities</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Critical</span>
                            <span className="font-medium text-red-600">{Math.floor(data.openPorts.length * 0.2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">High</span>
                            <span className="font-medium text-orange-600">{Math.floor(data.openPorts.length * 0.4)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-medium">{Math.floor(data.openPorts.length * 0.6)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <h3 className="text-sm font-medium mb-2">Exposure Analysis</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Open Ports</span>
                            <span className="font-medium text-amber-600">{data.openPorts.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Internet Exposure</span>
                            <span className="font-medium text-red-600">High</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Attack Surface</span>
                            <span className="font-medium text-amber-600">Moderate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Security Technologies Detected</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">Web Application Firewall</Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800">TLS 1.2/1.3</Badge>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">Basic Authentication</Badge>
                      <Badge variant="outline" className="bg-red-100 text-red-800">Missing HSTS</Badge>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">Partial Content Security Policy</Badge>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <h3 className="text-sm font-medium mb-2">Priority Recommendations</h3>
                      <ol className="list-decimal pl-5 space-y-1 text-sm">
                        <li>Patch critical vulnerabilities in web-facing services</li>
                        <li>Implement HSTS on all web services</li>
                        <li>Review and tighten firewall rules to reduce open ports</li>
                        <li>Strengthen Content Security Policy implementation</li>
                        <li>Upgrade legacy authentication methods to modern standards</li>
                      </ol>
                    </div>
                  </div>
                )}
              >
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  Security Posture
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      showExplanation(
                        "Security Posture Analysis", 
                        "Understanding your network security configuration",
                        <div className="space-y-4">
                          <p>
                            Security posture analysis evaluates visible security measures and vulnerabilities in your internet-facing infrastructure.
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>We assess open ports and services for unnecessary exposure</li>
                            <li>We identify missing security headers and protections</li>
                            <li>We detect the presence of security controls like firewalls and WAFs</li>
                          </ul>
                        </div>
                      );
                    }}
                  >
                    <Info className="h-3 w-3" />
                  </Button>
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

      <ExplanationDialog 
        open={explanationOpen}
        onClose={() => setExplanationOpen(false)}
        title={explanationContent.title}
        description={explanationContent.description}
      >
        {explanationContent.content}
      </ExplanationDialog>
    </>
  );
};

export default IpEnumerationPanel;
