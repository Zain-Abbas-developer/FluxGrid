export const ROLES = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ORG_ADMIN: "ORG_ADMIN",
    OPERATOR: "OPERATOR",
    ANALYST: "ANALYST",
    GUEST: "GUEST",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_HOME: Record<UserRole, string> =  {
    SUPER_ADMIN: "/admin/overview",
    ORG_ADMIN: "/app/overview",
    OPERATOR: "/app/overview",
    ANALYST: '/app/overview',
    GUEST: "/client/overview",
};