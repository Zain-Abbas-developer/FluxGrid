import ProtectedRoute from '../components/access/ProctectedRoute';
import RoleGuard from '../components/access/RoleGuard';

import GuestLayout from '../layouts/GuestLayout';

const GuestRoutes = {
    path: "/client",
    element: (
        <ProtectedRoute>
            <RoleGuard allowedRoles={["GUEST"]}>
                <GuestLayout/>
            </RoleGuard>
        </ProtectedRoute>
    ),

    children: [
        {
            path: "overview",
            element: <div>guest overview</div>,
        },
        {
            path: "jobs",
            element: <div>guest jobs</div>,
        },
        {
            path: "results",
            element: <div>results</div>
        },
    ],
};

export default GuestRoutes;