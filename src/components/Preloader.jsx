import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Terminal } from 'lucide-react';

const Preloader = ({ onFinished }) => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = "adam.moujtahid@emsi:~$ init_security_profile";

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (showContent) {
      if (typedText.length < fullText.length) {
        const typingTimer = setTimeout(() => {
          setTypedText(fullText.slice(0, typedText.length + 1));
        }, 120);
        return () => clearTimeout(typingTimer);
      } else if (typedText.length === fullText.length) {
        const exitTimer = setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinished, 1000);
        }, 900);
        return () => clearTimeout(exitTimer);
      }
    }
  }, [typedText, showContent, fullText, onFinished]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          exit={{
            opacity: 0,
            filter: 'blur(10px)',
            transition: { duration: 1, ease: 'easeInOut' }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020403] text-white"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-500/15 to-transparent" />
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="relative z-10 w-full max-w-2xl p-4 text-center"
            >
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_42px_rgba(16,185,129,0.35)]">
                <Shield className="h-12 w-12 text-emerald-300" />
              </div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } }}
                className="mb-4 font-moderniz text-4xl font-bold text-emerald-300 md:text-6xl"
              >
                Moujtahid Adam
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
                className="mb-8 break-all rounded-lg border border-emerald-400/25 bg-black/50 px-4 py-3 font-cascadia text-sm text-emerald-200 md:text-lg"
              >
                <span>{typedText}</span>
                <span className="animate-blink">|</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.8 } }}
                className="grid grid-cols-3 gap-3 font-cascadia text-xs uppercase tracking-[0.18em] text-slate-300"
              >
                <div className="rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <Terminal className="mx-auto mb-2 text-emerald-300" />
                  EMSI
                </div>
                <div className="rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <Lock className="mx-auto mb-2 text-emerald-300" />
                  3rd Year
                </div>
                <div className="rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3">
                  <Shield className="mx-auto mb-2 text-emerald-300" />
                  Cyber
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
