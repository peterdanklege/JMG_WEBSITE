import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PHRASES = [
    "Turning Ideas Into Digital Experiences.",
    "Code That Counts.",
    "Built Fast. Built Right.",
    "Your Vision. Our Execution.",
    "Websites That Work As Hard As You Do."
];

function Typewriter() {
    const [text, setText] = useState('');

    useEffect(() => {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            const current = PHRASES[phraseIndex];
            if (!isDeleting) {
                charIndex++;
                setText(current.substring(0, charIndex));
                if (charIndex === current.length) {
                    isDeleting = true;
                    timeout = setTimeout(type, 2200);
                    return;
                }
                timeout = setTimeout(type, 80);
            } else {
                charIndex--;
                setText(current.substring(0, charIndex));
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % PHRASES.length;
                    timeout = setTimeout(type, 400);
                    return;
                }
                timeout = setTimeout(type, 40);
            }
        };

        type();
        return () => clearTimeout(timeout);
    }, []);

    return <span>{text}<span className="cursor-blink"></span></span>;
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="typewriter-wrapper">
                    <div className="typewriter-text">
                        <Typewriter />
                    </div>
                </div>
                <div className="footer-middle">
                    <Link to="/" className="footer-logo">JMG<span className="accent">.</span>DEV</Link>
                    <div className="footer-nav">
                        <Link to="/">Home</Link>
                        <Link to="/pricing">Pricing</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className="footer-socials">
                        <a href="https://www.linkedin.com/in/jade-freestone-ywmi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                        <a href="https://github.com/peterdanklege" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GH</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2025 JMG.DEV. All rights reserved.</span>
                    <span>Made with ❤️ + code</span>
                </div>
            </div>
        </footer>
    );
}