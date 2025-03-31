
export interface QualysVulnerability {
  qid: string;
  title: string;
  type: string;
  severity: number;
  port?: string;
  protocol?: string;
  cveId?: string;
  vendorReference?: string;
  cvssBase?: string;
  threat?: string;
  impact?: string;
  solution?: string;
  exploitability?: string;
  results?: string;
  category?: string;
  // Add missing properties
  description: string;
  cve?: string;
  affectedSystems: string[];
  remediation: string[];
  detected: string;
}

export const severityColors = {
  1: "bg-red-600 text-white",
  2: "bg-orange-500 text-white",
  3: "bg-yellow-500 text-black",
  4: "bg-blue-500 text-white",
};

export const getSeverityLabel = (severity: number): string => {
  switch (severity) {
    case 1:
      return "Critical";
    case 2:
      return "High";
    case 3:
      return "Medium";
    case 4:
      return "Low";
    default:
      return "Unknown";
  }
};

export const sampleQualysData: QualysVulnerability[] = [
  {
    qid: "38913",
    title: "SSH Prefix Truncation Vulnerability (Terrapin)",
    type: "Vuln",
    severity: 4,
    port: "22",
    protocol: "tcp",
    cveId: "CVE-2023-48795",
    cve: "CVE-2023-48795",
    vendorReference: "OpenSSH Advisory",
    cvssBase: "6.4 (AV:N/AC:L/Au:N/C:P/I:P/A:N)",
    threat: "The Terrapin attack exploits weaknesses in the SSH transport layer protocol in combination with newer cryptographic algorithms and encryption modes introduced by OpenSSH over 10 years ago.",
    impact: "Successful exploitation of the vulnerability may allow an attacker to downgrade the security of an SSH connection when using SSH extension negotiation.",
    solution: "Customers are advised to refer to the individual vendor advisory for their operating system and install the patch released by the vendor.",
    results: "SSH Prefix Truncation Vulnerability (Terrapin) detected on port: 22\nChaCha20-Poly1305 Algorithm Support: True\nCBC-EtM Algorithm Support: True\nStrict Key Exchange algorithm enabled: False",
    category: "General remote services",
    description: "The Terrapin attack exploits weaknesses in the SSH transport layer protocol in combination with newer cryptographic algorithms and encryption modes introduced by OpenSSH over 10 years ago.",
    affectedSystems: ["SSH Server", "OpenSSH 8.2", "All Linux Distributions"],
    remediation: ["Update OpenSSH to the latest version", "Apply vendor-specific patches", "Configure SSH to disable vulnerable encryption modes"],
    detected: "2025-03-10T14:30:00Z"
  },
  {
    qid: "38739",
    title: "Deprecated SSH Cryptographic Settings",
    type: "Vuln",
    severity: 3,
    port: "22",
    protocol: "tcp",
    cvssBase: "6.4 (AV:N/AC:L/Au:N/C:P/I:P/A:N)",
    threat: "The SSH protocol (Secure Shell) is a method for secure remote login from one computer to another. The target is using deprecated SSH cryptographic settings to communicate.",
    impact: "A man-in-the-middle attacker may be able to exploit this vulnerability to record the communication to decrypt the session key and even the messages.",
    solution: "Avoid using deprecated cryptographic settings. Use best practices when configuring SSH.",
    results: "Type\tName\nkey exchange\tdiffie-hellman-group1-sha1\ncipher\taes128-cbc\ncipher\taes192-cbc\ncipher\taes256-cbc\ncipher\tblowfish-cbc\ncipher\tcast128-cbc\ncipher\t3des-cbc",
    category: "General remote services",
    description: "The target is using deprecated SSH cryptographic settings which could be vulnerable to attacks.",
    affectedSystems: ["SSH Server", "All SSH Services"],
    remediation: ["Update SSH configuration", "Remove deprecated cipher suites", "Implement modern encryption standards"],
    detected: "2025-03-09T10:15:00Z"
  },
  {
    qid: "38909",
    title: "SHA1 deprecated setting for SSH",
    type: "Vuln",
    severity: 2,
    port: "22",
    protocol: "tcp",
    cvssBase: "2.6 (AV:N/AC:H/Au:N/C:N/I:P/A:N)",
    threat: "The SSH protocol (Secure Shell) is a method for secure remote login from one computer to another. The target is using deprecated SHA1 cryptographic settings to communicate.",
    impact: "Vulnerable to collision attacks, which are designed to fabricate the same hash value for different input data.",
    solution: "Avoid using deprecated cryptographic settings. Use best practices when configuring SSH.",
    results: "Type\tName\nkey exchange\tdiffie-hellman-group-exchange-sha1\nkey exchange\tdiffie-hellman-group14-sha1\nkey exchange\tdiffie-hellman-group1-sha1\nhost key algorithm\tssh-rsa\nMAC\thmac-sha1-etm@openssh.com\nMAC\thmac-sha1",
    category: "General remote services",
    description: "The target is using deprecated SHA1 cryptographic settings in SSH which are known to be vulnerable.",
    affectedSystems: ["SSH Server", "All SSH Services using SHA1"],
    remediation: ["Configure SSH to use modern hash algorithms", "Disable SHA1-based key exchange methods", "Update SSH configuration files"],
    detected: "2025-03-08T16:45:00Z"
  },
  {
    qid: "82003",
    title: "ICMP Timestamp Request",
    type: "Vuln",
    severity: 1,
    cveId: "CVE-1999-0524",
    cve: "CVE-1999-0524",
    cvssBase: "2.1 (AV:L/AC:L/Au:N/C:P/I:N/A:N)",
    threat: "ICMP (Internet Control and Error Message Protocol) is a protocol encapsulated in IP packets. It's principal purpose is to provide a protocol layer able to inform gateways of the inter-connectivity and accessibility of other gateways or hosts.",
    impact: "Unauthorized users can obtain information about your network by sending ICMP timestamp packets.",
    solution: "You can filter ICMP messages of type \"Timestamp\" and \"Timestamp Reply\" at the firewall level.",
    results: "Timestamp of host (network byte ordering): 11:53:49 GMT",
    category: "TCP/IP",
    description: "ICMP timestamp requests are enabled, allowing potential attackers to gather information about network time synchronization and potentially aid in other attacks.",
    affectedSystems: ["Network Firewall", "Router", "All Internet-Facing Systems"],
    remediation: ["Configure firewall to block ICMP timestamp requests", "Implement ICMP filtering rules", "Update network security policies"],
    detected: "2025-03-11T09:20:00Z"
  },
  {
    qid: "38919",
    title: "OpenSSH Authentication Bypass Vulnerability",
    type: "Practice",
    severity: 4,
    cveId: "CVE-2023-51767",
    cve: "CVE-2023-51767",
    vendorReference: "OpenSSH 9.6",
    cvssBase: "0.0 (AV:L/AC:L/Au:N/C:N/I:N/A:N)",
    threat: "OpenSSH is a set of computer programs providing encrypted communication sessions over a computer network using the SSH protocol.",
    impact: "Successful exploitation allows OS command injection and row hammer attacks for authentication bypass.",
    solution: "There are no vendor supplied patches available at this time.",
    results: "Vulnerable SSH-2.0-OpenSSH_7.4 detected on port 22 over TCP.",
    category: "General remote services",
    description: "A vulnerability in OpenSSH could potentially allow attackers to bypass authentication mechanisms under specific conditions.",
    affectedSystems: ["SSH Server", "OpenSSH 7.4", "Linux Systems"],
    remediation: ["Monitor for vendor patches", "Implement additional authentication methods", "Restrict SSH access to trusted networks"],
    detected: "2025-03-12T11:30:00Z"
  }
];
