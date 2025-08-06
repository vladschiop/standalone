import React from 'react'

interface PublicSitePageProps {
  params: Promise<{
    siteSlug: string
  }>
}

export default async function PublicSitePage({ params }: PublicSitePageProps) {
  const { siteSlug } = await params
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Public Site</h1>
      <p className="mt-2 text-gray-600">Site: {siteSlug}</p>
    </div>
  )
}