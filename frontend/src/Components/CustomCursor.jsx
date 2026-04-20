import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring    = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef  = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    // Animate ring with lag
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      dot.style.transform  = `translate(calc(${pos.current.x}px - 50%), calc(${pos.current.y}px - 50%))`;
      rng.style.transform  = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e) => {
      const target = e.target;
      if (
        target.matches('a, button, [role="button"], input, select, textarea, label, .cursor-pointer')
      ) {
        document.body.classList.add('cursor-hover');
      }
    };

    const onLeave = () => document.body.classList.remove('cursor-hover');

    const onDown = () => {
      document.body.classList.add('cursor-click');
      setTimeout(() => document.body.classList.remove('cursor-click'), 150);
    };

    const onMouseOut = (e) => {
      if (!e.relatedTarget) setVisible(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        id="cursor-dot"
        ref={dotRef}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        id="cursor-ring"
        ref={ringRef}
        style={{ opacity: visible ? 0.6 : 0 }}
      />
    </>
  );
}
