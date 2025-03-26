
import { OsintData } from "@/types/data";

/**
 * Check if the data contains critical security issues
 */
export const hasCriticalIssues = (data: OsintData): boolean => {
  // Check for critical severity issues in qualys scan
  if (data.qualysScan?.severity_1 && data.qualysScan.severity_1 > 0) {
    return true;
  }
  
  // Check for password leaks
  if (data.dataLeaksCompliance) {
    const passwordLeaks = data.dataLeaksCompliance.filter(
      leak => leak.password && leak.password.length > 0
    );
    if (passwordLeaks.length > 0) {
      return true;
    }
  }
  
  return false;
};

/**
 * Get security assessment summary
 */
export const getSecurityAssessment = (data: OsintData): {
  score: number;
  label: string;
  color: string;
} => {
  // Calculate a simplified security score based on Qualys findings
  const qualysSeverity = data.qualysScan || { severity_1: 0, severity_2: 0, severity_3: 0, severity_4: 0 };
  
  // Weighted score calculation
  const totalIssues = 
    (qualysSeverity.severity_1 || 0) * 10 + 
    (qualysSeverity.severity_2 || 0) * 5 + 
    (qualysSeverity.severity_3 || 0) * 2 + 
    (qualysSeverity.severity_4 || 0) * 1;
  
  // Normalize to 0-100 score
  let score = Math.max(0, 100 - totalIssues);
  score = Math.min(100, score);
  
  // Get label and color based on score
  if (score >= 90) {
    return { score, label: "Excellent", color: "text-green-600" };
  } else if (score >= 75) {
    return { score, label: "Good", color: "text-blue-600" };
  } else if (score >= 60) {
    return { score, label: "Fair", color: "text-yellow-600" };
  } else if (score >= 40) {
    return { score, label: "Poor", color: "text-orange-600" };
  } else {
    return { score, label: "Critical", color: "text-red-600" };
  }
};

/**
 * Get data completeness percentage
 */
export const getDataCompleteness = (data: OsintData): number => {
  const sections = [
    !!data.openPorts?.length,
    !!data.qualysScan,
    !!data.organizationDescription?.length,
    !!data.organizationStructure?.length,
    !!data.technologies?.length,
    !!data.financialData?.length,
    !!data.contactInformation,
    !!data.websiteInsights?.length,
    !!data.dataLeaksCompliance?.length,
    !!data.fileSearch && Object.values(data.fileSearch).some(files => files.length > 0)
  ];
  
  const completedSections = sections.filter(Boolean).length;
  return Math.round((completedSections / sections.length) * 100);
};

/**
 * Count total leak entries and unique affected users
 */
export const getDataLeakStats = (data: OsintData): {
  totalLeaks: number;
  uniqueUsers: number;
  uniqueDatabases: number;
} => {
  if (!data.dataLeaksCompliance) {
    return { totalLeaks: 0, uniqueUsers: 0, uniqueDatabases: 0 };
  }
  
  const uniqueEmails = new Set(
    data.dataLeaksCompliance.map(leak => leak.email)
  );
  
  const uniqueDatabases = new Set(
    data.dataLeaksCompliance.map(leak => leak.database_name)
  );
  
  return {
    totalLeaks: data.dataLeaksCompliance.length,
    uniqueUsers: uniqueEmails.size,
    uniqueDatabases: uniqueDatabases.size
  };
};
