import AuthLayout from '../layouts/AuthLayout.tsx';


import LoginPage from '../pages/Auth/Login.tsx';
import RegisterPage from '../pages/Auth/Register.tsx';
import ForgotPasswordPage from '../pages/Auth/ForgotPassword.tsx';
import resetPasswordPage from '../pages/Auth/ResetPassword.tsx';
import VerifyEmailPage from '../pages/Auth/EmailVerification.tsx';
import mfaPage from '../pages/Auth/Multi-factor.tsx';


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
            element: <resetPasswordPage />
        },
        {
            path: "/verify-email",
            element: <VerifyEmailPage />
        },
        {
            path: "/mfa",
            element: <mfaPage />
        },
    ],
};

export default AuthRoutes;