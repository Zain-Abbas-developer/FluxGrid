import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC] dark:bg-[#0B1220]">
        <div className="w-full ">
          <Outlet />
        </div>
    </div>
  );
};

export default AuthLayout;