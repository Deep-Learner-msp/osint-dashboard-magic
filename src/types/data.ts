
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
}

export interface CategoryData {
  id: number;
  category: string;
  data: string;
  insights: string;
}
