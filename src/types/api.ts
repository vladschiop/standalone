export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface CreateSiteRequest {
  name: string
  slug: string
  description?: string
}

export interface UpdateSiteRequest {
  name?: string
  slug?: string
  description?: string
}

export interface CreatePageRequest {
  title: string
  slug: string
  content?: Record<string, unknown>
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export interface UpdatePageRequest {
  title?: string
  slug?: string
  content?: Record<string, unknown>
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
}

export interface UpdateNavigationRequest {
  structure: {
    items: Array<{
      id: string
      label: string
      url: string
      type: 'page' | 'external' | 'dropdown'
      children?: Array<{
        id: string
        label: string
        url: string
        type: 'page' | 'external' | 'dropdown'
        pageId?: string
      }>
      pageId?: string
    }>
  }
}

export interface UploadAssetRequest {
  file: File
  name?: string
}

export interface UpdateThemeRequest {
  primaryColor?: string
  secondaryColor?: string
  customCss?: string
}

export interface UserInviteRequest {
  email: string
  role: 'ADMIN' | 'NORMAL'
  siteIds?: string[]
}

export interface BulkAction {
  action: 'delete' | 'publish' | 'unpublish' | 'archive'
  ids: string[]
}

// Note: We use literal types above to avoid circular imports