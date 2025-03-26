
import React from "react";
import { X } from "lucide-react";
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
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader className="border-b pb-4">
            <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="mt-2 text-sm">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {children}
          </div>
          <DrawerFooter className="border-t pt-4">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
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
