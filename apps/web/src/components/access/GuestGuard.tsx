
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES, ROLE_HOME } from "../../config/roles";

const GuestGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading client portal...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== ROLES.GUEST) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
