import { useState } from 'react';
import Reveal from '@/components/site/Reveal';
import { sendContactForm } from '@/lib/web3forms';

const INFO_CARDS = [
    { icon: '📍', label: 'Location', value: 'Johannesburg, South Africa' },
    { icon: '📧', label: 'Email', value: 'jadefreestone@outlook.com', href: 'mailto:jadefreestone@outlook.com' },
    { icon: '📞', label: 'Phone', value: '+27 73 327 2459', href: 'tel:+27733272459' },
    { icon: '⏱️', label: 'Response Time', value: 'Within 24 hours' },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const name = String(fd.get('name')).replace(/[\r\n]/g, ' ').trim();
        const email = String(fd.get('email')).replace(/[\r\n]/g, ' ').trim();
        const company = String(fd.get('company') || 'N/A').replace(/[\r\n]/g, ' ').trim();
        const budget = fd.get('budget') || 'N/A';
        const details = fd.get('details');
        setSubmitting(true);
        setError('');
        try {
            await sendContactForm({
                subject: `New Project Inquiry from ${name}`,
                name,
                email,
                company,
                budget,
                details,
            });
            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <div className="page-wrapper">

            {/* === CONTACT HERO === */}
            <section className="contact-hero">
                <div className="container">
                    <Reveal>
                        <p className="overline">REACH OUT</p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1>Start Your Project Today.</h1>
                    </Reveal>
                </div>
            </section>

            {/* === CONTACT CONTENT === */}
            <section className="contact-content">
                <div className="container">
                    <div className="contact-grid">

                        {/* Form */}
                        <Reveal className="contact-form-wrap">
                            <h2>Tell us about your project</h2>
                            {!submitted && (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="c-name">Name *</label>
                                        <input type="text" id="c-name" name="name" required maxLength={100} placeholder="Your full name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="c-email">Email *</label>
                                        <input type="email" id="c-email" name="email" required maxLength={100} placeholder="you@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="c-company">Company Name</label>
                                        <input type="text" id="c-company" name="company" maxLength={100} placeholder="Your business name (optional)" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="c-budget">Budget Range</label>
                                        <select id="c-budget" name="budget" defaultValue="">
                                            <option value="" disabled>Select your budget range</option>
                                            <option value="under-2000">Under R2,000</option>
                                            <option value="2000-4000">R2,000 – R4,000</option>
                                            <option value="4500-8000">R4,500 – R8,000</option>
                                            <option value="8000-plus">R8,000+</option>
                                            <option value="not-sure">Not sure yet</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="c-details">Project Details *</label>
                                        <textarea id="c-details" name="details" rows="6" required maxLength={3000} placeholder="Tell us about your business and what you need..."></textarea>
                                    </div>
                                    {error && <p style={{ color: '#FF6B35', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</p>}
                                    <button type="submit" className="btn-submit-orange" disabled={submitting}>{submitting ? 'Sending...' : 'Send Inquiry'}</button>
                                </form>
                            )}

                            <div className={`form-success ${submitted ? 'show' : ''}`}>
                                <div className="checkmark">✓</div>
                                <h3>Inquiry Received!</h3>
                                <p>We'll be in touch within 24 hours.</p>
                            </div>
                        </Reveal>

                        {/* Contact Info Cards */}
                        <Reveal delay={100} className="contact-info-cards">
                            {INFO_CARDS.map((card, i) => (
                                <div key={i} className="contact-info-card">
                                    <span className="contact-card-icon">{card.icon}</span>
                                    <div>
                                        <div className="contact-card-label">{card.label}</div>
                                        <div className="contact-card-value">
                                            {card.href ? <a href={card.href} style={{ color: 'inherit', textDecoration: 'none' }}>{card.value}</a> : card.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Reveal>

                    </div>
                </div>
            </section>

        </div>
    );
}