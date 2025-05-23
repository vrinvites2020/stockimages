import React from 'react';
import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] text-white shadow-2xl border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Title */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
          <span>StockImages</span>
        </Link>
        {/* Clerk Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 