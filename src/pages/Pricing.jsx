import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { useReveal } from '@/components/site/Reveal';

const FAQ_DATA = [
    { q: "How long does it take to build a website?", a: "Most sites are completed in 5–10 business days, depending on the complexity and how quickly you provide content and feedback." },
    { q: "Do I need to provide content and photos?", a: "We can help source stock images and write basic copy, but having your own content — especially photos of your business — always makes the site feel more authentic and personal." },
    { q: "Will my website work on phones?", a: "Yes, absolutely. All our sites are built mobile-first, meaning they look and work great on any screen size — phones, tablets, and desktops." },
    { q: "Can I update the site myself?", a: "Yes, we can build on WordPress or a similar CMS so you have full control over text, images, and content updates without needing to touch code." },
    { q: "Do you offer payment plans?", a: "Yes, we typically split payments 50% upfront to get started and 50% on delivery. For larger projects, we can arrange custom payment schedules." },
    { q: "What if I need changes after launch?", a: "We offer 30 days of free minor edits post-launch on the Professional and Enterprise plans. After that, we offer affordable maintenance retainers or ad-hoc support." },
];

function PricingCard({ children, delay, featured }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`pricing-card reveal ${visible ? 'visible' : ''} ${featured ? 'featured' : ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}

function FAQItem({ question, answer, delay }) {
    const { ref, visible } = useReveal();
    const [open, setOpen] = useState(false);
    return (
        <div
            ref={ref}
            className={`faq-item reveal ${visible ? 'visible' : ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            <button className="faq-question" onClick={() => setOpen(!open)}>
                {question}
                <span className={`faq-icon ${open ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${open ? 'open' : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
}

export default function Pricing() {
    return (
        <div className="page-wrapper">

            {/* === PRICING HERO === */}
            <section className="pricing-hero">
                <div className="container">
                    <Reveal>
                        <p className="overline">TRANSPARENT PRICING</p>
                    </Reveal>
                    <Reveal delay={100}>
                        <h1>Simple Plans. Real Results.</h1>
                    </Reveal>
                    <Reveal delay={200}>
                        <p>No hidden fees. No surprises. Just great websites.</p>
                    </Reveal>
                </div>
            </section>

            {/* === PRICING CARDS === */}
            <section className="pricing-cards">
                <div className="container">
                    <div className="pricing-grid">

                        {/* Starter */}
                        <PricingCard>
                            <h3>Starter</h3>
                            <div className="pricing-price">R2,500</div>
                            <p className="pricing-subtitle">Perfect for small businesses starting out online.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> Up to 3 pages</li>
                                <li><span className="check">✓</span> Mobile responsive</li>
                                <li><span className="check">✓</span> Contact form</li>
                                <li><span className="check">✓</span> Google Maps embed</li>
                                <li><span className="check">✓</span> Basic SEO setup</li>
                                <li><span className="check">✓</span> 1 round of revisions</li>
                            </ul>
                            <Link to="/contact" className="btn-outline-orange">Get Started</Link>
                        </PricingCard>

                        {/* Professional */}
                        <PricingCard delay={100} featured>
                            <span className="popular-badge">Most Popular</span>
                            <h3>Professional</h3>
                            <div className="pricing-price">R5,500</div>
                            <p className="pricing-subtitle">Everything you need to grow your online presence.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> Up to 7 pages</li>
                                <li><span className="check">✓</span> Mobile responsive</li>
                                <li><span className="check">✓</span> Contact form</li>
                                <li><span className="check">✓</span> Google Maps embed</li>
                                <li><span className="check">✓</span> Basic SEO setup</li>
                                <li><span className="check">✓</span> WhatsApp chat button</li>
                                <li><span className="check">✓</span> Google Analytics</li>
                                <li><span className="check">✓</span> Social media links</li>
                                <li><span className="check">✓</span> 3 rounds of revisions</li>
                                <li><span className="check">✓</span> 30-day post-launch support</li>
                            </ul>
                            <Link to="/contact" className="btn-filled-green">Get Started</Link>
                        </PricingCard>

                        {/* Enterprise */}
                        <PricingCard delay={200}>
                            <h3>Enterprise</h3>
                            <div className="pricing-price">Custom</div>
                            <p className="pricing-subtitle">Tailored solutions for complex needs.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> Unlimited pages</li>
                                <li><span className="check">✓</span> E-commerce / booking system</li>
                                <li><span className="check">✓</span> Custom integrations</li>
                                <li><span className="check">✓</span> Priority support</li>
                                <li><span className="check">✓</span> Monthly maintenance retainer</li>
                                <li><span className="check">✓</span> Dedicated account manager</li>
                            </ul>
                            <Link to="/contact" className="btn-outline-purple">Contact Us</Link>
                        </PricingCard>

                    </div>
                </div>
            </section>

            {/* === FAQ === */}
            <section className="faq-section">
                <div className="container">
                    <div className="faq-inner">
                        <Reveal>
                            <h2>Frequently Asked Questions</h2>
                        </Reveal>
                        {FAQ_DATA.map((item, i) => (
                            <FAQItem
                                key={i}
                                question={item.q}
                                answer={item.a}
                                delay={i * 80}
                            />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}