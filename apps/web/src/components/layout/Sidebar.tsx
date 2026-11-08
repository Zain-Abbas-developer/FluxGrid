import React from "react";
import {Link } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, PlusCircle, ListOrdered, 
  Cpu, BarChart3, Terminal, Key, FileText, 
  Users, PieChart, Settings, Bell, User, Sliders 
} from "lucide-react";

export default function Sidebar(): React.ReactElement {
  const navGroups = [
    {
      title: "WORKSPACE",
      items: [
        { name: "Overview", icon: LayoutDashboard, active: true },
        { name: "Jobs", icon: Briefcase },
        { name: "Create Job", icon: PlusCircle },
        { name: "Queues", icon: ListOrdered },
        { name: "Workers", icon: Cpu },
        { name: "Analytics", icon: BarChart3 },
      ],
    },
    {
      title: "DEVELOPER TOOLS",
      items: [
        { name: "API Playground", icon: Terminal },
        { name: "API Keys", icon: Key },
        { name: "Logs & Events", icon: FileText },
        { name: "Documentation", icon: FileText },
      ],
    },
    {
      title: "ORGANIZATION",
      items: [
        { name: "Members", icon: Users },
        { name: "Usage & Quotas", icon: PieChart },
        { name: "Settings", icon: Settings },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        { name: "Notifications", icon: Bell },
        { name: "Profile", icon: User },
        { name: "Preferences", icon: Sliders },
      ],
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-[#0B1220]/50 lg:flex h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-6 p-4 pb-10">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                    }`}
                  >
                    <item.icon 
                      size={18} 
                      className={item.active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} 
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}