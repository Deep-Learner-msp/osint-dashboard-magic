
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { File, Download, FileSpreadsheet, FileText, Presentation } from "lucide-react";
import { OsintData } from "@/types/data";
import { formatFileName, getTotalFileCount } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FileSearchPanelProps {
  data: OsintData;
}

const FileSearchPanel: React.FC<FileSearchPanelProps> = ({ data }) => {
  const { fileSearch } = data;
  const [activeTab, setActiveTab] = useState<string>("PDF");
  
  const fileTypes = Object.keys(fileSearch) as Array<keyof typeof fileSearch>;
  const totalFiles = getTotalFileCount(fileSearch);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />;
      case "XLS":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "DOC":
        return <FileText className="h-4 w-4" />;
      case "PPt":
        return <Presentation className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const getFileCount = (type: keyof typeof fileSearch) => {
    return fileSearch[type].length;
  };

  return (
    <GlassPanel className="mb-6" animationDelay={800}>
      <div className="flex items-center mb-4">
        <File className="h-5 w-5 mr-2 text-osint-blue" />
        <h2 className="text-xl font-semibold">File Search Results</h2>
      </div>
      
      <div className="bg-white/70 rounded-lg p-4">
        <div className="text-sm text-muted-foreground mb-4">
          {totalFiles} files discovered across public sources
        </div>

        <Tabs defaultValue="PDF" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            {fileTypes.map(type => (
              <TabsTrigger key={type} value={type} className="flex items-center">
                {getFileIcon(type)}
                <span className="ml-1">{type}</span>
                <span className="ml-1 text-xs bg-osint-blue/10 text-osint-blue rounded-full px-1.5">
                  {getFileCount(type)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {fileTypes.map(type => (
            <TabsContent key={type} value={type} className="mt-0">
              <div className="max-h-[300px] overflow-y-auto pr-1">
                <div className="space-y-2">
                  {fileSearch[type].map((file, index) => (
                    <a
                      key={index}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block px-3 py-2 rounded hover:bg-gray-100 transition-colors",
                        "flex items-center opacity-0 animate-fade-in cursor-pointer"
                      )}
                      style={{ animationDelay: `${900 + index * 50}ms` }}
                    >
                      {getFileIcon(type)}
                      <span className="ml-2 flex-1 text-sm truncate">
                        {formatFileName(file)}
                      </span>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </GlassPanel>
  );
};

export default FileSearchPanel;
