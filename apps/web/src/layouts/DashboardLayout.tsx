
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

import { useAuth } from "../context/AuthContext";

const DashboardLayout = (): React.ReactElement => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E2EBF0] dark:bg-[#0B1220]">
        <p className="text-sm font-medium text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E2EBF0] dark:bg-[#0B1220]">
        <p className="text-sm font-medium text-slate-500">
          Please login first.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">

      {/* Navbar - Full Width */}
      <Navbar />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* Role Based Sidebar */}
        <Sidebar role={user.role} />

        {/* Dynamic Page Content */}
        <main className="min-w-0 flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl space-y-6 pb-10">
            <Outlet />
          </div>
        </main>

      </div>

      {/* Footer - Full Width */}
      <Footer />

    </div>
  );
};

export default DashboardLayout;
