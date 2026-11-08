
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOME } from "../../config/roles";

const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (user) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
