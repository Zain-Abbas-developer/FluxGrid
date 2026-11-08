import { Outlet } from "react-router-dom";

import { useTheme } from "../context/ThemeContext.tsx";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const PublicLayout = () => {
    const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B1220]">

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default PublicLayout;