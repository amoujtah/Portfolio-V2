import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CyberCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 620, damping: 34, mass: 0.16 });
  const smoothY = useSpring(y, { stiffness: 620, damping: 34, mass: 0.16 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
      return () => mediaQuery.removeEventListener('change', updateEnabled);
    }

    mediaQuery.addListener(updateEnabled);
    return () => mediaQuery.removeListener(updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add('custom-cursor-enabled');

    const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]';

    const handlePointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
      setIsHovering(Boolean(event.target?.closest?.(interactiveSelector)));
    };

    const handlePointerLeave = () => setIsVisible(false);
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/80 shadow-[0_0_24px_rgba(16,185,129,0.42)] mix-blend-screen"
        style={{ left: smoothX, top: smoothY }}
        animate={{
          width: isHovering ? 48 : 30,
          height: isHovering ? 48 : 30,
          opacity: isVisible ? (isHovering ? 0.9 : 0.68) : 0,
          borderColor: isPressed ? 'rgba(190,242,100,0.95)' : 'rgba(110,231,183,0.82)',
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.9)]"
        style={{ left: x, top: y }}
        animate={{
          width: isPressed ? 10 : isHovering ? 5 : 8,
          height: isPressed ? 10 : isHovering ? 5 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 26 }}
      />
    </>
  );
};

export default CyberCursor;
