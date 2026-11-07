import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

export default function ForgotPasswordPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      
      {/* Top Bar with Theme Toggle */}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-white dark:bg-slate-800 shadow-sm transition hover:scale-105"
        >
          {theme === "light" ? (
            <Moon className="text-blue-500 h-4 w-4" />
          ) : (
            <Sun className="text-white h-4 w-4" />
          )}
        </button>
      </div>

      {/* Main Content Centered */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-2xl shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] sm:p-10">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              FluxGrid
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Enter your email to request a password reset.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#111827]"
              >
                SEND RESET LINK
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <a
              href="/login"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              ← Back to Login
            </a>
          </div>
          
        </div>
      </main>
    </div>
  );
}