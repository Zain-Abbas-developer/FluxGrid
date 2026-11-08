import { Outlet } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
// import ProtectedRoute from '../components/access/ProctectedRoute';
import OverviewPage from "../pages/Dashboard/Dashboard";

const DashboardRoutes = {
  path: "/app",
  element: (
    <>
      <DashboardLayout />
    </>
  ),
  children: [
    { path: "overview", element: <OverviewPage /> },
    { path: "jobs", element: <div>Jobs</div> },
    { path: "jobs/create", element: <div>Create Job</div> },
    { path: "jobs/:jobId", element: <div>Job Details</div> },
    { path: "jobs/:jobId/result", element: <div>Job Result</div> },
    { path: "queues", element: <div>Queues</div> },
    { path: "workers", element: <div>Workers</div> },
    { path: "analytics", element: <div>Analytics</div> },
    { path: "reports", element: <div>Reports</div> },
    { path: "api-playground", element: <div>API Playground</div> },
    { path: "api-keys", element: <div>API Keys</div> },
    { path: "logs-events", element: <div>Logs</div> },
    { path: "documentation", element: <div>Documentation</div> },
    { path: "members", element: <div>Members</div> },
    { path: "usage&quotas", element: <div>Usage & Quotas</div> },
    { path: "settings", element: <div>settings</div> },
    { path: "notifications", element: <div>Notifications</div> },
    { path: "profile", element: <div>Profile</div> },
    { path: "security", element: <div>Security</div> },
    { path: "preferences", element: <div>Preferences</div> },
  ],
};

export default DashboardRoutes;
