import { z } from 'zod'
import { UserRole, PageStatus, SiteUserRole } from '@prisma/client'

// Auth validations
export const userSchema = z.object({
  id: z.string().cuid(),
  clerkId: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  tenantId: z.string().cuid(),
  createdAt: z.date()
})

// Site validations
export const createSiteSchema = z.object({
  name: z.string().min(1, 'Site name is required').max(100, 'Site name too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(50, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500, 'Description too long').optional()
})

export const updateSiteSchema = createSiteSchema.partial()

// Page validations
export const createPageSchema = z.object({
  title: z.string().min(1, 'Page title is required').max(200, 'Title too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(100, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  content: z.record(z.string(), z.unknown()).optional(),
  status: z.nativeEnum(PageStatus).default(PageStatus.DRAFT)
})

export const updatePageSchema = createPageSchema.partial()

// Navigation validations - simplified
export const updateNavigationSchema = z.object({
  structure: z.record(z.string(), z.unknown()) // JSON structure - will validate at runtime
})

// Asset validations
export const uploadAssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required').max(200, 'Name too long').optional(),
  file: z.instanceof(File) // File validation done separately
})

// Theme validations
export const updateThemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional(),
  customCss: z.string().max(10000, 'CSS too long').optional()
})

// Tenant validations
export const updateTenantConfigSchema = z.object({
  allowUserRegistration: z.boolean().optional(),
  defaultUserRole: z.nativeEnum(UserRole).optional(),
  customDomain: z.string().url().optional(),
  brandingConfig: z.object({
    logoUrl: z.string().url().optional(),
    primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    customCss: z.string().max(10000).optional()
  }).optional()
})

// User invite validation
export const userInviteSchema = z.object({
  email: z.string().email('Invalid email format'),
  role: z.nativeEnum(UserRole),
  siteIds: z.array(z.string().cuid()).optional()
})

// Site user validation
export const siteUserSchema = z.object({
  siteId: z.string().cuid(),
  userId: z.string().cuid(),
  role: z.nativeEnum(SiteUserRole)
})

// Bulk action validation
export const bulkActionSchema = z.object({
  action: z.enum(['delete', 'publish', 'unpublish', 'archive']),
  ids: z.array(z.string().cuid()).min(1, 'At least one item must be selected')
})

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20)
})

// Search validation
export const searchSchema = z.object({
  query: z.string().max(200, 'Search query too long').optional(),
  status: z.nativeEnum(PageStatus).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'title', 'name']).default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

// File validation helper
export const validateFile = (file: File, maxSizeBytes: number, allowedTypes: string[]) => {
  if (file.size > maxSizeBytes) {
    throw new Error(`File size must be less than ${maxSizeBytes / (1024 * 1024)}MB`)
  }
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not allowed`)
  }
  
  return true
}