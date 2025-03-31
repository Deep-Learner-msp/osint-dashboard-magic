
import { cn } from "@/lib/utils";
import React from "react";

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  value?: string | number | React.ReactNode;
  className?: string;
  animationDelay?: number;
  children?: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "highlight";
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  value,
  children,
  className,
  animationDelay = 0,
  variant = "default",
  ...props
}) => {
  const style: React.CSSProperties = {
    animationDelay: `${animationDelay}ms`,
  };

  const variantStyles = {
    default: "border shadow-sm bg-white",
    outline: "border-2 bg-white",
    secondary: "border bg-gray-50",
    highlight: "border-blue-200 bg-blue-50"
  };

  return (
    <div
      className={cn(
        "rounded-lg p-4 opacity-0 animate-scale-in",
        variantStyles[variant],
        className
      )}
      style={style}
      {...props}
    >
      <div className="flex items-center mb-3 space-x-2">
        {icon && <div className="text-osint-blue">{icon}</div>}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col">
        {value !== undefined && <div className="font-medium">{value}</div>}
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
