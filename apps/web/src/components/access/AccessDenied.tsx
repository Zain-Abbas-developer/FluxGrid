
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-red-500">403</h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          Access Denied
        </h2>

        <p className="mt-3 text-slate-600">
          You don't have permission to access this resource.
          Contact your organization administrator if you
          believe this is a mistake.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
