
import React from "react";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./sheet";

interface InfoSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const InfoSheet: React.FC<InfoSheetProps> = ({
  open,
  onClose,
  title,
  description,
  children,
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
        <div className="mt-6 px-6 pb-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default InfoSheet;
