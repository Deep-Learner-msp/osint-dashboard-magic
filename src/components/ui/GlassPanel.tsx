
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
        "bg-white/70 backdrop-blur-md rounded-xl border border-white/20 shadow-sm p-5 animate-fade-in-up",
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
