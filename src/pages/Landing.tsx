
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Database, Brain, BarChart3, ExternalLink, Fingerprint, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-k2k-primary to-k2k-dark text-white">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-noise-pattern opacity-20"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-k2k-accent-dark animate-particles-fade"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/a40a54f9-328b-43f3-8b66-ace987e135ae.png" 
              alt="K2K Discovery Logo" 
              className="h-16 md:h-20 mr-4"
            />
            <div className="flex flex-col items-start">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-k2k-gradient">K2K Discovery</h1>
              <p className="text-lg md:text-xl text-gray-300 mt-1">Uncovering Digital Identities</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 max-w-3xl">
            Comprehensive digital identity intelligence platform for gathering, analyzing, and reporting 
            on online presence, social footprint, and digital vulnerabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="bg-black/30 border-k2k-blue/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:border-k2k-blue/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="h-2 bg-k2k-gradient w-full"></div>
              <div className="p-6">
                <div className="h-14 w-14 rounded-full bg-k2k-blue/10 flex items-center justify-center mb-5 group-hover:bg-k2k-blue/20 transition-colors">
                  <Database className="h-7 w-7 text-k2k-blue" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white">Processed Data</h2>
                <p className="text-gray-400 mb-5 min-h-[80px]">
                  Raw intelligence data collected from various sources including infrastructure details, technologies, and data leaks.
                </p>
                <Button 
                  className="w-full bg-k2k-blue hover:bg-k2k-blue/80 text-white"
                  onClick={() => navigate("/extracted-data")}
                >
                  View Processed Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-k2k-purple/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:border-k2k-purple/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="h-2 bg-gradient-to-r from-k2k-blue to-k2k-purple w-full"></div>
              <div className="p-6">
                <div className="h-14 w-14 rounded-full bg-k2k-purple/10 flex items-center justify-center mb-5 group-hover:bg-k2k-purple/20 transition-colors">
                  <Brain className="h-7 w-7 text-k2k-purple" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white">Intelligent Mapping</h2>
                <p className="text-gray-400 mb-5 min-h-[80px]">
                  AI-powered analysis correlating intelligence from multiple sources to identify patterns, threats, and perspectives.
                </p>
                <Button 
                  className="w-full bg-k2k-purple hover:bg-k2k-purple/80 text-white"
                  onClick={() => navigate("/intelligent-mapping")}
                >
                  Explore AI Insights
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/30 border-k2k-green/20 backdrop-blur-sm rounded-xl overflow-hidden group hover:border-k2k-green/50 transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="h-2 bg-gradient-to-r from-k2k-purple to-k2k-green w-full"></div>
              <div className="p-6">
                <div className="h-14 w-14 rounded-full bg-k2k-green/10 flex items-center justify-center mb-5 group-hover:bg-k2k-green/20 transition-colors">
                  <BarChart3 className="h-7 w-7 text-k2k-green" />
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white">Intelligence Report</h2>
                <p className="text-gray-400 mb-5 min-h-[80px]">
                  Comprehensive intelligence report with executive and technical views for decision-making and remediation.
                </p>
                <Button 
                  className="w-full bg-k2k-green hover:bg-k2k-green/80 text-white"
                  onClick={() => navigate("/executive-view")}
                >
                  View Intelligence Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Perspective Analysis</h2>
            <p className="text-gray-300 mb-6">
              Understand how different viewpoints and biases can affect how individuals and organizations are perceived in the digital landscape.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-k2k-blue/20 flex items-center justify-center">
                    <Users className="h-5 w-5 text-k2k-blue" />
                  </div>
                  <h3 className="text-lg font-medium">Personnel Analysis</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Analyze how team members and executives are perceived across different audiences and media sources.
                </p>
                <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-500 to-red-500 mb-2 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div style={{ width: `28%` }}></div>
                    <div style={{ width: `59%` }} 
                      className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full h-3 w-3"></div>
                      </div>
                    </div>
                    <div style={{ width: `13%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <div>Left: 28%</div>
                  <div>Center: 59%</div>
                  <div>Right: 13%</div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-k2k-purple/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-k2k-purple" />
                  </div>
                  <h3 className="text-lg font-medium">Media Coverage</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Track how your organization is portrayed across various media outlets with different political leanings.
                </p>
                <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-500 to-red-500 mb-2 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div style={{ width: `35%` }}></div>
                    <div style={{ width: `42%` }} 
                      className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full h-3 w-3"></div>
                      </div>
                    </div>
                    <div style={{ width: `23%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <div>Left: 35%</div>
                  <div>Center: 42%</div>
                  <div>Right: 23%</div>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-k2k-green/20 flex items-center justify-center">
                    <Fingerprint className="h-5 w-5 text-k2k-green" />
                  </div>
                  <h3 className="text-lg font-medium">Product Perception</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Evaluate how your products and services are perceived by consumers with varying perspectives.
                </p>
                <div className="relative h-6 rounded-md bg-gradient-to-r from-blue-500 via-gray-500 to-red-500 mb-2 overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div style={{ width: `19%` }}></div>
                    <div style={{ width: `65%` }} 
                      className="h-full border-l-2 border-r-2 border-white border-opacity-50 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-full h-3 w-3"></div>
                      </div>
                    </div>
                    <div style={{ width: `16%` }}></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <div>Left: 19%</div>
                  <div>Center: 65%</div>
                  <div>Right: 16%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12">
          <p className="text-sm text-gray-400 mb-4">
            Need a full dashboard overview?
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          >
            Go to Legacy Dashboard
          </Button>
        </div>
        
        <footer className="text-center text-sm text-gray-500 mt-16">
          <p>© 2024 K2K Discovery. All rights reserved.</p>
          <a href="#" className="inline-flex items-center text-k2k-blue mt-2 hover:text-k2k-blue-light transition-colors">
            Privacy Policy <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
