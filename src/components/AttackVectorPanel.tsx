
import React, { useState } from "react";
import { Shield, Target, Network, UserCheck, ArrowRight, HelpCircle, Info } from "lucide-react";
import { OsintData } from "@/types/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExplanationDialog from "@/components/ui/ExplanationDialog";

interface AttackVectorPanelProps {
  data: OsintData;
}

const AttackVectorPanel: React.FC<AttackVectorPanelProps> = ({ data }) => {
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

  // Sample attack vectors
  const attackVectors = [
    {
      name: "Web Application Vulnerabilities",
      likelihood: 85,
      severity: "Critical",
      details: "Multiple high-risk vulnerabilities identified in web applications, including potential SQL injection vectors and cross-site scripting opportunities.",
      mitigations: [
        "Implement WAF protection",
        "Regular security testing",
        "Input validation"
      ]
    },
    {
      name: "Network Exposure",
      likelihood: 72,
      severity: "High",
      details: "Excessive number of open ports and services detected across infrastructure, increasing the attack surface and providing potential entry points.",
      mitigations: [
        "Close unnecessary ports",
        "Network segmentation",
        "Firewall rule review"
      ]
    },
    {
      name: "Social Engineering",
      likelihood: 68,
      severity: "Medium",
      details: "High visibility of key personnel online creates opportunities for targeted social engineering attacks. Several executives have detailed information available.",
      mitigations: [
        "Security awareness training",
        "Phishing simulations",
        "Email filtering"
      ]
    },
    {
      name: "Data Breach",
      likelihood: 64,
      severity: "High",
      details: "Existing credential leaks and exposed data suggest insecure storage or handling of sensitive information. This creates opportunities for credential stuffing and account takeover.",
      mitigations: [
        "Encrypt sensitive data",
        "Enforce MFA",
        "Secure data storage"
      ]
    }
  ];

  // Sample defense mechanisms
  const defenses = [
    {
      name: "Web Application Firewall",
      effectiveness: 45,
      status: "Moderate",
      details: "Current WAF configuration provides basic protection but is not fully tuned to the application stack discovered. Several bypass techniques appear viable."
    },
    {
      name: "Network Security",
      effectiveness: 28,
      status: "Weak",
      details: "Network perimeter protections are insufficient, with outdated firewall rules and minimal segmentation. Lateral movement would be relatively easy once initial access is gained."
    },
    {
      name: "Endpoint Protection",
      effectiveness: 72,
      status: "Strong",
      details: "Endpoint security solutions appear to be well-implemented, though some endpoints may be running outdated software versions as indicated by vulnerability scans."
    },
    {
      name: "Data Protection",
      effectiveness: 58,
      status: "Moderate",
      details: "Some data protection controls are in place, but inconsistent application suggests gaps in policy enforcement or coverage."
    }
  ];

  // Function to get color based on likelihood
  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 80) return "text-red-600";
    if (likelihood >= 60) return "text-orange-600";
    if (likelihood >= 40) return "text-yellow-600";
    return "text-green-600";
  };

  // Function to get color based on effectiveness
  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness < 30) return "text-red-600";
    if (effectiveness < 60) return "text-amber-600";
    return "text-green-600";
  };

  // Function to get progress color based on effectiveness
  const getProgressColor = (effectiveness: number) => {
    if (effectiveness < 30) return "bg-red-500";
    if (effectiveness < 60) return "bg-amber-500";
    return "bg-green-500";
  };

  // Attack vector explanation content
  const attackVectorExplanationContent = (vector: typeof attackVectors[0]) => (
    <div className="space-y-4">
      <p className="text-sm">{vector.details}</p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Attack Scenario Analysis</h3>
        <div className="bg-red-50 border border-red-100 rounded-md p-3">
          <p className="text-sm">
            An attacker could exploit {vector.name.toLowerCase()} by first identifying {vector.severity.toLowerCase()}-severity vulnerabilities, then leveraging them to gain unauthorized access. This attack vector has a {vector.likelihood}% likelihood in your environment based on our assessment.
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Recommended Mitigations</h3>
        <ul className="list-disc pl-5 space-y-1">
          {vector.mitigations.map((mitigation, idx) => (
            <li key={idx} className="text-sm">{mitigation}</li>
          ))}
        </ul>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm">
        <h3 className="font-medium">How This Was Determined</h3>
        <p className="mt-1">
          Our AI engine analyzed your organization's infrastructure, web presence, and exposed services, correlating the findings with known attack patterns and MITRE ATT&CK techniques that target similar configurations.
        </p>
      </div>
    </div>
  );

  // Defense explanation content
  const defenseExplanationContent = (defense: typeof defenses[0]) => (
    <div className="space-y-4">
      <p className="text-sm">{defense.details}</p>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Effectiveness Analysis</h3>
        <div className="flex items-center gap-2 mb-2">
          <Progress 
            value={defense.effectiveness} 
            className="h-3 flex-1"
            indicatorClassName={getProgressColor(defense.effectiveness)}
          />
          <span className={`text-sm font-medium ${getEffectivenessColor(defense.effectiveness)}`}>
            {defense.effectiveness}%
          </span>
        </div>
        <div className={`text-sm ${getEffectivenessColor(defense.effectiveness)} bg-opacity-10 p-2 rounded-md`} style={{ backgroundColor: defense.effectiveness < 30 ? 'rgba(239, 68, 68, 0.1)' : defense.effectiveness < 60 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)' }}>
          Current status: <span className="font-medium">{defense.status}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Improvement Recommendations</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {defense.effectiveness < 30 && (
            <>
              <li>Critical: Immediate attention required to implement basic security controls</li>
              <li>Engage security specialists to develop and implement enhanced protection measures</li>
              <li>Consider managed security services if internal resources are limited</li>
            </>
          )}
          {defense.effectiveness >= 30 && defense.effectiveness < 60 && (
            <>
              <li>Strengthen existing controls with more comprehensive coverage</li>
              <li>Address configuration weaknesses and implement additional layers of defense</li>
              <li>Implement regular testing and validation of protective measures</li>
            </>
          )}
          {defense.effectiveness >= 60 && (
            <>
              <li>Fine-tune existing controls to address specific edge cases</li>
              <li>Implement advanced features of current protection systems</li>
              <li>Regularly verify effectiveness through red team exercises</li>
            </>
          )}
        </ul>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm">
        <h3 className="font-medium">Assessment Methodology</h3>
        <p className="mt-1">
          Our defensive posture assessment combines external scanning, configuration analysis, and effectiveness testing based on industry benchmarks and security frameworks like NIST CSF and CIS Controls.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Attack Vector Analysis
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full ml-2"
                onClick={() => showExplanation(
                  "Attack Vector Analysis", 
                  "How we identify and assess potential attack paths",
                  <div className="space-y-4">
                    <p>
                      Our attack vector analysis identifies the most likely paths an attacker would take to compromise your organization's systems or data.
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Analysis Methodology:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>We map your organization's attack surface from the data collected during OSINT scanning</li>
                        <li>We correlate identified vulnerabilities with attacker tactics, techniques, and procedures (TTPs)</li>
                        <li>Our AI engine analyzes patterns across technical, social, and physical security domains</li>
                        <li>We calculate likelihood scores based on ease of exploitation and potential impact</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <h3 className="text-sm font-medium mb-2">How We Calculate Likelihood</h3>
                      <div className="text-xs space-y-1">
                        <p>Likelihood scores consider multiple factors:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Vulnerability severity and complexity of exploitation</li>
                          <li>Presence of mitigating controls</li>
                          <li>Real-world attack patterns and trends</li>
                          <li>Industry-specific threat actor behaviors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              AI-identified potential attack paths based on discovered vulnerabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attackVectors.map((vector, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => showExplanation(
                    `${vector.name} Attack Vector`,
                    `Analysis of ${vector.name.toLowerCase()} as a potential attack path`,
                    attackVectorExplanationContent(vector)
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium mb-1 flex items-center gap-2">
                        {vector.name}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          vector.severity === "Critical" ? "bg-red-100 text-red-800" :
                          vector.severity === "High" ? "bg-orange-100 text-orange-800" :
                          vector.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {vector.severity}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{vector.details}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-lg font-bold ${getLikelihoodColor(vector.likelihood)}`}>
                        {vector.likelihood}%
                      </div>
                      <div className="text-xs text-gray-500">Likelihood</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Recommended Mitigations:</span>
                    <div className="flex flex-wrap gap-1">
                      {vector.mitigations.map((mitigation, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-800 px-2 py-0.5 rounded-full">
                          {mitigation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Defensive Posture Analysis
              <Button 
                variant="ghost" 
                size="icon"
                className="h-6 w-6 rounded-full ml-2"
                onClick={() => showExplanation(
                  "Defensive Posture Analysis", 
                  "How we evaluate your security controls and defenses",
                  <div className="space-y-4">
                    <p>
                      We analyze the effectiveness of your organization's security controls based on evidence gathered during our reconnaissance and intelligence gathering.
                    </p>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Assessment Criteria:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Visibility of security controls from external perspective</li>
                        <li>Evidence of proper security configurations</li>
                        <li>Industry best practice implementation</li>
                        <li>Security control coverage across different attack vectors</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <h3 className="text-sm font-medium mb-2">How We Calculate Effectiveness</h3>
                      <div className="text-xs space-y-1">
                        <p>Effectiveness scores consider multiple factors:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Presence of industry-standard security controls</li>
                          <li>Proper implementation and configuration</li>
                          <li>Comprehensive coverage of attack surfaces</li>
                          <li>Evidence of security testing and validation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              Current security measures effectiveness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {defenses.map((defense, index) => (
                <div 
                  key={index}
                  className="border rounded-lg p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => showExplanation(
                    `${defense.name} Analysis`,
                    `Effectiveness assessment of ${defense.name.toLowerCase()} controls`,
                    defenseExplanationContent(defense)
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-medium">{defense.name}</h3>
                    <span className={`text-sm font-medium ${getEffectivenessColor(defense.effectiveness)}`}>
                      {defense.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-500">Effectiveness</span>
                      <span className="text-xs font-medium">{defense.effectiveness}%</span>
                    </div>
                    <Progress 
                      value={defense.effectiveness} 
                      className="h-2" 
                      indicatorClassName={getProgressColor(defense.effectiveness)}
                    />
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{defense.details}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Network className="h-4 w-4 text-amber-600" />
                Attack Chain Analysis
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-5 w-5 rounded-full"
                  onClick={() => showExplanation(
                    "Attack Chain Analysis", 
                    "How attackers could chain vulnerabilities",
                    <div className="space-y-4">
                      <p>
                        Our attack chain analysis shows how multiple vulnerabilities could be combined by attackers to achieve their objectives.
                      </p>
                      
                      <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold">1</div>
                          <div>
                            <h4 className="text-sm font-medium">Initial Access</h4>
                            <p className="text-xs text-gray-600">Web application vulnerabilities provide entry point</p>
                          </div>
                        </div>
                        <div className="ml-4 border-l-2 border-dashed border-gray-300 pl-4">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 font-bold">2</div>
                          <div>
                            <h4 className="text-sm font-medium">Persistence</h4>
                            <p className="text-xs text-gray-600">Credential theft from leaked data enables long-term access</p>
                          </div>
                        </div>
                        <div className="ml-4 border-l-2 border-dashed border-gray-300 pl-4">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">3</div>
                          <div>
                            <h4 className="text-sm font-medium">Lateral Movement</h4>
                            <p className="text-xs text-gray-600">Weak network security allows movement between systems</p>
                          </div>
                        </div>
                        <div className="ml-4 border-l-2 border-dashed border-gray-300 pl-4">
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold">4</div>
                          <div>
                            <h4 className="text-sm font-medium">Data Exfiltration</h4>
                            <p className="text-xs text-gray-600">Inadequate data protection allows theft of sensitive information</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <h3 className="text-sm font-medium mb-1">Risk Assessment</h3>
                        <p className="text-xs">
                          The combination of these vulnerabilities creates a complete attack chain that would allow sophisticated threat actors to target your organization's sensitive data. The likelihood of a full chain attack is estimated at 62% based on your current security posture.
                        </p>
                      </div>
                    </div>
                  )}
                >
                  <Info className="h-3 w-3" />
                </Button>
              </h3>
              
              <div className="relative">
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="w-1/4 text-center">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-1">
                      <Target className="h-5 w-5 text-red-600" />
                    </div>
                    <div>Initial Access</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1">
                      <UserCheck className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>Credential Access</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-1">
                      <Network className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>Lateral Movement</div>
                  </div>
                  <div className="w-1/4 text-center">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-1">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>Data Access</div>
                  </div>
                </div>
                
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-3/4 bg-gradient-to-r from-red-500 via-orange-500 to-blue-500"></div>
                  <div className="absolute top-0 left-[75%] h-6 w-1 bg-white -mt-2"></div>
                </div>
                
                <div className="mt-2 text-xs text-center text-amber-800">
                  Attack chain progress: 75% of steps potentially exploitable
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

export default AttackVectorPanel;
