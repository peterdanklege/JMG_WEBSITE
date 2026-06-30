import { Outlet } from 'react-router-dom';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    return (
        <>
            <CustomCursor />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}