
import React from "react";
import { X, ExternalLink, Database } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { Button } from "./button";

interface InfoSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  sourcesCount?: number;
  sourcesNames?: string[];
  lastUpdated?: Date;
}

const InfoSheet: React.FC<InfoSheetProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  sourcesCount = 0,
  sourcesNames = [],
  lastUpdated,
}) => {
  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent
        className="glass-sheet overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <SheetHeader className="text-left px-6 pt-6">
          <SheetTitle className="text-xl font-semibold">{title}</SheetTitle>
          {description && (
            <SheetDescription className="text-sm text-muted-foreground">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        
        <div className="mt-6 px-6 pb-6">
          {children}
          
          {/* Source information section */}
          {(sourcesCount > 0 || sourcesNames.length > 0 || lastUpdated) && (
            <>
              <Separator className="my-6" />
              
              <div className="bg-slate-50 rounded-md p-4 text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="h-4 w-4 text-slate-600" />
                  <h4 className="font-medium text-slate-800">Intelligence Sources</h4>
                </div>
                
                {sourcesCount > 0 && (
                  <p className="text-slate-700 mb-2">
                    This intelligence is derived from <strong>{sourcesCount} verified OSINT sources</strong>
                  </p>
                )}
                
                {sourcesNames.length > 0 && (
                  <div className="mb-3">
                    <div className="text-slate-600 mb-1">Primary sources:</div>
                    <div className="flex flex-wrap gap-2">
                      {sourcesNames.map((source, index) => (
                        <Badge key={index} variant="outline" className="bg-white">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {lastUpdated && (
                  <div className="text-slate-600 text-xs mt-2">
                    Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
                
                <div className="mt-3">
                  <Button variant="ghost" size="sm" className="h-7 text-xs flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    <span>View full source details</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InfoSheet;
