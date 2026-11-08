
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { UserRole } from "../config/roles";
import {
  ROLE_PERMISSIONS,
  type Permission,
} from "../config/permission";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  permissions?: Permission[];
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>({
    id: "user-001",
    name: "Zain Abbas",
    emaiil: "zain@example.com",
    role: "SUPER_ADMIN",
    organizationId: "org-001",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // TODO: Apni auth API se current user fetch karein.
        // Example: const response = await api.get("/auth/me");
        // setUser(response.data.user);

      } catch (error) {
        console.error("Authentication initialization failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const hasPermission = (permission: Permission) => {
    if (!user) return false;

    const userPermissions =
      user.permissions ?? ROLE_PERMISSIONS[user.role];

    return userPermissions.includes(permission);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      hasPermission,
      setUser,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
