import React, { useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  Building2,
} from "lucide-react";

// Types
interface Organization {
  id: string;
  name: string;
  members: number;
  plan: string;
  status: "Active" | "Paused";
  created: string;
}

// Mock Data
const initialOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "Alpha",
    members: 124,
    plan: "Enterprise",
    status: "Active",
    created: "2023-01-15",
  },
  {
    id: "org-2",
    name: "Beta",
    members: 45,
    plan: "Pro",
    status: "Active",
    created: "2023-03-22",
  },
  {
    id: "org-3",
    name: "Gamma",
    members: 8,
    plan: "Free",
    status: "Paused",
    created: "2023-06-10",
  },
];

export default function Organizations(): React.ReactElement {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  
  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");

  // Filter Logic
  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || org.status === statusFilter;
    const matchesPlan = planFilter === "All" || org.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Status Badge Styling
  const getStatusBadge = (status: string) => {
    if (status === "Active") {
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
    }
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Building2 size={24} className="text-blue-500" />
          ORGANIZATIONS
        </h1>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus size={16} />
          CREATE ORGANIZATION
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Status Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="All">Status: All</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>

          {/* Plan Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            >
              <option value="All">Plan: All</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Pro">Pro</option>
              <option value="Free">Free</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/70">
              <tr>
                {[
                  "Organization",
                  "Members",
                  "Plan",
                  "Status",
                  "Created",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map((org) => (
                  <tr
                    key={org.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {org.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {org.members.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      {org.plan}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${getStatusBadge(
                          org.status
                        )}`}
                      >
                        {org.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {org.created}
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400">
                        <Settings size={14} />
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                    No organizations found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-[#0f172a]">
          <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            <ChevronLeft size={15} />
            Previous
          </button>
          
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Page 1 of 1
          </span>

          <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

    </div>
  );
}