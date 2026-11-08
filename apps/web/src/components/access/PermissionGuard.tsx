
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Permission } from "../../config/permission";

interface PermissionGuardProps {
  permissions: Permission[];
  requireAll?: boolean;
}

const PermissionGuard = ({
  permissions,
  requireAll = false,
}: PermissionGuardProps) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return <div>Checking access...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowed = requireAll
    ? permissions.every(hasPermission)
    : permissions.some(hasPermission);

  if (!allowed) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

export default PermissionGuard;
