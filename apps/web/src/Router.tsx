import { createBrowserRouter } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import GuestRoutes from './routes/GuestRoutes';

const router = createBrowserRouter([
    PublicRoutes,
    AuthRoutes,
    DashboardRoutes,
    AdminRoutes,
    GuestRoutes,
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
]);

export default router;