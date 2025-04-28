import React from 'react';
import { SignUp } from "@clerk/nextjs";

/**
 * SignUpPage component.
 * 
 * This component renders the sign-up page using Clerk's SignUp component.
 * Redirects to home page after successful sign-up.
 * 
 * @returns {React.ReactElement} The rendered SignUpPage component
 */
export default function SignUpPage(): React.ReactElement {
  const homePageUrl = process.env.NEXT_PUBLIC_HOME_PAGE_URL
  return <SignUp 
  routing="hash"
  fallbackRedirectUrl={homePageUrl} 
  forceRedirectUrl={homePageUrl} />;
}