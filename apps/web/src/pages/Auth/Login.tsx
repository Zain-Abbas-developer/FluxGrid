import React, { useState } from "react";
import type { ReactElement } from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "../../context/ThemeContext.tsx";
// import Navbar from "../../components/common/Navbar.tsx";
// import Footer from "../../components/common/Footer.tsx";

export default function LoginPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  // State for form handling
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      {/* Navbar */}
      {/* <Navbar theme={theme} onToggleTheme={toggleTheme} /> */}
      {/* we use only logo to show light and dark theme*/}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-white"
        >
          {theme === "light" ? <span><Moon className="text-blue-500" /></span> : <span className="flex justify-center bg-blue-500 h-8 w-8 items-center rounded-full"><Sun className="text-white" /></span>}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-2xl shadow-blue-500/5 dark:border-slate-800 dark:bg-[#111827] flex flex-col lg:flex-row">
          {/* Left Panel: Brand / Architecture Illustration */}
          <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-linear-to-br from-blue-600 to-purple-700 p-12 text-white">
            {/* Background decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative z-10">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-100">
                FluxGrid
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight">
                Reliable Job Processing <br />
                <span className="text-blue-200">Built for Developers</span>
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                Manage, process, and scale your background jobs with complete
                reliability and control.
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

          {/* Right Panel: Sign In Form */}
          <div className="w-full p-8 sm:p-12 lg:w-1/2">
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign In
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Welcome back! Please enter your details.
              </p>

              <form
                className="mt-8 space-y-6"
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

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-slate-300 bg-white/50 px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                    {/* Eye Toggle Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-blue-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#111827]"
                  >
                    SIGN IN
                  </button>
                </div>
              </form>

              {/* Register Link */}
              <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Register
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
