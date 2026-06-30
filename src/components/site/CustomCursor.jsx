import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = -100, mouseY = -100;
        let ringX = -100, ringY = -100;
        let rafId;
        let colorIndex = 0;
        const accentColors = ['#FF6B35', '#00D4AA', '#8B5CF6', '#CAFF33'];

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);
        document.addEventListener('mousemove', onMouseMove);

        const onHoverEnter = () => {
            document.body.classList.add('cursor-hover');
            const color = accentColors[colorIndex % accentColors.length];
            ring.style.background = color;
            ring.style.borderColor = color;
            colorIndex++;
        };

        const onHoverLeave = () => {
            document.body.classList.remove('cursor-hover');
            ring.style.background = 'transparent';
            ring.style.borderColor = 'rgba(255,255,255,0.5)';
        };

        const hoverSelector = 'a, button, [role="button"], input[type="submit"], .faq-question, select';

        const bindHover = () => {
            document.querySelectorAll(hoverSelector).forEach(el => {
                if (el.dataset.cursorBound) return;
                el.dataset.cursorBound = 'true';
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
        };

        bindHover();
        const interval = setInterval(bindHover, 2000);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('mousemove', onMouseMove);
            clearInterval(interval);
        };
    }, []);

    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouch) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}