import { PrismaClient } from '@prisma/client'
import {
  mockCompanies,
  mockTenants,
  mockUsers,
  mockSites,
  mockPages,
  mockNavigation,
  mockTenantLicenses
} from '../src/data/seed/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clean up existing data (in reverse order of dependencies)
  await prisma.pageVersion.deleteMany()
  await prisma.page.deleteMany()
  await prisma.navigation.deleteMany()
  await prisma.asset.deleteMany()
  await prisma.theme.deleteMany()
  await prisma.siteUser.deleteMany()
  await prisma.site.deleteMany()
  await prisma.tenantLicense.deleteMany()
  await prisma.user.deleteMany()
  await prisma.tenant.deleteMany()
  await prisma.company.deleteMany()

  console.log('Cleaned up existing data')

  // Create companies
  const companies = await Promise.all(
    mockCompanies.map(company =>
      prisma.company.create({
        data: company
      })
    )
  )
  console.log(`Created ${companies.length} companies`)

  // Create tenants
  const tenants = await Promise.all(
    mockTenants.map(tenant => {
      const company = companies.find(c => c.slug === tenant.companySlug)
      if (!company) throw new Error(`Company not found: ${tenant.companySlug}`)
      
      return prisma.tenant.create({
        data: {
          name: tenant.name,
          slug: tenant.slug,
          companyId: company.id
        }
      })
    })
  )
  console.log(`Created ${tenants.length} tenants`)

  // Create users
  const users = await Promise.all(
    mockUsers.map(user => {
      const tenant = tenants.find(t => t.slug === user.tenantSlug)
      if (!tenant) throw new Error(`Tenant not found: ${user.tenantSlug}`)
      
      return prisma.user.create({
        data: {
          clerkId: user.clerkId,
          email: user.email,
          role: user.role,
          tenantId: tenant.id
        }
      })
    })
  )
  console.log(`Created ${users.length} users`)

  // Create tenant licenses
  await Promise.all(
    mockTenantLicenses.map(license => {
      const tenant = tenants.find(t => t.slug === license.tenantSlug)
      if (!tenant) throw new Error(`Tenant not found: ${license.tenantSlug}`)
      
      return prisma.tenantLicense.create({
        data: {
          tenantId: tenant.id,
          licenseType: license.licenseType,
          maxSites: license.maxSites,
          maxUsers: license.maxUsers,
          maxStorageGb: license.maxStorageGb,
          startDate: license.startDate,
          endDate: license.endDate,
          isActive: license.isActive
        }
      })
    })
  )
  console.log(`Created ${mockTenantLicenses.length} tenant licenses`)

  // Create sites
  const sites = await Promise.all(
    mockSites.map(site => {
      const tenant = tenants.find(t => t.slug === site.tenantSlug)
      const creator = users.find(u => u.email === site.createdByEmail)
      if (!tenant) throw new Error(`Tenant not found: ${site.tenantSlug}`)
      if (!creator) throw new Error(`Creator not found: ${site.createdByEmail}`)
      
      return prisma.site.create({
        data: {
          name: site.name,
          slug: site.slug,
          description: site.description,
          tenantId: tenant.id,
          createdBy: creator.id
        }
      })
    })
  )
  console.log(`Created ${sites.length} sites`)

  // Create pages
  await Promise.all(
    mockPages.map(page => {
      const site = sites.find(s => s.slug === page.siteSlug)
      const tenant = tenants.find(t => t.slug === page.tenantSlug)
      const creator = users.find(u => u.email === page.createdByEmail)
      
      if (!site) throw new Error(`Site not found: ${page.siteSlug}`)
      if (!tenant) throw new Error(`Tenant not found: ${page.tenantSlug}`)
      if (!creator) throw new Error(`Creator not found: ${page.createdByEmail}`)
      
      return prisma.page.create({
        data: {
          title: page.title,
          slug: page.slug,
          content: page.content,
          status: page.status,
          siteId: site.id,
          tenantId: tenant.id,
          createdBy: creator.id
        }
      })
    })
  )
  console.log(`Created ${mockPages.length} pages`)

  // Create navigation
  await Promise.all(
    mockNavigation.map(nav => {
      const site = sites.find(s => s.slug === nav.siteSlug)
      const tenant = tenants.find(t => t.slug === nav.tenantSlug)
      
      if (!site) throw new Error(`Site not found: ${nav.siteSlug}`)
      if (!tenant) throw new Error(`Tenant not found: ${nav.tenantSlug}`)
      
      return prisma.navigation.create({
        data: {
          siteId: site.id,
          tenantId: tenant.id,
          structure: nav.structure
        }
      })
    })
  )
  console.log(`Created ${mockNavigation.length} navigation structures`)

  // Create default themes for each site
  await Promise.all(
    sites.map(site =>
      prisma.theme.create({
        data: {
          siteId: site.id,
          tenantId: site.tenantId,
          primaryColor: '#3161D1',
          secondaryColor: '#5774A8'
        }
      })
    )
  )
  console.log(`Created themes for ${sites.length} sites`)

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })