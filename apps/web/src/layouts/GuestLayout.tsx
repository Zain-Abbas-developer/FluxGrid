import { NavLink, Outlet, Link } from "react-router-dom";

const GuestLayout = () => {
  const links = [
    { label: "Overview", path: "/client/overview" },
    { label: "Shared Jobs", path: "/client/jobs" },
    { label: "Shared Results", path: "/client/results" },
    { label: "Shared Reports", path: "/client/reports" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0B1220]">

      {/* Guest Sidebar */}
      <aside className="w-64 min-h-screen bg-[#0F172A] text-white flex flex-col">

        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-400">
            FluxGrid
          </h1>
        </div>

        <nav className="flex-1 p-4">

          <p className="text-xs text-slate-500 font-semibold mb-4 px-3">
            SHARED RESOURCES
          </p>

          <div className="space-y-2">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

          </div>

          <p className="text-xs text-slate-500 font-semibold mt-8 mb-4 px-3">
            ACCOUNT
          </p>

          <Link
            to="/app/profile"
            className="block px-3 py-3 text-sm text-slate-400 hover:text-white"
          >
            Profile
          </Link>

          <Link
            to="/app/security"
            className="block px-3 py-3 text-sm text-slate-400 hover:text-white"
          >
            Security
          </Link>

        </nav>

        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            External Client Portal
          </p>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">

        <header className="h-20 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">

          <h2 className="font-semibold text-slate-800 dark:text-white">
            Client Workspace
          </h2>

          <div className="flex items-center gap-4">

            <button className="text-sm text-slate-600 dark:text-slate-300">
              Help
            </button>

            <Link
              to="/app/profile"
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold"
            >
              G
            </Link>

          </div>

        </header>

        <main className="flex-1 p-6">
          <div className="max-w-375 mx-auto">
            <Outlet />
          </div>
        </main>

        <footer className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          © 2026 FluxGrid Client Portal
        </footer>

      </div>

    </div>
  );
};

export default GuestLayout;