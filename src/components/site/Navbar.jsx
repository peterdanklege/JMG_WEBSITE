import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    }, [location.pathname]);

    const toggleMenu = () => {
        const next = !menuOpen;
        setMenuOpen(next);
        document.body.style.overflow = next ? 'hidden' : '';
    };

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Contact', path: '/contact' }];


    const isActive = (path) => location.pathname === path;

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <Link to="/" className="logo">JMG<span className="accent">.</span>DEV</Link>
                    <div className="nav-links">
                        {navItems.map((item) =>
                            <Link key={item.path} to={item.path} className={isActive(item.path) ? "active px-2" : ''}>
                                {item.label}
                            </Link>
                        )}
                        <Link to="/contact" className="nav-cta">Start a Project</Link>
                    </div>
                    <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </nav>
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                {navItems.map((item) =>
                    <Link key={item.path} to={item.path}>{item.label}</Link>
                )}
                <Link to="/contact">Start a Project</Link>
            </div>
        </>);

}