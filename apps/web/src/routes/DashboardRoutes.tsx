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
import Analytics from "../pages/Analytics/Analytics";
import SystemHealth from "../pages/Analytics/SystemHealth";
import Reports from "../pages/Analytics/Reports";
import UsageQuotas from "../pages/Analytics/UsageQuotes";
import APIPlayground from "../pages/Developer/API-Playground";
import ApiKeys from "../pages/Developer/API-Keys";
import LogsEvents from "../pages/Developer/LogsEvents";
import DeveloperDoc from "../pages/Developer/API-Documentation-SDKs";
import MembersAndInvitations from "../pages/Admin/MembersInvitation";
import Notifications from "../pages/Settings/account/Notifications";
import Profile from "../pages/Settings/account/Profile";
import Preferences from "../pages/Settings/security/Preferences";

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
    { path: "analytics", element: <Analytics/> },
    {path: "system-health", element: <SystemHealth/>},
    { path: "reports", element: <Reports/> },
    { path: "api-playground", element: <APIPlayground/> },
    { path: "api-keys", element: <ApiKeys/> },
    { path: "logs-events", element: <LogsEvents/> },
    { path: "developerDocs", element: <DeveloperDoc/> },
    { path: "members", element: <MembersAndInvitations/> },
    { path: "usage-quotas", element: <UsageQuotas/> },
    { path: "settings", element: <div>settings</div> },
    { path: "notifications", element: <Notifications/> },
    { path: "profile", element: <Profile/> },
    { path: "security", element: <div>Security</div> },
    { path: "preferences", element: <Preferences/> },
  ],
};

export default DashboardRoutes;
