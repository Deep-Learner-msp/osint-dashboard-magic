
import { cn } from "@/lib/utils";
import React from "react";

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  value?: string | number | React.ReactNode;
  className?: string;
  animationDelay?: number;
  children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  icon,
  value,
  children,
  className,
  animationDelay = 0,
  ...props
}) => {
  const style: React.CSSProperties = {
    animationDelay: `${animationDelay}ms`,
  };

  return (
    <div
      className={cn(
        "glass-card p-4 opacity-0 animate-scale-in",
        className
      )}
      style={style}
      {...props}
    >
      <div className="flex items-center mb-3 space-x-2">
        {icon && <div className="text-osint-blue">{icon}</div>}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div>
        {value !== undefined && <div>{value}</div>}
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
