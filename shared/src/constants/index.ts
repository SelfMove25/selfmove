// Pricing Constants
export const PRICING = {
  LISTING_FEE: 2999, // £29.99 in pence
  OFFER_DEPOSIT_PERCENTAGE: 0.01, // 1% of offer amount
  MIN_OFFER_DEPOSIT: 50000, // £500 in pence
  MAX_OFFER_DEPOSIT: 500000, // £5000 in pence
} as const;

// Pagination Constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
} as const;

// Property Constants
export const PROPERTY = {
  MAX_IMAGES: 10,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 2000,
} as const;

// Offer Constants
export const OFFER = {
  EXPIRY_DAYS: 7,
  MAX_MESSAGE_LENGTH: 500,
} as const;

// Validation Constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  POSTCODE_REGEX: /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i,
} as const;

// Firebase Collections
export const COLLECTIONS = {
  USERS: 'users',
  PROPERTIES: 'properties',
  OFFERS: 'offers',
  SOLICITORS: 'solicitors',
  SOLICITOR_LEADS: 'solicitorLeads',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to perform this action',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  PAYMENT_FAILED: 'Payment failed. Please try again or use a different payment method',
  KYC_REQUIRED: 'Identity verification is required before you can make or accept offers',
  OFFER_EXPIRED: 'This offer has expired',
  PROPERTY_NOT_AVAILABLE: 'This property is no longer available',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROPERTY_CREATED: 'Property listing created successfully! 🏠',
  OFFER_SUBMITTED: 'Your offer has been submitted! 💌',
  OFFER_ACCEPTED: 'Offer accepted! We\'ll connect you with solicitors soon 🎉',
  PAYMENT_SUCCESS: 'Payment completed successfully ✅',
  KYC_SUBMITTED: 'Identity verification submitted for review 📋',
  PROFILE_UPDATED: 'Profile updated successfully ✨',
} as const;

// Email Templates
export const EMAIL_TEMPLATES = {
  OFFER_RECEIVED: 'offer-received',
  OFFER_ACCEPTED: 'offer-accepted',
  OFFER_REJECTED: 'offer-rejected',
  KYC_APPROVED: 'kyc-approved',
  KYC_REJECTED: 'kyc-rejected',
  SOLICITOR_LEAD: 'solicitor-lead',
  WELCOME: 'welcome',
} as const;

// Property Features
export const PROPERTY_FEATURES = [
  'Parking',
  'Garden',
  'Balcony',
  'Garage',
  'Fireplace',
  'Swimming Pool',
  'Gym',
  'Concierge',
  'Security',
  'Lift',
  'Air Conditioning',
  'Central Heating',
  'Double Glazing',
  'Furnished',
  'Unfurnished',
  'Pet Friendly',
  'Recently Renovated',
  'New Build',
  'Period Property',
  'Chain Free',
] as const;

// Location Data (UK Cities)
export const UK_CITIES = [
  'London',
  'Birmingham',
  'Manchester',
  'Glasgow',
  'Liverpool',
  'Edinburgh',
  'Leeds',
  'Sheffield',
  'Bristol',
  'Cardiff',
  'Leicester',
  'Coventry',
  'Bradford',
  'Belfast',
  'Nottingham',
  'Kingston upon Hull',
  'Newcastle upon Tyne',
  'Stoke-on-Trent',
  'Southampton',
  'Derby',
  'Portsmouth',
  'Brighton and Hove',
  'Plymouth',
  'Northampton',
  'Reading',
] as const; 