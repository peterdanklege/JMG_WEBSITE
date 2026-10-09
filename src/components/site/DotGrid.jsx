import { useEffect, useRef } from 'react';

/*
 * Cursor-reactive dot grid: a fixed, site-wide background (mounted in Layout.jsx).
 *
 * - Dots swell and shift through the brand colours near the cursor, and
 *   leave a fading trail (per-dot "energy" eases back down).
 * - Moving the pointer leaves ripples; clicking/tapping sends a big one.
 * - A faint ambient wave keeps the grid alive when nobody is touching it.
 *
 * Performance: it pauses when the tab is hidden, idles at ~30fps when nothing is lit, caps devicePixelRatio at 2, listens passively, and renders one
 * static frame (no animation) for people who prefer reduced motion.
 */
const PALETTE = [
    [255, 107, 53],  // orange
    [0, 212, 170],   // green
    [139, 92, 246],  // purple
    [202, 255, 51],  // lime
];

const lerp = (a, b, t) => a + (b - a) * t;

function paletteColor(t) {
    const n = PALETTE.length;
    const p = ((t % 1) + 1) % 1 * n;
    const i = Math.floor(p);
    const f = p - i;
    const a = PALETTE[i % n];
    const b = PALETTE[(i + 1) % n];
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
}

export default function DotGrid() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // With reduced motion we keep the hover glow (it's user-triggered) but drop
        // the ambient wave, ripples and welcome animation.
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let w = 0, h = 0, dpr = 1;
        let cols = 0, rows = 0, gap = 28, offX = 0, offY = 0;
        let energy = new Float32Array(0);
        let rafId = 0;
        let running = false;
        let lastDraw = 0;
        let busy = false;

        const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false, lastRipple: 0, lx: 0, ly: 0 };
        const ripples = []; // { x, y, t, power }

        const resize = () => {
            w = window.innerWidth; h = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            gap = w < 640 ? 24 : 30;
            cols = Math.ceil(w / gap) + 1;
            rows = Math.ceil(h / gap) + 1;
            offX = (w - (cols - 1) * gap) / 2;
            offY = (h - (rows - 1) * gap) / 2;
            energy = new Float32Array(cols * rows);
            if (!running) draw(performance.now());
        };

        const addRipple = (x, y, power) => {
            if (calm) return;
            ripples.push({ x, y, t: performance.now(), power });
            if (ripples.length > 8) ripples.shift();
        };

        const toLocal = (e) => {
            return { x: e.clientX, y: e.clientY, inside: true };
        };

        const onMove = (e) => {
            const p = toLocal(e);
            if (!p.inside) { pointer.active = false; return; }
            pointer.active = true;
            pointer.x = p.x; pointer.y = p.y;
            if (pointer.sx < -9000) { pointer.sx = p.x; pointer.sy = p.y; }
            // drop a ripple every ~70px of travel
            const dx = p.x - pointer.lx, dy = p.y - pointer.ly;
            if (dx * dx + dy * dy > 70 * 70) {
                pointer.lx = p.x; pointer.ly = p.y;
                addRipple(p.x, p.y, 0.55);
            }
            if (!running) start();
        };
        const onDown = (e) => {
            const p = toLocal(e);
            if (!p.inside) return;
            addRipple(p.x, p.y, 1);
            if (!running) start();
        };
        const onLeave = () => { pointer.active = false; };

        const draw = (now) => {
            ctx.clearRect(0, 0, w, h);
            // ease the smoothed pointer toward the real one
            if (pointer.active) {
                pointer.sx += (pointer.x - pointer.sx) * 0.2;
                pointer.sy += (pointer.y - pointer.sy) * 0.2;
            }
            const R = 220;            // pointer influence radius
            const R2 = R * R;
            const time = now * 0.001;
            // drop dead ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                if (now - ripples[i].t > 1600) ripples.splice(i, 1);
            }
            let anyActive = pointer.active || ripples.length > 0;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = r * cols + c;
                    const x = offX + c * gap;
                    const y = offY + r * gap;

                    // target energy (0..1)
                    let target = 0;
                    let hue = 0;
                    if (pointer.active) {
                        const dx = x - pointer.sx, dy = y - pointer.sy;
                        const d2 = dx * dx + dy * dy;
                        if (d2 < R2) {
                            const d = Math.sqrt(d2);
                            const f = 1 - d / R;
                            target = f * f;
                            hue = time * 0.12 + d / 420;
                        }
                    }
                    for (let k = 0; k < ripples.length; k++) {
                        const rp = ripples[k];
                        const age = (now - rp.t) / 1000;
                        const ringR = age * 340;
                        const dx = x - rp.x, dy = y - rp.y;
                        const d = Math.sqrt(dx * dx + dy * dy);
                        const band = Math.abs(d - ringR);
                        if (band < 46) {
                            const fall = Math.max(0, 1 - age / 1.6);
                            const v = (1 - band / 46) * fall * rp.power;
                            if (v > target) { target = v; hue = time * 0.12 + d / 380; }
                        }
                    }
                    const e = energy[idx] += (target - energy[idx]) * (target > energy[idx] ? 0.35 : 0.08);
                    if (e > 0.02) anyActive = true;

                    // ambient wave (very subtle)
                    const wave = calm ? 0 : (Math.sin(x * 0.012 + y * 0.009 + time * 1.1) + 1) * 0.5;
                    const radius = 1.15 + wave * 0.55 + e * 5.2;

                    if (e > 0.02) {
                        const [cr, cg, cb] = paletteColor(hue + idx * 0.0003);
                        // soft halo so lit dots read as glowing
                        if (e > 0.12) {
                            ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${Math.min(0.28, e * 0.3)})`;
                            ctx.beginPath();
                            ctx.arc(x, y, radius * 2.3, 0, 6.2832);
                            ctx.fill();
                        }
                        const a = Math.min(1, 0.45 + e * 0.9);
                        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${a})`;
                    } else {
                        ctx.fillStyle = `rgba(255,255,255,${0.1 + wave * 0.08})`;
                    }
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 6.2832);
                    ctx.fill();
                }
            }
            return anyActive;
        };

        const loop = (now) => {
            if (!running) return;
            rafId = requestAnimationFrame(loop);
            // idle (nothing lit): redraw at ~30fps to save battery
            if (!busy && now - lastDraw < 33) return;
            lastDraw = now;
            busy = draw(now);
            // reduced motion + nothing lit: stop until the pointer moves again
            if (calm && !busy) stop();
        };
        const start = () => {
            if (running || document.hidden) return;
            running = true;
            rafId = requestAnimationFrame(loop);
        };
        const stop = () => {
            running = false;
            cancelAnimationFrame(rafId);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);

        const onVisibility = () => { if (document.hidden) stop(); else start(); };
        document.addEventListener('visibilitychange', onVisibility);

        // Listen on window: page content sits above the canvas, so the
        // canvas itself never receives pointer events.
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        // a little welcome ripple so the effect is discoverable
        const welcome = setTimeout(() => { addRipple(w / 2, h * 0.4, 0.9); start(); }, 600);
        start();

        return () => {
            stop();
            clearTimeout(welcome);
            ro.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            document.removeEventListener('pointerleave', onLeave);
        };
    }, []);

    return <canvas ref={canvasRef} className="site-dotgrid" />;
}
