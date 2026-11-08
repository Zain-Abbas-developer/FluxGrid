import {Outlet} from 'react-router-dom';

import PublicLayout from '../layouts/PublicLayout';

import LandingPage from '../pages/Public/Landing.tsx'
import FeaturePage from '../pages/Public/Features.tsx'
import HowItWorksPage from '../pages/Public/HowItWoks.tsx'
import DocsPage from '../pages/Public/Docs.tsx';

const PublicRoutes = {
    element: <PublicLayout/>,
    children: [
        {
            path: "/",
            element: <LandingPage/>
        },
        {
            path: "/features",
            element: <FeaturePage/>
        },
        {
            path: '/how-it-works',
            element: <HowItWorksPage/>
        },
        {
            path: "/docs",
            element: <DocsPage/>
        }
    ]
};

export default PublicRoutes;