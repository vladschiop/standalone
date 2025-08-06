import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontal, 
  Users, 
  FileText, 
  Calendar,
  Globe
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface SiteCardProps {
  site: {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: Date
    updatedAt: Date
    _count?: {
      pages?: number
      siteUsers?: number
    }
  }
}

export function SiteCard({ site }: SiteCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">
            {site.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            /{site.slug}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/sites/${site.id}`}>
                Manage Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/s/${site.slug}`} target="_blank">
                <Globe className="mr-2 h-4 w-4" />
                View Public Site
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edit Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      
      <CardContent>
        {site.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {site.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            {site._count?.pages || 0} pages
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" />
            {site._count?.siteUsers || 0} members
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3 w-3" />
          Updated {new Date(site.updatedAt).toLocaleDateString()}
        </div>
        <Badge variant="secondary">Active</Badge>
      </CardFooter>
    </Card>
  )
}