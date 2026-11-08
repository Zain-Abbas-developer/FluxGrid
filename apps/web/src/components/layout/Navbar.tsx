import React from "react";
import { 
  Moon, Sun, Search, Bell, HelpCircle, ChevronDown 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext.tsx";

interface NavbarProps {
  // Props can be added here if needed later
}

export default function Navbar(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 w-full shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-[#111827]/90 z-20">
      
      {/* Left Side: Logo & Org Selector */}
      <div className="flex items-center gap-6">
        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          FLUXGRID
        </span>
        
        <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:flex">
          Organization <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Right Side: Search, Icons, Profile */}
      <div className="flex items-center gap-4">
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-64 rounded-full border border-slate-200 bg-slate-100/50 py-1.5 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900/50 dark:focus:bg-slate-900"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-slate-700">
          <button className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
            <HelpCircle size={18} />
          </button>
          
          <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
            <Bell size={18} />
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#111827]"></span>
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 transition hover:scale-105"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Profile Avatar */}
          <button className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#111827] transition hover:opacity-90">
            JD
          </button>
        </div>
      </div>
    </header>
  );
}