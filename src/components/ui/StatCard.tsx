
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  animationDelay?: number;
  trend?: {
    value: number;
    label: string;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  className,
  animationDelay = 0,
  trend,
  ...props
}) => {
  const style: React.CSSProperties = {
    animationDelay: `${animationDelay}ms`,
  };

  return (
    <div
      className={cn(
        "glass-card animate-scale-in",
        className
      )}
      style={style}
      {...props}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
          {trend && (
            <div className={cn(
              "text-xs font-medium mt-1",
              trend.value > 0 ? "text-osint-green" : "text-osint-red"
            )}>
              {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-blue-50 text-osint-blue">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
