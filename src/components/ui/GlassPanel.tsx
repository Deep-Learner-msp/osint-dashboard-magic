
import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  animationDelay?: number;
}

const GlassPanel: React.FC<GlassPanelProps> = ({
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
        "glass-panel p-5 opacity-0 animate-fade-in-up",
        className
      )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
