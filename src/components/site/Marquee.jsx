import { BookingArt, StoreArt, SeoArt, ChatArt, MotionArt, AnalyticsArt } from './FeatureArt';

const FEATURES = [
    { label: 'Online Booking', Art: BookingArt, desc: 'Let clients schedule instantly', cls: 'mockup-orange' },
    { label: 'E-Commerce Store', Art: StoreArt, desc: 'Sell products online', cls: 'mockup-green' },
    { label: 'SEO Optimization', Art: SeoArt, desc: 'Get found on Google', cls: 'mockup-purple' },
    { label: 'WhatsApp Integration', Art: ChatArt, desc: 'Chat with customers directly', cls: 'mockup-lime' },
    { label: 'Custom Animations', Art: MotionArt, desc: 'Stand out with motion', cls: 'mockup-orange-alt' },
    { label: 'Analytics Dashboard', Art: AnalyticsArt, desc: 'Track visitors & growth', cls: 'mockup-green-alt' },
];

export default function Marquee() {
    const items = [...FEATURES, ...FEATURES];
    return (
        <div className="marquee-wrapper">
            <div className="marquee-track">
                {items.map((f, i) => (
                    <div key={i} className={`mockup-card ${f.cls}`}>
                        <f.Art />
                        <span className="mockup-label">{f.label}</span>
                        <span className="mockup-desc">{f.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}