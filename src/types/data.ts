
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
  shodanData?: ShodanData;
  biasDistribution?: BiasDistribution;
  executiveData?: ExecutiveData;
  recentNews?: NewsItem[];
  
  // Added API data structures
  dehashed?: DehashedData;
  haveibeenpwned?: HIBPData;
  apolloPeople?: ApolloPeopleData[];
  apolloOrganization?: ApolloOrganizationData;
  brightDataProfiles?: BrightDataProfile[];
  googleSearch?: GoogleSearchData;
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

// New DeHashed API Data Interface
export interface DehashedData {
  balance: number;
  entries: DehashedEntry[];
  success: boolean;
  took: string;
  total: number;
}

export interface DehashedEntry {
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

// Have I Been Pwned API Data Interface
export interface HIBPData {
  breaches: HIBPBreach[];
}

export interface HIBPBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
}

// Apollo.ai People Enrichment API Data Interface
export interface ApolloPeopleData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  company: string;
  title: string;
  location: string;
  industry: string;
  revenue: string;
  employee_count: number;
}

// Apollo.ai Organization Search API Data Interface
export interface ApolloOrganizationData {
  id: string;
  name: string;
  website_url: string;
  linkedin_url: string;
  twitter_url: string;
  primary_phone: {
    number: string;
    source: string;
    sanitized_number: string;
  };
  languages: string[];
  phone: string;
  linkedin_uid: string;
  founded_year: number;
  logo_url: string;
  primary_domain: string;
  sanitized_phone: string;
  industry: string;
  keywords: string[];
  estimated_num_employees: number;
  industries: string[];
  secondary_industries: string[];
  raw_address: string;
  street_address: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
  short_description: string;
  technology_names: string[];
  current_technologies: {
    uid: string;
    name: string;
    category: string;
  }[];
  funding_events?: {
    id: string;
    date: string;
    news_url: string | null;
    type: string;
    investors: string;
    amount: string;
    currency: string;
  }[];
  total_funding?: number;
  total_funding_printed?: string;
}

// Shodan API Data Interface
export interface ShodanData {
  ip: number;
  ip_str: string;
  ports: number[];
  hostnames: string[];
  domains: string[];
  country_code: string;
  country_name: string;
  city: string;
  region_code: string;
  os?: string;
  tags: string[];
  isp: string;
  area_code?: number;
  longitude: number;
  latitude: number;
  last_update: string;
  org: string;
  asn: string;
  data: ShodanServiceData[];
}

export interface ShodanServiceData {
  port: number;
  transport: string;
  product?: string;
  http?: {
    status?: number;
    title?: string;
    server?: string;
  };
  ssl?: {
    cert: {
      subject: {
        CN: string;
      };
      expires: string;
      issuer: {
        CN: string;
      };
    };
  };
}

// Bright Data LinkedIn Profile API Data Interface
export interface BrightDataProfile {
  input: {
    linkedin_url: string;
  };
  id: string;
  name: string;
  city: string;
  country_code: string;
  about: string;
  current_company: string;
  experience: any[];
  url: string;
  people_also_viewed: {
    profile_link: string;
    name: string;
    about: string | null;
    location: string;
  }[];
  educations_details: string;
  education: any[] | null;
  avatar: string;
  certifications: {
    meta?: string;
    subtitle: string;
    title: string;
    credential_url: string | null;
    credential_id: string | null;
  }[];
  followers: number;
  connections: number;
  current_company_company_id: string;
  current_company_name: string;
  location: string;
  linkedin_id: string;
  activity: {
    interaction: string;
    link: string;
    title: string;
    img: string;
    id: string;
  }[];
  linkedin_num_id: string;
  banner_image: string;
}

// Google Search (SERP) API Data Interface
export interface GoogleSearchData {
  pdfs: string[];
  xls: string[];
  ppt: string[];
  doc: string[];
  csv: string[];
}
