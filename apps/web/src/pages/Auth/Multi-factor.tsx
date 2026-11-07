import React, { useState, useRef } from "react";
import type { ReactElement } from "react";
import { Moon, Sun, ShieldCheck } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";

export default function VerifyIdentityPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();
  
  // State to hold the 6 digits of the OTP
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle typing in the inputs
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    
    // Only allow numeric input
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take the last character in case the user types quickly
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to delete and move back
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // If current input is empty, move to previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle pasting a full 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some((char) => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pastedData.forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus the last filled input or the next empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
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
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              FluxGrid
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Verify Your Identity
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Enter your 6-digit authentication code.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-8"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* OTP Inputs */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="h-14 w-12 sm:h-16 sm:w-14 rounded-xl border border-slate-300 bg-white/50 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500"
                />
              ))}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#111827]"
              >
                <ShieldCheck size={18} />
                VERIFY & CONTINUE
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
            <a
              href="/recovery-code"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
            >
              Use Recovery Code
            </a>
          </div>
          
        </div>
      </main>
    </div>
  );
}