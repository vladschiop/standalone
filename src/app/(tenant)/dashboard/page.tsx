import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { SiteCard } from '@/components/features/dashboard/site-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Building2, Users, FileText } from 'lucide-react'

export default async function DashboardPage() {
  const hasValidClerkKeys = 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_placeholder"

  const user = await getCurrentUser()
  
  console.log('Dashboard - User found:', user ? `${user.email} (tenant: ${user.tenantId})` : 'null')
  
  if (!user) {
    console.log('Dashboard - Redirecting to sign-in: no user found')
    redirect('/sign-in')
  }

  // Fetch tenant sites with counts
  const sites = await prisma.site.findMany({
    where: { tenantId: user.tenantId },
    include: {
      _count: {
        select: {
          pages: true,
          siteUsers: true
        }
      }
    },
    orderBy: { updatedAt: 'desc' }
  })

  // Get tenant stats
  const stats = await prisma.tenant.findUnique({
    where: { id: user.tenantId },
    include: {
      _count: {
        select: {
          users: true,
          sites: true,
          pages: true
        }
      },
      company: true
    }
  })

  if (!hasValidClerkKeys) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="p-6">
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800">
              Clerk authentication is not configured yet. Please add valid Clerk keys to access user data.
            </p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle={`Welcome to ${stats?.name}`}
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-sp-card border-sp-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sp-text">Total Sites</CardTitle>
              <Building2 className="h-4 w-4 text-sp-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sp-text">{stats?._count.sites || 0}</div>
              <p className="text-xs text-sp-text-secondary">
                Active departmental sites
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-sp-card border-sp-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sp-text">Team Members</CardTitle>
              <Users className="h-4 w-4 text-sp-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sp-text">{stats?._count.users || 0}</div>
              <p className="text-xs text-sp-text-secondary">
                Users across all sites
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-sp-card border-sp-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sp-text">Total Pages</CardTitle>
              <FileText className="h-4 w-4 text-sp-text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sp-text">{stats?._count.pages || 0}</div>
              <p className="text-xs text-sp-text-secondary">
                Published content pages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sites Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-sp-text">Site Collections</h2>
              <p className="text-sm text-sp-text-secondary">
                Manage your departmental sites and content
              </p>
            </div>
            <Button className="bg-sp-primary hover:bg-sp-primary/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Site
            </Button>
          </div>

          {sites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          ) : (
            <Card className="bg-sp-card border-sp-border shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Building2 className="h-12 w-12 text-sp-text-secondary mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-sp-text">No sites yet</h3>
                <p className="text-sm text-sp-text-secondary text-center mb-4">
                  Create your first departmental site to get started with organizing your team&apos;s content.
                </p>
                <Button className="bg-sp-primary hover:bg-sp-primary/90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Site
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}