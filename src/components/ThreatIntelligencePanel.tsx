import React, { useState } from "react";
import { Shield, AlertTriangle, Lock, BarChart, Users, Briefcase, Linkedin, ExternalLink, AlertCircle, Info, HelpCircle } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ExplanationDialog from "@/components/ui/ExplanationDialog";

interface ThreatIntelligencePanelProps {
  data: OsintData;
}

const ThreatIntelligencePanel: React.FC<ThreatIntelligencePanelProps> = ({ data }) => {
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

  // LinkedIn data for SC Lowy's key executives
  const executives = [
    {
      name: "Michel Lowy",
      position: "Co-Founder and CEO",
      linkedinUrl: "https://hk.linkedin.com/in/michel-lowy-8840b65",
      about: "Global Co-Portfolio Manager at SC Lowy.",
      cheesyInfo: "Steering the SC Lowy ship with a steady hand and a keen eye for opportunities.",
      exposureRisk: "Medium"
    },
    {
      name: "Soo Cheon Lee",
      position: "Co-Founder and CIO",
      linkedinUrl: "https://hk.linkedin.com/in/soo-cheon-lee-a155b8a7",
      about: "Co-Global Portfolio Manager at SC Lowy.",
      cheesyInfo: "The financial maestro orchestrating investment strategies with precision and flair.",
      exposureRisk: "Low"
    },
    {
      name: "Arjun Malhotra",
      position: "Head of Trading",
      linkedinUrl: "https://uk.linkedin.com/in/arjunmalhotra",
      about: "Trading, risk management, and research experience across debt and equity products.",
      cheesyInfo: "The trading guru turning market fluctuations into golden opportunities.",
      exposureRisk: "High"
    },
    {
      name: "Ethan Yiqing Ma",
      position: "Asia Credit",
      linkedinUrl: "https://hk.linkedin.com/in/ethan-yiqing-ma-5788639",
      about: "Asia Credit at SC Lowy.",
      cheesyInfo: "Bridging the gap between East and West, one credit deal at a time.",
      exposureRisk: "Medium"
    }
  ];

  // Recent breach news in the financial sector
  const breachNews = [
    {
      title: "LoanDepot Data Breach",
      date: "January 2024",
      impact: "16.9 million customers affected",
      details: "Sensitive information, including Social Security numbers and financial details, was compromised. A $25 million settlement fund has been established.",
      severity: "High",
      biasDistribution: {
        leftLeaning: 38,
        center: 42,
        rightLeaning: 20
      },
      factualityScore: 87,
      sources: {
        us: 65,
        uk: 22,
        eu: 10,
        asia: 3
      }
    },
    {
      title: "Snowflake Customer Data Breach",
      date: "2024",
      impact: "100+ organizations affected",
      details: "Hackers affiliated with Scattered Spider executed a mass data breach campaign, accessing data from over 100 Snowflake customers including AT&T and Santander Bank.",
      severity: "Critical",
      biasDistribution: {
        leftLeaning: 25,
        center: 60,
        rightLeaning: 15
      },
      factualityScore: 92,
      sources: {
        us: 42,
        uk: 30,
        eu: 15,
        asia: 13
      }
    },
    {
      title: "Finastra Data Breach",
      date: "November 2024",
      impact: "Unknown scale",
      details: "Breach targeted Finastra's internally hosted Secure File Transfer Platform, exploiting stolen credentials. Finastra serves 45 of the world's top 50 banks.",
      severity: "High",
      biasDistribution: {
        leftLeaning: 32,
        center: 45,
        rightLeaning: 23
      },
      factualityScore: 79,
      sources: {
        us: 50,
        uk: 28,
        eu: 12,
        asia: 10
      }
    }
  ];

  // Brand intelligence metrics
  const brandMetrics = {
    sentimentScore: 72,
    mediaPresence: {
      positive: 56,
      neutral: 34,
      negative: 10
    },
    sourceBias: {
      leftLeaning: 28,
      center: 59,
      rightLeaning: 13,
    },
    factualityScore: 81,
    recentMentions: 134
  };

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

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  // MITRE ATT&CK Framework explanation content
  const mitreExplanationContent = (
    <div className="space-y-4">
      <p>
        The MITRE ATT&CK® (Adversarial Tactics, Techniques, & Common Knowledge) Framework is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.
      </p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">How We Map CVEs to MITRE ATT&CK:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Analyze vulnerability characteristics and potential exploitation methods</li>
          <li>Determine which tactics and techniques could leverage the vulnerability</li>
          <li>Map the vulnerability to specific MITRE ATT&CK techniques</li>
          <li>Assess potential impact if exploited via the identified techniques</li>
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-sm font-medium mb-2">Example: CVE-2023-3456 Mapping</h3>
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>MITRE Tactic:</span>
            <span className="font-medium">Initial Access (TA0001)</span>
          </div>
          <div className="flex justify-between">
            <span>MITRE Technique:</span>
            <span className="font-medium">Exploit Public-Facing Application (T1190)</span>
          </div>
          <div className="flex justify-between">
            <span>Sub-Technique:</span>
            <span className="font-medium">SSH Service (T1190.001)</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        This mapping helps security teams understand how attackers might leverage specific vulnerabilities within their attack chain, enabling more effective detection and mitigation strategies.
      </p>
    </div>
  );

  // CVE Scoring explanation content
  const cveExplanationContent = (
    <div className="space-y-4">
      <p>
        CVE (Common Vulnerabilities and Exposures) severity assessment is primarily based on the CVSS (Common Vulnerability Scoring System) which evaluates the impact and exploitability of security vulnerabilities.
      </p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">CVSS Scoring Components:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><span className="font-medium">Base Score:</span> The intrinsic characteristics of a vulnerability that are constant over time</li>
          <li><span className="font-medium">Temporal Score:</span> Characteristics that evolve over the lifetime of a vulnerability</li>
          <li><span className="font-medium">Environmental Score:</span> Characteristics that are unique to a user's environment</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="p-2 bg-red-50 border border-red-200 rounded-md text-center">
          <div className="text-xs text-muted-foreground">Critical</div>
          <div className="text-sm font-bold text-red-600">9.0-10.0</div>
        </div>
        <div className="p-2 bg-orange-50 border border-orange-200 rounded-md text-center">
          <div className="text-xs text-muted-foreground">High</div>
          <div className="text-sm font-bold text-orange-600">7.0-8.9</div>
        </div>
        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md text-center">
          <div className="text-xs text-muted-foreground">Medium</div>
          <div className="text-sm font-bold text-yellow-600">4.0-6.9</div>
        </div>
        <div className="p-2 bg-green-50 border border-green-200 rounded-md text-center">
          <div className="text-xs text-muted-foreground">Low</div>
          <div className="text-sm font-bold text-green-600">0.1-3.9</div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
        <h3 className="text-sm font-medium mb-2">Example: CVE-2023-3456</h3>
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Base Score:</span>
            <span className="font-medium">9.8 (Critical)</span>
          </div>
          <div className="flex justify-between">
            <span>Attack Vector:</span>
            <span className="font-medium">Network</span>
          </div>
          <div className="flex justify-between">
            <span>Attack Complexity:</span>
            <span className="font-medium">Low</span>
          </div>
          <div className="flex justify-between">
            <span>Privileges Required:</span>
            <span className="font-medium">None</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Brand bias explanation content
  const biasExplanationContent = (
    <div className="space-y-4">
      <p>
        Media bias analysis evaluates the political leaning and factuality of sources reporting on your organization. This helps understand how your organization is perceived across the political spectrum.
      </p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">How We Analyze Media Bias:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li><span className="font-medium">Source Analysis:</span> We evaluate the political leaning of each source based on established media bias charts</li>
          <li><span className="font-medium">Content Analysis:</span> We analyze the language, framing, and perspective in articles mentioning your organization</li>
          <li><span className="font-medium">Factuality Assessment:</span> We evaluate how accurately facts are presented in coverage of your organization</li>
        </ul>
      </div>
      
      <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-400 to-red-500 mb-1 overflow-hidden mt-4">
        <div className="absolute inset-0 flex">
          <div style={{ width: `${brandMetrics.sourceBias.leftLeaning}%` }}></div>
          <div 
            style={{ width: `${brandMetrics.sourceBias.center}%` }}
            className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full h-3 w-3"></div>
            </div>
          </div>
          <div style={{ width: `${brandMetrics.sourceBias.rightLeaning}%` }}></div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <div>Left-leaning</div>
        <div>Center</div>
        <div>Right-leaning</div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Understanding media bias helps organizations tailor their communications strategy and identify potential reputation risks across different audiences.
      </p>
    </div>
  );

  // News article bias explanation content
  const newsExplanationContent = (newsItem: typeof breachNews[0]) => (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-white">
        <h3 className="font-medium">{newsItem.title}</h3>
        <div className="text-xs text-muted-foreground mt-1">{newsItem.date} • {newsItem.impact}</div>
        <p className="text-sm mt-2">{newsItem.details}</p>
        
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium">Media Bias Distribution</h4>
            <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-400 to-red-500 mb-1 overflow-hidden mt-2">
              <div className="absolute inset-0 flex">
                <div style={{ width: `${newsItem.biasDistribution.leftLeaning}%` }}></div>
                <div 
                  style={{ width: `${newsItem.biasDistribution.center}%` }}
                  className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full h-3 w-3"></div>
                  </div>
                </div>
                <div style={{ width: `${newsItem.biasDistribution.rightLeaning}%` }}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <div>Left: {newsItem.biasDistribution.leftLeaning}%</div>
              <div>Center: {newsItem.biasDistribution.center}%</div>
              <div>Right: {newsItem.biasDistribution.rightLeaning}%</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Factuality Score</h4>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={newsItem.factualityScore} className="h-2 flex-1" />
              <span className="text-xs font-medium">{newsItem.factualityScore}/100</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on source credibility, fact verification, and citation quality.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium">Geographic Coverage Distribution</h4>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <div className="p-2 bg-blue-50 border border-blue-100 rounded-md text-center">
                <div className="text-xs">US</div>
                <div className="text-sm font-medium">{newsItem.sources.us}%</div>
              </div>
              <div className="p-2 bg-purple-50 border border-purple-100 rounded-md text-center">
                <div className="text-xs">UK</div>
                <div className="text-sm font-medium">{newsItem.sources.uk}%</div>
              </div>
              <div className="p-2 bg-green-50 border border-green-100 rounded-md text-center">
                <div className="text-xs">EU</div>
                <div className="text-sm font-medium">{newsItem.sources.eu}%</div>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-100 rounded-md text-center">
                <div className="text-xs">Asia</div>
                <div className="text-sm font-medium">{newsItem.sources.asia}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        This analysis helps you understand how this security incident is being perceived across different regions and political perspectives.
      </p>
    </div>
  );

  return (
    <>
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Threat & Brand Intelligence
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 rounded-full ml-2"
              onClick={() => showExplanation(
                "Threat Intelligence Analysis", 
                "How we analyze and map security threats",
                mitreExplanationContent
              )}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            AI-correlated threat intelligence, social media analysis, and brand monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="threats" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="threats" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Threat Intelligence
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Key Personnel
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" />
                Brand Intelligence
              </TabsTrigger>
            </TabsList>
            
            {/* Threat Intelligence Tab */}
            <TabsContent value="threats" className="space-y-4">
              <div className="grid gap-4">
                {threatEntities.map((threat, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => showExplanation(
                      `${threat.id}: ${threat.name}`,
                      `${threat.type} Details and MITRE ATT&CK Mapping`,
                      cveExplanationContent
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-100">
                            {threat.type}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-5 w-5 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              showExplanation(
                                `${threat.type} Severity Explained`,
                                "How we calculate and classify severity scores",
                                cveExplanationContent
                              );
                            }}
                          >
                            <Info className="h-3 w-3" />
                          </Button>
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
              
              <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="text-sm font-medium flex items-center gap-2 text-amber-800 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  Recent Financial Sector Breaches
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={() => showExplanation(
                      "News Bias Analysis",
                      "How we analyze bias in security news coverage",
                      biasExplanationContent
                    )}
                  >
                    <Info className="h-3 w-3" />
                  </Button>
                </h3>
                <div className="space-y-3">
                  {breachNews.map((news, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-3 rounded border border-amber-100 hover:bg-amber-50 cursor-pointer transition-colors"
                      onClick={() => showExplanation(
                        `${news.title} - Media Analysis`,
                        "Geographic and political distribution of coverage",
                        newsExplanationContent(news)
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium">{news.title}</h4>
                        <Badge className={getSeverityColor(news.severity)}>
                          {news.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {news.date} • {news.impact}
                      </div>
                      <p className="text-xs mt-2">{news.details}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="text-xs">Factuality:</div>
                        <Progress value={news.factualityScore} className="h-1 flex-1" />
                        <span className="text-xs font-medium">{news.factualityScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Social Intelligence Tab */}
            <TabsContent value="social">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Executive Exposure
                    </h3>
                    <div className="text-2xl font-bold text-blue-700 mb-1">
                      {executives.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Key personnel identified and analyzed
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-purple-600" />
                      LinkedIn Presence
                    </h3>
                    <div className="text-2xl font-bold text-purple-700 mb-1">
                      100%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      All executives have LinkedIn profiles
                    </div>
                  </div>
                </div>
              
                {executives.map((executive, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {getInitials(executive.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{executive.name}</h4>
                          <p className="text-sm text-muted-foreground">{executive.position}</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{executive.about}</p>
                        <p className="text-xs text-muted-foreground mt-1 italic">"{executive.cheesyInfo}"</p>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <Badge className={getSeverityColor(executive.exposureRisk)}>
                          {executive.exposureRisk} Exposure
                        </Badge>
                        <a 
                          href={executive.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center gap-1 mt-2"
                        >
                          <Linkedin className="h-3 w-3" />
                          LinkedIn Profile
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Brand Intelligence Tab */}
            <TabsContent value="brand">
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-base font-medium mb-3 flex items-center gap-2">
                    Brand Sentiment & Media Analysis
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => showExplanation(
                        "Brand Intelligence Analysis",
                        "How we analyze and score brand perception",
                        biasExplanationContent
                      )}
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-green-50 to-transparent p-3 rounded-lg border">
                      <h4 className="text-sm font-medium mb-1">Sentiment Score</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">{brandMetrics.sentimentScore}</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-transparent p-3 rounded-lg border">
                      <h4 className="text-sm font-medium mb-1">Factuality Score</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">{brandMetrics.factualityScore}</span>
                        <span className="text-xs text-muted-foreground">/100</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-transparent p-3 rounded-lg border">
                      <h4 className="text-sm font-medium mb-1">Recent Mentions</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-purple-600">{brandMetrics.recentMentions}</span>
                        <span className="text-xs text-muted-foreground">last 30 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Media Coverage Distribution</h4>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs w-24">Positive</div>
                        <div className="flex-1">
                          <div className="h-2 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full bg-green-500" 
                              style={{ width: `${brandMetrics.mediaPresence.positive}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">{brandMetrics.mediaPresence.positive}%</div>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-xs w-24">Neutral</div>
                        <div className="flex-1">
                          <div className="h-2 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full bg-blue-500" 
                              style={{ width: `${brandMetrics.mediaPresence.neutral}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">{brandMetrics.mediaPresence.neutral}%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs w-24">Negative</div>
                        <div className="flex-1">
                          <div className="h-2 rounded-full bg-gray-200">
                            <div 
                              className="h-2 rounded-full bg-red-500" 
                              style={{ width: `${brandMetrics.mediaPresence.negative}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-xs font-medium">{brandMetrics.mediaPresence.negative}%</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Source Bias Distribution</h4>
                      <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-400 to-red-500 mb-1 overflow-hidden">
                        <div className="absolute inset-0 flex">
                          <div style={{ width: `${brandMetrics.sourceBias.leftLeaning}%` }}></div>
                          <div 
                            style={{ width: `${brandMetrics.sourceBias.center}%` }}
                            className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative"
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white rounded-full h-3 w-3"></div>
                            </div>
                          </div>
                          <div style={{ width: `${
