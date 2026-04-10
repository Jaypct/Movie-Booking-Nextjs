"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signout } from "../actions/auth";

type NavbarProps = {
  isAuthenticated: boolean;
};

const Navbar = ({ isAuthenticated }: NavbarProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    // Navigate to search page with query
    console.log(query);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="fixed w-full flex justify-around py-6 glass text-white z-10">
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
        <button>
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
