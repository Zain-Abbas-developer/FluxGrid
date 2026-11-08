import ProtectedRoute from '../components/access/ProctectedRoute';
import RoleGuard from '../components/access/RoleGuard';

import DashboardLayout from '../layouts/DashboardLayout';

const AdminRoutes = {
    path: "/admin",
    element: (
        <ProtectedRoute>
            <DashboardLayout/>
        </ProtectedRoute>
    ),

    children: [
        {
            path: "organizations",
            element: (
                <RoleGuard allowedRoles={[ "SUPER_ADMIN" ]}>
                    <div>Organizations Management</div>
                </RoleGuard>
            ),
        },
        {
            path: "users",
            element: (
                <RoleGuard allowedRoles={[ "SUPER_ADMIN" ]}>
                    <div>All users</div>
                </RoleGuard>
            ),
        },
        {
            path: "roles",
            element: (
                <RoleGuard allowedRoles={["SUPER_ADMIN", "ORG_ADMIN"]}>
                    <div>Roles & Permissions</div>
                </RoleGuard>
            ),
        },
        {
            path: "members",
            element: (
                <RoleGuard allowedRoles={["ORG_ADMIN"]}>
                    <div>Organization Members</div>
                </RoleGuard>
            ),
        },
        {
            path: "audit-logs",
            element: (
                <RoleGuard allowedRoles={[ "SUPER_ADMIN" ]}>
                    <div>Audit logs</div>
                </RoleGuard>
            )
        },
        {
            path: "configurations",
            element: (
                <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                    <div>Platform Configurations</div>
                </RoleGuard>
            ),
        },
    ],
};

export default AdminRoutes;