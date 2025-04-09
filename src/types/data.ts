
import type { ShodanData } from './shodan';

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
}

export interface QualysScan {
  severity_1: number;
  severity_2: number;
  severity_3: number;
  severity_4: number;
}

export interface ContactInfo {
  phone: string[];
  twitter?: string[];
  linkedin?: string[];
  address?: string[];
}

export interface NewsItem {
  title: string;
  date: string;
  source: string;
  url: string;
  summary: string;
  sentiment: "positive" | "negative" | "neutral";
  relevance: number;
  tags: string[];
}

export interface OsintData {
  openPorts: number[];
  qualysScan: QualysScan;
  organizationDescription: string[];
  organizationStructure: number[];
  technologies: string[];
  dataLeaksCompliance: DataLeak[];
  fileSearch: {
    PDF: string[];
    XLS: string[];
    DOC: string[];
    PPt: string[];
  };
  contactInformation: ContactInfo;
  websiteInsights: string[];
  financialData: number[];
  recentNews?: NewsItem[];
  shodanData?: ShodanData; // Using the imported ShodanData type
}

// Types for the OSINT Intelligence Platform API interactions

// DeHashed API
export interface DehashedResponse {
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
}

// Have I Been Pwned API
export interface HIBPEntry {
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

// Apollo Person Enrichment API
export interface ApolloPerson {
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

// Apollo Organization Search API 
export interface ApolloOrganization {
  company_name: string;
  domain: string;
  location: string;
  industry: string;
  revenue: string;
  employee_count: number;
  linkedin_url: string;
  description: string;
}

// BrightData LinkedIn API
export interface BrightDataLinkedIn {
  input: string;
  id: string;
  name: string;
  city: string;
  country_code: string;
  about: string;
  current_company: string;
  experience: any;
  url: string;
  people_also_viewed: Array<{
    profile_link: string;
    name: string;
    about: string;
    location: string;
  }>;
  educations_details: string;
  education: any;
  avatar: string;
  certifications: Array<{
    meta?: string;
    subtitle: string;
    title: string;
    credential_url: string | null;
    credential_id: string | null;
  }>;
  followers: number;
  connections: number;
  current_company_company_id: string;
  current_company_name: string;
  location: string;
  input_url: string;
  linkedin_id: string;
  activity: Array<{
    interaction: string;
    link: string;
    title: string;
    img: string;
    id: string;
  }>;
  linkedin_num_id: string;
  banner_image: string;
  honors_and_awards: any;
  similar_profiles: Array<{
    url: string;
    name: string;
    title: string;
    url_text: string;
  }>;
  default_avatar: boolean;
  memorialized_account: boolean;
  timestamp: string;
}

// Google Search (SERP) API
export interface GoogleSearchFiles {
  pdfs: string[];
  xls: string[];
  ppt: string[];
  doc: string[];
  csv: string[];
}
