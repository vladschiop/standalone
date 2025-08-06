import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'

type WebhookEvent = {
  data: {
    id: string
    email_addresses: Array<{
      email_address: string
      id: string
    }>
    primary_email_address_id: string
  }
  type: 'user.created' | 'user.updated' | 'user.deleted'
}

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400,
    })
  }

  const { id, email_addresses, primary_email_address_id } = evt.data
  const eventType = evt.type

  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  )?.email_address

  if (!primaryEmail) {
    return new Response('No primary email found', {
      status: 400,
    })
  }

  try {
    if (eventType === 'user.created') {
      // Domain-based tenant assignment
      const emailDomain = primaryEmail.split('@')[1]
      
      // Find tenant by matching company domain or email domain
      const tenant = await prisma.tenant.findFirst({
        include: {
          company: true
        },
        where: {
          OR: [
            // Direct domain match (if company.website matches email domain)
            {
              company: {
                website: {
                  contains: emailDomain,
                  mode: 'insensitive'
                }
              }
            },
            // Slug-based match (convert domain to slug format)
            {
              slug: emailDomain.replace(/\./g, '-').toLowerCase()
            },
            // Company name contains domain name
            {
              company: {
                name: {
                  contains: emailDomain.split('.')[0],
                  mode: 'insensitive'
                }
              }
            }
          ]
        }
      })
      
      if (!tenant) {
        // Fallback: assign to default tenant if no domain match
        const defaultTenant = await prisma.tenant.findFirst()
        
        if (!defaultTenant) {
          console.error('No tenant found for domain:', emailDomain)
          return new Response('No tenant available', { status: 400 })
        }
        
        console.log(`No domain match for ${emailDomain}, assigning to default tenant: ${defaultTenant.name}`)
        
        await prisma.user.create({
          data: {
            clerkId: id,
            email: primaryEmail,
            role: 'NORMAL',
            tenantId: defaultTenant.id,
          },
        })
      } else {
        console.log(`Domain match found: ${emailDomain} → ${tenant.name}`)
        
        await prisma.user.create({
          data: {
            clerkId: id,
            email: primaryEmail,
            role: 'NORMAL',
            tenantId: tenant.id,
          },
        })
      }
    } else if (eventType === 'user.updated') {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: primaryEmail,
        },
      })
    } else if (eventType === 'user.deleted') {
      await prisma.user.delete({
        where: { clerkId: id },
      })
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new Response('Error processing webhook', {
      status: 500,
    })
  }
}