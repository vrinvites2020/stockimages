// Clerk Middleware for Next.js
//
// This middleware uses Clerk's new clerkMiddleware and createRouteMatcher helpers.
//
// - All routes listed in isPublicRoute are accessible without authentication (public).
// - Any route NOT listed in isPublicRoute will require authentication (user will be redirected to sign-in).
// - UI actions (like download, like, etc.) should still check authentication on the client and open Clerk modal if needed.
// - This setup is compatible with Clerk v5+ and is the recommended approach for public/protected route control.
//
// To add more public routes, simply add their paths to the isPublicRoute array below.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define all public (no-auth) routes here
const isPublicRoute = createRouteMatcher([
  '/',
  '/assets',
  '/auth/sign-in',
  '/auth/sign-up',
  '/sso-callback',
  '/api/trpc/auth.callback',
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    // Allow access to public routes without authentication
    return;
  }
  // Require authentication for all other routes
  auth().protect();
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/', '/(api|trpc)(.*)'],
};
