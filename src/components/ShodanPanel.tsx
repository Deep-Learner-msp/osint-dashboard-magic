import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { Shield, Map, Server, Globe, ExternalLink, Lock, AlertTriangle } from "lucide-react";
import { ShodanData } from "@/types/shodan";
import StatCard from "./ui/StatCard";
import InfoSheet from "./ui/InfoSheet";
import InfoCard from "./ui/InfoCard";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/formatters";
import { Button } from "./ui/button";

interface ShodanPanelProps {
  data?: ShodanData;
}

const ShodanPanel: React.FC<ShodanPanelProps> = ({ data }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<'location' | 'services' | 'tech'>('location');

  if (!data) {
    return null;
  }

  const openDetail = (detail: 'location' | 'services' | 'tech') => {
    setActiveDetail(detail);
    setAccordionOpen(true);
  };

  // Get technologies
  const getTechnologies = () => {
    const techs: Set<string> = new Set();
    
    data.data.forEach(service => {
      if (service.http?.components) {
        Object.keys(service.http.components).forEach(tech => {
          techs.add(tech);
        });
      }
    });
    
    return Array.from(techs);
  };

  // Get HTTP services
  const getHttpServices = () => {
    return data.data.filter(service => service.port === 80 || service.port === 443);
  };

  // Render detail content based on active detail
  const renderDetailContent = () => {
    switch (activeDetail) {
      case 'location':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Asset Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Country</div>
                  <div className="font-medium">{data.country_name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">City</div>
                  <div className="font-medium">{data.city}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ISP</div>
                  <div className="font-medium">{data.isp}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Organization</div>
                  <div className="font-medium">{data.org}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Hosting Information</h3>
              {data.data.filter(service => service.cloud).map((service, index) => (
                <div key={index} className="p-3 border rounded-md mb-2 bg-white">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-xs text-gray-500">Provider</div>
                      <div>{service.cloud.provider}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Region</div>
                      <div>{service.cloud.region}</div>
                    </div>
                    {service.cloud.service && (
                      <div className="col-span-2">
                        <div className="text-xs text-gray-500">Service</div>
                        <div>{service.cloud.service}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="IP Address"
                value={data.ip_str}
                icon={<Globe className="h-4 w-4 text-blue-500" />}
              />
              
              <InfoCard
                title="ASN"
                value={data.asn}
                icon={<Server className="h-4 w-4 text-purple-500" />}
              />
            </div>
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Open Ports & Services</h3>
              <div className="space-y-2">
                {data.data.map((service, index) => (
                  <div key={index} className="p-3 border rounded-md bg-white">
                    <div className="flex justify-between mb-1">
                      <div className="font-medium text-sm">
                        {service.transport.toUpperCase()}/{service.port}
                      </div>
                      <Badge variant={service.port === 22 ? "default" : service.port === 80 || service.port === 443 ? "secondary" : "outline"}>
                        {service._shodan?.module || "unknown"}
                      </Badge>
                    </div>
                    
                    <div className="text-sm">
                      {service.product || "Unknown service"}
                      {service.version && <span className="text-xs text-gray-500 ml-1">v{service.version}</span>}
                    </div>
                    
                    {service.cpe && service.cpe.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">CPE Identifiers:</div>
                        <div className="flex flex-wrap gap-1">
                          {service.cpe.map((cpe, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {cpe.replace('cpe:/', '').replace(':', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Service Security</h3>
              {data.data.filter(service => service.ssl).length > 0 ? (
                <div className="space-y-2">
                  {data.data.filter(service => service.ssl).map((service, index) => (
                    <div key={index} className="p-3 border border-green-200 rounded-md bg-green-50">
                      <div className="flex items-center gap-2 mb-1">
                        <Lock className="h-4 w-4 text-green-600" />
                        <div className="font-medium text-green-800">HTTPS Port {service.port}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <div className="text-xs text-gray-600">Cipher</div>
                          <div className="text-gray-800">{service.ssl?.cipher.name}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Key Size</div>
                          <div className="text-gray-800">{service.ssl?.cert.pubkey.bits} bits</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Expires</div>
                          <div className={`${new Date(service.ssl?.cert.expires || "") < new Date() ? "text-red-600" : "text-gray-800"}`}>
                            {service.ssl?.cert.expires}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">TLS Versions</div>
                          <div className="text-gray-800">{service.ssl?.versions.filter(v => !v.startsWith('-')).join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 border border-yellow-200 rounded-md bg-yellow-50 text-yellow-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div>No secure services (HTTPS/SSL) detected</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'tech':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Web Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {getTechnologies().map((tech, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">HTTP Services</h3>
              <div className="space-y-2">
                {getHttpServices().map((service, index) => (
                  <div key={index} className="p-3 border rounded-md bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">
                          {service.port === 443 ? 'HTTPS' : 'HTTP'} Port {service.port}
                        </div>
                        {service.http?.server && (
                          <div className="text-xs text-gray-500 mt-1">Server: {service.http.server}</div>
                        )}
                      </div>
                      <Badge>{service.http?.status || "Unknown"}</Badge>
                    </div>
                    
                    {service.http?.title && (
                      <div className="mt-2 text-sm">
                        <div className="text-xs text-gray-500">Page Title:</div>
                        <div className="font-medium">{service.http.title}</div>
                      </div>
                    )}
                    
                    {service.http?.components && Object.keys(service.http.components).length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-500 mb-1">Technologies:</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(service.http.components).map(([name, details], i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {name} {details.versions?.length ? `v${details.versions[0]}` : ''}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-2">Content Analysis</h3>
              {getHttpServices().filter(service => service.http?.favicon || service.http?.html_hash).length > 0 ? (
                <div className="space-y-2">
                  {getHttpServices().filter(service => service.http?.favicon || service.http?.html_hash).map((service, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2 p-3 border rounded-md bg-white">
                      {service.http?.html_hash && (
                        <div>
                          <div className="text-xs text-gray-500">HTML Hash</div>
                          <div className="font-mono text-xs overflow-hidden overflow-ellipsis">
                            {service.http.html_hash}
                          </div>
                        </div>
                      )}
                      {service.http?.dom_hash && (
                        <div>
                          <div className="text-xs text-gray-500">DOM Hash</div>
                          <div className="font-mono text-xs overflow-hidden overflow-ellipsis">
                            {service.http.dom_hash}
                          </div>
                        </div>
                      )}
                      {service.http?.favicon && (
                        <div className="col-span-2">
                          <div className="text-xs text-gray-500">Favicon Hash</div>
                          <div className="font-mono text-xs overflow-hidden overflow-ellipsis">
                            {service.http.favicon.hash}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 border rounded-md bg-white text-sm text-gray-500">
                  No detailed content analysis available
                </div>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <GlassPanel
        title={<>Shodan Intelligence <Badge variant="outline" className="ml-2">External</Badge></>}
        icon={<Shield className="h-5 w-5 text-purple-500" />}
        className="mt-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <StatCard
            value={
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-purple-500" />
                <span>{data.ports.length}</span>
              </div>
            }
            label="Open Ports"
            trend={{
              value: 0,
              label: "no change"
            }}
            animationDelay={600}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openDetail('services')}
          />
          
          <StatCard
            value={
              <div className="flex items-center gap-1">
                <Map className="h-4 w-4 text-blue-500" />
                <span>{data.country_name}</span>
              </div>
            }
            label="Server Location"
            animationDelay={700}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openDetail('location')}
          />
          
          <StatCard
            value={getTechnologies().length}
            label="Technologies"
            animationDelay={800}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openDetail('tech')}
          />
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Hostname Information</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {data.hostnames.map((hostname, index) => (
                <Badge key={index} variant="secondary">{hostname}</Badge>
              ))}
              {data.domains.map((domain, index) => (
                <Badge key={index} variant="outline">{domain}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Quick Service Info</h3>
            <div className="space-y-2">
              {data.data.slice(0, 2).map((service, index) => (
                <div 
                  key={index}
                  className="p-3 border rounded-md bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => openDetail('services')}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium">
                      {service.transport.toUpperCase()}/{service.port}
                      {service.product && ` - ${service.product}`}
                      {service.version && ` ${service.version}`}
                    </div>
                    {service.port === 443 && (
                      <div className="flex items-center text-green-600 text-xs gap-1">
                        <Lock className="h-3 w-3" />
                        <span>Secure</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {service.product ? `${service.product}${service.version ? " " + service.version : ""}` : "Unknown service"}
                  </div>
                </div>
              ))}
              
              {data.data.length > 2 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => openDetail('services')}
                >
                  View all {data.data.length} services
                </Button>
              )}
            </div>
          </div>
        </div>
      </GlassPanel>
      
      {/* Detail Sheet */}
      <InfoSheet
        open={accordionOpen}
        onClose={() => setAccordionOpen(false)}
        title={
          activeDetail === "location"
            ? "Geographic & Infrastructure Details"
            : activeDetail === "services"
              ? "Services & Port Analysis"
              : "Technology Stack Analysis"
        }
        description={
          activeDetail === "location"
            ? `Location: ${data?.city}, ${data?.country_name}`
            : activeDetail === "services"
              ? `${data?.ports.length} services detected on target system`
              : `Technologies detected on target web services`
        }
        sourcesCount={3}
        sourcesNames={["Shodan", "Internet-Wide Scans", "Banner Grabbing"]}
        lastUpdated={data.last_update ? new Date(data.last_update) : new Date()}
      >
        {renderDetailContent()}
      </InfoSheet>
    </>
  );
};

export default ShodanPanel;
