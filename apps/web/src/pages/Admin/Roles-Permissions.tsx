import React, { useState } from "react";
import {
  ShieldCheck,
  RotateCcw,
  Save,
  Loader2,
  Info,
  Check,
  ChevronDown,
} from "lucide-react";

// Types
interface PermissionsState {
  [key: string]: boolean;
}

// Mock Data
const roles = ["Admin", "Operator", "Analyst", "Guest"];

const allPermissions = [
  "jobs:view",
  "jobs:create",
  "jobs:cancel",
  "jobs:retry",
  "queues:view",
  "workers:manage",
  "members:invite",
  "settings:manage",
];

// Default permissions per role to simulate role switching
const roleDefaults: Record<string, PermissionsState> = {
  Admin: {
    "jobs:view": true,
    "jobs:create": true,
    "jobs:cancel": true,
    "jobs:retry": true,
    "queues:view": true,
    "workers:manage": true,
    "members:invite": true,
    "settings:manage": true,
  },
  Operator: {
    "jobs:view": true,
    "jobs:create": true,
    "jobs:cancel": false,
    "jobs:retry": false,
    "queues:view": true,
    "workers:manage": false,
    "members:invite": false,
    "settings:manage": false,
  },
  Analyst: {
    "jobs:view": true,
    "jobs:create": false,
    "jobs:cancel": false,
    "jobs:retry": false,
    "queues:view": true,
    "workers:manage": false,
    "members:invite": false,
    "settings:manage": false,
  },
  Guest: {
    "jobs:view": true,
    "jobs:create": false,
    "jobs:cancel": false,
    "jobs:retry": false,
    "queues:view": false,
    "workers:manage": false,
    "members:invite": false,
    "settings:manage": false,
  },
};

export default function RolesPermissions(): React.ReactElement {
  const [selectedRole, setSelectedRole] = useState("Operator");
  const [permissions, setPermissions] = useState<PermissionsState>(roleDefaults["Operator"]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Toggle individual permission
  const handleToggle = (permission: string) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
    setIsSaved(false);
  };

  // Handle role change
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    setPermissions(roleDefaults[newRole]);
    setIsSaved(false);
  };

  // Restore defaults
  const handleRestoreDefaults = () => {
    setPermissions(roleDefaults[selectedRole]);
    setIsSaved(false);
  };

  // Save changes
  const handleSave = () => {
    setIsSaving(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000); // Reset success state after 3s
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <ShieldCheck size={24} className="text-blue-500" />
          ROLES & PERMISSIONS
        </h1>
      </div>

      {/* ROLE SELECTOR */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Role:
        </label>
        <div className="relative w-64">
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-white"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-2.5 text-slate-400"
          />
        </div>
      </div>

      {/* PERMISSIONS TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/70">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 w-2/3">
                Permission
              </th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 w-1/3">
                Allowed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {allPermissions.map((permission) => {
              const isChecked = permissions[permission];

              return (
                <tr
                  key={permission}
                  onClick={() => handleToggle(permission)}
                  className="group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-5 py-3">
                    <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                      {permission}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      {/* Custom Checkbox UI */}
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                          isChecked
                            ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                            : "border-slate-300 bg-white group-hover:border-blue-400 dark:border-slate-600 dark:bg-[#0f172a]"
                        }`}
                      >
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {isChecked ? "[x]" : "[ ]"}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <button
          onClick={handleRestoreDefaults}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RotateCcw size={16} />
          Restore Defaults
        </button>
        
        <button
          onClick={handleSave}
          disabled={isSaving || isSaved}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition sm:w-auto ${
            isSaved
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : isSaved ? (
            <>
              <Check size={16} />
              Saved!
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* WARNING NOTE */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-500/10">
        <Info size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-500" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong className="font-semibold">Note:</strong> Effective permissions must also be validated by the backend.
        </p>
      </div>

    </div>
  );
}