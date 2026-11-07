import {useCallback, useEffect, useState} from 'react';
import {ArrowRight, Menu, Moon, Sun, X, Zap} from 'lucide-react';

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Documentation", href: "/docs" },
];


function FluxGridMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-500 shadow-sm shadow-blue-500/30 ${className}`}
    >
      <Zap className="h-5 w-5 text-white" strokeWidth={2.5} fill="currentColor" />
    </span>
  );
}


interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close the menu with Escape.
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Close the menu when resizing up to desktop.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (query.matches) setMobileOpen(false);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/60 bg-[#E2EBF0]/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-[#0B1220]/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <a href="#top" className="flex items-center gap-2.5 rounded-lg">
          <FluxGridMark />
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
              FluxGrid
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Job Processing Platform
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors duration-200 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:text-blue-400"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <a
            href={"/login"}
            className="hidden text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-blue-600 sm:inline dark:text-slate-300 dark:hover:text-blue-400"
          >
            Login
          </a>

          <a
            href={"/register"}
            className="hidden items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/25 transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex dark:focus-visible:ring-offset-[#0B1220]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-600 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-slate-300/60 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden dark:border-slate-700/60 dark:bg-[#0B1220]/95 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={closeMobile}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex items-center gap-3 pt-2">
            <a
              href={"/login"}
              onClick={closeMobile}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              Login
            </a>
            <a
              href={"/register"}
              onClick={closeMobile}
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;