import React from "react";
import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut
} from "@clerk/nextjs";
import { PhoneIcon } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] text-white shadow-2xl border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Title */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-white bg-clip-text"
        >
          <span>VR Visual Magics</span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Contact Number - visible on medium screens and up */}
          <div className="hidden md:flex items-center gap-2">
            <PhoneIcon className="h-5 w-5 text-purple-300" />
            <a
              href="tel:9989002428"
              className="text-purple-100 hover:text-white transition-colors font-medium"
            >
              9989002428
            </a>
          </div>

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
      </div>
    </nav>
  );
};

export default Navbar;
