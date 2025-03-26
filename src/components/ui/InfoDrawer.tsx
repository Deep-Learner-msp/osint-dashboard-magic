
import React from "react";
import { X, ChevronLeft } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InfoDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InfoDrawer: React.FC<InfoDrawerProps> = ({
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
    <Drawer open={open} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="border-b pb-4">
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2 text-muted-foreground" />
              <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
            </div>
            {description && (
              <DrawerDescription className="mt-2 text-sm">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="p-6 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
            {children}
          </div>
          <DrawerFooter className="border-t pt-4">
            <DrawerClose asChild>
              <Button 
                variant="outline" 
                className="w-full hover:bg-osint-blue hover:text-white transition-colors"
                onClick={handleClose}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InfoDrawer;
