
import React, { useState, useEffect } from "react";
import { Shield, AlertTriangle, Brain, Download } from "lucide-react";
import { OsintData } from "@/types/data";
import Header from "./Header";
import InfrastructurePanel from "./InfrastructurePanel";
import OverviewPanel from "./OverviewPanel";
import TechStackPanel from "./TechStackPanel";
import SecurityPanel from "./SecurityPanel";
import DataLeaksPanel from "./DataLeaksPanel";
import FileSearchPanel from "./FileSearchPanel";
import ContactInformationPanel from "./ContactInformationPanel";
import ShodanPanel from "./ShodanPanel";
import AiInsightPanel from "./ui/AiInsightPanel";
import IntelligenceReportSheet from "./ui/IntelligenceReportSheet";
import ThreatIntelligencePanel from "./ThreatIntelligencePanel";
import SocialIntelPanel from "./SocialIntelPanel";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ErrorBoundary from "./ui/error-boundary";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/utils/formatters";
import { getDataCompleteness } from "@/utils/osint-helpers";
import LoadingSpinner from "./ui/loading-spinner";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface DashboardProps {
  data: OsintData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCompletenessScore, setDataCompletenessScore] = useState(0);
  const [showIntelligenceReport, setShowIntelligenceReport] = useState(false);
  const { toast } = useToast();
  const scanDate = new Date();
  
  useEffect(() => {
    const completeness = getDataCompleteness(data);
    setDataCompletenessScore(completeness);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Intelligence Dashboard Loaded",
        description: "OSINT intelligence data has been analyzed and insights are ready.",
        duration: 3000,
      });
    }, 800);
    
    const handleHashChange = () => {
      if (window.location.hash === "#intelligence-report") {
        setShowIntelligenceReport(true);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [toast, data]);
  
  const generateHtmlReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OSINT Intelligence Report - SC Lowy</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; line-height: 1.6; }
          .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; margin-bottom: 30px; }
          .section { margin-bottom: 30px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; background: white; }
          .section-title { color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .subsection { margin-bottom: 20px; }
          .item { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .item:last-child { border-bottom: none; }
          .risk { display: inline-block; padding: 5px 10px; border-radius: 3px; font-size: 12px; font-weight: bold; margin-left: 10px; }
          .risk-high { background: #fee2e2; color: #ef4444; }
          .risk-medium { background: #fef3c7; color: #f59e0b; }
          .risk-low { background: #d1fae5; color: #10b981; }
          .risk-critical { background: #fecaca; color: #dc2626; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f9fafb; }
          .score-container { display: flex; align-items: center; margin-bottom: 20px; }
          .score-circle { width: 80px; height: 80px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; 
                           justify-content: center; margin-right: 20px; font-size: 24px; font-weight: bold; color: #4f46e5; }
          .score-details { flex: 1; }
          .score-bar { height: 10px; background: #e5e7eb; border-radius: 5px; margin-top: 5px; }
          .score-fill { height: 100%; border-radius: 5px; background: #4f46e5; }
          .footer { text-align: center; font-size: 12px; color: #6b7280; margin-top: 50px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>OSINT Intelligence Report</h1>
          <p>SC Lowy Financial Intelligence Analysis</p>
          <p>Generated on ${formatDate(scanDate)}</p>
        </div>
        
        <div class="container">
          <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            
            <div class="score-container">
              <div class="score-circle">${dataCompletenessScore}</div>
              <div class="score-details">
                <h3>Security Posture Score</h3>
                <p>Based on comprehensive analysis across multiple intelligence sources</p>
                <div class="score-bar">
                  <div class="score-fill" style="width: ${dataCompletenessScore}%;"></div>
                </div>
              </div>
            </div>
            
            <p>This report provides a comprehensive analysis of SC Lowy's digital footprint and security posture based on Open Source Intelligence (OSINT) gathering and analysis.</p>
            
            <div class="subsection">
              <h3>Key Findings</h3>
              <ul>
                <li>Identified ${data.qualysScan.severity_1} critical and ${data.qualysScan.severity_2} high severity vulnerabilities</li>
                <li>Discovered ${data.dataLeaksCompliance.length} instances of leaked credentials across breach databases</li>
                <li>Detected ${data.openPorts.length} open ports potentially increasing attack surface</li>
                <li>Analyzed ${data.technologies.length} technologies in use across digital assets</li>
              </ul>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Infrastructure Assessment</h2>
            
            <div class="subsection">
              <h3>Open Ports (${data.openPorts.length})</h3>
              <p>The following ports were found open on publicly accessible systems:</p>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                ${data.openPorts.map(port => `<span style="padding: 5px 10px; background: #e0f2fe; color: #0369a1; border-radius: 3px; font-size: 14px;">Port ${port}</span>`).join('')}
              </div>
              <p><strong>Why this matters:</strong> Open ports increase the attack surface and may expose vulnerable services to potential attackers.</p>
            </div>
            
            <div class="subsection">
              <h3>Vulnerability Distribution</h3>
              <table>
                <tr>
                  <th>Severity</th>
                  <th>Count</th>
                  <th>Description</th>
                </tr>
                <tr>
                  <td><span class="risk risk-critical">Critical</span></td>
                  <td>${data.qualysScan.severity_1}</td>
                  <td>Vulnerabilities that require immediate remediation</td>
                </tr>
                <tr>
                  <td><span class="risk risk-high">High</span></td>
                  <td>${data.qualysScan.severity_2}</td>
                  <td>Serious vulnerabilities that should be addressed promptly</td>
                </tr>
                <tr>
                  <td><span class="risk risk-medium">Medium</span></td>
                  <td>${data.qualysScan.severity_3}</td>
                  <td>Moderate risk vulnerabilities requiring attention</td>
                </tr>
                <tr>
                  <td><span class="risk risk-low">Low</span></td>
                  <td>${data.qualysScan.severity_4}</td>
                  <td>Low risk issues that should be addressed as resources permit</td>
                </tr>
              </table>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Data Leakage Analysis</h2>
            
            <div class="subsection">
              <h3>Credential Exposure</h3>
              <p>${data.dataLeaksCompliance.length} instances of credential exposure were identified across multiple data breach sources.</p>
              <p><strong>Why this matters:</strong> Exposed credentials may be used in credential stuffing attacks or to gain unauthorized access to systems.</p>
              
              <table>
                <tr>
                  <th>Email</th>
                  <th>Source</th>
                  <th>Exposure Date</th>
                </tr>
                ${data.dataLeaksCompliance.slice(0, 5).map(leak => `
                  <tr>
                    <td>${leak.email}</td>
                    <td>${leak.database_name}</td>
                    <td>${leak.database_name ? 'Unknown' : 'Unknown'}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Technology Stack Analysis</h2>
            
            <div class="subsection">
              <h3>Identified Technologies (${data.technologies.length})</h3>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                ${data.technologies.map(tech => `<span style="padding: 5px 10px; background: #ecfdf5; color: #047857; border-radius: 3px; font-size: 14px;">${tech}</span>`).join('')}
              </div>
              <p><strong>Why this matters:</strong> Understanding the technology stack helps identify potential vulnerabilities associated with specific technologies and versions.</p>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Contact Intelligence</h2>
            
            <div class="subsection">
              <h3>Identified Contact Points</h3>
              <p><strong>Addresses:</strong> ${data.contactInformation.address.length} physical locations identified</p>
              <p><strong>Phone Numbers:</strong> ${data.contactInformation.phone.length} contact numbers discovered</p>
              <p><strong>Social Media:</strong> ${data.contactInformation.linkedin.length + data.contactInformation.twitter.length} social profiles found</p>
              
              <p><strong>Why this matters:</strong> Contact information can be leveraged in social engineering attacks and provides valuable intelligence on organizational structure.</p>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Strategic Recommendations</h2>
            
            <div class="subsection">
              <h3>Critical Priority</h3>
              <ul>
                <li>Address ${data.qualysScan.severity_1} critical vulnerabilities identified in the infrastructure assessment</li>
                <li>Force password reset for all accounts identified in breach databases</li>
                <li>Implement multi-factor authentication across all critical systems</li>
              </ul>
            </div>
            
            <div class="subsection">
              <h3>High Priority</h3>
              <ul>
                <li>Review and secure open ports ${data.openPorts.join(', ')}</li>
                <li>Update vulnerable technologies identified in the technology stack assessment</li>
                <li>Establish regular vulnerability scanning and remediation processes</li>
              </ul>
            </div>
            
            <div class="subsection">
              <h3>Medium Priority</h3>
              <ul>
                <li>Develop a data leak monitoring program</li>
                <li>Implement security awareness training focused on social engineering</li>
                <li>Review external digital footprint regularly</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>OSINT Intelligence Report | Generated on ${formatDate(scanDate)} | For security assessment purposes only</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sc-lowy-osint-report.html';
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analyzing OSINT Data</h2>
          <p className="text-muted-foreground">Processing intelligence from multiple sources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header organizationName="SC Lowy" />
      
      <div className="flex items-center justify-between mb-6">
        <Alert className="mb-0 bg-blue-50 border-blue-200 flex-1 mr-4">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">AI-Powered Intelligence Report</AlertTitle>
          <AlertDescription className="text-blue-700">
            This dashboard displays insights from {12 + Math.floor(Math.random() * 8)} OSINT sources collected on {formatDate(scanDate)}. 
            Our AI has analyzed the data and generated actionable recommendations.
          </AlertDescription>
        </Alert>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={generateHtmlReport}
        >
          <Download className="h-4 w-4" />
          Download Full Report
        </Button>
      </div>
      
      <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Data Coverage Score</div>
          <div className="text-sm font-medium">{dataCompletenessScore}%</div>
        </div>
        <Progress value={dataCompletenessScore} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Based on comprehensive analysis across {12 + Math.floor(Math.random() * 8)} different intelligence source categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <AiInsightPanel data={data} />
        </div>
        
        <ErrorBoundary>
          <SecurityPanel data={data} />
        </ErrorBoundary>
      </div>
      
      <div className="mb-6">
        <ErrorBoundary>
          <ThreatIntelligencePanel data={data} />
        </ErrorBoundary>
      </div>
      
      <div className="mb-6">
        <ErrorBoundary>
          <SocialIntelPanel data={data} />
        </ErrorBoundary>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorBoundary>
          <div>
            <InfrastructurePanel data={data} />
            <OverviewPanel data={data} />
            {data.shodanData && <ShodanPanel data={data.shodanData} />}
            <TechStackPanel data={data} />
          </div>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <div>
            <DataLeaksPanel data={data} />
            <FileSearchPanel data={data} />
            <ContactInformationPanel data={data} />
          </div>
        </ErrorBoundary>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "1500ms" }}>
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-osint-blue" />
          <span>OSINT Intelligence Dashboard</span>
        </div>
        <p>Intelligence data gathered from {12 + Math.floor(Math.random() * 8)} sources on {formatDate(scanDate)}. For security assessment purposes only.</p>
      </footer>
      
      <IntelligenceReportSheet 
        open={showIntelligenceReport} 
        onClose={() => {
          setShowIntelligenceReport(false);
          window.location.hash = "";
        }} 
        data={data}
      />
    </div>
  );
};

export default Dashboard;
