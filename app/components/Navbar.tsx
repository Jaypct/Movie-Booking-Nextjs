"use client";

import {
  Clapperboard,
  Compass,
  LogIn,
  Menu,
  Search,
  Sparkles,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signout } from "../actions/auth";

type NavbarProps = {
  isAuthenticated: boolean;
  user_name?: string;
};

const navItems = [
  {
    href: "/",
    label: "Home",
    description: "Back to the spotlight",
    icon: Clapperboard,
  },
  {
    href: "/#popular",
    label: "Popular",
    description: "Trending crowd favorites",
    icon: Sparkles,
  },
  {
    href: "/#now-playing",
    label: "Now Playing",
    description: "Find a film for tonight",
    icon: Compass,
  },
  {
    href: "/#upcoming",
    label: "Coming Soon",
    description: "Plan your next outing",
    icon: Ticket,
  },
];

export default function Navbar({ isAuthenticated, user_name }: NavbarProps) {
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setHasScrolled(currentScrollY > 12);

      if (menu || currentScrollY <= 16) {
        setIsVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY.current) > 4) {
        setIsVisible(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menu]);

  useEffect(() => {
    if (!menu) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menu]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setMenu(false);
    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="relative z-40">
      <nav
        className={`fixed inset-x-0 top-0 z-40 text-white transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={`flex items-center gap-3 rounded-full border px-3 py-2 transition ${
              hasScrolled || menu
                ? "border-white/10 bg-slate-950/75 shadow-lg shadow-black/15 backdrop-blur-xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-main)] to-[var(--color-secondary)] text-slate-950 shadow-lg">
              <Clapperboard className="h-5 w-5" />
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold tracking-wide text-white">
                Movie Booking
              </span>
              <span className="block text-xs text-white/55">
                Book something everyone will enjoy
              </span>
            </span>
          </Link>

          <div
            className={`hidden items-center gap-1 rounded-full border px-2 py-2 lg:flex ${
              hasScrolled || menu
                ? "border-white/10 bg-white/5 backdrop-blur-xl"
                : "border-white/10 bg-white/10 backdrop-blur-md"
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <form
            onSubmit={handleSearch}
            className="ml-auto hidden flex-1 items-center justify-end md:flex"
          >
            <div className="input-shell flex w-full max-w-md items-center gap-2 rounded-full px-3 py-2">
              <Search className="h-4 w-4 shrink-0 text-white/45" />
              <input
                type="text"
                placeholder="Search by title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                className="button-primary px-4 py-2 text-sm font-semibold cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link
                href="/booked-tickets"
                className="button-secondary hidden px-4 py-2 text-sm sm:inline-flex"
              >
                My Tickets
              </Link>
            ) : (
              <Link
                href="/login"
                className="button-secondary hidden px-4 py-2 text-sm sm:inline-flex"
              >
                Sign In
              </Link>
            )}

            <button
              type="button"
              className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                hasScrolled || menu
                  ? "border-white/10 bg-slate-950/75 backdrop-blur-xl"
                  : "border-white/12 bg-white/10 backdrop-blur-md"
              }`}
              onClick={() => {
                setMenu((prev) => !prev);
              }}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
            >
              {menu ? (
                <X className="h-5 w-5 cursor-pointer" />
              ) : (
                <Menu className="h-5 w-5 cursor-pointer" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {menu && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/65 backdrop-blur-sm"
            onClick={() => setMenu(false)}
            aria-label="Close menu backdrop"
          />

          <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col border-l border-white/10 bg-slate-950/92 p-5 text-white shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Navigation
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Your movie hub</h2>
              </div>
              <button
                type="button"
                onClick={() => setMenu(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5"
                aria-label="Close menu"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            </div>

            <div className="glass-strong mt-6 rounded-[1.75rem] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-main)] to-[var(--color-secondary)] text-slate-950">
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                    Welcome
                  </p>
                  <h3 className="text-lg font-semibold">
                    {isAuthenticated ? user_name : "Movie fan"}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/68">
                Browse what is live now, check what is coming next, and jump
                into booking without feeling lost.
              </p>
            </div>

            <form onSubmit={handleSearch} className="mt-5 md:hidden">
              <div className="input-shell flex items-center gap-2 rounded-full px-3 py-2">
                <Search className="h-4 w-4 shrink-0 text-white/45" />
                <input
                  type="text"
                  placeholder="Search for a movie"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  className="button-primary px-4 py-2 text-sm font-semibold"
                >
                  Go
                </button>
              </div>
            </form>

            <div className="mt-6 flex-1 space-y-3 overflow-y-auto pb-4">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="section-shell flex items-center gap-4 rounded-[1.5rem] p-4 transition hover:border-white/18"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/8 text-[var(--color-secondary)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs text-white/55">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}

              {isAuthenticated ? (
                <>
                  <Link
                    href="/booked-tickets"
                    onClick={() => setMenu(false)}
                    className="button-secondary w-full px-4 py-3"
                  >
                    <Ticket className="h-4 w-4" />
                    View My Bookings
                  </Link>
                  <form action={signout}>
                    <button
                      type="submit"
                      className="button-primary w-full px-4 py-3"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenu(false)}
                    className="button-primary w-full px-4 py-3"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in to book faster
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenu(false)}
                    className="button-secondary w-full px-4 py-3"
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
