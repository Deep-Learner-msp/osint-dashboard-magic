
import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { FileText, Download, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportGeneratorProps {
  data: OsintData;
  companyName: string;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ data, companyName }) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);

  // Function to generate HTML report content
  const generateReportContent = () => {
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Calculate total vulnerabilities
    const totalVulnerabilities = 
      (data.qualysScan?.severity_1 || 0) + 
      (data.qualysScan?.severity_2 || 0) + 
      (data.qualysScan?.severity_3 || 0) + 
      (data.qualysScan?.severity_4 || 0);
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>K2K Discovery Intelligence Report - ${companyName}</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 20px;
          }
          .logo {
            max-width: 200px;
            margin-bottom: 20px;
          }
          h1 {
            color: #0a0a0a;
            margin-bottom: 10px;
          }
          h2 {
            color: #1a365d;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 10px;
            margin-top: 30px;
          }
          h3 {
            color: #2c5282;
            margin-top: 25px;
          }
          .metadata {
            background-color: #f7fafc;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 30px;
            display: flex;
            justify-content: space-between;
          }
          .metadata-item {
            margin-bottom: 10px;
          }
          .severity-label {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
          }
          .critical {
            background-color: #fed7d7;
            color: #9b2c2c;
          }
          .high {
            background-color: #feebc8;
            color: #9c4221;
          }
          .medium {
            background-color: #fefcbf;
            color: #975a16;
          }
          .low {
            background-color: #c6f6d5;
            color: #276749;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .card {
            background-color: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          table, th, td {
            border: 1px solid #e2e8f0;
          }
          th, td {
            text-align: left;
            padding: 12px;
          }
          th {
            background-color: #f7fafc;
          }
          .progress-container {
            height: 10px;
            background-color: #e2e8f0;
            border-radius: 5px;
            margin: 10px 0;
          }
          .progress-bar {
            height: 100%;
            border-radius: 5px;
          }
          .critical-bar {
            background-color: #fc8181;
          }
          .high-bar {
            background-color: #f6ad55;
          }
          .medium-bar {
            background-color: #f6e05e;
          }
          .low-bar {
            background-color: #68d391;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #718096;
            border-top: 1px solid #eaeaea;
            padding-top: 20px;
          }
          .disclaimer {
            font-size: 12px;
            color: #718096;
            font-style: italic;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="data:image/png;base64,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" alt="K2K Discovery" class="logo">
          <h1>Intelligence Report: ${companyName}</h1>
          <p>Uncovering Digital Identities</p>
          <p><small>Generated on ${date}</small></p>
        </div>

        <div class="metadata">
          <div>
            <div class="metadata-item"><strong>Organization:</strong> ${companyName}</div>
            <div class="metadata-item"><strong>Report Date:</strong> ${date}</div>
            <div class="metadata-item"><strong>Industry:</strong> Financial Services</div>
          </div>
          <div>
            <div class="metadata-item"><strong>Vulnerabilities Found:</strong> ${totalVulnerabilities}</div>
            <div class="metadata-item"><strong>Critical Issues:</strong> ${data.qualysScan.severity_1}</div>
            <div class="metadata-item"><strong>Data Leaks:</strong> ${data.dataLeaksCompliance.length}</div>
          </div>
        </div>

        <h2>Executive Summary</h2>
        <p>This intelligence report presents a comprehensive analysis of ${companyName}'s digital presence, security posture, and potential vulnerabilities based on open-source intelligence gathering techniques. The assessment identifies critical security concerns requiring immediate attention and provides actionable recommendations to strengthen your organization's security posture.</p>

        <div class="card">
          <h3>Key Findings</h3>
          <ul>
            <li><strong>Critical Vulnerabilities:</strong> ${data.qualysScan.severity_1} critical vulnerabilities were identified that require immediate remediation</li>
            <li><strong>Data Exposure:</strong> ${data.dataLeaksCompliance.length} instances of leaked credentials were discovered across various data breach databases</li>
            <li><strong>Attack Surface:</strong> ${data.openPorts.length} open ports were detected, potentially increasing your organization's attack surface</li>
            <li><strong>Technologies Identified:</strong> ${data.technologies.slice(0, 5).join(", ")}</li>
          </ul>
        </div>

        <h2>Vulnerability Assessment</h2>
        <div class="grid">
          <div class="card">
            <h3>Vulnerability Distribution</h3>
            <div>
              <div><strong>Critical Issues:</strong> ${data.qualysScan.severity_1}</div>
              <div class="progress-container">
                <div class="progress-bar critical-bar" style="width: ${data.qualysScan.severity_1 / totalVulnerabilities * 100}%"></div>
              </div>
              
              <div><strong>High Severity:</strong> ${data.qualysScan.severity_2}</div>
              <div class="progress-container">
                <div class="progress-bar high-bar" style="width: ${data.qualysScan.severity_2 / totalVulnerabilities * 100}%"></div>
              </div>
              
              <div><strong>Medium Severity:</strong> ${data.qualysScan.severity_3}</div>
              <div class="progress-container">
                <div class="progress-bar medium-bar" style="width: ${data.qualysScan.severity_3 / totalVulnerabilities * 100}%"></div>
              </div>
              
              <div><strong>Low Severity:</strong> ${data.qualysScan.severity_4}</div>
              <div class="progress-container">
                <div class="progress-bar low-bar" style="width: ${data.qualysScan.severity_4 / totalVulnerabilities * 100}%"></div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <h3>Threat Analysis</h3>
            <p>The vulnerabilities identified represent significant security risks that could potentially be exploited by malicious actors. Critical issues include:</p>
            <ul>
              <li>Authentication bypass vulnerabilities</li>
              <li>Outdated software with known exploits</li>
              <li>Insecure configurations</li>
              <li>Exposed administrative interfaces</li>
            </ul>
            <p>These vulnerabilities correlate with common attack vectors observed in the wild and align with MITRE ATT&CK techniques often used against financial institutions.</p>
          </div>
        </div>

        <h2>Infrastructure Analysis</h2>
        <div class="card">
          <h3>Network Exposure</h3>
          <table>
            <thead>
              <tr>
                <th>Open Ports</th>
                <th>Services</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.openPorts.slice(0, 3).join(", ")}</td>
                <td>HTTP, SSH, SMTP</td>
                <td><span class="severity-label high">High</span></td>
              </tr>
              <tr>
                <td>${data.openPorts.slice(3, 6).join(", ")}</td>
                <td>HTTPS, IMAP, FTP</td>
                <td><span class="severity-label medium">Medium</span></td>
              </tr>
            </tbody>
          </table>
          <p>The assessment identified ${data.openPorts.length} open ports across your infrastructure, several of which are running services with known vulnerabilities. This creates multiple potential entry points for attackers.</p>
        </div>

        <h2>Data Leak Analysis</h2>
        <div class="card">
          <h3>Leaked Credentials</h3>
          <p>We discovered ${data.dataLeaksCompliance.length} instances of leaked credentials associated with your organization across various breach databases. This includes:</p>
          <ul>
            <li>${Math.floor(data.dataLeaksCompliance.length * 0.3)} email/password combinations</li>
            <li>${Math.floor(data.dataLeaksCompliance.length * 0.2)} plaintext passwords</li>
            <li>${Math.floor(data.dataLeaksCompliance.length * 0.5)} hashed passwords</li>
          </ul>
          <p>These leaked credentials pose a significant risk as they may be used in credential stuffing attacks against your organization or for social engineering purposes.</p>
        </div>

        <h2>Bias Distribution Analysis</h2>
        <div class="card">
          <h3>Media Coverage Bias</h3>
          <p>Our analysis of media coverage related to ${companyName} reveals the following distribution of reporting bias:</p>
          <table>
            <thead>
              <tr>
                <th>Perspective</th>
                <th>Personnel</th>
                <th>Media</th>
                <th>Product</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Left-Leaning</td>
                <td>${data.biasDistribution?.personnel.leftLeaning || 30}%</td>
                <td>${data.biasDistribution?.media.leftLeaning || 28}%</td>
                <td>${data.biasDistribution?.product.leftLeaning || 25}%</td>
              </tr>
              <tr>
                <td>Center</td>
                <td>${data.biasDistribution?.personnel.center || 45}%</td>
                <td>${data.biasDistribution?.media.center || 59}%</td>
                <td>${data.biasDistribution?.product.center || 55}%</td>
              </tr>
              <tr>
                <td>Right-Leaning</td>
                <td>${data.biasDistribution?.personnel.rightLeaning || 25}%</td>
                <td>${data.biasDistribution?.media.rightLeaning || 13}%</td>
                <td>${data.biasDistribution?.product.rightLeaning || 20}%</td>
              </tr>
            </tbody>
          </table>
          <p>Understanding this bias distribution helps in developing targeted communications strategies and assessing potential reputation risks across different audience segments.</p>
        </div>

        <h2>Strategic Recommendations</h2>
        <div class="grid">
          <div class="card">
            <h3>Critical Priority</h3>
            <ul>
              <li>Address ${data.qualysScan.severity_1} critical vulnerabilities immediately</li>
              <li>Force password resets for all compromised accounts</li>
              <li>Implement multi-factor authentication</li>
              <li>Close unnecessary open ports (${data.openPorts.length} identified)</li>
            </ul>
          </div>
          
          <div class="card">
            <h3>High Priority</h3>
            <ul>
              <li>Patch high-severity vulnerabilities (${data.qualysScan.severity_2} identified)</li>
              <li>Enhance network segmentation</li>
              <li>Review and update firewall rules</li>
              <li>Conduct regular security assessments</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>K2K Discovery | Uncovering Digital Identities</p>
          <p class="disclaimer">This report contains confidential information intended solely for the use of the individual or entity to whom it is addressed. If you are not the intended recipient, be aware that any disclosure, copying, distribution, or use of this report is strictly prohibited.</p>
        </div>
      </body>
      </html>
    `;
  };

  // Function to download the report
  const downloadReport = () => {
    setGenerating(true);
    
    setTimeout(() => {
      try {
        // Generate report content
        const reportContent = generateReportContent();
        
        // Create blob and download link
        const blob = new Blob([reportContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Set download attributes and trigger download
        link.href = url;
        link.download = `K2K_Discovery_Report_${companyName.replace(/\s+/g, '_')}.html`;
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Report Generated",
          description: "Your intelligence report has been downloaded successfully.",
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Error Generating Report",
          description: "There was an error generating your report. Please try again.",
          variant: "destructive",
        });
        console.error("Error generating report:", error);
      } finally {
        setGenerating(false);
      }
    }, 1500);
  };

  return (
    <Button 
      onClick={downloadReport} 
      variant="default" 
      className="bg-k2k-blue hover:bg-blue-700 text-white"
      disabled={generating}
    >
      {generating ? (
        <>
          <Check className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Download Report
        </>
      )}
    </Button>
  );
};

export default ReportGenerator;
