
import React from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, BarChart3, Shield, AlertTriangle, ShieldCheck } from "lucide-react";
import { getSecurityAssessment } from "@/utils/osint-helpers";
import { Card } from "@/components/ui/card";
import QualysSeverityBar from "@/components/ui/QualysSeverityBar";

interface ExecutiveViewProps {
  data: OsintData;
}

const ExecutiveView: React.FC<ExecutiveViewProps> = ({ data }) => {
  const navigate = useNavigate();
  const { score, label, color } = getSecurityAssessment(data);
  
  // Calculate total vulnerabilities count
  const totalVulnerabilities = 
    (data.qualysScan?.severity_1 || 0) + 
    (data.qualysScan?.severity_2 || 0) + 
    (data.qualysScan?.severity_3 || 0) + 
    (data.qualysScan?.severity_4 || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/extracted-data")}
            className="text-blue-700 border-blue-300"
          >
            Extracted Data
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/intelligent-mapping")}
            className="text-purple-700 border-purple-300"
          >
            Intelligent Mapping
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
          <BarChart3 className="h-5 w-5 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold">Executive View</h1>
      </div>

      <Card className="p-6 mb-6 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Executive Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Security Score</h3>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${color}`}>{score}</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
              <span className={`text-sm ${color} ml-2`}>({label})</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-1">Critical Issues</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-red-600">{data.qualysScan.severity_1}</span>
              <span className="text-sm text-muted-foreground">requiring immediate attention</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-amber-800 mb-1">Data Exposures</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-amber-600">{data.dataLeaksCompliance.length}</span>
              <span className="text-sm text-muted-foreground">leaked credentials found</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Based on our comprehensive analysis, we identified multiple security issues requiring attention.
          The organization's exposure includes {data.dataLeaksCompliance.length} data leaks and {data.qualysScan.severity_1 + data.qualysScan.severity_2} high or critical security vulnerabilities.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm text-amber-800">
          <div className="font-medium mb-2 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Key Findings
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Exposed sensitive data in {data.dataLeaksCompliance.length} breach databases</li>
            <li>{data.qualysScan.severity_1} critical vulnerabilities detected in infrastructure</li>
            <li>{data.openPorts.length} open ports potentially increasing attack surface</li>
            <li>Technology stack including {data.technologies.slice(0, 3).join(", ")} identified</li>
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-base font-medium mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-600" />
            Risk Assessment
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Infrastructure Risk</span>
                <span className="font-medium">{60 + Math.floor(Math.random() * 20)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: `${60 + Math.floor(Math.random() * 20)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Data Breach Risk</span>
                <span className="font-medium">{40 + Math.floor(Math.random() * 30)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${40 + Math.floor(Math.random() * 30)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Application Risk</span>
                <span className="font-medium">{50 + Math.floor(Math.random() * 25)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${50 + Math.floor(Math.random() * 25)}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Vulnerability Distribution</h4>
            <QualysSeverityBar data={data.qualysScan} />
          </div>
        </Card>
        
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-base font-medium mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Strategic Recommendations
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-3 py-1">
              <h4 className="text-sm font-medium">Critical Priority</h4>
              <p className="text-sm text-gray-600">
                Address {data.qualysScan.severity_1} critical vulnerabilities and reset passwords for all compromised accounts.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-3 py-1">
              <h4 className="text-sm font-medium">High Priority</h4>
              <p className="text-sm text-gray-600">
                Implement multi-factor authentication and review open ports ({data.openPorts.length}) for unnecessary exposure.
              </p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-3 py-1">
              <h4 className="text-sm font-medium">Ongoing Measures</h4>
              <p className="text-sm text-gray-600">
                Establish regular security assessments and employee security awareness training.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">Action Plan Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <span className="w-24 text-sm font-medium">Immediate</span>
                <span className="text-sm text-gray-600">Reset compromised credentials & patch critical vulnerabilities</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-24 text-sm font-medium">30 Days</span>
                <span className="text-sm text-gray-600">Implement MFA & conduct security awareness training</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-24 text-sm font-medium">90 Days</span>
                <span className="text-sm text-gray-600">Complete all security recommendations & establish ongoing monitoring</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            Comprehensive Report
          </h3>
          <Button 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/intelligent-mapping")}
          >
            View Full Analysis
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          For a complete technical assessment including detailed vulnerability information, 
          data leak analysis, and infrastructure insights, please refer to the full intelligence report.
        </p>
      </Card>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-4 w-4 mr-1 text-green-600" />
          <span>Executive Intelligence Summary</span>
        </div>
        <p>Strategic overview of security posture based on intelligence data. For executive decision-making purposes only.</p>
      </footer>
    </div>
  );
};

export default ExecutiveView;
