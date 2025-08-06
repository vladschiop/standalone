// Application constants
export const APP_NAME = 'ShortPoint Standalone'
export const APP_DESCRIPTION = 'Multi-tenant SaaS intranet solution for small to medium businesses'

// Default limits
export const DEFAULT_PAGE_LIMIT = 20
export const DEFAULT_ASSET_LIMIT = 50

// File upload limits
export const MAX_FILE_SIZE_MB = 10
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

// Supported file types
export const SUPPORTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
export const SUPPORTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv'
]

export const ALL_SUPPORTED_FILE_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  ...SUPPORTED_DOCUMENT_TYPES
]

// Default theme colors (based on UX design specifications)
export const DEFAULT_THEME = {
  primaryColor: '#3161D1',
  secondaryColor: '#5774A8',
  backgroundColor: '#F5F6FA',
  cardBackground: '#FFFFFF',
  sidebarBackground: '#FFFFFF',
  borderColor: '#DEEFFF'
}

// License limits
export const LICENSE_LIMITS = {
  BASIC: {
    maxSites: 5,
    maxUsers: 10,
    maxStorageGb: 1
  },
  PREMIUM: {
    maxSites: 25,
    maxUsers: 50,
    maxStorageGb: 10
  },
  ENTERPRISE: {
    maxSites: -1, // unlimited
    maxUsers: -1, // unlimited
    maxStorageGb: 100
  }
}

// Routes
export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  SITES: '/dashboard/sites',
  TENANT_CONFIG: '/dashboard/tenant-config',
  LICENSING: '/dashboard/licensing',
  SUPPORT: '/dashboard/support',
  SITE: (siteId: string) => `/sites/${siteId}`,
  SITE_NAVIGATION: (siteId: string) => `/sites/${siteId}/navigation`,
  SITE_PAGES: (siteId: string) => `/sites/${siteId}/pages`,
  SITE_PAGE: (siteId: string, pageId: string) => `/sites/${siteId}/pages/${pageId}`,
  SITE_ASSETS: (siteId: string) => `/sites/${siteId}/assets`,
  SITE_TEAM: (siteId: string) => `/sites/${siteId}/team`,
  SITE_THEME: (siteId: string) => `/sites/${siteId}/theme`,
  SITE_SETTINGS: (siteId: string) => `/sites/${siteId}/settings`,
  PUBLIC_SITE: (siteSlug: string) => `/s/${siteSlug}`,
  PUBLIC_PAGE: (siteSlug: string, pageSlug: string) => `/s/${siteSlug}/${pageSlug}`
}

// API Routes
export const API_ROUTES = {
  AUTH_USER: '/api/auth/user',
  AUTH_ROLE: '/api/auth/role',
  AUTH_PERMISSIONS: '/api/auth/permissions',
  TENANTS: '/api/tenants',
  TENANT_CONFIG: '/api/tenants/config',
  TENANT_SITES: '/api/tenants/sites',
  SITES: '/api/sites',
  SITE: (siteId: string) => `/api/sites/${siteId}`,
  SITE_PAGES: (siteId: string) => `/api/sites/${siteId}/pages`,
  SITE_PAGE: (siteId: string, pageId: string) => `/api/sites/${siteId}/pages/${pageId}`,
  SITE_NAVIGATION: (siteId: string) => `/api/sites/${siteId}/navigation`,
  SITE_ASSETS: (siteId: string) => `/api/sites/${siteId}/assets`,
  SITE_ASSET: (siteId: string, assetId: string) => `/api/sites/${siteId}/assets/${assetId}`,
  SITE_THEME: (siteId: string) => `/api/sites/${siteId}/theme`,
  CLERK_WEBHOOK: '/api/webhooks/clerk'
}