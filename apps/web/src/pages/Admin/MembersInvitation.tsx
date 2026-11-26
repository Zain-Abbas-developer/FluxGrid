import React, { useState } from "react";
import {
  UserPlus,
  X,
  ChevronDown,
  Mail,
  Shield,
  Loader2,
  Users,
} from "lucide-react";

// Types
interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  lastActive: string;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  invitedAt: string;
}

// Mock Data
const initialMembers: Member[] = [
  {
    id: "m-1",
    name: "User A",
    email: "usera@example.com",
    role: "Operator",
    status: "Active",
    lastActive: "2023-10-24",
  },
  {
    id: "m-2",
    name: "User B",
    email: "userb@example.com",
    role: "Analyst",
    status: "Active",
    lastActive: "2023-10-23",
  },
];

const initialInvitations: Invitation[] = [
  {
    id: "inv-1",
    email: "newuser@example.com",
    role: "Admin",
    invitedAt: "2023-10-25",
  },
];

export default function MembersAndInvitations(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Members");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Data State
  const [members] = useState<Member[]>(initialMembers);
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);

  // Form State
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Operator");
  const [useRoleDefaults, setUseRoleDefaults] = useState(true);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSending(true);

    // Simulate API Call
    setTimeout(() => {
      const newInvite: Invitation = {
        id: `inv-${Date.now()}`,
        email: email,
        role: role,
        invitedAt: new Date().toISOString().split("T")[0],
      };

      setInvitations([newInvite, ...invitations]);
      setIsSending(false);
      setIsFormOpen(false);
      setEmail("");
      setRole("Operator");
      setUseRoleDefaults(true);
      setActiveTab("Pending Invitations"); // Automatically switch to see the new invite
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Users size={24} className="text-blue-500" />
          MEMBERS & INVITATIONS
        </h1>
        
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            isFormOpen
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isFormOpen ? <X size={16} /> : <UserPlus size={16} />}
          {isFormOpen ? "Cancel Invitation" : "INVITE MEMBER"}
        </button>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800">
        {["Members", "Pending Invitations"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            [{tab}]
          </button>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="overflow-x-auto">
          {activeTab === "Members" ? (
            /* MEMBERS TABLE */
            <table className="w-full min-w-200 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["Name", "Email", "Role", "Status", "Last Active", "Actions"].map((heading) => (
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
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                      {member.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                      {member.email}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {member.role}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          member.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {member.lastActive}
                    </td>
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* INVITATIONS TABLE */
            <table className="w-full min-w-200 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["Email", "Role", "Invited At", "Actions"].map((heading) => (
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
                {invitations.length > 0 ? (
                  invitations.map((invite) => (
                    <tr
                      key={invite.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
                        {invite.email}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {invite.role}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {invite.invitedAt}
                      </td>
                      <td className="px-5 py-4 flex items-center gap-3">
                        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                          Resend
                        </button>
                        <button className="text-sm font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400">
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-sm text-slate-500">
                      No pending invitations.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* INVITE MEMBER FORM */}
      {isFormOpen && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-[#0f172a] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Mail size={16} className="text-blue-500" />
            INVITE MEMBER
          </h2>
          
          <form onSubmit={handleInvite} className="space-y-5">
            {/* Email & Role */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                  Role
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-slate-700 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-200"
                  >
                    <option value="Operator">Operator</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-2.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Permissions Toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Permissions</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUseRoleDefaults(true)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    useRoleDefaults
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-400"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-400"
                  }`}
                >
                  Use role defaults
                </button>
                <button
                  type="button"
                  onClick={() => setUseRoleDefaults(false)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                    !useRoleDefaults
                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-400"
                      : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#111827] dark:text-slate-400"
                  }`}
                >
                  Customize if supported
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSending || !email.trim()}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {isSending && <Loader2 size={16} className="animate-spin" />}
                {isSending ? "Sending..." : "Send Invitation"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}