
import { OsintData } from "@/types/data";

/**
 * Calculate the security risk score based on Qualys scan results
 */
export const calculateSecurityScore = (data: OsintData): {
  score: number;
  label: string;
  color: string;
} => {
  // Calculate a score from 0-100 based on vulnerabilities
  // Critical (severity_1) has the highest weight
  const { qualysScan } = data;
  
  if (!qualysScan) {
    return { score: 0, label: "Unknown", color: "text-gray-500" };
  }
  
  // Calculate weighted score (higher weight for more severe issues)
  const totalScore = 
    (qualysScan.severity_1 || 0) * 10 + 
    (qualysScan.severity_2 || 0) * 5 + 
    (qualysScan.severity_3 || 0) * 2 + 
    (qualysScan.severity_4 || 0) * 1;
  
  // Normalize score (0-100, where 100 is best/most secure)
  let score = Math.max(0, 100 - totalScore);
  score = Math.min(100, score);
  
  // Return label and color based on score
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
 * Get a list of critical vulnerabilities from qualys data
 */
export const getCriticalVulnerabilities = (data: OsintData): {
  title: string;
  description: string;
  severity: number;
}[] => {
  // This is a simplified version - in a real app, this would parse actual vulnerability data
  const criticalCount = data.qualysScan?.severity_1 || 0;
  
  if (criticalCount === 0) {
    return [];
  }
  
  // Return placeholder critical vulnerabilities
  return [
    {
      title: "SSH Prefix Truncation Vulnerability (Terrapin)",
      description: "The Terrapin attack exploits weaknesses in the SSH transport layer protocol, affecting a majority of current implementations.",
      severity: 1
    },
    {
      title: "OpenSSH Authentication Bypass Vulnerability",
      description: "When common types of DRAM are used, might allow row hammer attacks for authentication bypass.",
      severity: 1
    },
    {
      title: "Deprecated SSH Cryptographic Settings", 
      description: "The SSH protocol is using deprecated cryptographic settings that may allow MitM attacks.",
      severity: 2
    }
  ].slice(0, criticalCount);
};

/**
 * Parse Qualys scan data for detailed reporting
 */
export const parseQualysData = (qualysScan: OsintData['qualysScan']) => {
  if (!qualysScan) {
    return {
      total: 0,
      criticalPercentage: 0,
      highPercentage: 0,
      mediumPercentage: 0,
      lowPercentage: 0
    };
  }
  
  const total = 
    (qualysScan.severity_1 || 0) + 
    (qualysScan.severity_2 || 0) + 
    (qualysScan.severity_3 || 0) + 
    (qualysScan.severity_4 || 0);
  
  if (total === 0) {
    return {
      total: 0,
      criticalPercentage: 0,
      highPercentage: 0,
      mediumPercentage: 0,
      lowPercentage: 0
    };
  }
  
  return {
    total,
    criticalPercentage: Math.round((qualysScan.severity_1 / total) * 100),
    highPercentage: Math.round((qualysScan.severity_2 / total) * 100),
    mediumPercentage: Math.round((qualysScan.severity_3 / total) * 100),
    lowPercentage: Math.round((qualysScan.severity_4 / total) * 100)
  };
};
