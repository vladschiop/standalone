'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { 
  Building2, 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  HelpCircle,
  Globe,
  FileText,
  Users,
  Palette,
  FolderOpen
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Sites',
    href: '/dashboard/sites',
    icon: Building2,
  },
  {
    name: 'Tenant Config',
    href: '/dashboard/tenant-config',
    icon: Settings,
  },
  {
    name: 'Licensing',
    href: '/dashboard/licensing',
    icon: CreditCard,
  },
  {
    name: 'Support',
    href: '/dashboard/support',
    icon: HelpCircle,
  },
]

const siteNavigation = [
  {
    name: 'Navigation',
    href: '/sites/[siteId]/navigation',
    icon: Globe,
  },
  {
    name: 'Pages',
    href: '/sites/[siteId]/pages',
    icon: FileText,
  },
  {
    name: 'Assets Library',
    href: '/sites/[siteId]/assets',
    icon: FolderOpen,
  },
  {
    name: 'Site Team',
    href: '/sites/[siteId]/team',
    icon: Users,
  },
  {
    name: 'Theme',
    href: '/sites/[siteId]/theme',
    icon: Palette,
  },
  {
    name: 'Settings',
    href: '/sites/[siteId]/settings',
    icon: Settings,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isSiteRoute = pathname.startsWith('/sites/')
  const siteId = isSiteRoute ? pathname.split('/')[2] : null

  return (
    <div className={cn('flex h-full w-sidebar flex-col bg-sp-card border-r border-sp-border', className)}>
      <div className="flex h-16 items-center px-6 border-b border-sp-border">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/shortpoint-logo.svg"
            alt="ShortPoint Standalone"
            width={160}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-3">
        {!isSiteRoute ? (
          // Tenant-level navigation
          <>
            <div className="px-3 text-xs font-medium text-sp-text-secondary uppercase tracking-wide">
              Tenant
            </div>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-1.5 text-nav-sm font-normal transition-colors',
                    isActive
                      ? 'bg-sp-light-blue text-sp-primary'
                      : 'text-sp-secondary hover:bg-sp-light-blue/50 hover:text-sp-primary'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-2.5 h-3.5 w-3.5 flex-shrink-0',
                      isActive ? 'text-sp-primary' : 'text-sp-text-secondary group-hover:text-sp-primary'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </>
        ) : (
          // Site-level navigation
          <>
            <div className="px-3 mb-2">
              <Link
                href="/dashboard"
                className="text-nav-sm font-normal text-sp-text-secondary hover:text-sp-primary"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <Separator className="my-2" />
            <div className="px-3 text-xs font-medium text-sp-text-secondary uppercase tracking-wide">
              Site Management
            </div>
            {siteNavigation.map((item) => {
              const href = item.href.replace('[siteId]', siteId || '')
              const isActive = pathname === href
              return (
                <Link
                  key={item.name}
                  href={href}
                  className={cn(
                    'group flex items-center px-3 py-1.5 text-nav-sm font-normal transition-colors',
                    isActive
                      ? 'bg-sp-light-blue text-sp-primary'
                      : 'text-sp-secondary hover:bg-sp-light-blue/50 hover:text-sp-primary'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-2.5 h-3.5 w-3.5 flex-shrink-0',
                      isActive ? 'text-sp-primary' : 'text-sp-text-secondary group-hover:text-sp-primary'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {isSiteRoute ? 'Site Level' : 'Tenant Level'}
          </div>
          <Badge variant="outline" className="text-xs">
            {isSiteRoute ? 'Site' : 'Admin'}
          </Badge>
        </div>
      </div>
    </div>
  )
}