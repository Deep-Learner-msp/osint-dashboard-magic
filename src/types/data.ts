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
  city: string;
  region_code: string;
  os: string | null;
  tags: string[];
  ip: number;
  isp: string;
  area_code: string | null;
  longitude: number;
  last_update: string;
  ports: number[];
  latitude: number;
  hostnames: string[];
  country_code: string;
  country_name: string;
  domains: string[];
  org: string;
  data: ShodanServiceData[];
  asn: string;
  ip_str: string;
}

export interface ShodanServiceData {
  port: number;
  transport: string;
  product?: string;
  version?: string;
  http?: {
    status?: number;
    title?: string;
    server?: string;
    robots_hash?: string | null;
    title_hash?: number;
    securitytxt?: string | null;
    sitemap_hash?: string | null;
    html_hash?: number;
    robots?: string | null;
    dom_hash?: number;
    headers_hash?: number;
    host?: string;
    location?: string;
    components?: Record<string, any>;
    securitytxt_hash?: string | null;
    server_hash?: number;
    favicon?: {
      hash: number;
      data: string;
      location: string;
    };
  };
  ssl?: {
    cert: {
      subject: {
        CN: string;
        C?: string;
        O?: string;
      };
      expires: string;
      issuer: {
        CN: string;
        C?: string;
        O?: string;
      };
    };
  };
  ip?: number;
  cloud?: {
    region: string;
    service: string | null;
    provider: string;
  };
  location?: {
    city: string;
    region_code: string;
    area_code: string | null;
    longitude: number;
    country_name: string;
    country_code: string;
    latitude: number;
  };
  hash?: number;
  tags?: string[];
  timestamp?: string;
  hostnames?: string[];
  org?: string;
  data?: string;
  asn?: string;
  cpe23?: string[];
  isp?: string;
  cpe?: string[];
  domains?: string[];
  ip_str?: string;
  os?: string | null;
  _shodan?: {
    region: string;
    module: string;
    ptr: boolean;
    id: string;
    options: Record<string, any>;
    crawler: string;
  };
  opts?: Record<string, any>;
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
