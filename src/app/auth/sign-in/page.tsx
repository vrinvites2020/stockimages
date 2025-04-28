import { SignIn } from "@clerk/nextjs";

/**
 * SignInPage component.
 * 
 * This component renders the sign-in page using Clerk's SignIn component.
 * Redirects to home page after successful sign-in.
 * 
 * @returns {JSX.Element} The rendered SignInPage component
 */
export default function SignInPage() {
  const homePageUrl = process.env.NEXT_PUBLIC_HOME_PAGE_URL;

  return (
    <SignIn 
      routing="hash"
      fallbackRedirectUrl={homePageUrl} 
      forceRedirectUrl={homePageUrl} 
    />
  );
}
