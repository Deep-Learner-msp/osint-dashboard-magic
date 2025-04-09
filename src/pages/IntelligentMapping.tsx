import React, { useState } from "react";
import { OsintData } from "@/types/data";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Network, Brain, BarChart3, Info, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import ErrorBoundary from "@/components/ui/error-boundary";

export interface IntelligentMappingProps {
  data: OsintData;
}

const IntelligentMapping: React.FC<IntelligentMappingProps> = ({ data }) => {
  const navigate = useNavigate();
  const [mappingProgress, setMappingProgress] = useState(78);
  const [showAllConnections, setShowAllConnections] = useState(false);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setMappingProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 2;
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="text-gray-600"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/extracted-data")}
            className="flex items-center gap-1"
          >
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Processed</span> Data
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/intelligence-reporting")}
            className="flex items-center gap-1"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Intelligence</span> Report
          </Button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
          <Network className="h-5 w-5 text-purple-600" />
        </div>
        <h1 className="text-2xl font-bold">Intelligent Mapping</h1>
        <Button variant="ghost" size="icon" className="ml-2">
          <Info className="h-4 w-4" />
        </Button>
      </div>

      <Alert className="mb-6 bg-purple-50 border-purple-200">
        <Brain className="h-4 w-4 text-purple-600" />
        <AlertTitle className="text-purple-800">AI-Powered Intelligence Mapping</AlertTitle>
        <AlertDescription className="text-purple-700">
          This view displays intelligence data correlated across multiple sources to identify hidden patterns and connections.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Network className="h-4 w-4 text-purple-600" />
              Connection Strength
            </CardTitle>
            <CardDescription>Entity relationship analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Internal Structure</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>External Partners</span>
                  <span className="font-medium">76%</span>
                </div>
                <Progress value={76} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Supply Chain</span>
                  <span className="font-medium">63%</span>
                </div>
                <Progress value={63} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Regulatory Bodies</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600" />
              Intelligence Score
            </CardTitle>
            <CardDescription>Data reliability assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mt-4">
              <div className="h-20 w-20 rounded-full border-4 border-purple-500 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold">{mappingProgress.toFixed(0)}%</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Intelligence mapping in progress. Current analysis phase: correlation of multiple data sources.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-purple-50">
                    Financial Data
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50">
                    Personnel Records
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50">
                    Regulatory Filings
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Insight Confidence
            </CardTitle>
            <CardDescription>Predictive analytics accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Current Intelligence</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>1-Month Projection</span>
                  <span className="font-medium">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>3-Month Projection</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>6-Month Projection</span>
                  <span className="font-medium">58%</span>
                </div>
                <Progress value={58} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ErrorBoundary>
        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-purple-600" />
                    Entity Relationship Map
                  </CardTitle>
                  <CardDescription>
                    Visualizing connections between key entities
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAllConnections(!showAllConnections)}
                  >
                    {showAllConnections ? "Hide" : "Show"} All Connections
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center bg-purple-50 rounded-lg">
                <div className="text-center">
                  <Network className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Entity relationship visualization would appear here.
                    <br />
                    (Visualization component would typically be implemented with
                    <br /> 
                    a library like D3.js, vis.js, or react-force-graph)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ErrorBoundary>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Intelligence Insights
            </CardTitle>
            <CardDescription>
              AI-generated insights based on correlated data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-purple-100 text-purple-800">High Confidence</Badge>
                  <span className="text-sm font-medium">Executive Movement Pattern</span>
                </div>
                <p className="text-sm text-gray-600">
                  Analysis of executive LinkedIn profiles indicates a pattern of hiring from Goldman Sachs over the past 18 months, suggesting a potential strategic partnership or acquisition target.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-purple-100 text-purple-800">Medium Confidence</Badge>
                  <span className="text-sm font-medium">Technology Investment</span>
                </div>
                <p className="text-sm text-gray-600">
                  Recent job postings and technology stack changes show increased investment in blockchain technologies, suggesting preparation for new cryptocurrency-related financial products.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-purple-100 text-purple-800">High Confidence</Badge>
                  <span className="text-sm font-medium">Regulatory Focus</span>
                </div>
                <p className="text-sm text-gray-600">
                  Increased engagement with Singapore monetary authorities detected from regulatory filings and public statements, indicating potential expansion of operations in the region.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Strategic Intelligence
            </CardTitle>
            <CardDescription>
              Competitive positioning and market intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Market Position</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 border rounded-lg text-center">
                    <div className="text-lg font-bold">4th</div>
                    <div className="text-xs text-muted-foreground">APAC Rank</div>
                  </div>
                  <div className="p-2 border rounded-lg text-center">
                    <div className="text-lg font-bold">7th</div>
                    <div className="text-xs text-muted-foreground">Global Rank</div>
                  </div>
                  <div className="p-2 border rounded-lg text-center">
                    <div className="text-lg font-bold">↑ 3</div>
                    <div className="text-xs text-muted-foreground">YoY Change</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Competitive Focus Areas</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span>Distressed Debt</span>
                      <span className="font-medium">Primary Focus</span>
                    </div>
                    <Progress value={95} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span>High Yield</span>
                      <span className="font-medium">Secondary Focus</span>
                    </div>
                    <Progress value={70} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span>Special Situations</span>
                      <span className="font-medium">Growing Focus</span>
                    </div>
                    <Progress value={65} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span>Cryptocurrency</span>
                      <span className="font-medium">Emerging Focus</span>
                    </div>
                    <Progress value={35} className="h-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>Intelligence mapping powered by advanced data correlation algorithms.</p>
        <p className="text-xs mt-1">For security assessment purposes only.</p>
      </footer>
    </div>
  );
};

export default IntelligentMapping;
