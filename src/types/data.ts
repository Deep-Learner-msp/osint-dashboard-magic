
export interface OsintData {
  openPorts: number[];
  qualysScan: {
    severity_1: number;
    severity_2: number;
    severity_3: number;
    severity_4: number;
  };
  organizationDescription: string[];
  organizationStructure: number[];
  technologies: string[];
  financialData: number[];
  contactInformation: {
    phone: string[];
    twitter: string[];
    linkedin: string[];
    address: string[];
    email: string[];
  };
  websiteInsights: string[];
  dataLeaksCompliance: DataLeak[];
  fileSearch: {
    PDF: string[];
    XLS: string[];
    DOC: string[];
    PPt: string[];
  };
  shodanData?: import("./shodan").ShodanData;
  domains?: string[];
  ipRanges?: string[];
  mailServers?: string[];
  sslCertificates?: {
    domain: string;
    issuer: string;
    expiration: string;
    daysTillExpiry: number;
  }[];
  subdirectories?: string[];
  vulnerabilities?: {
    severity: number;
    description: string;
    remediation: string;
    affected: string;
  }[];
  sensitiveFiles?: {
    filename: string;
    path: string;
    discovery_date: string;
    sensitivity: string;
  }[];
  employeeList?: {
    name: string;
    position: string;
    social_profiles: string[];
    email: string;
  }[];
}

export interface DataLeak {
  id: string;
  email: string;
  ip_address: string;
  username: string | null;
  password: string | null;
  hashed_password: string | null;
  name: string;
  vin: string;
  address: string;
  phone: string;
  database_name: string;
}

export interface CategoryData {
  id: number;
  category: string;
  data: string;
  insights: string;
}
