export const mockCompanies = [
  {
    name: "Acme Corporation",
    slug: "acme-corp",
    industry: "Technology",
    website: "https://acme-corp.com"
  },
  {
    name: "Global Solutions Inc",
    slug: "global-solutions",
    industry: "Consulting",
    website: "https://globalsolutions.com"
  },
  {
    name: "TechStart Industries",
    slug: "techstart",
    industry: "Software",
    website: "https://techstart.io"
  }
]

export const mockTenants = [
  {
    name: "Acme Corporate Intranet",
    slug: "acme-intranet",
    companySlug: "acme-corp"
  },
  {
    name: "Global Solutions Portal",
    slug: "global-portal", 
    companySlug: "global-solutions"
  },
  {
    name: "TechStart Hub",
    slug: "techstart-hub",
    companySlug: "techstart"
  }
]

export const mockUsers = [
  {
    email: "admin@acme-corp.com",
    role: "ADMIN" as const,
    tenantSlug: "acme-intranet",
    clerkId: "user_admin_acme" // Will be replaced with real Clerk IDs
  },
  {
    email: "john.doe@acme-corp.com", 
    role: "NORMAL" as const,
    tenantSlug: "acme-intranet",
    clerkId: "user_john_acme"
  },
  {
    email: "admin@globalsolutions.com",
    role: "ADMIN" as const,
    tenantSlug: "global-portal",
    clerkId: "user_admin_global"
  },
  {
    email: "sarah.smith@globalsolutions.com",
    role: "NORMAL" as const,
    tenantSlug: "global-portal", 
    clerkId: "user_sarah_global"
  },
  {
    email: "admin@techstart.io",
    role: "ADMIN" as const,
    tenantSlug: "techstart-hub",
    clerkId: "user_admin_tech"
  }
]

export const mockSites = [
  {
    name: "Human Resources",
    slug: "hr",
    description: "Employee resources, policies, and benefits information",
    tenantSlug: "acme-intranet",
    createdByEmail: "admin@acme-corp.com"
  },
  {
    name: "IT Department", 
    slug: "it",
    description: "Technical documentation and IT support resources",
    tenantSlug: "acme-intranet",
    createdByEmail: "admin@acme-corp.com"
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Financial reports, budgets, and expense policies",
    tenantSlug: "acme-intranet", 
    createdByEmail: "admin@acme-corp.com"
  },
  {
    name: "Sales Team",
    slug: "sales",
    description: "Sales resources, client information, and targets",
    tenantSlug: "acme-intranet",
    createdByEmail: "admin@acme-corp.com"
  },
  {
    name: "Project Management",
    slug: "projects",
    description: "Project workflows, timelines, and deliverables",
    tenantSlug: "global-portal",
    createdByEmail: "admin@globalsolutions.com"
  },
  {
    name: "Client Resources",
    slug: "clients", 
    description: "Client documentation and communication templates",
    tenantSlug: "global-portal",
    createdByEmail: "admin@globalsolutions.com"
  },
  {
    name: "Development Team",
    slug: "dev",
    description: "Code repositories, documentation, and development guidelines", 
    tenantSlug: "techstart-hub",
    createdByEmail: "admin@techstart.io"
  }
]

export const mockPages = [
  {
    title: "Welcome to HR",
    slug: "welcome",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Welcome to Human Resources" }]
        },
        {
          type: "paragraph", 
          content: [
            { type: "text", text: "This is your central hub for all HR-related information, policies, and resources." }
          ]
        }
      ]
    },
    status: "PUBLISHED" as const,
    siteSlug: "hr",
    tenantSlug: "acme-intranet",
    createdByEmail: "admin@acme-corp.com"
  },
  {
    title: "Employee Handbook",
    slug: "handbook", 
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Employee Handbook" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Important policies and procedures for all employees." }
          ]
        }
      ]
    },
    status: "PUBLISHED" as const,
    siteSlug: "hr",
    tenantSlug: "acme-intranet", 
    createdByEmail: "admin@acme-corp.com"
  },
  {
    title: "IT Support Guidelines",
    slug: "support",
    content: {
      type: "doc", 
      content: [
        {
          type: "heading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "IT Support Guidelines" }]
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "How to request IT support and troubleshoot common issues." }
          ]
        }
      ]
    },
    status: "PUBLISHED" as const,
    siteSlug: "it",
    tenantSlug: "acme-intranet",
    createdByEmail: "admin@acme-corp.com"
  }
]

export const mockNavigation = [
  {
    siteSlug: "hr",
    tenantSlug: "acme-intranet",
    structure: {
      items: [
        {
          id: "1",
          label: "Home",
          url: "/",
          type: "page",
          pageId: null
        },
        {
          id: "2", 
          label: "Employee Resources",
          url: "#",
          type: "dropdown",
          children: [
            {
              id: "2.1",
              label: "Handbook",
              url: "/handbook",
              type: "page"
            },
            {
              id: "2.2", 
              label: "Benefits",
              url: "/benefits",
              type: "page"
            }
          ]
        },
        {
          id: "3",
          label: "Contact HR",
          url: "/contact",
          type: "page"
        }
      ]
    }
  }
]

export const mockTenantLicenses = [
  {
    tenantSlug: "acme-intranet",
    licenseType: "PREMIUM" as const,
    maxSites: 25,
    maxUsers: 50,
    maxStorageGb: 10,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    isActive: true
  },
  {
    tenantSlug: "global-portal", 
    licenseType: "BASIC" as const,
    maxSites: 5,
    maxUsers: 10,
    maxStorageGb: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    isActive: true
  },
  {
    tenantSlug: "techstart-hub",
    licenseType: "ENTERPRISE" as const,
    maxSites: -1, // unlimited
    maxUsers: -1, // unlimited  
    maxStorageGb: 100,
    startDate: new Date("2024-01-01"),
    endDate: null, // no end date
    isActive: true
  }
]