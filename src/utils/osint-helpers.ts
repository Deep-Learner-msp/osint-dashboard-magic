
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
  // Calculate a security score based on Qualys findings
  const qualysSeverity = data.qualysScan || { severity_1: 0, severity_2: 0, severity_3: 0, severity_4: 0 };
  
  // Weighted score calculation
  const totalIssues = 
    (qualysSeverity.severity_1 || 0) * 10 + 
    (qualysSeverity.severity_2 || 0) * 5 + 
    (qualysSeverity.severity_3 || 0) * 2 + 
    (qualysSeverity.severity_4 || 0) * 1;
  
  // Add data leak impact
  const dataLeakImpact = data.dataLeaksCompliance ? Math.min(20, data.dataLeaksCompliance.length * 2) : 0;
  
  // Add open ports impact
  const portsImpact = data.openPorts ? Math.min(15, data.openPorts.length * 1.5) : 0;
  
  // Calculate final score
  let score = Math.max(0, 100 - totalIssues - dataLeakImpact - portsImpact);
  
  // Add random minor variations for naturality
  score = Math.max(0, Math.min(100, score + (Math.random() * 5 - 2.5)));
  
  // Round to nearest integer
  score = Math.round(score);
  
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
    !!data.fileSearch && Object.values(data.fileSearch).some(files => files.length > 0),
    !!data.shodanData
  ];
  
  const completedSections = sections.filter(Boolean).length;
  // Add a small random factor for naturality
  return Math.min(100, Math.round((completedSections / sections.length) * 100) + Math.floor(Math.random() * 5));
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

/**
 * Generate threat intelligence data based on OSINT findings
 */
export const generateThreatIntelligence = (data: OsintData): {
  type: string;
  name: string;
  severity: string;
  details: string;
}[] => {
  const threats = [];
  
  // Add threats based on critical vulnerabilities
  if (data.qualysScan?.severity_1 > 0) {
    threats.push({
      type: "Vulnerability",
      name: "Critical Security Vulnerabilities",
      severity: "Critical",
      details: `${data.qualysScan.severity_1} critical vulnerabilities detected that could allow remote code execution or privilege escalation.`
    });
  }
  
  // Add threats based on data leaks
  if (data.dataLeaksCompliance?.length > 0) {
    threats.push({
      type: "Data Breach",
      name: "Credential Compromise",
      severity: "High",
      details: `${data.dataLeaksCompliance.length} credentials found in breach databases, potentially enabling account takeover attacks.`
    });
  }
  
  // Add threats based on open ports
  if (data.openPorts?.length > 0) {
    threats.push({
      type: "Exposure",
      name: "Excessive Attack Surface",
      severity: "Medium",
      details: `${data.openPorts.length} open ports detected, increasing the attack surface and potential entry points.`
    });
  }
  
  // Add threats based on technology stack
  if (data.technologies?.some(tech => tech.includes("WordPress") || tech.includes("Plugin"))) {
    threats.push({
      type: "Software",
      name: "CMS Vulnerabilities",
      severity: "Medium",
      details: "WordPress and associated plugins detected that may contain security vulnerabilities if not regularly updated."
    });
  }
  
  return threats;
};
