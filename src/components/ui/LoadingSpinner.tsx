
import React from "react";

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
  const sizeClass = size === "sm" ? "spinner-sm" : size === "lg" ? "spinner-lg" : "spinner-md";
  
  const spinner = (
    <div
      className={`spinner ${sizeClass} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );

  if (text) {
    return (
      <div className={`flex flex-col items-center gap-3 ${center ? "justify-center min-h-100" : ""}`}>
        {spinner}
        <p className="text-sm text-muted">{text}</p>
      </div>
    );
  }

  if (center) {
    return (
      <div className="flex justify-center min-h-100 items-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
