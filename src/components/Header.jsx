import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaDownload, FaShieldAlt, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavbar } from '../contexts/NavbarContext';
import { StaggeredMenu } from './StaggeredMenu';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'CV', href: '/cv.pdf', download: 'Moujtahid-Adam-CV.pdf' },
  { label: 'Contact', href: '#contact' },
];

const sectionHashes = navItems
  .filter((item) => item.href.startsWith('#'))
  .map((item) => item.href);

const Header = () => {
  const [activeHash, setActiveHash] = useState(() => (
    typeof window !== 'undefined' && window.location.hash !== '#contact' ? window.location.hash : '#home'
  ));
  const initialRouteHandled = useRef(false);
  const skipInitialContactScroll = useRef(false);
  const { isNavbarVisible, isMenuOpen, setIsMenuOpen } = useNavbar();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialRouteHandled.current) {
      initialRouteHandled.current = true;

      if (location.pathname === '/' && location.hash) {
        skipInitialContactScroll.current = true;
        window.history.replaceState(null, '', '/');
        navigate('/', { replace: true });
        window.scrollTo(0, 0);
        setActiveHash('#home');
        return;
      }
    }

    setActiveHash(location.hash || (location.pathname === '/' ? '#home' : ''));
  }, [location.hash, location.pathname, navigate]);

  useEffect(() => {
    if (skipInitialContactScroll.current) {
      skipInitialContactScroll.current = false;
      window.scrollTo(0, 0);
      return;
    }

    if (location.pathname === '/' && location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname !== '/') return undefined;

    let frameId = null;

    const updateActiveSection = () => {
      const scrollTarget = window.scrollY + window.innerHeight * 0.35;
      const pageBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;

      let currentHash = '#home';
      const sections = sectionHashes
        .map((hash) => ({ hash, section: document.getElementById(hash.slice(1)) }))
        .filter(({ section }) => Boolean(section))
        .sort((a, b) => a.section.offsetTop - b.section.offsetTop);

      sections.forEach(({ hash, section }) => {
        if (section && section.offsetTop <= scrollTarget) {
          currentHash = hash;
        }
      });

      if (pageBottom) {
        currentHash = '#contact';
      }

      setActiveHash((previousHash) => (previousHash === currentHash ? previousHash : currentHash));
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsMenuOpen(false);

    const item = navItems.find((navItem) => navItem.href === href);
    if (item?.download) {
      const link = document.createElement('a');
      link.href = item.href;
      link.download = item.download;
      document.body.appendChild(link);
      link.click();
      link.remove();
      return;
    }

    if (href.startsWith('#')) {
      if (location.pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
          window.dispatchEvent(new Event('hashchange'));
          setActiveHash(href);
        }
      } else {
        navigate(`/${href}`);
      }
      return;
    }

    navigate(href);
  };

  const isActive = (item) => {
    if (item.download) return false;
    if (item.href === '#home') return location.pathname === '/' && (!activeHash || activeHash === '#home');
    return location.pathname === '/' && activeHash === item.href;
  };

  return (
    <>
      <AnimatePresence>
        {isNavbarVisible && (
          <motion.header
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-x-0 top-4 z-50 px-3 pointer-events-none"
          >
            <nav
              className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between rounded-xl border border-emerald-300/25 bg-[#020806]/88 px-3 py-3 shadow-[0_14px_42px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all duration-300 md:px-4 ${
                isMenuOpen ? 'border-emerald-300/35 bg-[#020806]/94' : ''
              }`}
            >
              <a
                href="#home"
                onClick={(event) => handleNavClick(event, '#home')}
                className="group flex min-w-0 items-center gap-3"
                aria-label="Go to home"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-emerald-300/45 bg-emerald-400/10 text-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.2)] transition-transform duration-300 group-hover:scale-105">
                  <FaShieldAlt className="text-lg" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-moderniz text-sm text-white md:text-base">
                    Moujtahid Adam
                  </span>
                  <span className="block font-cascadia text-[10px] uppercase tracking-[0.18em] text-emerald-200/60">
                    Cyber Security
                  </span>
                </span>
              </a>

              <ul className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => {
                  const active = isActive(item);

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        download={item.download}
                        onClick={(event) => handleNavClick(event, item.href)}
                        className={`relative flex items-center gap-2 rounded-lg border px-4 py-2.5 font-cascadia text-sm font-semibold transition-all duration-300 ${
                          active
                            ? 'border-emerald-300/35 bg-emerald-400/14 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                            : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        {item.download && <FaDownload className="text-xs text-emerald-300" />}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-300/35 bg-emerald-400/10 text-emerald-200 transition-colors duration-300 hover:bg-emerald-400/18 md:hidden"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      <StaggeredMenu
        isOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
        items={navItems.map((item) => ({
          label: item.label,
          link: item.href,
          onClick: (event) => handleNavClick(event, item.href),
        }))}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={false}
        colors={['#052e1a', '#10b981', '#84cc16']}
        accentColor="#10b981"
      />
    </>
  );
};

export default Header;
