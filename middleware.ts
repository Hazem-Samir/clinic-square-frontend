import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['en', 'ar']
const publicPages = ['/login', '/signup', '/signin']

// Create intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en'
})

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en'
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  const response = intlMiddleware(request)

  // Extract locale from pathname
  const locale = pathname.split('/')[1]
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '')

  // Check if it's a public page
  if (publicPages.some(page => pathnameWithoutLocale.startsWith(page))) {
    return response
  }

  // Check for user cookie
  const userCookie = request.cookies.get('user')

  if (!userCookie) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  // Parse user data and check role-based access
  try {
    const userData = JSON.parse(userCookie.value)
    const roleAccess: { [key: string]: string[] } = {
      doctor: ['/doctor'],
      // Add other roles as needed
    }

    const allowedPaths = roleAccess[userData.role] || []

    if (!allowedPaths.some(allowedPath => pathnameWithoutLocale.startsWith(allowedPath))) {
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, request.url))
    }
  } catch (error) {
    console.error('Error parsing user cookie:', error)
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}