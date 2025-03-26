
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { Shield, Map, Server, Globe, ExternalLink, Lock } from "lucide-react";
import { ShodanData } from "@/types/shodan";
import StatCard from "./ui/StatCard";
import InfoDrawer from "./ui/InfoDrawer";
import InfoCard from "./ui/InfoCard";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/formatters";
import { Progress } from "./ui/progress";
import LoadingSpinner from "./ui/loading-spinner";
import EmptyState from "./ui/empty-state";

interface ShodanPanelProps {
  data: ShodanData | undefined;
}

const ShodanPanel: React.FC<ShodanPanelProps> = ({ data }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  
  if (!data) {
    return (
      <GlassPanel className="mb-6" animationDelay={800}>
        <div className="flex items-center mb-4">
          <Globe className="h-5 w-5 mr-2 text-osint-blue" />
          <h2 className="text-xl font-semibold">Shodan Intelligence</h2>
        </div>
        <EmptyState 
          title="No Shodan Data Available" 
          description="Shodan intelligence data is not available for this target."
          icon={<Shield className="h-12 w-12 text-muted-foreground" />}
        />
      </GlassPanel>
    );
  }
  
  const handleCardClick = (detail: string) => {
    setActiveDetail(detail);
    setDrawerOpen(true);
  };
  
  const technologies = data.data
    .filter(service => service.http?.components)
    .flatMap(service => Object.keys(service.http?.components || {}));
  
  const uniqueTechnologies = [...new Set(technologies)];
  
  const securityIssues = data.data.some(service => 
    service.ssl?.versions.some(v => v === "-TLSv1" || v === "-SSLv2" || v === "-SSLv3")
  ) ? 1 : 0;
  
  const renderDetailContent = () => {
    switch (activeDetail) {
      case "location":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Geographic Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Country</div>
                  <div className="text-lg font-semibold">{data.country_name}</div>
                  <div className="text-xs text-gray-500">{data.country_code}</div>
                </div>
                <div className="border p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">City</div>
                  <div className="text-lg font-semibold">{data.city}</div>
                  <div className="text-xs text-gray-500">{data.region_code}</div>
                </div>
                <div className="border p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Latitude</div>
                  <div className="text-lg font-semibold">{data.latitude.toFixed(4)}</div>
                </div>
                <div className="border p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Longitude</div>
                  <div className="text-lg font-semibold">{data.longitude.toFixed(4)}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-base font-medium mb-2">Infrastructure Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <Server className="h-4 w-4 text-osint-blue mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">Cloud Provider</div>
                      <div className="text-sm text-gray-600">
                        {data.data[0]?.cloud?.provider || "Unknown"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-4 w-4 text-osint-blue mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">ISP</div>
                      <div className="text-sm text-gray-600">{data.isp}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Server className="h-4 w-4 text-osint-blue mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">ASN</div>
                      <div className="text-sm text-gray-600">{data.asn}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Lock className="h-4 w-4 text-osint-blue mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">IP Address</div>
                      <div className="text-sm text-gray-600">{data.ip_str}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-base font-medium mb-2">Domain Information</h3>
              <div className="space-y-2">
                {data.hostnames.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Hostnames</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.hostnames.map((hostname, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {hostname}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">No hostnames available</div>
                )}
                
                {data.domains.length > 0 ? (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-1">Domains</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.domains.map((domain, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      
      case "services":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Exposed Services</h3>
              
              {data.data.map((service, index) => (
                <div key={index} className="border p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${service.port === 22 ? 'bg-orange-500' : service.port === 443 ? 'bg-green-500' : 'bg-osint-blue'}`}>
                        {service.port === 22 ? (
                          <Lock className="h-4 w-4" />
                        ) : service.port === 443 ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Globe className="h-4 w-4" />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium">
                          {service.product || "Unknown"} 
                          {service.port === 22 && " (SSH)"}
                          {service.port === 80 && " (HTTP)"}
                          {service.port === 443 && " (HTTPS)"}
                        </div>
                        <div className="text-sm text-gray-600">
                          Port {service.port}/{service.transport}
                        </div>
                      </div>
                    </div>
                    <Badge variant={service.port === 22 ? "destructive" : service.port === 443 ? "default" : "secondary"}>
                      {service._shodan.module}
                    </Badge>
                  </div>
                  
                  {service.http?.title && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-1">Page Title</div>
                      <div className="text-sm">{service.http.title}</div>
                    </div>
                  )}
                  
                  {service.http?.components && Object.keys(service.http.components).length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-2">Technologies Detected</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(service.http.components).map(([name, info], idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {name} {info.versions ? `(${info.versions[0]})` : ''}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {service.ssh && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-1">SSH Details</div>
                      <div className="text-sm">
                        <span className="font-medium">Fingerprint:</span> {service.ssh.fingerprint}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Cipher:</span> {service.ssh.cipher}
                      </div>
                    </div>
                  )}
                  
                  {service.ssl && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="text-sm text-gray-600 mb-1">SSL/TLS Details</div>
                      <div className="text-sm">
                        <span className="font-medium">Version:</span> {service.ssl.cipher.version}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Cipher:</span> {service.ssl.cipher.name}
                      </div>
                      {service.ssl.versions.some(v => v.startsWith("-")) && (
                        <div className="text-sm text-red-600 mt-1">
                          <span className="font-medium">Disabled protocols:</span>{" "}
                          {service.ssl.versions.filter(v => v.startsWith("-")).map(v => v.replace("-", "")).join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case "technologies":
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4">Technology Stack</h3>
              
              <div className="space-y-4">
                {data.data
                  .filter(service => service.http?.components && Object.keys(service.http.components).length > 0)
                  .map((service, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="text-base font-medium mb-2">
                        {service.port === 80 ? "HTTP" : service.port === 443 ? "HTTPS" : `Port ${service.port}`} Technologies
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(service.http?.components || {}).map(([name, info], idx) => (
                          <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">{name}</div>
                              {info.versions && info.versions.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  v{info.versions[0]}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {info.categories.map((category, catIdx) => (
                                <Badge key={catIdx} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                
                {!data.data.some(service => service.http?.components && Object.keys(service.http.components).length > 0) && (
                  <EmptyState 
                    title="No Technology Stack Data" 
                    description="No technology stack information was detected in the Shodan scan."
                  />
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <GlassPanel className="mb-6" animationDelay={800}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-osint-blue" />
            <h2 className="text-xl font-semibold">Shodan Intelligence</h2>
          </div>
          <Badge variant="outline" className="text-xs">
            Last updated: {formatDate(new Date(data.last_update))}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard 
            value={data.ports.length}
            label="Open Ports"
            icon={<Server className="h-5 w-5" />}
            animationDelay={850}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("services")}
          />
          <StatCard 
            value={uniqueTechnologies.length}
            label="Technologies Detected"
            icon={<Shield className="h-5 w-5" />}
            animationDelay={900}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleCardClick("technologies")}
          />
          <StatCard 
            value={data.data.filter(s => s.cloud && s.cloud.provider).length > 0 ? 1 : 0}
            label="Cloud Provider"
            className={`${data.data.some(s => s.cloud && s.cloud.provider) ? "bg-blue-50" : ""} cursor-pointer hover:shadow-md transition-shadow`}
            animationDelay={950}
            onClick={() => handleCardClick("location")}
            icon={<Map className="h-5 w-5" />}
          />
        </div>

        <InfoCard 
          title="Location Information"
          icon={<Map className="h-5 w-5" />}
          animationDelay={1000}
          className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick("location")}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Country</div>
              <div className="text-base font-medium">{data.country_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">City</div>
              <div className="text-base font-medium">{data.city}</div>
            </div>
          </div>
        </InfoCard>

        <div className="bg-white/70 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium">Services</h3>
            <button 
              className="text-xs text-osint-blue flex items-center"
              onClick={() => handleCardClick("services")}
            >
              View Details
              <ExternalLink className="h-3 w-3 ml-1" />
            </button>
          </div>
          
          <div className="space-y-2">
            {data.data.map((service, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => handleCardClick("services")}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${service.port === 22 ? 'bg-orange-500' : service.port === 443 ? 'bg-green-500' : 'bg-osint-blue'}`}>
                    {service.port}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium">
                      {service.product || "Unknown"} 
                      {service.port === 22 && " (SSH)"}
                      {service.port === 80 && " (HTTP)"}
                      {service.port === 443 && " (HTTPS)"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {service.transport.toUpperCase()} • {service._shodan.module.toUpperCase()}
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
      
      {/* Detail Drawer */}
      <InfoDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={
          activeDetail === "location" 
            ? "Geographic Location" 
            : activeDetail === "services"
              ? "Exposed Services"
              : "Technology Stack"
        }
        description={
          activeDetail === "location"
            ? `Location: ${data.city}, ${data.country_name}`
            : activeDetail === "services"
              ? `${data.ports.length} services detected on target system`
              : `Technologies detected on target web services`
        }
      >
        {renderDetailContent()}
      </InfoDrawer>
    </>
  );
};

export default ShodanPanel;
