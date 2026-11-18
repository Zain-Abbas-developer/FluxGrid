import { Outlet } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
// import ProtectedRoute from '../components/access/ProctectedRoute';
import OverviewPage from "../pages/Dashboard/Dashboard";
import JobsExplorer from "../pages/Dashboard/JobsExplorer";
import CreateJob from "../pages/Dashboard/CreateJob";
import JobDetails from "../pages/Dashboard/JobDetails";
import JobResult from "../pages/Dashboard/JobResult";
import JobAttempts from "../pages/Dashboard/JobAttempts";
import SharedJobsEvent from "../pages/Dashboard/SharedJobsEvent";
import Queues from "../pages/Queues/Queue";
//import queueDetails from "../pages/Queues/QueueDetails";
import WorkersOverview from "../pages/Queues/WorkersOverview";
import WorkerDetails from "../pages/Queues/WorkerDetails";

const DashboardRoutes = {
  path: "/app",
  element: (
    <>
      <DashboardLayout />
    </>
  ),
  children: [
    { path: "overview", element: <OverviewPage /> },
    { path: "jobs", element: <JobsExplorer /> },
    { path: "jobs/create", element: <CreateJob/> },
    { path: "jobs/:jobId", element: <JobDetails/> },
    { path: "jobs/:jobId/events", element: <SharedJobsEvent/> },
    { path: "jobs/:jobId/attempts", element: <JobAttempts/> },
    { path: "jobs/:jobId/result", element: <JobResult/> },
    { path: "queues", element: <Queues/> },
    // { path: "queues/:queueId", element: <QueueDetails/> },
    { path: "workers", element: <WorkersOverview/> },
    { path: "workers/:workerId", element: <WorkerDetails/> },
    { path: "analytics", element: <div>Analytics</div> },
    { path: "reports", element: <div>Reports</div> },
    { path: "api-playground", element: <div>API Playground</div> },
    { path: "api-keys", element: <div>API Keys</div> },
    { path: "logs-events", element: <div>Logs</div> },
    { path: "documentation", element: <div>Documentation</div> },
    { path: "members", element: <div>Members</div> },
    { path: "usage-quotas", element: <div>Usage & Quotas</div> },
    { path: "settings", element: <div>settings</div> },
    { path: "notifications", element: <div>Notifications</div> },
    { path: "profile", element: <div>Profile</div> },
    { path: "security", element: <div>Security</div> },
    { path: "preferences", element: <div>Preferences</div> },
  ],
};

export default DashboardRoutes;
