
import React, { useState } from "react";
import GlassPanel from "./ui/GlassPanel";
import { File, Download, FileSpreadsheet, FileText, Presentation, Eye } from "lucide-react";
import { OsintData } from "@/types/data";
import { formatFileName, getTotalFileCount } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import InfoDrawer from "./ui/InfoDrawer";

interface FileSearchPanelProps {
  data: OsintData;
}

const FileSearchPanel: React.FC<FileSearchPanelProps> = ({ data }) => {
  const { fileSearch } = data;
  const [activeTab, setActiveTab] = useState<string>("PDF");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
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

  const handleFileClick = (file: string) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;
    
    const isDoc = selectedFile.endsWith('.doc') || selectedFile.endsWith('.docx');
    const isExcel = selectedFile.endsWith('.xls') || selectedFile.endsWith('.xlsx');
    
    if (isDoc || isExcel) {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="mb-6">
            {isDoc ? <FileText className="h-16 w-16 text-blue-600 mx-auto" /> : <FileSpreadsheet className="h-16 w-16 text-green-600 mx-auto" />}
          </div>
          <p className="mb-4">Preview not available for this file type</p>
          <Button asChild>
            <a href={selectedFile} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Download File
            </a>
          </Button>
        </div>
      );
    }
    
    return (
      <iframe 
        src={selectedFile} 
        className="w-full h-[600px] rounded-lg border" 
        title="File Preview"
      />
    );
  };

  return (
    <>
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
                      <div
                        key={index}
                        className={cn(
                          "block px-3 py-3 rounded hover:bg-gray-100 transition-colors group",
                          "flex items-center opacity-0 animate-fade-in cursor-pointer"
                        )}
                        style={{ animationDelay: `${900 + index * 50}ms` }}
                        onClick={() => handleFileClick(file)}
                      >
                        {getFileIcon(type)}
                        <span className="ml-2 flex-1 text-sm truncate">
                          {formatFileName(file)}
                        </span>
                        
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 mr-1">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" asChild>
                            <a href={file} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </GlassPanel>
      
      {/* File Preview Drawer */}
      <InfoDrawer
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={selectedFile ? formatFileName(selectedFile) : "File Preview"}
        description={selectedFile || ""}
      >
        {renderFilePreview()}
      </InfoDrawer>
    </>
  );
};

export default FileSearchPanel;
