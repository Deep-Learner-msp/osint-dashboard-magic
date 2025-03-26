
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  center?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  text,
  center = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };
  
  const spinner = (
    <div
      className={cn(
        "inline-block rounded-full border-osint-blue border-t-transparent animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (text) {
    return (
      <div className={cn("flex flex-col items-center gap-3", center ? "justify-center min-h-[100px]" : "")}>
        {spinner}
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    );
  }

  if (center) {
    return (
      <div className="flex justify-center min-h-[100px] items-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
