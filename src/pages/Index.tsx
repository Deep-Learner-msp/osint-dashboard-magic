
import React, { useState } from "react";
import { OsintData } from "../types/data";
import Dashboard from "../components/Dashboard";

const sampleData: OsintData = {
  organizationDescription: ["SC Lowy is a global banking group specializing in fixed income, focusing on primary issues, secondary loan trading and investments. Founded in 2009, the firm has established itself as a market leader in this space."],
  organizationStructure: [120, 50, 30, 10, 5],
  financialData: [2500000000, 12000000, 1500000, 900000],
  domains: ["sclowy.com", "sclowy.net", "sclowy.org"],
  ipRanges: ["192.168.1.0/24", "10.0.0.0/8", "172.16.0.0/12"],
  mailServers: ["mail.sclowy.com", "smtp.sclowy.com", "exchange.sclowy.com"],
  sslCertificates: [
    { domain: "sclowy.com", issuer: "DigiCert Inc", expiration: "2024-08-15", daysTillExpiry: 120 },
    { domain: "api.sclowy.com", issuer: "Let's Encrypt", expiration: "2024-07-20", daysTillExpiry: 64 },
    { domain: "mail.sclowy.com", issuer: "DigiCert Inc", expiration: "2024-09-10", daysTillExpiry: 146 }
  ],
  subdirectories: [
    "/products",
    "/services",
    "/about",
    "/contact",
    "/investors",
    "/media",
    "/research",
    "/careers"
  ],
  technologies: [
    "WordPress",
    "Google Tag Manager",
    "jQuery",
    "Nginx",
    "MySQL",
    "PHP",
    "Google Font API",
    "Google Maps",
    "reCAPTCHA"
  ],
  websiteInsights: ["159.65.201.6", "159.89.100.23", "164.90.132.45"],
  vulnerabilities: [
    { severity: 1, description: "SSL Certificate Using Weak Signature Algorithm", remediation: "Update SSL certificate to use SHA-256 or higher", affected: "mail.sclowy.com" },
    { severity: 2, description: "Cross-Site Scripting Vulnerability", remediation: "Implement input validation and output encoding", affected: "sclowy.com/search" },
    { severity: 3, description: "Missing HTTP Strict Transport Security Header", remediation: "Add HSTS header to all responses", affected: "api.sclowy.com" },
    { severity: 4, description: "Outdated jQuery Version", remediation: "Update jQuery to latest version", affected: "sclowy.com" }
  ],
  qualysData: {
    severity_1: 2,
    severity_2: 8,
    severity_3: 15,
    severity_4: 13
  },
  dataLeaksCompliance: [
    { id: 1, email: "john.doe@sclowy.com", database_name: "LinkedIn 2021", password: null, hashed_password: "5f4dcc3b5aa765d61d8327deb882cf99", name: "John Doe", username: null },
    { id: 2, email: "jane.smith@sclowy.com", database_name: "Adobe 2020", password: null, hashed_password: "e99a18c428cb38d5f260853678922e03", name: "Jane Smith", username: null },
    { id: 3, email: "michael.johnson@sclowy.com", database_name: "Dropbox 2019", password: "finance2019", hashed_password: null, name: "Michael Johnson", username: null },
    { id: 4, email: "susan.williams@sclowy.com", database_name: "MyFitnessPal 2018", password: null, hashed_password: "d8578edf8458ce06fbc5bb76a58c5ca4", name: "Susan Williams", username: null },
    { id: 5, email: "robert.brown@sclowy.com", database_name: "LinkedIn 2021", password: null, hashed_password: "5f4dcc3b5aa765d61d8327deb882cf99", name: "Robert Brown", username: null }
  ],
  sensitiveFiles: [
    { filename: "annual_report_2023.pdf", path: "/investors/reports/", discovery_date: "2023-11-15", sensitivity: "Medium" },
    { filename: "board_meeting_minutes.docx", path: "/internal/meetings/", discovery_date: "2023-12-20", sensitivity: "High" },
    { filename: "product_roadmap_2024.xlsx", path: "/strategy/planning/", discovery_date: "2024-01-10", sensitivity: "Medium" },
    { filename: "employee_salaries.csv", path: "/hr/confidential/", discovery_date: "2024-02-05", sensitivity: "Critical" }
  ],
  employeeList: [
    { name: "John Doe", position: "Chief Financial Officer", social_profiles: ["linkedin.com/in/johndoe", "twitter.com/johndoe"], email: "john.doe@sclowy.com" },
    { name: "Jane Smith", position: "Director of Operations", social_profiles: ["linkedin.com/in/janesmith"], email: "jane.smith@sclowy.com" },
    { name: "Michael Johnson", position: "Senior Risk Analyst", social_profiles: ["linkedin.com/in/michaeljohnson", "twitter.com/mjohnson"], email: "michael.johnson@sclowy.com" }
  ],
  contactInformation: {
    address: ["25 Bank Street, Canary Wharf, London E14 5JP, United Kingdom", "1 Financial Street, Central, Hong Kong"],
    phone: ["+44 20 1234 5678", "+852 1234 5678"],
    email: ["info@sclowy.com", "investors@sclowy.com", "careers@sclowy.com"],
    twitter: ["https://twitter.com/sclowy"],
    linkedin: ["https://linkedin.com/company/sclowy"]
  },
  shodanData: [
    {
      ip: "159.65.201.6",
      hostname: "sclowy.com",
      org: "DigitalOcean, LLC",
      country: "Netherlands",
      city: "Amsterdam",
      ports: [22, 80, 443],
      services: [
        {
          port: 22,
          name: "SSH",
          version: "OpenSSH 8.2p1 Ubuntu 4ubuntu0.12",
          transport: "tcp",
          banner: "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.12"
        },
        {
          port: 80,
          name: "HTTP",
          transport: "tcp",
          product: "nginx"
        },
        {
          port: 443,
          name: "HTTPS",
          transport: "tcp",
          product: "nginx",
          ssl: {
            cert: {
              issuer: {
                C: "US", 
                CN: "E6", 
                O: "Let's Encrypt"
              },
              subject: {
                CN: "sclowy.com"
              },
              expires: "2025-05-19T12:14:49Z"
            }
          }
        }
      ],
      vulnerabilities: [
        {
          severity: 1,
          name: "SSL Version 2 and 3 Protocol Detection",
          description: "SSL 2.0 and 3.0 protocols have known vulnerabilities and should be disabled.",
          remediation: "Upgrade to TLS 1.2 or higher and disable older SSL protocols."
        }
      ]
    }
  ]
};

const Index: React.FC = () => {
  const [data] = useState<OsintData>(sampleData);

  return (
    <div className="index-page">
      <Dashboard data={data} />
    </div>
  );
};

export default Index;
