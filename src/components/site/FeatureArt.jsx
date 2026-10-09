/*
 * Illustrated graphics for the "Features we can build into your site" carousel.
 * Pure inline SVG (no image files, no network requests). They draw in white /
 * translucent shapes so they sit on top of whichever brand-colour gradient the
 * card uses. Each is drawn in a 280 x 120 box.
 */
const DARK = 'rgba(20,20,31,0.55)';

const Svg = ({ children }) => (
    <svg
        className="mockup-art"
        viewBox="0 0 280 120"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
    >
        {children}
    </svg>
);

export function BookingArt() {
    return (
        <Svg>
            {/* calendar */}
            <rect x="70" y="10" width="120" height="104" rx="12" fill="#fff" opacity="0.95" />
            <path d="M70 22a12 12 0 0 1 12-12h96a12 12 0 0 1 12 12v14H70z" fill={DARK} />
            <rect x="92" y="4" width="6" height="14" rx="3" fill="#fff" />
            <rect x="162" y="4" width="6" height="14" rx="3" fill="#fff" />
            {[0, 1, 2, 3].map(r =>
                [0, 1, 2, 3, 4].map(c => {
                    const sel = r === 1 && c === 3;
                    return sel ? (
                        <g key={`${r}${c}`}>
                            <circle cx={88 + c * 21} cy={52 + r * 17} r="9" fill={DARK} />
                            <path d={`M${83.5 + c * 21} ${52 + r * 17}l3.2 3.4 6-6.6`} stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                    ) : (
                        <circle key={`${r}${c}`} cx={88 + c * 21} cy={52 + r * 17} r="3" fill={DARK} opacity="0.35" />
                    );
                })
            )}
            {/* time chip */}
            <g className="art-float">
                <rect x="182" y="64" width="72" height="30" rx="15" fill="#fff" />
                <circle cx="199" cy="79" r="8" fill="none" stroke={DARK} strokeWidth="2" />
                <path d="M199 74v5l3.5 2" stroke={DARK} strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="212" y="75" width="32" height="4" rx="2" fill={DARK} opacity="0.5" />
                <rect x="212" y="82" width="22" height="3" rx="1.5" fill={DARK} opacity="0.3" />
            </g>
        </Svg>
    );
}

export function StoreArt() {
    return (
        <Svg>
            {/* product card */}
            <rect x="52" y="14" width="96" height="100" rx="12" fill="#fff" opacity="0.95" />
            <rect x="62" y="24" width="76" height="46" rx="8" fill={DARK} opacity="0.25" />
            <path d="M80 62l14-18 12 14 8-8 12 12z" fill={DARK} opacity="0.5" />
            <circle cx="120" cy="38" r="5" fill="#fff" />
            <rect x="62" y="78" width="54" height="5" rx="2.5" fill={DARK} opacity="0.5" />
            <rect x="62" y="88" width="34" height="4" rx="2" fill={DARK} opacity="0.25" />
            <rect x="62" y="98" width="40" height="10" rx="5" fill={DARK} />
            {/* cart */}
            <g className="art-float">
                <circle cx="198" cy="60" r="42" fill="#fff" opacity="0.18" />
                <path d="M170 38h12l8 32h32l7-24h-46" fill="#fff" stroke="#fff" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                <circle cx="196" cy="84" r="6" fill="#fff" />
                <circle cx="224" cy="84" r="6" fill="#fff" />
                <circle cx="228" cy="34" r="12" fill={DARK} />
                <text x="228" y="39" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="sans-serif">R</text>
            </g>
        </Svg>
    );
}

export function SeoArt() {
    return (
        <Svg>
            {/* browser + search bar */}
            <rect x="40" y="10" width="200" height="100" rx="12" fill="#fff" opacity="0.95" />
            <circle cx="56" cy="24" r="3.5" fill={DARK} opacity="0.4" />
            <circle cx="68" cy="24" r="3.5" fill={DARK} opacity="0.4" />
            <circle cx="80" cy="24" r="3.5" fill={DARK} opacity="0.4" />
            <rect x="54" y="36" width="172" height="20" rx="10" fill={DARK} opacity="0.12" />
            <circle cx="68" cy="46" r="5" fill="none" stroke={DARK} strokeWidth="2" />
            <path d="M72 50l4 4" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
            <rect x="84" y="43" width="60" height="6" rx="3" fill={DARK} opacity="0.4" />
            {/* result #1 highlighted */}
            <rect x="54" y="64" width="172" height="20" rx="6" fill={DARK} opacity="0.85" />
            <rect x="62" y="70" width="80" height="4" rx="2" fill="#fff" />
            <rect x="62" y="77" width="110" height="3" rx="1.5" fill="#fff" opacity="0.6" />
            <rect x="54" y="90" width="172" height="5" rx="2.5" fill={DARK} opacity="0.2" />
            <rect x="54" y="99" width="130" height="5" rx="2.5" fill={DARK} opacity="0.15" />
            {/* rank badge */}
            <g className="art-float">
                <circle cx="224" cy="72" r="16" fill="#fff" />
                <text x="224" y="78" textAnchor="middle" fontSize="16" fontWeight="800" fill={DARK} fontFamily="sans-serif">#1</text>
            </g>
        </Svg>
    );
}

export function ChatArt() {
    return (
        <Svg>
            {/* phone */}
            <rect x="96" y="4" width="88" height="124" rx="16" fill="#fff" opacity="0.95" />
            <rect x="130" y="9" width="20" height="4" rx="2" fill={DARK} opacity="0.3" />
            <rect x="96" y="20" width="88" height="22" fill={DARK} opacity="0.8" />
            <circle cx="110" cy="31" r="6" fill="#fff" />
            <rect x="121" y="26" width="38" height="4" rx="2" fill="#fff" />
            <rect x="121" y="33" width="24" height="3" rx="1.5" fill="#fff" opacity="0.6" />
            {/* bubbles */}
            <rect x="104" y="50" width="52" height="16" rx="8" fill={DARK} opacity="0.18" />
            <rect x="124" y="72" width="52" height="16" rx="8" fill={DARK} opacity="0.7" />
            <rect x="104" y="94" width="40" height="16" rx="8" fill={DARK} opacity="0.18" />
            {/* floating chat bubble */}
            <g className="art-float">
                <path d="M196 20h50a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10h-30l-12 11v-11h-8a10 10 0 0 1-10-10V30a10 10 0 0 1 10-10z" fill="#fff" />
                <circle cx="209" cy="41" r="3.5" fill={DARK} />
                <circle cx="222" cy="41" r="3.5" fill={DARK} />
                <circle cx="235" cy="41" r="3.5" fill={DARK} />
            </g>
        </Svg>
    );
}

export function MotionArt() {
    return (
        <Svg>
            {/* motion trail */}
            <circle cx="70" cy="70" r="14" fill="#fff" opacity="0.2" />
            <circle cx="100" cy="58" r="18" fill="#fff" opacity="0.35" />
            <circle cx="136" cy="48" r="22" fill="#fff" opacity="0.6" />
            <path d="M40 92Q110 20 180 54" stroke="#fff" strokeWidth="2.5" fill="none" strokeDasharray="2 7" strokeLinecap="round" />
            {/* rotating card */}
            <g className="art-float">
                <rect x="170" y="30" width="64" height="56" rx="10" fill="#fff" transform="rotate(10 202 58)" />
                <rect x="180" y="42" width="38" height="5" rx="2.5" fill={DARK} transform="rotate(10 202 58)" opacity="0.7" />
                <rect x="180" y="54" width="28" height="4" rx="2" fill={DARK} transform="rotate(10 202 58)" opacity="0.35" />
                <rect x="180" y="68" width="24" height="9" rx="4.5" fill={DARK} transform="rotate(10 202 58)" />
            </g>
            {/* sparkles */}
            <path d="M52 30l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#fff" />
            <path d="M248 22l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" opacity="0.9" />
            <path d="M236 98l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" opacity="0.7" />
        </Svg>
    );
}

export function AnalyticsArt() {
    return (
        <Svg>
            <rect x="40" y="10" width="200" height="104" rx="12" fill="#fff" opacity="0.95" />
            {/* bars */}
            {[28, 44, 36, 58, 52, 74].map((h, i) => (
                <rect key={i} x={58 + i * 20} y={100 - h} width="12" height={h} rx="3" fill={DARK} opacity={0.25 + i * 0.1} />
            ))}
            {/* trend line */}
            <polyline points="64,76 84,60 104,68 124,46 144,52 164,32" fill="none" stroke={DARK} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="164" cy="32" r="5" fill="#fff" stroke={DARK} strokeWidth="2.5" />
            {/* KPI */}
            <g className="art-float">
                <rect x="186" y="26" width="64" height="40" rx="10" fill={DARK} />
                <rect x="195" y="34" width="26" height="4" rx="2" fill="#fff" opacity="0.6" />
                <text x="195" y="57" fontSize="16" fontWeight="800" fill="#fff" fontFamily="sans-serif">+128%</text>
            </g>
            <path d="M200 90l8-8 6 6 12-14" stroke={DARK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M224 74h6v6" stroke={DARK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}
