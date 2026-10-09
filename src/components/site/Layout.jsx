import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Footer from './Footer';

// Loaded as a separate chunk so the canvas code never delays first paint.
const DotGrid = lazy(() => import('./DotGrid'));

// Skip the animation on data-saver / very low-memory devices; static dots remain.
const canAnimateBg = () =>
    typeof navigator === 'undefined' ||
    (!navigator.connection?.saveData && (navigator.deviceMemory ?? 4) > 1);

export default function Layout() {
    return (
        <>
            <div className="site-bg" aria-hidden="true">
                <div className="site-bg-static" />
                {canAnimateBg() && (
                    <Suspense fallback={null}>
                        <DotGrid />
                    </Suspense>
                )}
            </div>
            <CustomCursor />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
