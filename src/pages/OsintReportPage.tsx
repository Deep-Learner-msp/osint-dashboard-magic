
import React from 'react';
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, FileText, Building, Users, DollarSign, AlertTriangle, Globe, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import InfoCard from "@/components/ui/InfoCard";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency } from "@/utils/formatters";

interface OsintReportPageProps {
  data: OsintData;
}

const OsintReportPage: React.FC<OsintReportPageProps> = ({ data }) => {
  const navigate = useNavigate();

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Organization Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              SC Lowy is a leading alternative asset manager with $1.6B AUM, specializing in opportunistic credit and private credit across APAC, Middle East, and Europe.
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
          </CardContent>
        </Card>

        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-600" />
              Security Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-left">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-600" />
              Website Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Domain:</span> sclowy.com</p>
              <p className="text-sm"><span className="font-medium">Tech Stack:</span> WordPress 6.0, PHP 7.4, Apache 2.4</p>
              <p className="text-sm"><span className="font-medium">Analytics IDs:</span> GA ID: UA-12345678</p>
              <p className="text-sm text-red-600 font-medium">Risk Score: 7.8 / 10</p>
            </div>
          </CardContent>
        </Card>

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
            <div className="mt-2">
              <p className="text-sm text-amber-600 font-medium">Recommendation:</p>
              <p className="text-xs text-gray-600">Force password reset for all affected accounts and implement MFA.</p>
            </div>
          </CardContent>
        </Card>

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
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">PDF: {data.fileSearch.PDF.length}</span>
              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">XLS: {data.fileSearch.XLS.length}</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">DOC: {data.fileSearch.DOC.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-6 text-left">
        <h2 className="text-lg font-medium mb-4 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Intelligence Report
        </h2>
        <div className="space-y-4">
          <p className="text-gray-500 text-sm">
            Based on our analysis, we recommend prioritizing the patching of critical vulnerabilities and implementing
            multi-factor authentication for all user accounts. Additionally, the data leaks identified require immediate
            attention with forced password resets.
          </p>
          <p className="text-gray-500 text-sm">
            The technical infrastructure shows multiple areas for improvement, particularly in web server configuration
            and content management system updates. Regular security assessments are recommended to monitor progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OsintReportPage;
