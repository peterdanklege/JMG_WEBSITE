import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { useReveal } from '@/components/site/Reveal';

const FAQ_DATA = [
    { q: "How long does it take to build a website?", a: "Depending on the complexity of your website, it normally takes 1 to 2 weeks." },
    { q: "Do I need to provide content and photos?", a: "The more content you provide, the better — that way we can customize your website personally. But we do create certain graphics too." },
    { q: "Will my website work on phones?", a: "Yes, it's designed for any size screen." },
    { q: "Can I update the site myself?", a: "If you are hosting with us, you will have full access to the code and analytics. Changes can then either be done by us or by your company. Without hosting, you own the code, but any changes after the revisions will be your responsibility." },
    { q: "Do you offer payment plans?", a: "We require 20% upfront for development costs. Once development is complete and the code is ready, the rest can be paid. The R200 a month is used to provide hosting." },
    { q: "What if I need changes after launch?", a: "Changes are provided after launch under revisions. If you require more development outside of the original scope, extra features can be quoted." },
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
            className={`faq-item reveal ${visible ? 'visible' : ''} ${open ? 'open' : ''}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            <button className="faq-question" onClick={() => setOpen(!open)}>
                {question}
                <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
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
                    <Reveal delay={150}>
                        <p className="hosting-note">We provide hosting for webpages @ R200 a month. If you already have hosting, we'll help with deployment.</p>
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
                            <div className="pricing-price">R3,000</div>
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
                            <div className="pricing-price">R6,000</div>
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

                        {/* Appear on Google */}
                        <PricingCard delay={300}>
                            <h3>Appear on Google</h3>
                            <div className="pricing-price">R800</div>
                            <p className="pricing-subtitle">Get found by local customers searching online.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> SEO integration</li>
                                <li><span className="check">✓</span> Google Business listing setup</li>
                                <li><span className="check">✓</span> Location & map listing</li>
                                <li><span className="check">✓</span> Business photos uploaded online</li>
                                <li><span className="check">✓</span> Improved local search visibility</li>
                            </ul>
                            <Link to="/contact" className="btn-outline-lime">Get Started</Link>
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