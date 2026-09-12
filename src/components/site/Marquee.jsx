const FEATURES = [
    { label: 'Online Booking', desc: 'Let clients schedule instantly', cls: 'mockup-orange' },
    { label: 'E-Commerce Store', desc: 'Sell products online', cls: 'mockup-green' },
    { label: 'SEO Optimization', desc: 'Get found on Google', cls: 'mockup-purple' },
    { label: 'WhatsApp Integration', desc: 'Chat with customers directly', cls: 'mockup-lime' },
    { label: 'Custom Animations', desc: 'Stand out with motion', cls: 'mockup-orange-alt' },
    { label: 'Analytics Dashboard', desc: 'Track visitors & growth', cls: 'mockup-green-alt' },
];

export default function Marquee() {
    const items = [...FEATURES, ...FEATURES];
    return (
        <div className="marquee-wrapper">
            <div className="marquee-track">
                {items.map((f, i) => (
                    <div key={i} className={`mockup-card ${f.cls}`}>
                        <span className="mockup-label">{f.label}</span>
                        <span className="mockup-desc">{f.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}