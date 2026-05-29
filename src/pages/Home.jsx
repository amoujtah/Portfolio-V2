import React from 'react';
import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaCertificate, FaCode, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaLock, FaShieldAlt, FaTerminal } from 'react-icons/fa';
import { AnimatedGradientTextDemo } from '../components/AnimatedGradientTextDemo';
import GradientText from '../components/GradientText';
import TextGenerateEffect from "../components/text-generate-effect";
import Skills from '../components/Skills';
import Lanyard from '../components/Lanyard/Lanyard';
import { VelocityScroll } from '../components/VelocityScroll';
import { ButtonMovingBorder } from '../components/MovingBorderButton';
import ProjectSection, { portfolioCertificateCount, portfolioProjectCount } from '../components/ProjectSection';
import Contact from '../components/Contact';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
    const { theme } = useTheme();

    const stats = [
        { icon: <FaCode />, value: "3rd", title: "YEAR AT EMSI", description: "Computer engineering student" },
        { icon: <FaCertificate />, value: "4th", title: "CYBERSECURITY TRACK", description: "Preparing my specialization" },
        { icon: <FaGlobe />, value: "SOC", title: "SECURITY FOCUS", description: "Detection, analysis and hardening" },
    ];

    const portfolioCounters = [
        { icon: <FaBriefcase />, value: portfolioProjectCount, label: "Projects", href: "#projects" },
        { icon: <FaCertificate />, value: portfolioCertificateCount, label: "Certificates", href: "#certificates" },
    ];

    const socialLinks = [
        {
            icon: <FaLinkedin />,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/adam-moujtahid-0416b019a/",
        },
        {
            icon: <FaGithub />,
            label: "GitHub",
            href: "https://github.com/amoujtah/amoujtah",
        },
        {
            icon: <FaEnvelope />,
            label: "Email",
            href: "mailto:moujtahidadamk5@gmail.com",
        },
    ];

    const handleSmoothSectionClick = (event, targetHash) => {
        event.preventDefault();
        const target = document.querySelector(targetHash);

        if (!target) return;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', targetHash);
        window.dispatchEvent(new Event('hashchange'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-8 max-w-7xl mx-auto"
        >
            <section id="home" className="flex flex-col md:flex-row items-center gap-10 pt-20 pb-16 lg:pt-0 lg:pb-20">
                <div className="flex-1 space-y-6 pt-16 md:pt-40 order-last md:order-none text-center md:text-left flex flex-col items-center md:items-start text-white">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}>
                        <AnimatedGradientTextDemo />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
                        className="text-4xl md:text-4xl font-moderniz font-bold leading-tight select-none main-heading"
                        style={{
                            color: theme === 'dark' ? "#34d399" : "#34d399",
                            textShadow: theme === 'dark'
                                ? "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.55)"
                                : "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.55)"
                        }}
                    >
                        CYBER SECURITY
                        <span style={{ display: 'block', marginTop: '0.4em' }}>PORTFOLIO</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}>
                        <GradientText colors={["#34d399", "#84cc16", "#10b981", "#bbf7d0", "#22c55e"]} animationSpeed={3} className="custom-class font-cascadia font-bold" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}>
                        <TextGenerateEffect words={"Third-year EMSI computer engineering student preparing to specialize in cybersecurity in my fourth year."} />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.62, ease: "easeOut" }}
                        className="flex flex-wrap justify-center gap-3 md:justify-start"
                    >
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex h-12 items-center gap-3 rounded-md border border-emerald-400/25 bg-black/40 px-4 font-cascadia text-sm font-semibold text-emerald-100 backdrop-blur-md transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10 hover:text-white hover:shadow-[0_0_22px_rgba(16,185,129,0.18)]"
                            >
                                <span className="text-lg text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                                    {link.icon}
                                </span>
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}>
                        <Skills />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }} className="flex flex-row flex-wrap gap-3 mt-8 justify-center md:justify-start">
                        {[
                            { icon: <FaShieldAlt />, label: 'Defense' },
                            { icon: <FaTerminal />, label: 'Linux' },
                            { icon: <FaLock />, label: 'Web Sec' },
                        ].map((item) => (
                            <div key={item.label} className="flex h-12 items-center gap-2 rounded-md border border-emerald-400/25 bg-black/35 px-4 text-sm font-semibold text-emerald-100 transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10">
                                <span className="text-emerald-300">{item.icon}</span>
                                {item.label}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
                        className="mt-2 flex w-full max-w-lg flex-wrap justify-center gap-3 md:justify-start"
                    >
                        {portfolioCounters.map((counter) => (
                            <a
                                key={counter.label}
                                href={counter.href}
                                onClick={(event) => handleSmoothSectionClick(event, counter.href)}
                                className="group flex min-w-40 items-center gap-3 rounded-md border border-emerald-400/18 bg-black/35 px-4 py-3 text-left backdrop-blur-md transition-all duration-300 hover:border-emerald-300/55 hover:bg-emerald-400/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.16)]"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-emerald-300/20 bg-emerald-400/8 text-emerald-300 transition-transform duration-300 group-hover:scale-105">
                                    {counter.icon}
                                </span>
                                <span>
                                    <span className="block font-moderniz text-2xl text-white">{String(counter.value).padStart(2, '0')}</span>
                                    <span className="block font-cascadia text-[10px] uppercase tracking-[0.16em] text-emerald-200/65">{counter.label}</span>
                                </span>
                            </a>
                        ))}
                    </motion.div>
                </div>

                <div className="flex flex-1 justify-center w-full order-first lg:order-none pt-12 lg:pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="relative flex h-[700px] w-full max-w-[780px] justify-center overflow-visible sm:h-[760px] lg:h-[800px]"
                    >
                        <div className="pointer-events-none absolute inset-x-0 top-14 h-[480px] rounded-full bg-emerald-400/12 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-10 left-1/2 h-40 w-4/5 -translate-x-1/2 rounded-full bg-black/65 blur-2xl" />
                        <Lanyard
                            className="relative z-10 h-full"
                            position={[0, 0, 20]}
                            gravity={[0, -34, 0]}
                            fov={18}
                            cardScale={3.2}
                        />
                    </motion.div>
                </div>
            </section>

            <section
                id="about"
                className="py-12 md:py-18 gap-0 w-full mx-0 pt-20"
                style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}
            >
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-center">
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-20">
                        <VelocityScroll defaultVelocity={3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#34d399" : "#34d399", textShadow: "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.45)", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: 'none', opacity: 1 }}>
                                CYBER <span style={{ color: "#fff" }}>PROFILE</span>
                            </span>
                        </VelocityScroll>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#020403]"></div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#020403]"></div>
                        <VelocityScroll defaultVelocity={-3} numRows={1} className="max-w-full">
                            <span className="font-moderniz font-bold" style={{ fontSize: "2.5rem", lineHeight: "1.1", color: theme === 'dark' ? "#34d399" : "#34d399", textShadow: "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.45)", background: "none", WebkitBackgroundClip: "unset", WebkitTextFillColor: "unset", filter: 'none', opacity: 1 }}>
                                CYBER <span style={{ color: "#fff" }}>PROFILE</span>
                            </span>
                        </VelocityScroll>
                    </div>
                    <p className="text-lg text-emerald-100/75 mt-2 font-cascadia px-1 mb-20">
                        Ethical hacking, network defense, and secure web foundations.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="text-white text-center md:text-left px-4 md:px-8 transition-all duration-700 md:w-2/3"
                    >
                        <p className="text-2xl text-emerald-200 font-moderniz my" style={{ textShadow: "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.45)" }}>Hello, I'm</p>
                        <h3 className="text-4xl font-bold text-white my-2 font-moderniz" style={{ textShadow: "2px 2px 0 #03140d, 4px 4px 0 #0f3f27, 0 4px 16px rgba(16,185,129,0.45)" }}>Moujtahid Adam</h3>
                        <p className="text-slate-300 leading-relaxed mt-4 font-cascadia text-justify">
                            I am a third-year EMSI computer engineering student building strong foundations in networking, Linux, web security, defensive practices, and risk analysis as I prepare for a fourth-year cybersecurity path.
                        </p>
                        <div className="my-6 bg-black/45 border-l-4 border-emerald-400 p-4 rounded-r-lg italic text-emerald-100/80 font-cascadia">
                            "Secure by design, curious by practice."
                        </div>
                        <div className="flex flex-row sm:flex-row gap-4 mt-8 justify-center md:justify-start items-center">
                            <ButtonMovingBorder as="a" href="#contact" onClick={(event) => handleSmoothSectionClick(event, '#contact')} duration={3000} borderRadius="0.75rem" className="bg-[#020806]/90 border border-emerald-400/25 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_24px_8px_rgba(16,185,129,0.25)]">
                                <FaEnvelope /> Contact Me
                            </ButtonMovingBorder>
                            <ButtonMovingBorder as="a" href="#projects" onClick={(event) => handleSmoothSectionClick(event, '#projects')} duration={3000} borderRadius="0.75rem" className="bg-[#020806]/90 border border-emerald-400/25 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_0_24px_8px_rgba(16,185,129,0.25)]">
                                <FaBriefcase /> View Labs
                            </ButtonMovingBorder>
                        </div>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10 px-4 md:px-0">
                    {stats.map((stat, index) => (
                        <div key={index} className="group relative p-6 rounded-lg bg-black/45 border border-emerald-400/20 transition-all duration-300 hover:border-emerald-300/60 hover:shadow-[0_0_24px_0px_rgba(16,185,129,0.28)] cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <div className="p-3 mb-4 rounded-md bg-emerald-400/5 border border-emerald-400/20 w-max group-hover:bg-emerald-400/10 group-hover:border-emerald-300/50 transition-all duration-300">
                                        <div className="text-2xl text-slate-400 group-hover:text-emerald-300 transition-colors duration-300">{stat.icon}</div>
                                    </div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 group-hover:text-emerald-200 transition-colors duration-300">{stat.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-5xl font-bold text-white transition-all duration-300 group-hover:text-emerald-300">{stat.value}</p>
                                    <FaArrowRight className="text-slate-400 mt-auto group-hover:text-emerald-400 transition-all duration-300 -rotate-45" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </section>

            <section id="projects" className="md:py-18">
                <ProjectSection />
            </section>

            <section id="contact" className="py-20 pb-16">
                <Contact />
            </section>

            <footer className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden border-t border-emerald-400/15 bg-[#020806]/92 px-6 py-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />

                <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center justify-center gap-4 md:justify-start">
                        <span className="flex h-12 w-12 items-center justify-center rounded-md border border-emerald-300/35 bg-emerald-400/10 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.16)]">
                            <FaShieldAlt />
                        </span>
                        <div className="text-center md:text-left">
                            <p className="font-moderniz text-lg text-white">Moujtahid Adam</p>
                            <p className="mt-1 font-cascadia text-xs uppercase tracking-[0.2em] text-emerald-200/60">
                                Future Cyber Security
                            </p>
                        </div>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-3 font-cascadia text-sm text-slate-300">
                        {[
                            { label: 'Home', href: '#home' },
                            { label: 'Projects', href: '#projects' },
                            { label: 'About', href: '#about' },
                            { label: 'Contact', href: '#contact' },
                        ].map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(event) => handleSmoothSectionClick(event, link.href)}
                                className="rounded-md border border-transparent px-3 py-2 transition-colors duration-300 hover:border-emerald-300/25 hover:bg-emerald-400/10 hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center justify-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="flex h-11 w-11 items-center justify-center rounded-md border border-emerald-400/20 bg-black/35 text-lg text-emerald-200 transition-all duration-300 hover:border-emerald-300/60 hover:bg-emerald-400/10 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.18)]"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 font-cascadia text-xs text-slate-500 md:flex-row">
                    <span>© {new Date().getFullYear()} Moujtahid Adam. All rights reserved.</span>
                    <span>Built with React, Tailwind CSS, and Framer Motion.</span>
                </div>
            </footer>
        </motion.div>
    );
};

export default Home;
