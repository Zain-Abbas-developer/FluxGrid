import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  ListOrdered,
  Cpu,
  BarChart3,
  Terminal,
  Key,
  FileText,
  Users,
  PieChart,
  Settings,
  Bell,
  User,
  Sliders,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

interface NavItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const Sidebar = ({ role }: SidebarProps): React.ReactElement => {

  const navGroups: NavGroup[] = [
    {
      title: "WORKSPACE",
      items: [
        {
          name: "Overview",
          icon: LayoutDashboard,
          path: "/app/overview",
        },
        {
          name: "Jobs",
          icon: Briefcase,
          path: "/app/jobs",
        },
        {
          name: "Create Job",
          icon: PlusCircle,
          path: "/app/jobs/create",
        },
        {
          name: "Queues",
          icon: ListOrdered,
          path: "/app/queues",
        },
        {
          name: "Workers",
          icon: Cpu,
          path: "/app/workers",
        },
        {
          name: "Analytics",
          icon: BarChart3,
          path: "/app/analytics",
        },
      ],
    },

    {
      title: "DEVELOPER TOOLS",
      items: [
        {
          name: "API Playground",
          icon: Terminal,
          path: "/app/api-playground",
        },
        {
          name: "API Keys",
          icon: Key,
          path: "/app/api-keys",
        },
        {
          name: "Logs & Events",
          icon: FileText,
          path: "/app/logs-events",
        },
        {
          name: "Documentation",
          icon: FileText,
          path: "/app/documentation",
        },
      ],
    },

    {
      title: "ORGANIZATION",
      items: [
        {
          name: "Members",
          icon: Users,
          path: "/app/members",
        },
        {
          name: "Usage & Quotas",
          icon: PieChart,
          path: "/app/usage&quotas",
        },
        {
          name: "Settings",
          icon: Settings,
          path: "/app/settings",
        },
      ],
    },

    {
      title: "ACCOUNT",
      items: [
        {
          name: "Notifications",
          icon: Bell,
          path: "/app/notifications",
        },
        {
          name: "Profile",
          icon: User,
          path: "/app/profile",
        },
        {
          name: "Preferences",
          icon: Sliders,
          path: "/app/preferences",
        },
      ],
    },
  ];

  /*
   * ROLE BASED ACCESS
   *
   * SUPER_ADMIN:
   * Everything
   *
   * ORG_ADMIN:
   * Workspace + Developer Tools + Organization + Account
   *
   * OPERATOR:
   * Workspace + limited Developer Tools + Account
   *
   * ANALYST:
   * Workspace read-only + Analytics + Account
   *
   * GUEST:
   * Dashboard only
   */

  const allowedGroups: Record<string, string[]> = {
    SUPER_ADMIN: [
      "WORKSPACE",
      "DEVELOPER TOOLS",
      "ORGANIZATION",
      "ACCOUNT",
    ],

    ORG_ADMIN: [
      "WORKSPACE",
      "DEVELOPER TOOLS",
      "ORGANIZATION",
      "ACCOUNT",
    ],

    OPERATOR: [
      "WORKSPACE",
      "DEVELOPER TOOLS",
      "ACCOUNT",
    ],

    ANALYST: [
      "WORKSPACE",
      "ACCOUNT",
    ],

    GUEST: [
      "ACCOUNT",
    ],
  };

  const visibleGroups = navGroups.filter((group) =>
    allowedGroups[role]?.includes(group.title),
  );

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-[#0B1220]/50 lg:flex h-full overflow-y-auto custom-scrollbar">

      <div className="flex flex-col gap-6 p-4 pb-10">

        {visibleGroups.map((group) => (
          <div key={group.title}>

            <h3 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {group.title}
            </h3>

            <ul className="space-y-1">

              {group.items.map((item) => (
                <li key={item.name}>

                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                      }`
                    }
                  >

                    {({ isActive }) => (
                      <>
                        <item.icon
                          size={18}
                          className={
                            isActive
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-400"
                          }
                        />

                        {item.name}
                      </>
                    )}

                  </NavLink>

                </li>
              ))}

            </ul>

          </div>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;