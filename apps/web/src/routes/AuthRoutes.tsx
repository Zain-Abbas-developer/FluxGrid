import AuthLayout from '../layouts/AuthLayout.tsx';


import LoginPage from '../pages/Auth/Login.tsx';
import RegisterPage from '../pages/Auth/Register.tsx';
import ForgotPasswordPage from '../pages/Auth/ForgotPassword.tsx';
import ResetPasswordPage from '../pages/Auth/ResetPassword.tsx';
import VerifyEmailPage from '../pages/Auth/Emailverification.tsx';
import MfaPage from '../pages/Auth/Multi-factor.tsx';


const AuthRoutes = {
    element: <AuthLayout/>,
    children: [
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            path: "/register",
            element: <RegisterPage/>
        },
        {
            path: "/forgot-password",
            element: <ForgotPasswordPage/>
        },
        {
            path: "/reset-password",
            element: <ResetPasswordPage />
        },
        {
            path: "/verify-email",
            element: <VerifyEmailPage />
        },
        {
            path: "/mfa",
            element: <MfaPage />
        },
    ],
};

export default AuthRoutes;