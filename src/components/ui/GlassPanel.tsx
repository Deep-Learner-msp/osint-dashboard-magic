
import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
  expanded?: boolean;
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  animationDelay = 0,
  expanded = false,
  title,
  icon,
  ...props
}) => {
  const style: React.CSSProperties = {
    animationDelay: `${animationDelay}ms`,
  };

  return (
    <div
      className={cn(
        "glass-panel p-5 opacity-0 animate-fade-in-up",
        expanded ? "z-10" : "",
        className
      )}
      style={style}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <div>{icon}</div>}
          {title && (
            <h2 className="text-lg font-semibold">{title}</h2>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default GlassPanel;
