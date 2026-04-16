"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signout } from "../actions/auth";

type NavbarProps = {
  isAuthenticated: boolean;
  user_name?: string;
};

const Navbar = ({ isAuthenticated, user_name }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    // Navigate to search page with query
    console.log(query);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <nav className="fixed w-full flex justify-around py-6 bg-transparent text-white z-10">
        <Link href={"/"}>
          <h1>Movie Booking</h1>
        </Link>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="What do you want to watch"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1 rounded-l"
          />
          <button type="submit" className="bg-blue-600 px-4 rounded-r">
            Search
          </button>
        </form>
        <div className="flex gap-5">
          {isAuthenticated ? (
            <form action={signout}>
              <button type="submit">Sign out</button>
            </form>
          ) : (
            <Link href={"/login"}>
              <button>Sign in</button>
            </Link>
          )}
          <button
            className="cursor-pointer"
            onClick={() => {
              setMenu((prev) => !prev);
            }}
          >
            <Menu />
          </button>
        </div>
      </nav>
      {menu && (
        <div className="fixed z-20">
          <div className="w-70 h-screen glass absolute">
            <h1>Welcome! {user_name}</h1>
            <Link href={"/booked-tickets"}>
              <button onClick={() => setMenu(false)} className="cursor-pointer">
                View your booking
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
