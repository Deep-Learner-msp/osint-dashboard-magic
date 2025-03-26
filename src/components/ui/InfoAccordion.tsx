
import React from "react";
import { X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

interface InfoAccordionProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InfoAccordion: React.FC<InfoAccordionProps> = ({
  open,
  onClose,
  title,
  description,
  children,
}) => {
  const { toast } = useToast();

  const handleClose = () => {
    toast({
      title: "Information closed",
      description: `You've closed the ${title.toLowerCase()} information panel`,
      duration: 3000,
    });
    onClose();
  };

  return (
    <Collapsible open={open} onOpenChange={onClose} className="w-full">
      <CollapsibleContent className="mt-4 border rounded-lg bg-white shadow-md overflow-hidden">
        <div className="border-b pb-4 pt-4 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleClose}
              className="ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
        
        <div className="border-t pt-4 pb-4 px-6 flex justify-end">
          <Button 
            variant="outline" 
            className="hover:bg-osint-blue hover:text-white transition-colors"
            onClick={handleClose}
          >
            <ChevronUp className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InfoAccordion;
