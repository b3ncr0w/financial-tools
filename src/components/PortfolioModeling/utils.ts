export const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '\u00A0-\u00A0';
  if (value === 0) return '0';
  
  // Check if number has decimal places
  return value % 1 === 0 ? value.toString() : value.toFixed(2);
}; 