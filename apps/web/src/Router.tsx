import { createBrowserRouter } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import GuestRoutes from './routes/GuestRoutes';
import NotFound from "./pages/ErrorSystem/NotFound";

const router = createBrowserRouter([
    PublicRoutes,
    AuthRoutes,
    DashboardRoutes,
    AdminRoutes,
    GuestRoutes,
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default router;