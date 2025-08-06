// Import Prisma types
import type {
  Company,
  Tenant,
  User,
  Site,
  Page,
  PageVersion,
  Navigation,
  Asset,
  Theme,
  SiteUser
} from '@prisma/client'

// Re-export Prisma types as the primary types
export type {
  Company,
  Tenant,
  User,
  Site,
  Page,
  PageVersion,
  Navigation,
  Asset,
  Theme,
  TenantLicense,
  SiteUser,
  UserRole,
  PageStatus,
  LicenseType,
  SiteUserRole
} from '@prisma/client'

// Extended types for app-specific needs
export interface UserWithRelations extends User {
  tenant: Tenant & {
    company: Company
  }
}

export interface SiteWithRelations extends Site {
  tenant: Tenant
  creator: User
  pages?: Page[]
  assets?: Asset[]
  navigation?: Navigation
  theme?: Theme
  siteUsers?: (SiteUser & { user: User })[]
}

export interface PageWithRelations extends Page {
  site: Site
  tenant: Tenant
  creator: User
  versions?: PageVersion[]
}

// Export API types
export * from './api'