export const RoutePaths = {
  HOME: '/',
  LOGIN: '/login',
  AGENCY_LANDING: '/agency',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  PRICING: '/pricing',
  FEATURES: '/features',
  EVENT_SLUG: '/:agencySlug/:eventSlug',
  APP_GALLERY: '/gallery/:eventId',
  CHECKOUT_SUCCESS: '/checkout/success',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_EVENT_DETAIL: '/admin/events/:eventId',
  ADMIN_SETTINGS: '/admin/settings'
} as const;

export interface Photo {
  id: string;
  originalUrl: string;
  watermarkedUrl: string;
  thumbnailUrl?: string;
  eventId: string;
  embedding?: number[];
  price?: number;
}

export type ProductType = 'social' | 'print' | 'original' | 'remix';

export interface CartItem {
  id: string;
  photoId: string;
  thumbnailUrl: string;
  type: ProductType;
  price: number;
  label: string;
}