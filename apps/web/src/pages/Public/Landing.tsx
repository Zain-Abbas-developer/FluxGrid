import { useCallback, useEffect, useState } from "react";
import type { ReactElement } from "react";

import {useTheme} from '../../context/ThemeContext.tsx';
// import Navbar from '../../components/common/Navbar.tsx'
// import Footer from '../../components/common/Footer.tsx'
import Hero from '../../components/landing/Hero.tsx'
import Features from '../../components/landing/Features.tsx'
import HowItWorks from '../../components/landing/HowItWork.tsx'
import UseCases from '../../components/landing/UseCases.tsx'
import SecurityAndDeveloperExperience from '../../components/landing/SecurityAndDeveloperExperience.tsx'
import FinalCTA from '../../components/landing/FinalCTA.tsx'


export default function LandingPage(): ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen scroll-smooth overflow-x-clip bg-[#E2EBF0] text-slate-900 antialiased selection:bg-blue-500/20 dark:bg-[#0B1220] dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only z-60 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {/* <Navbar theme={theme} onToggleTheme={toggleTheme} /> */}

      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <UseCases />
        <SecurityAndDeveloperExperience />
        <FinalCTA />
      </main>

      {/* <Footer /> */}
    </div>
  );
}