import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const SERVICES = [
    { text: 'Frontend', color: '#FF6B35' },
    { text: 'Backend', color: '#00D4AA' },
    { text: 'E-Commerce', color: '#8B5CF6' },
    { text: 'SEO', color: '#CAFF33' },
    { text: 'Branding', color: '#FF6B35' },
    { text: 'Mobile-First', color: '#00D4AA' },
    { text: 'Analytics', color: '#8B5CF6' },
    { text: 'Support', color: '#CAFF33' }
];

export default function PhysicsSection() {
    const wrapRef = useRef(null);

    useEffect(() => {
        const canvasWrap = wrapRef.current;
        if (!canvasWrap) return;

        const { Engine, Render, Runner, Bodies, Composite, Events, Body, Mouse, MouseConstraint } = Matter;

        let width = canvasWrap.clientWidth;
        let height = canvasWrap.clientHeight;

        const engine = Engine.create({ gravity: { x: 0, y: 1 } });

        const render = Render.create({
            element: canvasWrap,
            engine: engine,
            options: {
                width,
                height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: Math.min(window.devicePixelRatio, 2)
            }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const wallOpts = { isStatic: true, render: { visible: false } };
        const walls = [
            Bodies.rectangle(width / 2, height + 30, width + 100, 60, wallOpts),
            Bodies.rectangle(-30, height / 2, 60, height * 2, wallOpts),
            Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOpts),
        ];
        Composite.add(engine.world, walls);

        // Drag interaction (desktop only; touch devices scroll the page)
        let mouse = null;
        let mouseConstraint = { body: null };
        if (!('ontouchstart' in window)) {
            mouse = Mouse.create(render.canvas);
            mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
            mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: { stiffness: 0.2, render: { visible: false } }
            });
            Composite.add(engine.world, mouseConstraint);
            render.mouse = mouse;
        }

        const pillBodies = SERVICES.map((s, i) => {
            const pillW = Math.max(90, s.text.length * 11 + 40);
            const pillH = 44;
            const x = 100 + Math.random() * (width - 200);
            const y = -60 - i * 80;
            const body = Bodies.rectangle(x, y, pillW, pillH, {
                chamfer: { radius: pillH / 2 },
                restitution: 0.4,
                friction: 0.3,
                frictionAir: 0.01,
                render: { fillStyle: s.color },
                plugin: { pillText: s.text, pillColor: s.color }
            });
            Composite.add(engine.world, body);
            return body;
        });

        // Draw text labels on pills
        Events.on(render, 'afterRender', () => {
            const ctx = render.context;
            pillBodies.forEach(body => {
                const p = body.plugin;
                if (!p?.pillText) return;
                ctx.save();
                ctx.translate(body.position.x, body.position.y);
                ctx.rotate(body.angle);
                ctx.font = '600 14px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = p.pillColor === '#CAFF33' ? '#000' : '#fff';
                ctx.fillText(p.pillText, 0, 0);
                ctx.restore();
            });
        });

        // Mouse interaction
        let mousePos = { x: -1000, y: -1000 };

        const onMouseMove = (e) => {
            const rect = canvasWrap.getBoundingClientRect();
            mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onTouchMove = (e) => {
            const rect = canvasWrap.getBoundingClientRect();
            const t = e.touches[0];
            mousePos = { x: t.clientX - rect.left, y: t.clientY - rect.top };
        };
        const onMouseLeave = () => { mousePos = { x: -1000, y: -1000 }; };

        canvasWrap.addEventListener('mousemove', onMouseMove);
        canvasWrap.addEventListener('touchmove', onTouchMove, { passive: true });
        canvasWrap.addEventListener('mouseleave', onMouseLeave);

        Events.on(engine, 'beforeUpdate', () => {
            pillBodies.forEach(body => {
                if (mouseConstraint.body === body) return;
                const dx = body.position.x - mousePos.x;
                const dy = body.position.y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const forceRadius = 180;
                if (dist < forceRadius && dist > 0) {
                    const force = 0.008 * (1 - dist / forceRadius);
                    Body.applyForce(body, body.position, {
                        x: (dx / dist) * force,
                        y: (dy / dist) * force
                    });
                }
                if (body.position.y > height + 100) {
                    Body.setPosition(body, { x: 100 + Math.random() * (width - 200), y: -60 });
                    Body.setVelocity(body, { x: 0, y: 0 });
                    Body.setAngularVelocity(body, 0);
                }
            });
        });

        const onResize = () => {
            width = canvasWrap.clientWidth;
            height = canvasWrap.clientHeight;
            render.canvas.width = width * Math.min(window.devicePixelRatio, 2);
            render.canvas.height = height * Math.min(window.devicePixelRatio, 2);
            render.canvas.style.width = width + 'px';
            render.canvas.style.height = height + 'px';
            render.options.width = width;
            render.options.height = height;
            Body.setPosition(walls[0], { x: width / 2, y: height + 30 });
            Body.setPosition(walls[2], { x: width + 30, y: height / 2 });
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            canvasWrap.removeEventListener('mousemove', onMouseMove);
            canvasWrap.removeEventListener('touchmove', onTouchMove);
            canvasWrap.removeEventListener('mouseleave', onMouseLeave);
            if (mouse) Mouse.clearSourceEvents(mouse);
            Render.stop(render);
            Runner.stop(runner);
            render.canvas.remove();
        };
    }, []);

    return <div className="physics-canvas-wrap" ref={wrapRef}></div>;
}