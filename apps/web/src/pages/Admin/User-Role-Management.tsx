import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  UserCog,
  ShieldCheck,
  ShieldAlert,
  User,
  Settings,
  MoreHorizontal,
} from "lucide-react";

// Types
interface UserType {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface RolePermission {
  role: string;
  viewJobs: string;
  createJobs: string;
  manageMembers: string;
  settings: string;
}

// Mock Data
const initialUsers: UserType[] = [
  {
    id: "u-1",
    name: "Alice Johnson",
    email: "alice@alpha.com",
    organization: "Alpha",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-10-24",
  },
  {
    id: "u-2",
    name: "Bob Smith",
    email: "bob@beta.com",
    organization: "Beta",
    role: "Guest",
    status: "Active",
    lastLogin: "2023-10-22",
  },
  {
    id: "u-3",
    name: "Charlie Davis",
    email: "charlie@alpha.com",
    organization: "Alpha",
    role: "Operator",
    status: "Inactive",
    lastLogin: "2023-09-15",
  },
];

const rolePermissions: RolePermission[] = [
  { role: "Super Admin", viewJobs: "Yes", createJobs: "Yes", manageMembers: "Platform", settings: "Platform" },
  { role: "Organization Admin", viewJobs: "Scoped", createJobs: "Configurable", manageMembers: "Yes", settings: "Org" },
  { role: "Operator", viewJobs: "Scoped", createJobs: "If allowed", manageMembers: "No", settings: "Personal" },
  { role: "Analyst", viewJobs: "Read", createJobs: "No", manageMembers: "No", settings: "Personal" },
  { role: "Guest", viewJobs: "Shared", createJobs: "If granted", manageMembers: "No", settings: "Personal" },
];

export default function UsersAndRoles(): React.ReactElement {
  // Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [orgFilter, setOrgFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Logic
  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOrg = orgFilter === "All" || user.organization === orgFilter;
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesOrg && matchesRole && matchesStatus;
  });

  // Helper for permission styling
  const getPermissionBadge = (value: string) => {
    const val = value.toLowerCase();
    if (val === "yes") {
      return "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50";
    }
    if (val === "no") {
      return "text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-700";
    }
    // Scoped, Configurable, Platform, etc.
    return "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-800/50";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <UserCog size={24} className="text-blue-500" />
          USERS & ROLES
        </h1>
      </div>

      {/* SECTION 1: USERS DIRECTORY */}
      <div className="space-y-4">
        
        {/* FILTERS */}
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Org Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={orgFilter}
                onChange={(e) => setOrgFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-40 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">Organization: All</option>
                <option value="Alpha">Alpha</option>
                <option value="Beta">Beta</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
            </div>

            {/* Role Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">Role: All</option>
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
                <option value="Guest">Guest</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
            </div>

            {/* Status Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 sm:w-36 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
              >
                <option value="All">Status: All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* USERS TABLE */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["User", "Organization", "Role", "Status", "Last Login", "Actions"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            <User size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {user.organization}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {user.role}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {user.lastLogin}
                      </td>
                      <td className="px-5 py-4">
                        <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-sm text-slate-500">
                      No users found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SECTION 2: ROLE PERMISSIONS MATRIX */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <ShieldCheck size={18} className="text-violet-500" />
          ROLE PERMISSIONS
        </h2>
        
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-200 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["Role", "View Jobs", "Create Jobs", "Manage Members", "Settings"].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {rolePermissions.map((perm) => (
                  <tr key={perm.role} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-5 py-3 text-sm font-bold text-slate-900 dark:text-white">
                      {perm.role}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${getPermissionBadge(perm.viewJobs)}`}>
                        {perm.viewJobs}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${getPermissionBadge(perm.createJobs)}`}>
                        {perm.createJobs}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${getPermissionBadge(perm.manageMembers)}`}>
                        {perm.manageMembers}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${getPermissionBadge(perm.settings)}`}>
                        {perm.settings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}