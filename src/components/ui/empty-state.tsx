
import React from "react";
import { FileX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  isLoading?: boolean;
  error?: boolean;
  retry?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <FileX className="h-12 w-12 text-muted-foreground" />,
  action,
  isLoading = false,
  error = false,
  retry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
      <div className="mb-4 text-muted-foreground">
        {error ? (
          <div className="p-3 bg-red-50 rounded-full">
            <FileX className="h-8 w-8 text-red-500" />
          </div>
        ) : (
          icon
        )}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
      
      {(action || error) && (
        <div className="flex gap-2">
          {action && (
            <Button 
              onClick={action.onClick} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : action.label}
            </Button>
          )}
          
          {error && retry && (
            <Button 
              onClick={retry} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              {isLoading ? "Retrying..." : "Retry"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
