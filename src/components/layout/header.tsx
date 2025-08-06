'use client'

import { UserButton } from '@clerk/nextjs'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title = 'Dashboard', subtitle }: HeaderProps) {
  return (
    <header className="bg-sp-card border-b border-sp-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sp-text">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-sp-text-secondary">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-10"
            />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
              2
            </span>
          </Button>
          
          {/* User Menu */}
          <UserButton 
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8'
              }
            }}
          />
        </div>
      </div>
    </header>
  )
}