import React, { useState } from "react";
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Info,
  ChevronRight,
  ChevronLeft,
  Shield,
  Server,
} from "lucide-react";

// Types
type Category = "Jobs" | "Security" | "System";

interface Notification {
  id: string;
  category: Category;
  title: string;
  message: string;
  actionText: string;
  isRead: boolean;
}

// Mock Data
const initialNotifications: Notification[] = [
  {
    id: "n-1",
    category: "Jobs",
    title: "Job failed",
    message: "Job job_abc123 failed after retries.",
    actionText: "View Job ->",
    isRead: false,
  },
  {
    id: "n-2",
    category: "Jobs",
    title: "Queue backlog",
    message: "Waiting jobs exceeded configured threshold.",
    actionText: "View Queue ->",
    isRead: false,
  },
  {
    id: "n-3",
    category: "Security",
    title: "API key created",
    message: "A new API key was created for your account.",
    actionText: "Review Keys",
    isRead: true,
  },
  {
    id: "n-4",
    category: "System",
    title: "System maintenance",
    message: "Scheduled maintenance will occur at 02:00 UTC.",
    actionText: "View Status",
    isRead: true,
  },
];

export default function Notifications(): React.ReactElement {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Unread", "Jobs", "Security", "System"];

  // Filtering Logic
  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !notif.isRead;
    return notif.category === activeTab;
  });

  // Mark single as read
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // Helper for icon rendering
  const getIcon = (category: Category) => {
    switch (category) {
      case "Jobs":
        return <AlertTriangle size={20} className="text-amber-500" />;
      case "Security":
        return <Shield size={20} className="text-blue-500" />;
      case "System":
        return <Server size={20} className="text-violet-500" />;
      default:
        return <Info size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          <Bell size={24} className="text-blue-500" />
          NOTIFICATIONS
        </h1>
        
        <button
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some((n) => !n.isRead)}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <CheckCheck size={16} />
          [Mark All as Read]
        </button>
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

      {/* NOTIFICATION LIST */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111827]">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleMarkAsRead(notif.id)}
                className={`group flex flex-col gap-4 p-5 transition-colors sm:flex-row sm:items-start sm:justify-between cursor-pointer ${
                  notif.isRead
                    ? "bg-white hover:bg-slate-50 dark:bg-[#111827] dark:hover:bg-slate-800/40"
                    : "bg-blue-50/30 hover:bg-blue-50/60 dark:bg-blue-500/5 dark:hover:bg-blue-500/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 shrink-0">
                    {getIcon(notif.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-semibold ${notif.isRead ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-white"}`}>
                        {notif.title}
                      </h3>
                      {!notif.isRead && (
                        <span className="flex h-2 w-2 rounded-full bg-blue-500" title="Unread" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {notif.message}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center sm:pl-4">
                  <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 group-hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/20 dark:group-hover:bg-blue-500/20">
                    [{notif.actionText}]
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <Bell size={32} className="mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-900 dark:text-white">No notifications</p>
              <p className="mt-1 text-sm text-slate-500">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="flex items-center justify-between pt-2">
        <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
          <ChevronLeft size={16} />
          [Previous]
        </button>
        
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Page 1 of 1
        </span>

        <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
          [Next]
          <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
}