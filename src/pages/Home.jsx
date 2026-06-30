import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { useReveal } from '@/components/site/Reveal';
import Marquee from '@/components/site/Marquee';
import PhysicsSection from '@/components/site/PhysicsSection';
import { sendContactForm } from '@/lib/web3forms';

function StatCard({ number, label, delay }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`stat-card reveal ${visible ? 'visible' : ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            <div className="stat-number">{number}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

function HomeContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const name = String(fd.get('name')).replace(/[\r\n]/g, ' ').trim();
        const email = String(fd.get('email')).replace(/[\r\n]/g, ' ').trim();
        const message = fd.get('message');
        setSubmitting(true);
        setError('');
        try {
            await sendContactForm({
                subject: `New message from ${name}`,
                name,
                email,
                message,
            });
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <>
            {!submitted && (
                <form
                    data-contact-form
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="hc-name">Name</label>
                        <input type="text" id="hc-name" name="name" required maxLength={100} placeholder="Your full name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hc-email">Email</label>
                        <input type="email" id="hc-email" name="email" required maxLength={100} placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hc-message">Message</label>
                        <textarea id="hc-message" name="message" rows="5" required maxLength={2000} placeholder="Tell us about your project..."></textarea>
                    </div>
                    {error && <p style={{ color: '#FF6B35', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</p>}
                    <button type="submit" className="btn-submit-green" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</button>
                </form>
            )}

            <div className={`form-success ${submitted ? 'show' : ''}`}>
                <div className="checkmark">✓</div>
                <h3>Message Sent!</h3>
                <p>We'll be in touch within 24 hours.</p>
            </div>
        </>
    );
}

export default function Home() {
    return (
        <div className="page-wrapper">

            {/* === HERO === */}
            <section className="hero">
                <Reveal>
                    <h1 className="hero-headline">
                        JMG Web<br /><span className="gradient-word">Development</span>
                    </h1>
                </Reveal>
                <Reveal delay={100}>
                    <p className="hero-sub">
                        building fast, beautiful websites for local businesses that want to grow online.
                    </p>
                </Reveal>
                <Reveal delay={200}>
                    <div className="hero-buttons">
                        <a href="#services" className="btn-primary">See Our Work</a>
                        <Link to="/pricing" className="btn-secondary">View Pricing</Link>
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <Marquee />
                </Reveal>
            </section>

            {/* === PHYSICS / SERVICES === */}
            <section className="physics-section" id="services">
                <div className="container">
                    <Reveal>
                        <p className="section-label">WHAT WE BUILD</p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h2>Services That Work.</h2>
                    </Reveal>
                    <Reveal delay={150}>
                        <p className="physics-hint">Drag the blocks around to explore</p>
                    </Reveal>
                </div>
                <PhysicsSection />
            </section>

            {/* === ABOUT / STATS === */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <Reveal>
                            <p className="about-overline">ABOUT ME</p>
                            <h2 className="about-heading">I build websites that grow your business.</h2>
                            <p className="about-body">
                                I'm a freelance web developer based in Johannesburg, passionate about helping local businesses establish a powerful online presence. From restaurants and salons to trade services and startups — I build fast, modern websites that turn visitors into customers, with personal attention on every project and straightforward pricing that makes sense for growing businesses.
                            </p>
                            <Link to="/contact" className="about-link">
                                Learn More <span>→</span>
                            </Link>
                        </Reveal>
                        <div className="stats-grid">
                            <StatCard number="2+" label="Years Experience" delay={0} />
                            <StatCard number="10" label="Projects Completed" delay={100} />
                            <StatCard number="100%" label="Personal Focus" delay={200} />
                            <StatCard number="1:1" label="Direct Contact" delay={300} />
                        </div>
                    </div>
                </div>
            </section>

            {/* === CONTACT FORM (HOME) === */}
            <section className="home-contact">
                <div className="container">
                    <div className="home-contact-inner">
                        <Reveal>
                            <p className="overline">GET IN TOUCH</p>
                        </Reveal>
                        <Reveal delay={100}>
                            <h2>Let's build something great.</h2>
                        </Reveal>

                        <HomeContactForm />

                        <Reveal delay={300}>
                            <div className="info-pills">
                                <div className="info-pill">
                                    <span className="pill-icon">📍</span>
                                    <span>Johannesburg, SA</span>
                                </div>
                                <div className="info-pill">
                                    <span className="pill-icon">📧</span>
                                    <a href="mailto:jadefreestone@outlook.com">jadefreestone@outlook.com</a>
                                </div>
                                <div className="info-pill">
                                    <span className="pill-icon">📞</span>
                                    <a href="tel:+27733272459">+27 73 327 2459</a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

        </div>
    );
}