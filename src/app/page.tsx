import { redirect } from 'next/navigation'

export default function Home() {
  // Root route redirects to dashboard since all routes require authentication
  redirect('/dashboard')
}
