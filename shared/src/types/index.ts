// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isVerified: boolean;
  kycStatus: KYCStatus;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SOLICITOR = 'solicitor'
}

export enum KYCStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  UNDER_REVIEW = 'under_review'
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number; // in sq ft
  address: Address;
  images: string[];
  floorplans: string[]; // URLs to floorplan images
  features: string[];
  ownerId: string;
  isActive: boolean;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  valuation?: PropertyValuation;
}

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  CONDO = 'condo',
  TOWNHOUSE = 'townhouse',
  STUDIO = 'studio',
  COMMERCIAL = 'commercial'
}

export enum ListingType {
  SALE = 'sale',
  RENT = 'rent'
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

// Offer Types
export interface Offer {
  id: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  message: string;
  status: OfferStatus;
  depositPaid: boolean;
  depositAmount: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export enum OfferStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
  EXPIRED = 'expired'
}

// Solicitor Types
export interface Solicitor {
  id: string;
  name: string;
  firm: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  subscriptionStatus: SubscriptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export interface SolicitorLead {
  id: string;
  solicitorId: string;
  offerId: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  status: LeadStatus;
  createdAt: Date;
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  CONVERTED = 'converted',
  CLOSED = 'closed'
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  type: PaymentType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripePaymentIntentId?: string;
  propertyId?: string;
  offerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentType {
  LISTING_FEE = 'listing_fee',
  OFFER_DEPOSIT = 'offer_deposit',
  SOLICITOR_SUBSCRIPTION = 'solicitor_subscription'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Search and Filter Types
export interface PropertyFilters {
  listingType?: ListingType;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  city?: string;
  state?: string;
  features?: string[];
}

export interface SearchParams extends PropertyFilters {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'date' | 'views';
  sortOrder?: 'asc' | 'desc';
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
// Property Valuation Types
export interface PropertyValuation {
  id: string;
  propertyId: string;
  estimatedValue: number;
  valuationDate: Date;
  valuationType: ValuationType;
  methodology: string;
  comparableProperties: ComparableProperty[];
  marketTrends: MarketTrend[];
  valuationReport?: string; // URL to detailed report
  confidence: 'low' | 'medium' | 'high';
  createdBy: string; // valuerId or 'system'
  createdAt: Date;
  isActive: boolean;
}

export enum ValuationType {
  AUTOMATED = 'automated',
  PROFESSIONAL = 'professional',
  MARKET_ANALYSIS = 'market_analysis'
}

export interface ComparableProperty {
  address: string;
  soldPrice: number;
  soldDate: Date;
  size: number;
  bedrooms: number;
  bathrooms: number;
  distance: number; // in miles
}

export interface MarketTrend {
  area: string;
  averagePrice: number;
  priceChange: number; // percentage
  timeframe: string; // e.g., "6 months", "1 year"
}

export interface PropertyFormData {
  title: string;
  description: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  address: Address;
  features: string[];
  images: (any | string)[];  // Support both File objects (browser) and strings (URLs)
  floorplans: (any | string)[]; // Support both File objects (browser) and strings (URLs)
  requestValuation?: boolean;
}

export interface OfferFormData {
  amount: number;
  message: string;
  depositAmount: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  data?: Record<string, any>;
}

export enum NotificationType {
  OFFER_RECEIVED = 'offer_received',
  OFFER_ACCEPTED = 'offer_accepted',
  OFFER_REJECTED = 'offer_rejected',
  PROPERTY_VIEWED = 'property_viewed',
  KYC_APPROVED = 'kyc_approved',
  KYC_REJECTED = 'kyc_rejected',
  KYC_UNDER_REVIEW = 'kyc_under_review',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',
  NEW_MESSAGE = 'new_message'
}

// Offer-based messaging types
export interface OfferMessage {
  id: string;
  offerId: string;
  senderRole: 'buyer' | 'seller';
  text: string;
  createdAt: Date;
  isRead?: boolean;
}

export interface OfferMessageFormData {
  text: string;
}

// Chat conversation metadata
export interface ChatConversation {
  offerId: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  lastMessage?: string;
  lastMessageAt?: Date;
  unreadCount: number;
  isActive: boolean;
} 