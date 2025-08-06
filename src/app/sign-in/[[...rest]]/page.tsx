import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  const hasValidClerkKeys = 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "pk_test_placeholder"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to ShortPoint Standalone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your organization&apos;s intranet
          </p>
        </div>
        <div className="flex justify-center">
          {hasValidClerkKeys ? (
            <SignIn 
              routing="path"
              path="/sign-in"
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
                }
              }}
            />
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-gray-600">
                Clerk authentication is not configured yet.<br />
                Please add valid Clerk keys to environment variables.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}