
import React from 'react';
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, FileText, Building, Users, DollarSign, AlertTriangle, Globe, Database, Shield, Briefcase, Server, Code, ExternalLink, Mail, Phone, MapPin, Search, FileWarning, Check, Rocket, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import InfoCard from "@/components/ui/InfoCard";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { createSectionId } from "@/utils/ui-helpers";

interface OsintReportPageProps {
  data: OsintData;
}

const OsintReportPage: React.FC<OsintReportPageProps> = ({ data }) => {
  const navigate = useNavigate();

  // Creating formatted data for the human intelligence section
  const keyPersonnel = [
    {
      name: "John Smith",
      role: "Chief Technology Officer",
      email: "j.smith@example.com",
      phone: "+123 456 7890",
      riskLevel: "high",
      socialProfiles: ["LinkedIn", "Twitter"],
      foundIn: "LinkedIn, Job Postings, Company Website"
    },
    {
      name: "Mary Johnson",
      role: "DevOps Engineering Lead",
      email: "m.johnson@example.com",
      phone: "+1-555-234-5678",
      riskLevel: "medium",
      socialProfiles: ["LinkedIn"],
      foundIn: "LinkedIn, Company Reports"
    }
  ];

  const organizationIntelligence = {
    employeeCount: data.organizationStructure[0],
    keyLeadership: 8,
    departmentsIdentified: 6,
    socialMediaPresence: 4,
    publicPosts: 56,
    analystReports: 23
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="text-gray-600 mr-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Button>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligence Report</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Organization Overview Card - Spans 2 columns */}
        <Card className="text-left md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Organization Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              SC Lowy is a leading alternative asset manager with $1.6B AUM, specializing in opportunistic credit across APAC, Middle East, and Europe.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard 
                title="Employees" 
                icon={<Users className="h-4 w-4" />}
                value={data.organizationStructure[0]}
                variant="outline"
              />
              <InfoCard 
                title="AUM" 
                icon={<DollarSign className="h-4 w-4" />}
                value={formatCurrency(data.financialData[0])}
                variant="outline"
              />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Executive insight: Potential M&A activity detected from public filings</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Strategic indicators suggest expansion into cryptocurrency trading services</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Assessment Card */}
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2 text-amber-600" />
              Security Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <StatCard
                value={data.qualysScan.severity_1}
                label="Critical Vulnerabilities"
                icon={<AlertTriangle className="h-4 w-4" />}
                className="bg-red-50 border border-red-100"
              />
              <StatCard
                value={data.qualysScan.severity_2}
                label="High Vulnerabilities"
                icon={<AlertTriangle className="h-4 w-4" />}
                className="bg-amber-50 border border-amber-100"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Website Analytics Card */}
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-600" />
              Website Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-left">
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm"><span className="font-medium">Domain:</span> sclowy.com</p>
              </div>
              <div className="flex items-center">
                <Server className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm"><span className="font-medium">Tech Stack:</span> WordPress 6.0, PHP 7.4</p>
              </div>
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm"><span className="font-medium">Analytics:</span> GA ID: UA-12345678</p>
              </div>
              <p className="text-sm text-red-600 font-medium mt-2 flex items-center">
                <FileWarning className="h-4 w-4 mr-1 text-red-600" />
                Risk Score: 7.8 / 10
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Leaks Card */}
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-600" />
              Data Leaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{data.dataLeaksCompliance.length}</p>
            <p className="text-sm text-gray-600 mb-2">Credentials found in breaches</p>
            <div className="mt-3 p-3 bg-amber-50 rounded-md border border-amber-200">
              <p className="text-sm text-amber-800 font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1 text-amber-600" />
                Recommendation:
              </p>
              <p className="text-xs text-amber-700 mt-1">Force password reset for all affected accounts and implement MFA.</p>
            </div>
          </CardContent>
        </Card>

        {/* Document Intelligence Card */}
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Document Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{Object.values(data.fileSearch).flat().length}</p>
            <p className="text-sm text-gray-600 mb-2">Documents found</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md flex items-center">
                <FileText className="h-3 w-3 mr-1" /> PDF: {data.fileSearch.PDF.length}
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md flex items-center">
                <FileText className="h-3 w-3 mr-1" /> XLS: {data.fileSearch.XLS.length}
              </span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md flex items-center">
                <FileText className="h-3 w-3 mr-1" /> DOC: {data.fileSearch.DOC.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Human Intelligence Analysis Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="text-left lg:col-span-3">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Human Intelligence (HUMINT) Analysis
            </CardTitle>
            <CardDescription>
              Organizational insights via key personnel information from OSINT sources
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Employee Intelligence */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-600" />
                  Employee Intelligence
                </h3>
                <div className="bg-blue-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Identified Employees</span>
                    <Badge variant="outline" className="bg-white">
                      {organizationIntelligence.employeeCount}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">With Exposed Data</span>
                    <Badge variant="outline" className="bg-white">
                      9
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Middle column - Organizational Structure */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-600" />
                  Organizational Structure
                </h3>
                <div className="bg-purple-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Departments Identified</span>
                    <Badge variant="outline" className="bg-white">
                      {organizationIntelligence.departmentsIdentified}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Key Leadership</span>
                    <Badge variant="outline" className="bg-white">
                      {organizationIntelligence.keyLeadership}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right column - Social Media */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-gray-600" />
                  Social Media Presence
                </h3>
                <div className="bg-green-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-600">Platforms</span>
                    <Badge variant="outline" className="bg-white">
                      {organizationIntelligence.socialMediaPresence}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Public Posts Analyzed</span>
                    <Badge variant="outline" className="bg-white">
                      {organizationIntelligence.publicPosts}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Personnel Section */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-gray-600" />
                Key Personnel with Exposure Risk
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyPersonnel.map((person, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        {index === 0 ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.role}</p>
                      </div>
                      <Badge className={`ml-auto ${
                        person.riskLevel === 'high' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                        person.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 
                        'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}>
                        {person.riskLevel.charAt(0).toUpperCase() + person.riskLevel.slice(1)} Risk
                      </Badge>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {person.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {person.phone}
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      <p>Found in: {person.foundIn}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Intelligence Report Card */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6 text-left">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Intelligence Report Summary
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 text-sm">
            Based on our analysis, we recommend prioritizing the patching of critical vulnerabilities and implementing
            multi-factor authentication for all user accounts. Additionally, the data leaks identified require immediate
            attention with forced password resets.
          </p>
          <p className="text-gray-700 text-sm">
            The technical infrastructure shows multiple areas for improvement, particularly in web server configuration
            and content management system updates. Regular security assessments are recommended to monitor progress.
          </p>
          <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
            <p className="text-sm text-green-800 font-medium flex items-center">
              <Check className="h-4 w-4 mr-1 text-green-600" />
              Recommendation:
            </p>
            <p className="text-xs text-green-700 mt-1">Implement a comprehensive security program including patch management, access control reviews, and security awareness training.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm" className="mr-2">
            <FileText className="h-4 w-4 mr-1" />
            Download PDF
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Rocket className="h-4 w-4 mr-1" />
            View Action Plan
          </Button>
        </div>
      </div>

      {/* Contact Information Card */}
      <Card className="text-left mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Primary Office</p>
              <p className="text-sm text-gray-600">8 Queen's Rd, Hong Kong</p>
              <p className="text-sm text-gray-600">+852 3465 1000</p>
            </div>
            <div>
              <p className="text-sm font-medium">Online Presence</p>
              <div className="flex items-center mt-1">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <a href="https://www.sclowy.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                  sclowy.com
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm text-gray-600">info@sclowy.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OsintReportPage;
