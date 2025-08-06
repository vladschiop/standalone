import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'
import type { UserWithRelations } from '@/types'

export async function getCurrentUser(): Promise<UserWithRelations | null> {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        tenant: {
          include: {
            company: true
          }
        }
      }
    })
    
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}