
import { OsintData, NewsItem } from "@/types/data";

// Mock data for the dashboard
export const mockData: OsintData = {
  openPorts: [80, 443],
  qualysScan: {
    severity_1: 26,
    severity_2: 7,
    severity_3: 4,
    severity_4: 1
  },
  organizationDescription: [
    "SC Lowy is a leading alternative asset manager with $1.6 billion in assets under management, specializing in opportunistic credit, special situations, and private credit across Asia Pacific, the Middle East, and Europe. Founded in 2009, the firm operates out of nine global offices with a team of over 50 experienced professionals.\n\nAt SC Lowy, we leverage our deep market expertise and local presence to overcome barriers to entry in fragmented markets. Our dedicated local teams cultivate long-standing relationships, granting us prime access to untapped investment opportunities. We focus on solid, cash-generating businesses and prioritize capital preservation, with a strong emphasis on downside protection through senior secured lending backed by hard assets.\n\nWith a proven track record in both private credit closed-end and open-ended funds, SC Lowy is committed to delivering innovative financial solutions that maximize value for our investors. Our approach combines rigorous credit analysis with a focus on mitigating risk, ensuring robust returns while safeguarding capital."
  ],
  organizationStructure: [59],
  technologies: [
    "Google Maps (Non Paid Users)",
    "Adobe Media Optimizer",
    "reCAPTCHA",
    "Google Tag Manager",
    "Cedexis Radar",
    "DigitalOcean",
    "Apache",
    "Nginx",
    "Outlook",
    "Mobile Friendly",
    "Vimeo",
    "WordPress.org",
    "Google Maps",
    "Google Font API",
    "Gravity Forms"
  ],
  financialData: [450000000],
  contactInformation: {
    phone: ["+852 3405 1300"],
    twitter: ["https://twitter.com/sclowynews"],
    linkedin: ["http://www.linkedin.com/company/sclowy"],
    address: ["8 Queen's Rd, Hong Kong, Hong Kong"]
  },
  websiteInsights: [
    "159.65.201.6",
    "195.191.218.28",
    "14.0.145.137",
    "14.0.209.132"
  ],
  dataLeaksCompliance: [
    {
      id: "21066022788",
      email: "ada.yu@sclowy.com",
      ip_address: "",
      username: "",
      password: "",
      hashed_password: "",
      name: "ada yu",
      vin: "",
      address: "HK;Hong Kong;HKG",
      phone: "98226619",
      database_name: "covve",
      leak_date: "2022-03-15"
    },
    {
      id: "4103859506",
      email: "steve.lyons@sclowy.com",
      ip_address: "",
      username: "",
      password: "iloveian",
      hashed_password: "",
      name: "",
      vin: "",
      address: "",
      phone: "",
      database_name: "BreachCompilation",
      leak_date: "2021-11-22"
    },
    {
      id: "16478160363",
      email: "jamie.tadelis@sclowy.com",
      ip_address: "",
      username: "",
      password: "jamiehal",
      hashed_password: "",
      name: "",
      vin: "",
      address: "",
      phone: "",
      database_name: "Collections",
      leak_date: "2023-01-03"
    },
    {
      id: "15135282863",
      email: "bailey.yi@sclowy.com",
      ip_address: "",
      username: "",
      password: "abcd1308",
      hashed_password: "",
      name: "",
      vin: "",
      address: "",
      phone: "",
      database_name: "Collections",
      leak_date: "2023-02-14"
    },
    {
      id: "8797724263",
      email: "michel.lowy@sclowy.com",
      ip_address: "",
      username: "f3c242fa465e25ba0a74999a7",
      password: "",
      hashed_password: "",
      name: "michel.lowy@sclowy.com",
      vin: "",
      address: "",
      phone: "",
      database_name: "ShareThis",
      leak_date: "2022-07-19"
    }
  ],
  fileSearch: {
    PDF: [
      "https://files.brokercheck.finra.org/firm/firm_305918.pdf",
      "https://reports.adviserinfo.sec.gov/reports/ADV/287701/PDF/287701.pdf",
      "https://www.stockexchangeofmauritius.com/media/10528/upl-results-30-september-2024.pdf",
      "https://reports.adviserinfo.sec.gov/reports/ADV/312843/PDF/312843.pdf",
      "https://elvingerhoss.lu/sites/default/files/generated/sc-lowy-financial-hk-ltd-first-luxembourg-stand-alone-slp-2325.pdf"
    ],
    XLS: [
      "https://www.bankingsupervision.europa.eu/ecb/pub/pdf/ssm.listofsupervisedentities202402.en.xlsx",
      "https://haas.berkeley.edu/wp-content/uploads/2018-International-MBA-Offer-Compilation-with-citizenship-data.xlsx",
      "https://aszp.mnb.hu/sw/static/file/penzugyi_hu_20191230.xls",
      "https://dwtyzx6upklss.cloudfront.net/Uploads/g/p/l/list_of_pri_signatories_as_of_may_2024_45253.xlsx",
      "https://www.globalprivatecapital.org/app/uploads/2024/08/GPCA_Private-Credit-in-Asia_2023_vF-1.xlsx"
    ],
    DOC: [
      "https://fcbfi.org/wp-content/uploads/2023/12/SC-Lowy-Korea_Junior-Analyst_%EC%B1%84%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C.docx",
      "https://cdn.success.isenberg.umass.edu/wp-content/uploads/sites/115/2021/09/Investment-Banking-Resources.docx",
      "http://static2.vietstock.vn/vietstock/2017/8/10/1.MSR_201.08.10_Report%20of%20corporate%20governance%20for%20the%20mid-annual%20of%202017.docx"
    ],
    PPt: []
  },
  biasDistribution: {
    personnel: {
      leftLeaning: 30,
      center: 45,
      rightLeaning: 25
    },
    media: {
      leftLeaning: 28,
      center: 59,
      rightLeaning: 13
    },
    product: {
      leftLeaning: 25,
      center: 55,
      rightLeaning: 20
    }
  },
  recentNews: [
    {
      title: "TradeFi Global Expands Cryptocurrency Trading Services",
      date: "2023-12-10",
      source: "Financial Times",
      url: "#",
      summary: "TradeFi Global announced plans to expand its cryptocurrency trading services, adding support for NFTs and DeFi protocols starting Q1 2024.",
      sentiment: "positive",
      relevance: 0.95,
      tags: ["cryptocurrency", "expansion", "strategic", "trading"]
    },
    {
      title: "Regulatory Inquiry into TradeFi's Singapore Operations",
      date: "2023-11-28",
      source: "Bloomberg",
      url: "#",
      summary: "The Monetary Authority of Singapore (MAS) has opened an inquiry into TradeFi Global's compliance procedures following a series of high-volume transactions.",
      sentiment: "negative",
      relevance: 0.89,
      tags: ["regulatory", "compliance", "risk", "singapore"]
    },
    {
      title: "TradeFi in Advanced Talks to Acquire Asian Fintech Startup",
      date: "2023-12-05",
      source: "Reuters",
      url: "#",
      summary: "Sources close to the matter reveal TradeFi is in advanced negotiations to acquire a Singapore-based fintech startup specializing in AI-driven trading algorithms.",
      sentiment: "positive",
      relevance: 0.92,
      tags: ["acquisition", "M&A", "fintech", "AI"]
    }
  ]
};
