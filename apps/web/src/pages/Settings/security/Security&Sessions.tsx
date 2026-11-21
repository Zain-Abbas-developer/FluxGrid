import React, { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  LogOut,
  Check,
  Loader2,
  MapPin,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

// Types
interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const initialSessions: Session[] = [
  {
    id: "s-1",
    device: "Chrome on macOS",
    location: "San Francisco, USA (Approx.)",
    lastActive: "Current Session",
    isCurrent: true,
  },
  {
    id: "s-2",
    device: "Safari on iPhone",
    location: "New York, USA (Approx.)",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "s-3",
    device: "Firefox on Windows",
    location: "London, UK (Approx.)",
    lastActive: "1 day ago",
    isCurrent: false,
  },
];

export default function SecuritySessions(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("Password");

  // Password Form State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // MFA State
  const [isMfaEnabled, setIsMfaEnabled] = useState(true);

  // Sessions State
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  // Handlers
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (passwords.new !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1200);
  };

  const toggleMfa = () => {
    setIsMfaEnabled(!isMfaEnabled);
  };

  const handleRevokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSignOutOthers = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent));
  };

  const tabs = ["Password", "MFA", "Active Sessions", "Login History"];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Shield size={24} className="text-blue-500" />
          SECURITY & SESSIONS
        </h1>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-slate-800">
        {tabs.map((tab) => (
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

      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* PASSWORD SECTION */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Key size={18} className="text-amber-500" />
            Password
          </h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Current Password
              </label>
              <input
                type="password"
                required
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                New Password
              </label>
              <input
                type="password"
                required
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-[#0f172a] dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none transition focus:border-blue-500 dark:bg-[#0f172a] dark:text-white ${
                  passwordError ? "border-red-500 dark:border-red-500" : "border-slate-200 dark:border-slate-700"
                }`}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <ShieldAlert size={12} /> {passwordError}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isChangingPassword || passwordSuccess}
                className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition ${
                  passwordSuccess
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
                }`}
              >
                {isChangingPassword ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating...
                  </>
                ) : passwordSuccess ? (
                  <>
                    <Check size={16} />
                    Password Changed!
                  </>
                ) : (
                  "[Change Password]"
                )}
              </button>
            </div>
          </form>
        </section>

        {/* MFA SECTION */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Smartphone size={18} className="text-blue-500" />
            Multi-Factor Authentication
          </h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Status:
              </span>
              <span
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  isMfaEnabled
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {isMfaEnabled ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                {isMfaEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            
            <button
              onClick={toggleMfa}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0f172a] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              [Configure MFA]
            </button>
          </div>
        </section>

        {/* ACTIVE SESSIONS SECTION */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
          <div className="p-6 pb-0">
            <h2 className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Monitor size={18} className="text-violet-500" />
              Active Sessions
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/70">
                <tr>
                  {["Device", "Location", "Last Active", "Action"].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((session) => (
                  <tr
                    key={session.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Monitor size={16} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {session.device}
                        </span>
                        {session.isCurrent && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                            CURRENT
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {session.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
                      {session.lastActive}
                    </td>
                    <td className="px-6 py-4">
                      {!session.isCurrent ? (
                        <button
                          onClick={() => handleRevokeSession(session.id)}
                          className="text-sm font-medium text-red-600 transition hover:text-red-700 hover:underline dark:text-red-400 dark:hover:text-red-300"
                        >
                          [Revoke]
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SESSIONS FOOTER */}
          <div className="border-t border-slate-200 bg-slate-50 p-4 rounded-b-xl dark:border-slate-800 dark:bg-[#0f172a] flex justify-between items-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage devices that have access to your account.
            </p>
            <button
              onClick={handleSignOutOthers}
              disabled={sessions.length <= 1}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-red-600 disabled:opacity-50 disabled:hover:text-slate-700 dark:text-slate-300 dark:hover:text-red-400 dark:disabled:hover:text-slate-300"
            >
              <LogOut size={16} />
              [Sign Out Other Sessions]
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}