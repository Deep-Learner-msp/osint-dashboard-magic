
/**
 * Format a number as currency
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format a large number with abbreviations (K, M, B)
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Returns a severity level class name based on the severity number
 */
export const getSeverityClass = (severity: number): string => {
  switch (severity) {
    case 1:
      return 'bg-osint-severity-1';
    case 2:
      return 'bg-osint-severity-2';
    case 3:
      return 'bg-osint-severity-3';
    case 4:
      return 'bg-osint-severity-4';
    default:
      return 'bg-osint-gray';
  }
};

/**
 * Returns a severity level text based on the severity number
 */
export const getSeverityText = (severity: number): string => {
  switch (severity) {
    case 1:
      return 'Critical';
    case 2:
      return 'High';
    case 3:
      return 'Medium';
    case 4:
      return 'Low';
    default:
      return 'Unknown';
  }
};

/**
 * Truncate text to a specific length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

/**
 * Format a file URL to get just the filename
 */
export const formatFileName = (url: string): string => {
  const filename = url.split('/').pop() || url;
  // Truncate if filename is too long
  return truncateText(filename, 40);
};

/**
 * Get file icon based on file extension
 */
export const getFileIcon = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase() || '';
  
  switch (extension) {
    case 'pdf':
      return 'file-text';
    case 'doc':
    case 'docx':
      return 'file-text';
    case 'xls':
    case 'xlsx':
      return 'file-spreadsheet';
    case 'ppt':
    case 'pptx':
      return 'file-presentation';
    default:
      return 'file';
  }
};

/**
 * Get domain from URL
 */
export const getDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (e) {
    return url;
  }
};

/**
 * Count unique values in an array
 */
export const countUniqueValues = <T>(arr: T[]): number => {
  return new Set(arr).size;
};

/**
 * Count unique emails from data leaks
 */
export const countUniqueEmails = (leaks: any[]): number => {
  const uniqueEmails = new Set(leaks.map(leak => leak.email));
  return uniqueEmails.size;
};

/**
 * Count unique databases from data leaks
 */
export const countUniqueDatabases = (leaks: any[]): number => {
  const uniqueDatabases = new Set(leaks.map(leak => leak.database_name));
  return uniqueDatabases.size;
};

/**
 * Get total file count
 */
export const getTotalFileCount = (fileSearch: any): number => {
  return Object.values(fileSearch).reduce((total: number, files: any) => 
    total + (files as string[]).length, 0);
};
