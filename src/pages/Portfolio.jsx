import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { useReveal } from '@/components/site/Reveal';
import { ExternalLink, Calendar, Tag, Layers } from 'lucide-react';

/* ─── PROJECT DATA ──────────────────────────────────────────────────────── */
const PROJECTS = [
    {
        id: 'pressed-in-time',
        name: 'Pressed in Time',
        tagline: 'Laundry & Dry Cleaning — The Wedge, Morningside',
        category: 'Local Business',
        year: '2025',
        accentClass: 'accent-green',
        accentColor: 'var(--green)',
        tags: ['React', 'Vite', 'Tailwind', 'Formspree', 'WhatsApp Integration'],
        liveUrl: null, // replace with real URL when live
        description: `Pressed in Time is an upmarket laundry and dry cleaning franchise located at The Wedge Shopping Centre in Morningside, Sandton. The brief was to create a clean, premium website that reflected their high standards of garment care and converted walk-in and digital traffic into WhatsApp enquiries.`,
        challenge: `The business had no existing web presence. Customers were finding them only through Google Maps, with no way to browse services, check pricing, or get in touch outside of a physical visit. The site needed to feel as polished as the area it serves — Sandton's most affluent suburb.`,
        solution: `A three-page React site was designed and built from scratch: Home, Services & Pricing, and About & Contact. The design palette — deep navy, sky blue, and fresh teal — mirrors the brand's existing logo colours. Real Google reviews were pulled directly into the testimonials section, and a WhatsApp-first contact strategy was baked into every CTA across the site.`,
        features: [
            'Full-screen hero with trust strip and WhatsApp CTA',
            'Interactive service carousel with drag-to-scroll',
            'Complete price list section with real client pricing',
            'Turnaround times comparison table',
            'Google Maps embed for The Wedge location',
            'Formspree-powered contact form (no backend)',
            'Floating WhatsApp button with pulse animation',
            'Delivery options section with e-Hailing callout',
            'Mobile-first responsive design',
            '5-star Google review testimonials',
        ],
        pages: ['Home', 'Services & Pricing', 'About & Contact'],
        mockupColors: ['#1B2B4B', '#3DBCB8', '#1B6CA8'],
    },
];

/* ─── MOCKUP VISUAL ─────────────────────────────────────────────────────── */
function BrowserMockup({ colors, name }) {
    return (
        <div className="portfolio-mockup">
            <div className="mockup-browser-bar">
                <span className="browser-dot red" />
                <span className="browser-dot yellow" />
                <span className="browser-dot green-dot" />
                <span className="browser-url">{name.toLowerCase().replace(/\s+/g, '')}.co.za</span>
            </div>
            <div className="mockup-screen">
                {/* Nav bar sim */}
                <div className="mockup-nav" style={{ background: colors[0] }}>
                    <div className="mockup-nav-logo" />
                    <div className="mockup-nav-links">
                        <div /><div /><div />
                    </div>
                </div>
                {/* Hero sim */}
                <div className="mockup-hero" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[2]})` }}>
                    <div className="mockup-hero-text">
                        <div className="mh-line long" />
                        <div className="mh-line med" />
                        <div className="mh-btn" style={{ background: colors[1] }} />
                    </div>
                </div>
                {/* Cards sim */}
                <div className="mockup-cards">
                    {[0, 1, 2].map(i => (
                        <div key={i} className="mockup-card-block">
                            <div className="mc-icon" style={{ background: colors[i % colors.length] + '33' }} />
                            <div className="mc-line" />
                            <div className="mc-line short" />
                        </div>
                    ))}
                </div>
                {/* Footer sim */}
                <div className="mockup-footer" style={{ background: colors[0] }}>
                    <div className="mf-line" /><div className="mf-line short" />
                </div>
            </div>
        </div>
    );
}

/* ─── PROJECT CARD (grid view) ───────────────────────────────────────────── */
function ProjectCard({ project, onClick }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`portfolio-card reveal ${visible ? 'visible' : ''} ${project.accentClass}`}
            onClick={() => onClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onClick(project)}
            aria-label={`View ${project.name} case study`}
        >
            <div className="portfolio-card-mockup">
                <BrowserMockup colors={project.mockupColors} name={project.name} />
            </div>
            <div className="portfolio-card-body">
                <div className="portfolio-card-meta">
                    <span className="portfolio-tag">{project.category}</span>
                    <span className="portfolio-year">{project.year}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.tagline}</p>
                <div className="portfolio-tech-tags">
                    {project.tags.slice(0, 3).map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                    ))}
                    {project.tags.length > 3 && (
                        <span className="tech-tag muted">+{project.tags.length - 3} more</span>
                    )}
                </div>
                <button className="portfolio-card-cta">View Case Study →</button>
            </div>
        </div>
    );
}

/* ─── CASE STUDY MODAL ───────────────────────────────────────────────────── */
function CaseStudyModal({ project, onClose }) {
    if (!project) return null;
    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.name} case study`}>
            <div className="modal-panel" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                {/* Header */}
                <div className="modal-header" style={{ borderTop: `4px solid ${project.accentColor}` }}>
                    <BrowserMockup colors={project.mockupColors} name={project.name} />
                    <div className="modal-header-text">
                        <div className="modal-meta">
                            <span className="portfolio-tag">{project.category}</span>
                            <span className="portfolio-year"><Calendar size={13} /> {project.year}</span>
                        </div>
                        <h2>{project.name}</h2>
                        <p className="modal-tagline">{project.tagline}</p>
                        <div className="modal-pages">
                            <Layers size={14} />
                            {project.pages.map(p => <span key={p}>{p}</span>)}
                        </div>
                        <div className="portfolio-tech-tags">
                            {project.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                        </div>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-live-btn" style={{ background: project.accentColor }}>
                                <ExternalLink size={15} /> View Live Site
                            </a>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="modal-body">
                    <div className="modal-section">
                        <h4><span style={{ color: project.accentColor }}>01</span> Overview</h4>
                        <p>{project.description}</p>
                    </div>
                    <div className="modal-section">
                        <h4><span style={{ color: project.accentColor }}>02</span> The Challenge</h4>
                        <p>{project.challenge}</p>
                    </div>
                    <div className="modal-section">
                        <h4><span style={{ color: project.accentColor }}>03</span> The Solution</h4>
                        <p>{project.solution}</p>
                    </div>
                    <div className="modal-section">
                        <h4><span style={{ color: project.accentColor }}>04</span> Key Features</h4>
                        <ul className="modal-features">
                            {project.features.map(f => (
                                <li key={f}>
                                    <span className="feature-dot" style={{ background: project.accentColor }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="modal-footer">
                    <p>Interested in a similar project?</p>
                    <Link to="/contact" onClick={onClose} className="modal-contact-btn">Start a Project →</Link>
                </div>
            </div>
        </div>
    );
}

/* ─── PORTFOLIO PAGE ─────────────────────────────────────────────────────── */
export default function Portfolio() {
    const [activeProject, setActiveProject] = useState(null);

    return (
        <>
            {/* Hero */}
            <section className="portfolio-hero">
                <div className="container">
                    <Reveal>
                        <span className="overline" style={{ color: 'var(--green)' }}>Our Work</span>
                        <h1 className="portfolio-hero-title">
                            Built with purpose.<br />
                            <span className="gradient-text">Delivered with care.</span>
                        </h1>
                        <p className="portfolio-hero-sub">
                            Every project here started with a local business owner who needed a real online presence.
                            Here's how we made that happen.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Stats strip */}
            <div className="portfolio-stats-strip">
                <div className="container">
                    {[
                        ['1', 'Client Launched'],
                        ['3', 'Pages Avg. Per Site'],
                        ['100%', 'Mobile Responsive'],
                        ['5★', 'Client Satisfaction'],
                    ].map(([val, lbl]) => (
                        <div key={lbl} className="pstat">
                            <span className="pstat-val">{val}</span>
                            <span className="pstat-lbl">{lbl}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <section className="portfolio-grid-section">
                <div className="container">
                    <Reveal>
                        <div className="portfolio-section-head">
                            <span className="overline" style={{ color: 'var(--orange)' }}>Case Studies</span>
                            <h2>Projects we're proud of.</h2>
                        </div>
                    </Reveal>
                    <div className="portfolio-grid">
                        {PROJECTS.map(p => (
                            <ProjectCard key={p.id} project={p} onClick={setActiveProject} />
                        ))}

                        {/* Coming Soon placeholder */}
                        <div className="portfolio-card coming-soon">
                            <div className="coming-soon-inner">
                                <span className="cs-icon">🚀</span>
                                <h3>Your Business Here</h3>
                                <p>The next case study could be yours. We're actively taking on new clients across Johannesburg.</p>
                                <Link to="/contact" className="portfolio-card-cta">Start a Project →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="portfolio-cta-section">
                <div className="container">
                    <Reveal>
                        <h2>Ready to be on this page?</h2>
                        <p>We build websites for local businesses across Johannesburg. Let's talk about what you need.</p>
                        <div className="portfolio-cta-btns">
                            <Link to="/contact" className="btn-primary-cta">Get a Free Quote</Link>
                            <Link to="/pricing" className="btn-secondary-cta">View Pricing</Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Case Study Modal */}
            {activeProject && (
                <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
        </>
    );
}
