// Export all types and interfaces
export * from './types';
export * from './constants';

// Utility functions
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatPriceFromPence = (priceInPence: number): string => {
  return formatPrice(priceInPence / 100);
};

export const calculateOfferDeposit = (offerAmount: number): number => {
  const depositAmount = Math.round(offerAmount * 0.01); // 1%
  return Math.max(50000, Math.min(500000, depositAmount)); // Between £500 and £5000
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}; 