import React from "react";

export default function Footer(): React.ReactElement {
  return (
    <footer className="flex h-10 w-full shrink-0 items-center justify-between border-t border-slate-200 bg-white/80 px-6 text-xs text-slate-500 dark:border-slate-800 dark:bg-[#111827]/90 dark:text-slate-400 z-20">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        System Status: <span className="font-semibold text-slate-700 dark:text-slate-300">Operational</span>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</a>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span>v2.4.1</span>
      </div>
    </footer>
  );
}