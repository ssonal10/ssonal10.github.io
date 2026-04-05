import { useEffect, useState } from 'react';

export function Spotlight() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-[background] duration-300 ease-out"
      style={{
        background: `radial-gradient(640px circle at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.09), transparent 70%)`,
      }}
    />
  );
}
