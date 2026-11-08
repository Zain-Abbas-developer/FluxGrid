
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Permission } from "../../config/permissions";

interface PermissionGateProps {
  permission: Permission | Permission[];
  requireAll?: boolean;
  fallback?: ReactNode;
  children: ReactNode;
}

const PermissionGate = ({
  permission,
  requireAll = false,
  fallback = null,
  children,
}: PermissionGateProps) => {
  const { hasPermission } = useAuth();

  const permissions = Array.isArray(permission)
    ? permission
    : [permission];

  const allowed = requireAll
    ? permissions.every(hasPermission)
    : permissions.some(hasPermission);

  return allowed ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;
