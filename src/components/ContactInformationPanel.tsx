import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { MapPin, Phone, Twitter, Linkedin, Mail, Globe, Info, Download, ExternalLink, Shield, Users } from "lucide-react";
import { OsintData } from "@/types/data";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ContactInformationPanelProps {
  data: OsintData;
}

const ContactInformationPanel: React.FC<ContactInformationPanelProps> = ({ data }) => {
  const { contactInformation } = data;
  const [activeTab, setActiveTab] = useState("contact");
  
  // Sample use cases for contact information
  const contactUseCases = [
    {
      title: "Social Engineering Risk",
      description: "Contact details can be used to craft targeted phishing campaigns",
      riskLevel: "High",
      relatedVulnerabilities: ["Exposed email addresses", "Public phone numbers"],
      recommendation: "Implement email authentication protocols like DMARC and SPF"
    },
    {
      title: "Network Enumeration",
      description: "Physical addresses can reveal network infrastructure details",
      riskLevel: "Medium",
      relatedVulnerabilities: ["Office locations exposed", "IP geolocation"],
      recommendation: "Use cloud-based proxies and VPNs to mask physical network locations"
    },
    {
      title: "Executive Targeting",
      description: "Visible social profiles enable executive-focused attacks",
      riskLevel: "Critical",
      relatedVulnerabilities: ["LinkedIn profiles", "Twitter accounts"],
      recommendation: "Train executives on privacy settings and secure social media practices"
    }
  ];
  
  // Generate a downloadable HTML report
  const generateHtmlReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Intelligence Report - SC Lowy</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 1000px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
          .section-title { color: #2563eb; margin-top: 0; }
          .item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .risk { display: inline-block; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: bold; }
          .risk-high { background: #fee2e2; color: #ef4444; }
          .risk-medium { background: #fef3c7; color: #f59e0b; }
          .risk-critical { background: #fecaca; color: #dc2626; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Contact Intelligence Report</h1>
            <p>Generated on ${new Date().toLocaleDateString()} for SC Lowy</p>
          </div>
          
          <div class="section">
            <h2 class="section-title">Contact Information Summary</h2>
            <p>This report analyzes the publicly available contact information for SC Lowy and assesses potential security implications.</p>
            
            <h3>Addresses</h3>
            <ul>
              ${contactInformation.address.map(addr => `<li>${addr}</li>`).join('')}
            </ul>
            
            <h3>Phone Numbers</h3>
            <ul>
              ${contactInformation.phone.map(phone => `<li>${phone}</li>`).join('')}
            </ul>
            
            <h3>Social Profiles</h3>
            <p><strong>LinkedIn:</strong> ${contactInformation.linkedin.length} profiles identified</p>
            <p><strong>Twitter:</strong> ${contactInformation.twitter.length} accounts identified</p>
          </div>
          
          <div class="section">
            <h2 class="section-title">Threat Intelligence Analysis</h2>
            
            ${contactUseCases.map(useCase => `
              <div class="item">
                <h3>${useCase.title}</h3>
                <p>${useCase.description}</p>
                <div class="risk risk-${useCase.riskLevel.toLowerCase()}">${useCase.riskLevel} Risk</div>
                <p><strong>Related Vulnerabilities:</strong> ${useCase.relatedVulnerabilities.join(', ')}</p>
                <p><strong>Recommendation:</strong> ${useCase.recommendation}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <h2 class="section-title">Mitigation Recommendations</h2>
            <ul>
              <li>Implement strict privacy controls across all corporate social media accounts</li>
              <li>Regularly audit public-facing contact information</li>
              <li>Train employees on social engineering awareness</li>
              <li>Use separate corporate phone numbers for public-facing communication</li>
              <li>Implement email filtering and anti-phishing measures</li>
            </ul>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-intelligence-report.html';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  return (
    <GlassPanel className="mb-6" animationDelay={900}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-2 text-osint-blue" />
          <h2 className="text-xl font-semibold">Contact Intelligence</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={generateHtmlReport}
        >
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>
      
      <Tabs defaultValue="contact" className="bg-white/70 rounded-lg p-4" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="contact">
            <Phone className="h-4 w-4 mr-2" />
            Contact Details
          </TabsTrigger>
          <TabsTrigger value="usecases">
            <Info className="h-4 w-4 mr-2" />
            Intelligence Analysis
          </TabsTrigger>
          <TabsTrigger value="mitigation">
            <Shield className="h-4 w-4 mr-2" />
            Risk Mitigation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <MapPin className="h-4 w-4 mr-2 text-osint-blue" />
                <h3 className="text-base font-medium">Address</h3>
              </div>
              <div>
                {contactInformation.address.map((address, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "p-3 bg-gray-50 rounded mb-2 opacity-0 animate-fade-in"
                    )}
                    style={{ animationDelay: `${1000 + index * 100}ms` }}
                  >
                    <div className="text-sm">{address}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex items-center mb-3">
                    <Phone className="h-4 w-4 mr-2 text-osint-blue" />
                    <h3 className="text-base font-medium">Phone</h3>
                  </div>
                  <div>
                    {contactInformation.phone.map((phone, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-3 bg-gray-50 rounded mb-2 opacity-0 animate-fade-in"
                        )}
                        style={{ animationDelay: `${1100 + index * 100}ms` }}
                      >
                        <div className="text-sm">{phone}</div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-1 text-xs">
                              Why is this important? <Info className="h-3 w-3 ml-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Contact Intelligence Analysis</DialogTitle>
                              <DialogDescription>
                                Understanding the significance of public contact information in cybersecurity analysis
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <p className="text-sm">
                                Public phone numbers are often leveraged in social engineering attacks. Threat actors can use these 
                                numbers to:
                              </p>
                              
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>Conduct vishing (voice phishing) attacks targeting employees</li>
                                <li>Gather information about internal systems and processes</li>
                                <li>Impersonate legitimate services to gain credentials or access</li>
                                <li>Map out organizational structure through cold calling</li>
                              </ul>
                              
                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-800">
                                <strong>Why this matters:</strong> In our analysis, {contactInformation.phone.length} phone numbers were 
                                found publicly associated with your organization, potentially increasing the attack surface for 
                                social engineering attempts.
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <Twitter className="h-4 w-4 mr-2 text-osint-blue" />
                    <h3 className="text-base font-medium">Twitter</h3>
                  </div>
                  <div>
                    {contactInformation.twitter.map((twitter, index) => (
                      <a 
                        key={index}
                        href={twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 bg-gray-50 rounded mb-2 flex items-center opacity-0 animate-fade-in",
                          "hover:bg-gray-100 transition-colors"
                        )}
                        style={{ animationDelay: `${1200 + index * 100}ms` }}
                      >
                        <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                        <div className="text-sm">{twitter.replace("https://twitter.com/", "@")}</div>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <Linkedin className="h-4 w-4 mr-2 text-osint-blue" />
                    <h3 className="text-base font-medium">LinkedIn</h3>
                  </div>
                  <div>
                    {contactInformation.linkedin.map((linkedin, index) => (
                      <a 
                        key={index}
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 bg-gray-50 rounded mb-2 flex items-center opacity-0 animate-fade-in",
                          "hover:bg-gray-100 transition-colors"
                        )}
                        style={{ animationDelay: `${1300 + index * 100}ms` }}
                      >
                        <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                        <div className="text-sm">{linkedin}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="usecases" className="mt-0">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
              <h3 className="text-blue-800 font-medium mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                How Contact Information Is Used in OSINT Analysis
              </h3>
              <p className="text-sm text-blue-700">
                Contact information provides critical insights for intelligence gathering. Below are key use cases 
                showing how this data can be leveraged for security assessments and potential risks.
              </p>
            </div>
            
            {contactUseCases.map((useCase, index) => (
              <div key={index} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">{useCase.title}</h3>
                  <Badge className={
                    useCase.riskLevel === "High" ? "bg-red-500" : 
                    useCase.riskLevel === "Medium" ? "bg-amber-500" : 
                    "bg-rose-600"
                  }>
                    {useCase.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{useCase.description}</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Why This Matters:</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600">
                    {useCase.relatedVulnerabilities.map((vuln, i) => (
                      <li key={i}>{vuln}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="text-sm font-medium mr-2">Recommendation:</span>
                  <span className="text-sm text-gray-600">{useCase.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mitigation" className="mt-0">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-4">
              <h3 className="text-green-800 font-medium mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Contact Information Risk Mitigation
              </h3>
              <p className="text-sm text-green-700">
                Based on our analysis, we recommend the following measures to mitigate risks associated with public contact information.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 bg-white">
                <h3 className="font-medium mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-blue-500" />
                  Domain & Email Protection
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">1</div>
                    <div className="text-sm">Implement SPF, DKIM and DMARC records for all domains</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">2</div>
                    <div className="text-sm">Use email filtering to detect spoofing attempts</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">3</div>
                    <div className="text-sm">Consider private WHOIS registration for domains</div>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <h3 className="font-medium mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                  Phone & Address Security
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">1</div>
                    <div className="text-sm">Use dedicated business phone numbers for public contact</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">2</div>
                    <div className="text-sm">Consider call screening services for key executives</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">3</div>
                    <div className="text-sm">Limit physical address details in public directories</div>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <h3 className="font-medium mb-3 flex items-center">
                  <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                  Social Media Management
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">1</div>
                    <div className="text-sm">Audit privacy settings on all corporate accounts</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">2</div>
                    <div className="text-sm">Enable MFA on executive social media accounts</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">3</div>
                    <div className="text-sm">Create a social media security policy for employees</div>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4 bg-white">
                <h3 className="font-medium mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  Employee Awareness
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">1</div>
                    <div className="text-sm">Train staff on social engineering awareness</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">2</div>
                    <div className="text-sm">Conduct regular security awareness training</div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 mr-2">3</div>
                    <div className="text-sm">Create guidelines for personal information sharing</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Intelligence Analysis</DialogTitle>
            <DialogDescription>
              Understanding the significance of public contact information in cybersecurity analysis
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm">
              Public phone numbers are often leveraged in social engineering attacks. Threat actors can use these 
              numbers to:
            </p>
            
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Conduct vishing (voice phishing) attacks targeting employees</li>
              <li>Gather information about internal systems and processes</li>
              <li>Impersonate legitimate services to gain credentials or access</li>
              <li>Map out organizational structure through cold calling</li>
            </ul>
            
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-800">
              <strong>Why this matters:</strong> In our analysis, {contactInformation.phone.length} phone numbers were 
              found publicly associated with your organization, potentially increasing the attack surface for 
              social engineering attempts.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </GlassPanel>
  );
};

export default ContactInformationPanel;
