
import { getSeverityClass, getSeverityText } from "@/utils/formatters";
import React from "react";

interface QualysSeverityBarProps {
  data: {
    severity_1: number;
    severity_2: number;
    severity_3: number;
    severity_4: number;
  };
}

const QualysSeverityBar: React.FC<QualysSeverityBarProps> = ({ data }) => {
  const total = data.severity_1 + data.severity_2 + data.severity_3 + data.severity_4;
  
  const getSeverityPercentage = (value: number): string => {
    return `${Math.round((value / total) * 100)}%`;
  };

  return (
    <div className="space-y-4">
      <div className="flex h-4 overflow-hidden rounded-full bg-gray-100">
        <div 
          className={`${getSeverityClass(1)} h-full transition-all duration-500`} 
          style={{ width: getSeverityPercentage(data.severity_1) }}
        />
        <div 
          className={`${getSeverityClass(2)} h-full transition-all duration-500`} 
          style={{ width: getSeverityPercentage(data.severity_2) }}
        />
        <div 
          className={`${getSeverityClass(3)} h-full transition-all duration-500`} 
          style={{ width: getSeverityPercentage(data.severity_3) }}
        />
        <div 
          className={`${getSeverityClass(4)} h-full transition-all duration-500`} 
          style={{ width: getSeverityPercentage(data.severity_4) }}
        />
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        {[1, 2, 3, 4].map((severity) => (
          <div key={severity} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getSeverityClass(severity)} mr-2`} />
            <span className="text-xs font-medium mr-1">{getSeverityText(severity)}:</span>
            <span className="text-xs">
              {data[`severity_${severity}` as keyof typeof data]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QualysSeverityBar;
