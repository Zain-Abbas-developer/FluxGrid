import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";
// import Navbar from "../../components/common/Navbar.tsx";
// import Footer from "../../components/common/Footer.tsx";

export default function RegisterPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  // State for form handling
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Simple password strength calculation
  const calculateStrength = (pass: string) => {
    if (!pass) return 0;
    if (pass.length < 6) return 25;
    if (pass.length < 10) return 50;
    if (pass.length < 14) return 75;
    return 100;
  };

  const strength = calculateStrength(password);
  const strengthColor = 
    strength <= 25 ? "bg-red-500" : 
    strength <= 50 ? "bg-yellow-500" : 
    strength <= 75 ? "bg-blue-500" : "bg-green-500";

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      
      {/* Top Bar with Theme Toggle (Matching Login Page) */}
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

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-2xl shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] flex flex-col lg:flex-row">
          
          {/* Left Panel: Brand / Architecture Illustration (Identical to Login) */}
          <div className="relative hidden w-full lg:flex lg:w-5/12 flex-col justify-between overflow-hidden bg-linear-to-br from-blue-600 to-purple-700 p-12 text-white">
            {/* Background decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-100">
                FluxGrid
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight">
                Start Scaling <br />
                <span className="text-blue-200">Your Workflows</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                Join thousands of developers building reliable background job processing with FluxGrid.
              </p>
            </div>

            {/* Abstract Architecture Illustration Placeholder */}
            <div className="relative z-10 mt-12 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="flex flex-col gap-3 opacity-80">
                <div className="h-2 w-1/3 rounded bg-white/40"></div>
                <div className="h-2 w-full rounded bg-white/20"></div>
                <div className="h-2 w-5/6 rounded bg-white/20"></div>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-white/20"></div>
                  <div className="h-8 w-8 rounded-full bg-white/20"></div>
                  <div className="h-8 w-8 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Create Account Form */}
          <div className="w-full p-8 sm:p-12 lg:w-7/12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Get started with FluxGrid in just a few seconds.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Full Name Input */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Work Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Work Email
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
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password (Side-by-Side) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Confirm Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 pr-10 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Password Strength
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>

                {/* Terms of Service Checkbox */}
                <div className="flex items-start mt-4">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-blue-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-slate-700 dark:text-slate-300">
                      I agree to the{" "}
                      <a href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#111827]"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </form>

              {/* Sign In Link */}
              <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Already registered?{" "}
                <a
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}