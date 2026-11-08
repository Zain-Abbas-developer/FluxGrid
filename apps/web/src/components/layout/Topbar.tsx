import { useLocation, Link } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const currentPage =
    location.pathname.split("/").filter(Boolean).pop() || "Overview";

  const pageTitle = currentPage
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <header className="h-20 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">

      {/* Page Title */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          {pageTitle}
        </h2>

        <p className="text-xs text-slate-500">
          Workspace / {pageTitle}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">

        <div className="hidden md:block">
          <input
            type="search"
            placeholder="Search jobs..."
            className="w-64 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Link
          to="/app/notifications"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          Notifications
        </Link>

        <Link
          to="/app/profile"
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            U
          </div>

          <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-white">
            My Account
          </span>
        </Link>

      </div>

    </header>
  );
};

export default Topbar;