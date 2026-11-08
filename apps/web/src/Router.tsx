import { createBrowserRouter } from "react-router-dom";

import PublicRoutes from "./routes/PublicRoutes";

const router = createBrowserRouter([
    PublicRoutes,
    {
        path: "*",
        element: <div>404 Not Found</div>
    }
]);

export default router;