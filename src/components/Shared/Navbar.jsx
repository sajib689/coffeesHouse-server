"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "./../../context/AuthProvider";
import Loader from "@/util/Loader";
import { useGetUserByEmailQuery } from "@/features/users/usersApi";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fetch user data using RTK Query hook
  const { data: userData, isLoading: userLoading } = useGetUserByEmailQuery(user?.email, {
    skip: !user?.email,
  });

  const handleLogout = async () => {
    try {
      await logout();              
      router.push('/login');      
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };
  
  const navLinks = (
    <>
      <Link
        href="/"
        className={
          pathname === "/"
            ? "text-coffee-600 font-semibold"
            : "hover:text-coffee-500"
        }
      >
        Home
      </Link>
      <Link
        href="/coffee"
        className={
          pathname === "/coffee"
            ? "text-coffee-600 font-semibold"
            : "hover:text-coffee-500"
        }
      >
        Coffee
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about"
            ? "text-coffee-600 font-semibold"
            : "hover:text-coffee-500"
        }
      >
        About
      </Link>
      <Link
        href="/contact"
        className={
          pathname === "/contact"
            ? "text-coffee-600 font-semibold"
            : "hover:text-coffee-500"
        }
      >
        Contact
      </Link>
    </>
  );

  if (loading || userLoading) return <Loader />;

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="w-full px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-coffee-600">
          <Link href="/">☕ CoffeeHouse</Link>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex space-x-6 text-base font-medium text-gray-700">
          {navLinks}
        </div>

        {/* Right: Auth/Profile */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative group">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md hidden group-hover:block z-50 text-sm">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </Link>
                {userData?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-coffee-600 hover:underline"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-[#6F4F37] text-white px-4 py-2 rounded hover:bg-coffee-700 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 text-gray-700 font-medium">
          {navLinks}
          {user ? (
            <>
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
              {userData?.role === "admin" && (
                <Link href="/admin">Admin</Link>
              )}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block text-center bg-[#6F4F37] text-white rounded px-4 py-2 hover:bg-[#5C3D2D] transition duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block text-center bg-[#6F4F37] text-white rounded px-4 py-2 hover:bg-[#5C3D2D] transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
