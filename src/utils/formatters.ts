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
      return 'presentation';
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
export const getTotalFileCount = (fileSearch: Record<string, string[]>): number => {
  if (!fileSearch) return 0;
  
  return Object.values(fileSearch).reduce((total, files) => 
    total + (Array.isArray(files) ? files.length : 0), 0);
};

/**
 * Format date to a readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Get a human-readable timeframe label
 */
export const getTimeframeLabel = (days: number): string => {
  if (days === 1) return 'Last 24 hours';
  if (days === 7) return 'Last 7 days';
  if (days === 30) return 'Last 30 days';
  if (days === 90) return 'Last 3 months';
  if (days === 365) return 'Last year';
  return `Last ${days} days`;
};

/**
 * Format a phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else {
    // If international or other format, just add a plus if needed
    return phone.startsWith('+') ? phone : `+${phone}`;
  }
};
