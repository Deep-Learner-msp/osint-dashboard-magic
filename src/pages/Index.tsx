import React from "react";
import Dashboard from "@/components/Dashboard";
import { OsintData } from "@/types/data";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      database_name: "covve"
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
      database_name: "BreachCompilation"
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
      database_name: "Collections"
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
      database_name: "Collections"
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
      database_name: "ShareThis"
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
  shodanData: {
    "city": "Amsterdam",
    "region_code": "NH",
    "os": null,
    "tags": [
        "cloud"
    ],
    "ip": 2671888646,
    "isp": "DigitalOcean, LLC",
    "area_code": null,
    "longitude": 4.88969,
    "last_update": "2025-03-23T21:26:22.802009",
    "ports": [
        80,
        443,
        22
    ],
    "latitude": 52.37403,
    "hostnames": [
        "sclowy.com",
        "www.sclowy.com"
    ],
    "country_code": "NL",
    "country_name": "Netherlands",
    "domains": [
        "sclowy.com"
    ],
    "org": "DigitalOcean, LLC",
    "data": [
        {
            "port": 22,
            "transport": "tcp",
            "version": "8.2p1 Ubuntu 4ubuntu0.12",
            "cloud": {
                "region": "nl-nh",
                "service": null,
                "provider": "DigitalOcean"
            },
            "location": {
                "city": "Amsterdam",
                "region_code": "NH",
                "area_code": null,
                "longitude": 4.88969,
                "country_name": "Netherlands",
                "country_code": "NL",
                "latitude": 52.37403
            },
            "product": "OpenSSH",
            "hash": -1343835081,
            "tags": [
                "cloud"
            ],
            "timestamp": "2025-03-18T17:33:22.834715",
            "hostnames": [],
            "ssh": {
                "type": "ssh-rsa",
                "fingerprint": "c7:3b:7b:bd:6d:a0:25:d1:d8:1c:4d:e9:cc:b9:0f:30",
                "mac": "hmac-sha2-256",
                "cipher": "aes128-ctr",
                "key": "AAAAB3NzaC1yc2EAAAADAQABAAABgQDZZE2rqJKFsYu6x9O7B6zOmn2yi/2gzKb3Hv9r/q6tZbxY\npCv/savk+znJ9aw4RsHdGCHYscori+1kOvjNPIG8oc0mMv67qjr3ZAsHeGrddtMgH2Q4HmALAcVx\nYnNCzknvmRSYES+LtCee86AtZmOkIqOPApUPisHnnewL9iSagR0Xa1dzL4t06JO0INbDjBZkezZ2\n3o8iZR+v+Qy4BSwEa0YMk4im65mq79P82wUKdPeYkBL7GztvOKVYxAl50+B+AhDOlH5q+tRJ35Qc\nwFJiuYYeAovQE7Rdjd0+gsF0xztkc9R8ETp6Fn2m08trQqHV0pxW+5zQ1VRW3pffk3zkVYsfE9s/\n49qf6dD40mV5pLG541lBBAjgnaK5CDf3wFNfcYLM8MFKn4pHqHqKeoKlJR87SMBZxuVMA0metlTJ\ny+CvxOnNXW95WVYftehJdhS02BYTD7ExJOvvK2RbTJpGNVi7wyq9E/dV1JWtVAxgnLJrljlcSq4f\nwozvwtf+Zw0=\n",
                "kex": {
                    "unused": 0,
                    "server_host_key_algorithms": [
                        "rsa-sha2-512",
                        "rsa-sha2-256",
                        "ssh-rsa",
                        "ecdsa-sha2-nistp256",
                        "ssh-ed25519"
                    ],
                    "encryption_algorithms": [
                        "chacha20-poly1305@openssh.com",
                        "aes128-ctr",
                        "aes192-ctr",
                        "aes256-ctr",
                        "aes128-gcm@openssh.com",
                        "aes256-gcm@openssh.com"
                    ],
                    "kex_follows": false,
                    "languages": [
                        ""
                    ],
                    "kex_algorithms": [
                        "curve25519-sha256",
                        "curve25519-sha256@libssh.org",
                        "ecdh-sha2-nistp256",
                        "ecdh-sha2-nistp384",
                        "ecdh-sha2-nistp521",
                        "diffie-hellman-group-exchange-sha256",
                        "diffie-hellman-group16-sha512",
                        "diffie-hellman-group18-sha512",
                        "diffie-hellman-group14-sha256",
                        "kex-strict-s-v00@openssh.com"
                    ],
                    "compression_algorithms": [
                        "none",
                        "zlib@openssh.com"
                    ],
                    "mac_algorithms": [
                        "umac-64-etm@openssh.com",
                        "umac-128-etm@openssh.com",
                        "hmac-sha2-256-etm@openssh.com",
                        "hmac-sha2-512-etm@openssh.com",
                        "hmac-sha1-etm@openssh.com",
                        "umac-64@openssh.com",
                        "umac-128@openssh.com",
                        "hmac-sha2-256",
                        "hmac-sha2-512",
                        "hmac-sha1"
                    ]
                },
                "hassh": "779664e66160bf75999f091fce5edb5a"
            },
            "org": "DigitalOcean, LLC",
            "data": "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.12\nKey type: ssh-rsa\nKey: AAAAB3NzaC1yc2EAAAADAQABAAABgQDZZE2rqJKFsYu6x9O7B6zOmn2yi/2gzKb3Hv9r/q6tZbxY\npCv/savk+znJ9aw4RsHdGCHYscori+1kOvjNPIG8oc0mMv67qjr3ZAsHeGrddtMgH2Q4HmALAcVx\nYnNCzknvmRSYES+LtCee86AtZmOkIqOPApUPisHnnewL9iSagR0Xa1dzL4t06JO0INbDjBZkezZ2\n3o8iZR+v+Qy4BSwEa0YMk4im65mq79P82wUKdPeYkBL7GztvOKVYxAl50+B+AhDOlH5q+tRJ35Qc\nwFJiuYYeAovQE7Rdjd0+gsF0xztkc9R8ETp6Fn2m08trQqHV0pxW+5zQ1VRW3pffk3zkVYsfE9s/\n49qf6dD40mV5pLG541lBBAjgnaK5CDf3wFNfcYLM8MFKn4pHqHqKeoKlJR87SMBZxuVMA0metlTJ\ny+CvxOnNXW95WVYftehJdhS02BYTD7ExJOvvK2RbTJpGNVi7wyq9E/dV1JWtVAxgnLJrljlcSq4f\nwozvwtf+Zw0=\nFingerprint: c7:3b:7b:bd:6d:a0:25:d1:d8:1c:4d:e9:cc:b9:0f:30\n\nKex Algorithms:\n\tcurve25519-sha256\n\tcurve25519-sha256@libssh.org\n\tecdh-sha2-nistp256\n\tecdh-sha2-nistp384\n\tecdh-sha2-nistp521\n\tdiffie-hellman-group-exchange-sha256\n\tdiffie-hellman-group16-sha512\n\tdiffie-hellman-group18-sha512\n\tdiffie-hellman-group14-sha256\n\tkex-strict-s-v00@openssh.com\n\nServer Host Key Algorithms:\n\trsa-sha2-512\n\trsa-sha2-256\n\tssh-rsa\n\tecdsa-sha2-nistp256\n\tssh-ed25519\n\nEncryption Algorithms:\n\tchacha20-poly1305@openssh.com\n\taes128-ctr\n\taes192-ctr\n\taes256-ctr\n\taes128-gcm@openssh.com\n\taes256-gcm@openssh.com\n\nMAC Algorithms:\n\tumac-64-etm@openssh.com\n\tumac-128-etm@openssh.com\n\thmac-sha2-256-etm@openssh.com\n\thmac-sha2-512-etm@openssh.com\n\thmac-sha1-etm@openssh.com\n\tumac-64@openssh.com\n\tumac-128@openssh.com\n\thmac-sha2-256\n\thmac-sha2-512\n\thmac-sha1\n\nCompression Algorithms:\n\tnone\n\tzlib@openssh.com\n",
            "asn": "AS14061",
            "cpe23": [
                "cpe:2.3:a:openbsd:openssh:8.2p1",
                "cpe:2.3:o:canonical:ubuntu_linux"
            ],
            "info": "protocol 2.0",
            "isp": "DigitalOcean, LLC",
            "cpe": [
                "cpe:/a:openbsd:openssh:8.2p1",
                "cpe:/o:canonical:ubuntu_linux"
            ],
            "domains": [],
            "ip_str": "159.65.201.6",
            "os": "Linux",
            "_shodan": {
                "region": "eu",
                "module": "ssh",
                "ptr": true,
                "id": "31079763-9ae8-4cb4-b662-60b6875d6666",
                "options": {},
                "crawler": "bfb295b1dac9b1783126e88777b186a5006c26b0"
            },
            "opts": {}
        },
        {
            "port": 80,
            "transport": "tcp",
            "cloud": {
                "region": "nl-nh",
                "service": null,
                "provider": "DigitalOcean"
            },
            "location": {
                "city": "Amsterdam",
                "region_code": "NH",
                "area_code": null,
                "longitude": 4.88969,
                "country_name": "Netherlands",
                "country_code": "NL",
                "latitude": 52.37403
            },
            "product": "nginx",
            "http": {
                "status": 200,
                "robots_hash": null,
                "redirects": [],
                "title_hash": 758560121,
                "securitytxt": null,
                "title": "Artboard",
                "sitemap_hash": null,
                "html_hash": 1361730808,
                "robots": null,
                "dom_hash": 495430245,
                "headers_hash": -2017483894,
                "host": "159.65.201.6",
                "location": "/",
                "components": {},
                "securitytxt_hash": null,
                "server": "nginx",
                "sitemap": null,
                "server_hash": -1340961475
            },
            "hash": -2116735968,
            "tags": [
                "cloud"
            ],
            "timestamp": "2025-03-21T18:51:18.747408",
            "hostnames": [],
            "org": "DigitalOcean, LLC",
            "data": "HTTP/1.1 200 OK\r\nServer: nginx\r\nDate: Fri, 21 Mar 2025 18:51:18 GMT\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: 29285\r\nLast-Modified: Fri, 12 Apr 2024 08:50:06 GMT\r\nConnection: keep-alive\r\nVary: Accept-Encoding\r\nETag: \"6618f5be-7265\"\r\nX-Frame-Options: SAMEORIGIN\r\nX-XSS-Protection: 1; mode=block\r\nX-Content-Type-Options: nosniff\r\nAccept-Ranges: bytes\r\n\r\n",
            "asn": "AS14061",
            "cpe23": [
                "cpe:2.3:a:f5:nginx"
            ],
            "isp": "DigitalOcean, LLC",
            "cpe": [
                "cpe:/a:f5:nginx"
            ],
            "domains": [],
            "ip_str": "159.65.201.6",
            "os": null,
            "_shodan": {
                "region": "eu",
                "module": "http",
                "ptr": true,
                "options": {},
                "id": "4c096ac2-fc8d-4505-accd-837755ee94cc",
                "crawler": "f84746de6c89bcf60f34a5f0aee149448facfc91"
            },
            "opts": {}
        },
        {
            "port": 443,
            "transport": "tcp",
            "cloud": {
                "region": "nl-nh",
                "service": null,
                "provider": "DigitalOcean"
            },
            "location": {
                "city": "Amsterdam",
                "region_code": "NH",
                "area_code": null,
                "longitude": 4.88969,
                "country_name": "Netherlands",
                "country_code": "NL",
                "latitude": 52.37403
            },
            "product": "nginx",
            "http": {
                "status": 200,
                "robots_hash": null,
                "redirects": [],
                "title_hash": 340298613,
                "favicon": {
                    "hash": 1061459480,
                    "data": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJN\nAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABtlBMVEUSS2EQSWAPSV8VTWMU\nTGIRSmAQSmA2ZnlukZ6ZsbupvsalusOHpK9TfIwhV2sQSV8RS2EvYXSPqrTg5+r8/f3////09vfB\n0NZfhpUYUGVKdobK19z+/v7y9faTrbcjWG1JdYbZ4ualusIiV2suYHTI1tv2+Pm/z9SGo655maad\ntb7b5Of9/v77/PyMqLMWTmQTTGL+/v/q7/F1lqMgVWoPSF81Zniftr/3+frt8fNSfIw0ZXjd5ej4\n+fp2l6QbUmeMp7L5+vuvwsoaUWdojJrD0dceVGno7vA/bX+Rq7WOqbRCcIHo7e/8/P1njJoTS2Gi\nuMEaUWa6ytGBoKuasryswMcXT2SkusKDoa16mqbl6+5Cb4EZUGa3yM9tkJ5Gc4SuwslDcILn7e/s\n8fJEcYMRSmGxxMubs7wkWW0qXXG2x865ytAdVGlPeYr7/P24yc9QeoscU2hIdIXx9fZbg5IUTWOB\nn6v4+vrv8/XG09muwcm/ztT9/f2Wr7kZUGWSrLanvMQlWW0cUmh8m6fx9PaVrrimu8Tk6u36/Pz9\n/f5cg5IYT2U5aHtiiJd9nKiAn6prj51EcYKmBiBjAAAAAWJLR0QV5dj5owAAAAd0SU1FB+gFCgg6\nEKeTw/4AAAFiSURBVDjLY2AYaoCRiYGZhZGJFYc0Gws7BycXNw8vH78AVnlBIWERUSAQE5eQxGII\nq5S0jCgUyMrJs2FYr6AoigAiSspoZrCpqALF1dQ1NLW0dYAsXT19VAUGeoaiokbGJvzmBmbmFkAV\nllZMKBZY24iK2toxgMzlt3dwBKpwckb2CpOLrqioKx/EXjY3LqACdw9kI1g9gUJeMHcxefuIivr6\nmSIp8A8AKtBghPIEAoOA3GB+JAUCIUCR0DC4k8OB3AhkBUyRQJGoaKitAjGxoqI6cchWMMVbAlUk\n8EEsMU1MEhVNTkF2ZKp9Gih00jNMWRlSTTOzgJzsHJSwZMo1Agrm5ReYMBcW5QPDsrgEJaAYGErL\nykGRUFFZVQ1SWlNbhxblrIX1tkiR1dCIEZ2sTc1RMPmW1gwMeaAKg/i29g5R0U7LoK5u7KmOP6yn\nt69/wsQc7EkOHKumTPymOBPt4AUAS9076d/h5DgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDUt\nMTBUMDg6NTg6MTYrMDA6MDB+6Ll0AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA1LTEwVDA4OjU4\nOjE2KzAwOjAwD7UByAAAAFd6VFh0UmF3IHByb2ZpbGUgdHlwZSBpcHRjAAB4nOPyDAhxVigoyk/L\nzEnlUgADIwsuYwsTIxNLkxQDEyBEgDTDZAMjs1Qgy9jUyMTMxBzEB8uASKBKLgDqFxF08kI1lQAA\nAAAABJRU5ErkJggg==\n",
                    "location": "https://sclowy.com:443/favicon-32x32.png"
                },
                "securitytxt": null,
                "title": "Home - SC Lowy",
                "sitemap_hash": null,
                "html_hash": 1550773271,
                "robots": null,
                "server": "nginx",
                "headers_hash": 926009531,
                "host": "sclowy.com",
                "location": "/",
                "components": {
                    "jQuery": {
                        "categories": [
                            "JavaScript libraries"
                        ]
                    },
                    "Font Awesome": {
                        "categories": [
                            "Font scripts"
                        ]
                    },
                    "Site Kit": {
                        "categories": [
                            "Analytics",
                            "WordPress plugins"
                        ],
                        "versions": [
                            "1.126.0"
                        ]
                    },
                    "jQuery Migrate": {
                        "categories": [
                            "JavaScript libraries"
                        ],
                        "versions": [
                            "3.4.1"
                        ]
                    },
                    "Google Analytics": {
                        "categories": [
                            "Analytics"
                        ]
                    },
                    "Google Tag Manager": {
                        "categories": [
                            "Tag managers"
                        ]
                    },
                    "WordPress": {
                        "categories": [
                            "CMS",
                            "Blogs"
                        ]
                    },
                    "MySQL": {
                        "categories": [
                            "Databases"
                        ]
                    },
                    "AddToAny": {
                        "categories": [
                            "Widgets"
                        ]
                    },
                    "Yoast SEO": {
                        "categories": [
                            "SEO",
                            "WordPress plugins"
                        ],
                        "versions": [
                            "20.13"
                        ]
                    },
                    "PHP": {
                        "categories": [
                            "Programming languages"
                        ]
                    }
                },
                "securitytxt_hash": null,
                "dom_hash": 1321807484,
                "sitemap": null,
                "server_hash": -1340961475
            },
            "hash": 1450505649,
            "tags": [
                "cloud"
            ],
            "timestamp": "2025-03-23T21:26:22.802009",
            "ssl": {
                "chain_sha256": [
                    "9638ece8271f2ba947ef9af1e5195e292d472a9707e2dbdb3950ee22226228c0",
                    "76e9e288aafc0e37f4390cbf946aad997d5c1c901b3ce513d3d8fadbabe2ab85"
                ],
                "jarm": "00000000000000000000000000000000000000000000000000000000000000",
                "tlsext": [],
                "chain": [
                    "-----BEGIN CERTIFICATE-----\nMIIDojCCAyigAwIBAgISA43ZFXK50RRl++iBZ6djOrO7MAoGCCqGSM49BAMDMDIx\nCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MQswCQYDVQQDEwJF\nNjAeFw0yNTAyMTgxMjE0NTBaFw0yNTA1MTkxMjE0NDlaMBUxEzARBgNVBAMTCnNj\nbG93eS5jb20wdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAR9xHrZpRWkmzD878d6hLkh\nmfZLewbVcUGInTTBYEQ6YkHNWPfkqFy+EWsK+5e9/OPIgQY84YNzjeXGWkrahmp0\nUuNq9D1tuQKDdj6BnsdphEl07hBvzZYiKUXupJ2Q7uOjggIcMIICGDAOBgNVHQ8B\nAf8EBAMCB4AwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1UdEwEB\n/wQCMAAwHQYDVR0gBAwwCjAIBgZngQwBAgEwJwYDVR0fBCAwHjAcoBqgGIYWaHR0cDovL3gxLmMubGVu\nY3Iub3JnLzANBgkqhkiG9w0BAQsFAAOCAgEAfYt7SiA1sgWGCIpunk46r4AExIRc\nMxkKgUhNlrrv1B21hOaXN/5miE+LOTbrcmU/M9yvC6MV
