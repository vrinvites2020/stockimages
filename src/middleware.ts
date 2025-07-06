/**
 * Next.js middleware for authentication using Clerk
 * Handles route protection and public route configuration
 */
import { authMiddleware } from "@clerk/nextjs/server";

/**
 * Authentication middleware configuration
 * Defines which routes are publicly accessible without authentication
 */
export default 
authMiddleware({
  publicRoutes: [
    "/api/webhook",
    "/auth/sign-in",
    "/auh/sign-up",
    "/sso-callback",
    "/api/trpc/auth.callback",
  ],
});

/**
 * Middleware configuration for route matching
 * Excludes static files and Next.js internal routes from middleware processing
 */
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};