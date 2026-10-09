import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Reveal, { useReveal } from '@/components/site/Reveal';
import { ExternalLink, Calendar, Layers, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import pressedInTimeImg from '@/assets/portfolio/pressed-in-time.webp';
import swanConstructionsImg from '@/assets/portfolio/swan-constructions.webp';

/* ─── PROJECT DATA ──────────────────────────────────────────────────────── */
/* Newest first. See PROJECT_GUIDE.md ("Adding a new project") for every field. */
const PROJECTS = [
    {
        id: 'swan-constructions',
        name: 'Swan Constructions',
        tagline: 'Residential construction & renovations',
        category: 'Construction',
        year: '2026',
        accentColor: '#C4795A',
        screenshot: swanConstructionsImg,
        screenshotAlt: 'Swan Constructions home page: a dark, editorial hero showing a modern timber and glass home with the headline "Built with care. Built to last."',
        urlLabel: 'swanconstructions.co.za',
        tags: ['React', 'Vite', 'Tailwind', 'Framer Motion', 'FormSubmit', 'SEO'],
        delivered: ['Web Design', 'Development', 'Quote Form', 'Local SEO', 'Legal Pages'],
        liveUrl: null, // replace with the real URL when live
        pageCount: 25,
        highlights: [
            { value: '12', label: 'Project case studies' },
            { value: '5', label: 'Service pages' },
            { value: '25', label: 'Pages in total' },
        ],
        description: `Swan Constructions is a small, owner-led residential builder specialising in new homes, renovations, extensions and repairs. The brief was a website that feels as considered as the craftsmanship behind it — and that turns a visitor into a quote request.`,
        challenge: `In construction, trust is the product. A small firm competing against bigger names needs to show its standard of work before anyone picks up the phone — and make asking for a quote feel effortless on a phone, where most homeowners will first look.`,
        solution: `An editorial, dark-and-warm design built around large photography, a refined serif headline and a terracotta accent. Every service has its own page, every project is a full case study (scope, challenge, solution, result, materials), and a short quote form sits behind clear "Request a Quote" calls to action on every screen. Cookie consent, privacy, terms and cookie-policy pages are built in.`,
        features: [
            'Cinematic full-screen hero with dual calls to action',
            '5 dedicated service pages: New Homes, Renovations, Extensions, Repairs and General Construction',
            '12 project case studies, each on its own page with scope, challenge, solution and result',
            'Materials listed per project to show the quality of finish',
            '"The Swan Process" five-step section that sets expectations',
            'Quote request form with project type, location, budget and preferred contact method',
            'Form delivery via FormSubmit — no backend to maintain',
            'Sticky Call / WhatsApp / Quote bar on mobile',
            'Cookie consent banner plus Privacy, Terms and Cookie Policy pages',
            'Structured data (GeneralContractor), sitemap, robots.txt and social share tags',
            'Smooth page and scroll animations with Framer Motion',
            'Fully responsive, from phone to ultrawide',
        ],
        pages: ['Home', 'About', 'Services', 'Projects', 'Contact & Quote', 'Legal'],
        mockupColors: ['#1A1A1A', '#B47B5E', '#2F3A2C'],
    },
    {
        id: 'pressed-in-time',
        name: 'Pressed in Time',
        tagline: 'Laundry & Dry Cleaning — The Wedge, Morningside',
        category: 'Local Business',
        year: '2025',
        accentColor: '#44AADD',
        screenshot: pressedInTimeImg,
        screenshotAlt: 'Pressed in Time home page: steam rising from a pressed white shirt behind the headline "Pressed in time. The Wedge."',
        urlLabel: 'pressedintime.co.za',
        tags: ['React', 'Vite', 'Tailwind', 'WhatsApp Integration', 'Google Maps', 'Google Ads Tracking'],
        delivered: ['Web Design', 'Development', 'WhatsApp Funnel', 'Price List', 'Conversion Tracking'],
        liveUrl: null, // replace with the real URL when live
        pageCount: 3,
        highlights: [
            { value: '3', label: 'Pages' },
            { value: '9', label: 'Services with pricing' },
            { value: '1 tap', label: 'To WhatsApp, on every page' },
        ],
        description: `Pressed in Time is an upmarket laundry and dry cleaning franchise at The Wedge Shopping Centre in Morningside, Sandton. The brief was a clean, premium website that reflected their standard of garment care and converted walk-in and online traffic into WhatsApp enquiries.`,
        challenge: `Customers were finding the store through Google Maps, with no way to browse services, check pricing or get in touch outside of a physical visit. The site needed to feel as polished as the area it serves, and make enquiring as easy as sending a message.`,
        solution: `A three-page React site built around a WhatsApp-first journey. Services carry transparent starting prices, each with a pre-filled WhatsApp quote message, and a full price list can be browsed by category or downloaded as a PDF. A delivery section, turnaround table, real Google reviews and an embedded map answer the questions customers ask before they message. WhatsApp clicks are tracked as conversions for Google Ads.`,
        features: [
            'Full-screen photographic hero with trust strip and WhatsApp call to action',
            'Collection-area checker that routes straight into WhatsApp',
            'Service carousel and a 9-service pricing grid with starting prices',
            'Pre-filled WhatsApp quote message for each service',
            'Full price list with category tabs, plus a downloadable PDF',
            'Turnaround comparison table (standard vs. express)',
            '"We come to you" delivery and collection section with a four-step flow',
            'Real Google review testimonials linking to the Google listing',
            'Opening hours and an embedded Google Map',
            'FAQ accordion answering the common pre-visit questions',
            'Floating WhatsApp button and a WhatsApp button in the nav',
            'Google Ads conversion tracking on WhatsApp clicks',
            'Mobile-first responsive design',
        ],
        pages: ['Home', 'Services & Pricing', 'About & Contact'],
        mockupColors: ['#1D3369', '#44AADD', '#A3C4DB'],
    },
];

/* ─── BROWSER FRAME (real screenshot, falls back to the CSS mockup) ─────── */
function BrowserMockup({ colors, name }) {
    return (
        <div className="mockup-screen">
            <div className="mockup-nav" style={{ background: colors[0] }}>
                <div className="mockup-nav-logo" />
                <div className="mockup-nav-links"><div /><div /><div /></div>
            </div>
            <div className="mockup-hero" style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[2]})` }}>
                <div className="mockup-hero-text">
                    <div className="mh-line long" />
                    <div className="mh-line med" />
                    <div className="mh-btn" style={{ background: colors[1] }} />
                </div>
            </div>
            <div className="mockup-cards">
                {[0, 1, 2].map(i => (
                    <div key={i} className="mockup-card-block">
                        <div className="mc-icon" style={{ background: colors[i % colors.length] + '33' }} />
                        <div className="mc-line" />
                        <div className="mc-line short" />
                    </div>
                ))}
            </div>
            <div className="mockup-footer" style={{ background: colors[0] }}>
                <div className="mf-line" /><div className="mf-line short" />
            </div>
        </div>
    );
}

function BrowserFrame({ project, priority = false }) {
    const url = project.liveUrl
        ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
        : (project.urlLabel || project.name.toLowerCase().replace(/\s+/g, '') + '.co.za');
    return (
        <div className="portfolio-mockup">
            <div className="mockup-browser-bar">
                <span className="browser-dot red" />
                <span className="browser-dot yellow" />
                <span className="browser-dot green-dot" />
                <span className="browser-url">{url}</span>
            </div>
            {project.screenshot ? (
                <div className="portfolio-shot">
                    <img
                        src={project.screenshot}
                        alt={project.screenshotAlt || `${project.name} website`}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                        width="1400"
                        height="700"
                    />
                </div>
            ) : (
                <BrowserMockup colors={project.mockupColors} name={project.name} />
            )}
        </div>
    );
}

/* ─── PROJECT CARD (grid view) ───────────────────────────────────────────── */
function ProjectCard({ project, onClick, index }) {
    const { ref, visible } = useReveal();
    return (
        <div
            ref={ref}
            className={`portfolio-card reveal ${visible ? 'visible' : ''}`}
            style={{ '--accent': project.accentColor, transitionDelay: `${index * 80}ms` }}
            onClick={() => onClick(project)}
            role="button"
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onClick(project))}
            aria-label={`View ${project.name} case study`}
        >
            <div className="portfolio-card-mockup">
                <BrowserFrame project={project} priority={index === 0} />
                <span className="portfolio-card-hover" aria-hidden="true">
                    View case study <ArrowUpRight size={16} />
                </span>
            </div>
            <div className="portfolio-card-body">
                <div className="portfolio-card-meta">
                    <span className="portfolio-tag" style={{ color: project.accentColor, background: project.accentColor + '1A' }}>{project.category}</span>
                    <span className="portfolio-year">{project.year}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.tagline}</p>
                <div className="portfolio-metrics">
                    {project.highlights.map(h => (
                        <div key={h.label}>
                            <strong style={{ color: project.accentColor }}>{h.value}</strong>
                            <span>{h.label}</span>
                        </div>
                    ))}
                </div>
                <div className="portfolio-tech-tags">
                    {project.tags.slice(0, 4).map(t => (
                        <span key={t} className="tech-tag">{t}</span>
                    ))}
                    {project.tags.length > 4 && (
                        <span className="tech-tag muted">+{project.tags.length - 4} more</span>
                    )}
                </div>
                <span className="portfolio-card-cta" style={{ color: project.accentColor }}>View Case Study →</span>
            </div>
        </div>
    );
}

/* ─── CASE STUDY MODAL ───────────────────────────────────────────────────── */
function CaseStudyModal({ project, onClose, onPrev, onNext }) {
    // Esc closes, arrow keys switch project, and the page behind stops scrolling.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
            if (e.key === 'ArrowRight' && onNext) onNext();
        };
        window.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose, onPrev, onNext]);

    if (!project) return null;
    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.name} case study`}>
            <div className="modal-panel" onClick={e => e.stopPropagation()} style={{ '--accent': project.accentColor }}>
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                {/* Header */}
                <div className="modal-header" style={{ borderTop: `4px solid ${project.accentColor}` }}>
                    <BrowserFrame project={project} priority />
                    <div className="modal-header-text">
                        <div className="modal-meta">
                            <span className="portfolio-tag" style={{ color: project.accentColor, background: project.accentColor + '1A' }}>{project.category}</span>
                            <span className="portfolio-year"><Calendar size={13} /> {project.year}</span>
                        </div>
                        <h2>{project.name}</h2>
                        <p className="modal-tagline">{project.tagline}</p>
                        <div className="modal-pages">
                            <Layers size={14} />
                            {project.pages.map(p => <span key={p}>{p}</span>)}
                        </div>
                        <div className="modal-delivered">
                            <span className="modal-delivered-label">What we delivered</span>
                            <div className="portfolio-tech-tags">
                                {project.delivered.map(t => <span key={t} className="tech-tag delivered" style={{ borderColor: project.accentColor + '66', color: project.accentColor }}>{t}</span>)}
                            </div>
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

                {/* Highlights */}
                <div className="modal-highlights">
                    {project.highlights.map(h => (
                        <div key={h.label}>
                            <strong style={{ color: project.accentColor }}>{h.value}</strong>
                            <span>{h.label}</span>
                        </div>
                    ))}
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
                    <div className="modal-nav">
                        {onPrev && <button onClick={onPrev} aria-label="Previous project"><ChevronLeft size={16} /> Prev</button>}
                        {onNext && <button onClick={onNext} aria-label="Next project">Next <ChevronRight size={16} /></button>}
                    </div>
                    <p>Interested in a similar project?</p>
                    <Link to="/contact" onClick={onClose} className="modal-contact-btn">Start a Project →</Link>
                </div>
            </div>
        </div>
    );
}

/* ─── PORTFOLIO PAGE ─────────────────────────────────────────────────────── */
export default function Portfolio() {
    const [activeId, setActiveId] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = useMemo(() => ['All', ...new Set(PROJECTS.map(p => p.category))], []);
    const visible = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

    // Stats are calculated from PROJECTS, so they update themselves as you add work.
    const stats = [
        [String(PROJECTS.length), PROJECTS.length === 1 ? 'Client Launched' : 'Clients Launched'],
        [String(PROJECTS.reduce((n, p) => n + p.pageCount, 0)), 'Pages Built'],
        [String(new Set(PROJECTS.map(p => p.category)).size), 'Industries Served'],
        ['100%', 'Mobile Responsive'],
    ];

    const activeIndex = PROJECTS.findIndex(p => p.id === activeId);
    const active = activeIndex >= 0 ? PROJECTS[activeIndex] : null;
    const close = () => setActiveId(null);
    const prev = activeIndex > 0 ? () => setActiveId(PROJECTS[activeIndex - 1].id) : null;
    const next = activeIndex >= 0 && activeIndex < PROJECTS.length - 1 ? () => setActiveId(PROJECTS[activeIndex + 1].id) : null;

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
                    {stats.map(([val, lbl]) => (
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
                            {categories.length > 2 && (
                                <div className="portfolio-filters" role="tablist" aria-label="Filter projects by industry">
                                    {categories.map(c => (
                                        <button
                                            key={c}
                                            role="tab"
                                            aria-selected={filter === c}
                                            className={`portfolio-filter ${filter === c ? 'active' : ''}`}
                                            onClick={() => setFilter(c)}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Reveal>
                    <div className="portfolio-grid">
                        {visible.map((p, i) => (
                            <ProjectCard key={p.id} project={p} index={i} onClick={() => setActiveId(p.id)} />
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
            {active && (
                <CaseStudyModal project={active} onClose={close} onPrev={prev} onNext={next} />
            )}
        </>
    );
}
