
/**
 * Scroll to an element with a specific ID with smooth scrolling
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    // Add offset for fixed headers if needed
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

/**
 * Format a class name to create an ID-friendly string
 */
export const createSectionId = (section: string): string => {
  return section.toLowerCase().replace(/\s+/g, "-");
};

/**
 * Create a random ID for use with form elements
 */
export const createRandomId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Get appropriate text color for a background
 * (simplified version - for production, use more sophisticated contrast calculations)
 */
export const getTextColorForBackground = (bgColor: string): string => {
  // If the background color is a Tailwind class
  if (bgColor.includes('bg-')) {
    // General rule for our design system
    if (
      bgColor.includes('-severity-1') || 
      bgColor.includes('-severity-2') || 
      bgColor.includes('dark') || 
      bgColor.includes('black')
    ) {
      return 'text-white';
    }
    return 'text-gray-900';
  }
  
  // If it's a hex color (simplified version)
  if (bgColor.startsWith('#')) {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    
    // Calculated perceived brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness > 125 ? 'text-gray-900' : 'text-white';
  }
  
  return 'text-current';
};
