import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

export default function ResetPasswordPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  // State for form handling
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              Reset Password
            </h2>
          </div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* New Password Input */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                New Password
              </label>
              <div className="relative mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Confirm New Password
              </label>
              <div className="relative mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#111827]"
              >
                SAVE NEW PASSWORD
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Invalid / expired link?{" "}
              <a
                href="/forgot-password"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Request a new reset link.
              </a>
            </p>
          </div>
          
        </div>
      </main>
    </div>
  );
}