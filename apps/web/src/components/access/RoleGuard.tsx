
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { UserRole } from "../../config/roles";

interface RoleGuardProps {
  allowedRoles: UserRole[];
}

const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking permissions...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;
