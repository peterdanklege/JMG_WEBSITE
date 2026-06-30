const MOCKUPS = [
    { label: 'Kaya Salon', cls: 'mockup-orange' },
    { label: 'Mzansi Eats', cls: 'mockup-green' },
    { label: 'FixIt Plumbing', cls: 'mockup-purple' },
    { label: 'Vibe Studio', cls: 'mockup-lime' },
    { label: 'Fresh Greens Co.', cls: 'mockup-orange-alt' },
    { label: 'Peak Fitness', cls: 'mockup-green-alt' },
];

export default function Marquee() {
    const items = [...MOCKUPS, ...MOCKUPS];
    return (
        <div className="marquee-wrapper">
            <div className="marquee-track">
                {items.map((m, i) => (
                    <div key={i} className={`mockup-card ${m.cls}`}>
                        <span className="mockup-label">{m.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}