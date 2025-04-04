
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
  biasDistribution?: BiasDistribution;
  executiveData?: ExecutiveData;
  recentNews?: NewsItem[];
}

export interface DataLeak {
  id: string;
  email: string;
  ip_address: string;
  username: string;
  password: string;
  hashed_password: string;
  name: string;
  vin: string;
  address: string;
  phone: string;
  database_name: string;
  leak_date?: string;
}

export interface CategoryData {
  id: number;
  category: string;
  data: string;
  insights: string;
}

export interface BiasDistribution {
  personnel: {
    leftLeaning: number;
    center: number;
    rightLeaning: number;
  };
  media: {
    leftLeaning: number;
    center: number;
    rightLeaning: number;
  };
  product: {
    leftLeaning: number;
    center: number;
    rightLeaning: number;
  };
}

export interface ExecutiveData {
  executives: Executive[];
  riskMetrics: {
    cyberExposure: number;
    regulatoryCompliance: string;
    reputationRisk: string;
    competitorCount: number;
  };
  strategicInsights: string[];
}

export interface Executive {
  name: string;
  title: string;
  background: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface NewsItem {
  title: string;
  date: string;
  source: string;
  url: string;
  summary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  relevance: number;
  tags: string[];
}
