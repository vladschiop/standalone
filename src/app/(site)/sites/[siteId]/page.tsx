import React from 'react'

interface SitePageProps {
  params: Promise<{
    siteId: string
  }>
}

export default async function SitePage({ params }: SitePageProps) {
  const { siteId } = await params
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Site Configuration</h1>
      <p className="mt-2 text-gray-600">Managing site: {siteId}</p>
    </div>
  )
}