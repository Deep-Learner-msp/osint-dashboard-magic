
import React from "react";
import GlassPanel from "./ui/GlassPanel";
import { MapPin, Phone, Twitter, Linkedin } from "lucide-react";
import { OsintData } from "@/types/data";
import { cn } from "@/lib/utils";

interface ContactInformationPanelProps {
  data: OsintData;
}

const ContactInformationPanel: React.FC<ContactInformationPanelProps> = ({ data }) => {
  const { contactInformation } = data;
  
  return (
    <GlassPanel className="mb-6" animationDelay={900}>
      <div className="flex items-center mb-4">
        <Phone className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">Contact Information</h2>
      </div>
      
      <div className="bg-white/70 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-3">
              <MapPin className="h-4 w-4 mr-2 text-osint-blue" />
              <h3 className="text-base font-medium">Address</h3>
            </div>
            <div>
              {contactInformation.address.map((address, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-3 bg-gray-50 rounded mb-2 opacity-0 animate-fade-in"
                  )}
                  style={{ animationDelay: `${1000 + index * 100}ms` }}
                >
                  <div className="text-sm">{address}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex items-center mb-3">
                  <Phone className="h-4 w-4 mr-2 text-osint-blue" />
                  <h3 className="text-base font-medium">Phone</h3>
                </div>
                <div>
                  {contactInformation.phone.map((phone, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "p-3 bg-gray-50 rounded mb-2 opacity-0 animate-fade-in"
                      )}
                      style={{ animationDelay: `${1100 + index * 100}ms` }}
                    >
                      <div className="text-sm">{phone}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Twitter className="h-4 w-4 mr-2 text-osint-blue" />
                  <h3 className="text-base font-medium">Twitter</h3>
                </div>
                <div>
                  {contactInformation.twitter.map((twitter, index) => (
                    <a 
                      key={index}
                      href={twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-3 bg-gray-50 rounded mb-2 flex items-center opacity-0 animate-fade-in",
                        "hover:bg-gray-100 transition-colors"
                      )}
                      style={{ animationDelay: `${1200 + index * 100}ms` }}
                    >
                      <Twitter className="h-4 w-4 mr-2 text-[#1DA1F2]" />
                      <div className="text-sm">{twitter.replace("https://twitter.com/", "@")}</div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-3">
                  <Linkedin className="h-4 w-4 mr-2 text-osint-blue" />
                  <h3 className="text-base font-medium">LinkedIn</h3>
                </div>
                <div>
                  {contactInformation.linkedin.map((linkedin, index) => (
                    <a 
                      key={index}
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "p-3 bg-gray-50 rounded mb-2 flex items-center opacity-0 animate-fade-in",
                        "hover:bg-gray-100 transition-colors"
                      )}
                      style={{ animationDelay: `${1300 + index * 100}ms` }}
                    >
                      <Linkedin className="h-4 w-4 mr-2 text-[#0077B5]" />
                      <div className="text-sm">{linkedin}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};

export default ContactInformationPanel;
