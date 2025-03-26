
export interface ShodanLocation {
  city: string;
  region_code: string;
  area_code: string | null;
  longitude: number;
  country_name: string;
  country_code: string;
  latitude: number;
}

export interface ShodanCloud {
  region: string;
  service: string | null;
  provider: string;
}

export interface ShodanSSHData {
  type: string;
  fingerprint: string;
  mac: string;
  cipher: string;
  key: string;
  kex: {
    unused: number;
    server_host_key_algorithms: string[];
    encryption_algorithms: string[];
    kex_follows: boolean;
    languages: string[];
    kex_algorithms: string[];
    compression_algorithms: string[];
    mac_algorithms: string[];
  };
  hassh: string;
}

export interface ShodanHttpComponent {
  categories: string[];
  versions?: string[];
}

export interface ShodanHttpData {
  status: number;
  robots_hash: string | null;
  redirects: any[];
  title_hash: number;
  securitytxt: string | null;
  title: string;
  sitemap_hash: string | null;
  html_hash: number;
  robots: string | null;
  dom_hash: number;
  headers_hash: number;
  host: string;
  location: string;
  components: Record<string, ShodanHttpComponent>;
  securitytxt_hash: string | null;
  server: string;
  sitemap: string | null;
  server_hash: number;
  favicon?: {
    hash: number;
    data: string;
    location: string;
  };
}

export interface ShodanSSLCert {
  sig_alg: string;
  issued: string;
  expires: string;
  expired: boolean;
  version: number;
  extensions: {
    critical?: boolean;
    data: string;
    name: string;
  }[];
  fingerprint: {
    sha256: string;
    sha1: string;
  };
  serial: number;
  subject: {
    CN: string;
  };
  pubkey: {
    type: string;
    bits: number;
  };
  issuer: {
    C: string;
    CN: string;
    O: string;
  };
}

export interface ShodanSSLData {
  chain_sha256: string[];
  jarm: string;
  tlsext: any[];
  chain: string[];
  versions: string[];
  acceptable_cas: any[];
  ja3s: string;
  cert: ShodanSSLCert;
  cipher: {
    version: string;
    bits: number;
    name: string;
  };
  trust: {
    revoked: boolean;
    browser: any;
  };
  handshake_states: string[];
  alpn: any[];
  ocsp: Record<string, any>;
}

export interface ShodanServiceData {
  ip: number;
  hash?: number;
  port: number;
  transport: string;
  cloud: ShodanCloud;
  location: ShodanLocation;
  product: string;
  tags: string[];
  timestamp: string;
  hostnames: string[];
  org: string;
  data: string;
  asn: string;
  cpe23: string[];
  isp: string;
  cpe: string[];
  domains: string[];
  ip_str: string;
  os: string | null;
  _shodan: {
    region: string;
    module: string;
    ptr: boolean;
    id: string;
    options: Record<string, any>;
    crawler: string;
  };
  opts: Record<string, any>;
  http?: ShodanHttpData;
  ssh?: ShodanSSHData;
  ssl?: ShodanSSLData;
  info?: string;
}

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
