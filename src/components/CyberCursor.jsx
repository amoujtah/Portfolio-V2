import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CyberCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 620, damping: 34, mass: 0.16 });
  const smoothY = useSpring(y, { stiffness: 620, damping: 34, mass: 0.16 });
  const trailX = useSpring(x, { stiffness: 150, damping: 22, mass: 0.32 });
  const trailY = useSpring(y, { stiffness: 150, damping: 22, mass: 0.32 });

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
      setIsMoving(true);
      setIsHovering(Boolean(event.target?.closest?.(interactiveSelector)));

      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }

      moveTimeoutRef.current = window.setTimeout(() => {
        setIsMoving(false);
      }, 120);
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsMoving(false);
      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }
    };
    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }
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
        className="pointer-events-none fixed z-[9997] h-14 w-14 -translate-x-[16px] -translate-y-[15px] rounded-full bg-emerald-400/35 blur-xl mix-blend-screen"
        style={{ left: trailX, top: trailY }}
        animate={{
          opacity: isVisible && isMoving ? 0.78 : 0,
          scale: isPressed ? 0.72 : isHovering ? 1.22 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] h-10 w-10 -translate-x-[8px] -translate-y-[7px] rounded-full bg-lime-300/16 blur-md"
        style={{ left: smoothX, top: smoothY }}
        animate={{
          opacity: isVisible && (isHovering || isMoving) ? 0.62 : 0,
          scale: isPressed ? 0.72 : 1,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 25 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] h-8 w-8 -translate-x-[2px] -translate-y-[1px]"
        style={{ left: smoothX, top: smoothY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.9 : isHovering ? 1.08 : 1,
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 28, mass: 0.22 }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_5px_8px_rgba(0,0,0,0.45)]"
        >
          <path
            d="M5.6 3.7L24.9 19.1L16.2 20.2L12.3 28.2L5.6 3.7Z"
            fill="#22c55e"
            stroke="rgba(236,253,245,0.96)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 7.9L21.1 18.1L14.7 18.9L12.3 24L8.2 7.9Z"
            fill="#064e3b"
          />
        </svg>
      </motion.div>
    </>
  );
};

export default CyberCursor;
