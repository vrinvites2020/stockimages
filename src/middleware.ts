import { authMiddleware } from "@clerk/nextjs/server";

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


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};