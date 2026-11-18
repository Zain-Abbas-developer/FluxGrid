
import React from "react";
import { ChevronRight, House } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import { useAuth } from "../context/AuthContext";

const routeLabels: Record<string, string> = {
  app: "Workspace",
  admin: "Administration",
  overview: "Overview",
  jobs: "Jobs",
  create: "Create Job",
  result: "Result",
  queues: "Queues",
  workers: "Workers",
  analytics: "Analytics",
  reports: "Reports",
  "api-playground": "API Playground",
  "api-keys": "API Keys",
  "logs-events": "Logs & Events",
  documentation: "Documentation",
  members: "Members",
  "usage-quotas": "Usage & Quotas",
  settings: "Settings",
  notifications: "Notifications",
  profile: "Profile",
  security: "Security",
  preferences: "Preferences",
  organizations: "Organizations",
  users: "Users",
  roles: "Roles & Permissions",
  "audit-logs": "Audit Logs",
  configurations: "Configurations",
};

const formatSegment = (segment: string): string =>
  routeLabels[segment] ??
  decodeURIComponent(segment)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

interface BreadcrumbItem {
  label: string;
  path: string;
}

const dashboardSectionRoutes: Record<string, string> = {
  overview: "Workspace",
  jobs: "Workspace",
  queues: "Workspace",
  workers: "Workspace",
  analytics: "Workspace",
  reports: "Workspace",
  "api-playground": "Developer Tools",
  "api-keys": "Developer Tools",
  "logs-events": "Developer Tools",
  documentation: "Developer Tools",
  members: "Organization",
  "usage-quotas": "Organization",
  settings: "Organization",
  notifications: "Account",
  profile: "Account",
  security: "Account",
  preferences: "Account",
};

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] === "app" && segments[1]) {
    const section = dashboardSectionRoutes[segments[1]];
    const currentSegments = segments.slice(1);

    if (!section) {
      return [
        {
          label: "Workspace",
          path: "/app/overview",
        },
        ...currentSegments.map((segment, index) => ({
          label: formatSegment(segment),
          path: `/app/${currentSegments.slice(0, index + 1).join("/")}`,
        })),
      ];
    }

    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: section,
        path:
          section === "Workspace"
            ? "/app/overview"
            : section === "Developer Tools"
              ? "/app/api-playground"
              : section === "Organization"
                ? "/app/members"
                : "/app/notifications",
      },
    ];

    currentSegments.forEach((segment, index) => {
      breadcrumbs.push({
        label: formatSegment(segment),
        path: `/app/${currentSegments.slice(0, index + 1).join("/")}`,
      });
    });

    return breadcrumbs;
  }

  if (segments[0] === "admin") {
    return [
      {
        label: "Administration",
        path: "/admin/organizations",
      },
      ...segments.slice(1).map((segment, index) => ({
        label: formatSegment(segment),
        path: `/admin/${segments.slice(1, index + 2).join("/")}`,
      })),
    ];
  }

  return segments.map((segment, index) => ({
    label: formatSegment(segment),
    path: `/${segments.slice(0, index + 1).join("/")}`,
  }));
};

const DashboardLayout = (): React.ReactElement => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E2EBF0] dark:bg-[#0B1220]">
        <p className="text-sm font-medium text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E2EBF0] dark:bg-[#0B1220]">
        <p className="text-sm font-medium text-slate-500">
          Please login first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">

      {/* Navbar - Full Width */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Role Based Sidebar */}
        <Sidebar role={user.role} />

        {/* Dynamic Page Content */}
        <main className="min-w-0 flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl space-y-6 pb-10">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 overflow-x-auto text-sm"
            >
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <React.Fragment key={breadcrumb.path}>
                    {index > 0 && (
                      <ChevronRight
                        aria-hidden="true"
                        size={14}
                        className="shrink-0 text-slate-400 dark:text-slate-600"
                      />
                    )}

                    {isLast ? (
                      <span
                        aria-current="page"
                        className="shrink-0 font-medium text-slate-900 dark:text-white"
                      >
                        {breadcrumb.label}
                      </span>
                    ) : (
                      <Link
                        to={breadcrumb.path}
                        className="flex shrink-0 items-center gap-1.5 text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        {index === 0 && (
                          <House aria-hidden="true" size={14} />
                        )}
                        {breadcrumb.label}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
            <Outlet />
          </div>
        </main>

      </div>

      {/* Footer - Full Width */}
      <Footer />

    </div>
  );
};

export default DashboardLayout;
