import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun, Mail } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

export default function VerifyEmailPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Simple simulated resend action
  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResending(true);
    setResendSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
    }, 1500);
  };

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
          <div className="mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              FluxGrid
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Verify Your Email
            </h2>
          </div>

          {/* Email Verification Illustration */}
          <div className="my-10 flex justify-center">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-500/10 dark:bg-blue-500/20">
              {/* Animated Pulse Rings */}
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/20 opacity-75 duration-1000"></div>
              <div className="absolute inset-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20"></div>
              
              {/* Icon */}
              <Mail className="relative z-10 h-12 w-12 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Description */}
          <p className="mb-8 text-center text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.
          </p>

          {/* Form / Actions */}
          <form onSubmit={handleResend} className="space-y-6">
            <div>
              <button
                type="submit"
                disabled={isResending}
                className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0 dark:focus:ring-offset-[#111827]"
              >
                {isResending ? "SENDING..." : "RESEND VERIFICATION EMAIL"}
              </button>
              
              {/* Success Message */}
              {resendSuccess && (
                <p className="mt-3 text-center text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-top-1">
                  A new verification link has been sent!
                </p>
              )}
            </div>
          </form>

          {/* Footer Links */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
            <a
              href="/change-email"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Change Email
            </a>
            <a
              href="/login"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Back to Login →
            </a>
          </div>
          
        </div>
      </main>
    </div>
  );
}