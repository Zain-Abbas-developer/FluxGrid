import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun, Clock, RefreshCw, CheckCircle2, LogOut } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

export default function EmailVerificationPendingPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  
  // State to handle button loading states
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleCheckStatus = () => {
    setIsChecking(true);
    // Simulate API call for checking status
    setTimeout(() => {
      setIsChecking(false);
      // Normally you would redirect to dashboard here if verified
      alert("Still pending verification. Please check your email.");
    }, 1500);
  };

  const handleResend = () => {
    setIsResending(true);
    setResendMessage("");
    // Simulate API call for resending email
    setTimeout(() => {
      setIsResending(false);
      setResendMessage("Verification email sent again!");
      setTimeout(() => setResendMessage(""), 3000);
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
        <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-2xl shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] sm:p-10">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              FluxGrid
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Email Verification Pending
            </h2>
          </div>

          {/* Alert/Status Box */}
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/30 dark:bg-amber-900/10">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Your account needs email verification before access. We've sent a verification link to your email address.
                </p>
                
                {/* Status Indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Status:
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Pending
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleCheckStatus}
              disabled={isChecking}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0 dark:focus:ring-offset-[#111827]"
            >
              {isChecking ? (
                <RefreshCw className="animate-spin" size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {isChecking ? "Checking..." : "Check Status"}
            </button>

            <button
              onClick={handleResend}
              disabled={isResending}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-70"
            >
              <RefreshCw className={isResending ? "animate-spin" : ""} size={18} />
              {isResending ? "Sending..." : "Resend Email"}
            </button>
          </div>

          {/* Success Message for Resend */}
          {resendMessage && (
            <p className="mt-4 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              {resendMessage}
            </p>
          )}

          {/* Divider */}
          <div className="my-8 border-t border-slate-200 dark:border-slate-800"></div>

          {/* Sign Out Link */}
          <div className="flex justify-center">
            <a
              href="/login"
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              <LogOut size={16} />
              Sign Out
            </a>
          </div>
          
        </div>
      </main>
    </div>
  );
}