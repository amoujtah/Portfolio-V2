// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaFigma, FaGithub, FaTimes, FaDownload,
  FaJava, FaLinux, FaNetworkWired, FaPython, FaServer, FaShieldAlt
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiC, SiCplusplus, SiExpress, SiPostgresql, SiDjango, SiPhp, SiSymfony, SiMysql, SiSqlite
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';
import alxProfessionalFoundationsImage from '../assets/Certificate/89-professional-foundations-certificate-adam-moujtahid.png';
import alxFreelancerAcademyImage from '../assets/Certificate/certificate-097e7ae8-3886-4993-a681-64f011494f00.png';
import alxAiCareerEssentialsImage from '../assets/Certificate/certificate-ee1ee6fb-17c8-440e-b652-61e624d968fc (1).png';
import courseraHpwuPdf from '../assets/Certificate/Coursera HPWU0O90Y50P (2).pdf';
import courseraQccvPdf from '../assets/Certificate/Coursera QCCV6LBXHB8F.pdf';
import courseraUpabaPdf from '../assets/Certificate/Coursera UPABAEK5THX5 (1).pdf';

const PROJECT_IMAGE_FOLDER = '/images/projects/';
const CERTIFICATE_IMAGE_FOLDER = '/images/certificates/';
const FALLBACK_PROJECT_IMAGE = `${PROJECT_IMAGE_FOLDER}project-placeholder.svg`;
const FALLBACK_CERTIFICATE_IMAGE = `${CERTIFICATE_IMAGE_FOLDER}certificate-placeholder.svg`;

// Static portfolio projects. Put matching screenshots in public/images/projects/.
export const portfolioProjects = [
  {
    title: "To Do List Web Portal",
    description: "Full-stack portal built around a Django REST API and a React frontend, with a structured dashboard foundation and database-ready architecture.",
    tech: ["Django", "DRF", "React", "JavaScript", "SQLite", "PostgreSQL"],
    link: "#",
    github: "https://github.com/amoujtah/To_Do_list",
    image: `${PROJECT_IMAGE_FOLDER}to-do-list.svg`,
    category: "Full Stack",
    featured: true,
  },
  {
    title: "Portail Absence",
    description: "React and Django absence portal for managing academic or internal attendance workflows with a clear frontend-backend split.",
    tech: ["Django", "React", "JavaScript", "SQLite"],
    link: "#",
    github: "https://github.com/amoujtah/Portail-Absence",
    image: `${PROJECT_IMAGE_FOLDER}portail-absence.svg`,
    category: "Full Stack",
  },
  {
    title: "Gaming E-commerce Store",
    description: "Responsive e-commerce interface for gaming products with product sections, cart interactions, account access and a polished storefront layout.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "#",
    github: "https://github.com/amoujtah/E-commerce",
    image: `${PROJECT_IMAGE_FOLDER}e-commerce.svg`,
    category: "Frontend",
  },
  {
    title: "RestauManager",
    description: "Symfony restaurant management application for tables, orders, reservations, menu items, staff roles and operational reporting.",
    tech: ["PHP", "Symfony", "MySQL"],
    link: "#",
    github: "https://github.com/amoujtah/Projet-php",
    image: `${PROJECT_IMAGE_FOLDER}restaumanager.svg`,
    category: "Backend",
    featured: true,
  },
  {
    title: "Cybsera Admin Dashboard",
    description: "Admin dashboard UI with customer, order, product and supplier screens, theme controls, language selector and sales analytics widgets.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    demo: "https://project-java-git-main-adams-projects-5700549a.vercel.app?_vercel_share=gAX5IVT2WGRFFKhFsvVcdo7JO6Nrj2AX",
    link: "https://project-java-git-main-adams-projects-5700549a.vercel.app?_vercel_share=gAX5IVT2WGRFFKhFsvVcdo7JO6Nrj2AX",
    github: "https://github.com/amoujtah/Project_java",
    image: `${PROJECT_IMAGE_FOLDER}cybsera-dashboard.svg`,
    category: "Frontend",
  },
  {
    title: "Management Event",
    description: "Django event management platform for events, participants, registrations, admin workflows and REST API endpoints.",
    tech: ["Python", "Django", "DRF", "SQLite", "MySQL"],
    link: "#",
    github: "https://github.com/amoujtah/Management-Event",
    image: `${PROJECT_IMAGE_FOLDER}management-event.svg`,
    category: "Backend",
  },
];

// Add certificate entries here when you want local fallback certificates.
// Images should live in public/images/certificates/.
export const userCertificates = [
  {
    title: "Professional Development Skills for the Digital Age",
    issuer: "ALX Professional Foundations",
    date: "Sep 2025",
    link: "https://savanna.alxafrica.com/certificates/BH8e235nEF",
    image: alxProfessionalFoundationsImage,
  },
  {
    title: "Freelancer Academy",
    issuer: "ALX",
    date: "May 2026",
    link: "https://ehub.alxafrica.com/ob3/verify-certificate/097e7ae8-3886-4993-a681-64f011494f00",
    image: alxFreelancerAcademyImage,
  },
  {
    title: "AI Career Essentials",
    issuer: "ALX",
    date: "May 2026",
    link: "https://ehub.alxafrica.com/ob3/verify-certificate/ee1ee6fb-17c8-440e-b652-61e624d968fc",
    image: alxAiCareerEssentialsImage,
  },
  {
    title: "Coursera Certificate HPWU0O90Y50P",
    issuer: "Coursera",
    date: "May 2026",
    link: courseraHpwuPdf,
    fileType: "pdf",
  },
  {
    title: "Coursera Certificate QCCV6LBXHB8F",
    issuer: "Coursera",
    date: "May 2026",
    link: courseraQccvPdf,
    fileType: "pdf",
  },
  {
    title: "Coursera Certificate UPABAEK5THX5",
    issuer: "Coursera",
    date: "May 2026",
    link: courseraUpabaPdf,
    fileType: "pdf",
  },
];

export const portfolioProjectCount = portfolioProjects.length;
export const portfolioCertificateCount = userCertificates.length;

const techStack = {
  languages: [
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "Java", icon: <FaJava className="text-[#f89820]" /> },
    { name: "C", icon: <SiC className="text-[#A8B9CC]" /> },
    { name: "C++", icon: <SiCplusplus className="text-[#6295CB]" /> },
  ],
  security: [
    { name: "Networking", icon: <FaNetworkWired className="text-emerald-400" /> },
    { name: "Linux", icon: <FaLinux className="text-lime-300" /> },
    { name: "OWASP", icon: <FaShieldAlt className="text-emerald-300" /> },
  ],
  web: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Express", icon: <SiExpress className="text-white" /> },
    { name: "Django", icon: <SiDjango className="text-[#44B78B]" /> },
    { name: "Symfony", icon: <SiSymfony className="text-white" /> },
    { name: "PHP", icon: <SiPhp className="text-[#777BB4]" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "SQLite", icon: <SiSqlite className="text-[#003B57]" /> },
  ],
  tools: [
    { name: "Git & GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
  ],
};

const normalizeTech = (tech) => {
  if (Array.isArray(tech)) return tech.filter(Boolean);
  if (typeof tech === 'string') {
    return tech.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

const projectImage = (project) => project?.image || FALLBACK_PROJECT_IMAGE;
const certificateImage = (certificate) => certificate?.image || FALLBACK_CERTIFICATE_IMAGE;

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#10b981", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  const hasImage = Boolean(cert.image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.96 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" } }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden dark:shadow-lg shadow-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          {hasImage ? (
            <img
              src={certificateImage(cert)}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_CERTIFICATE_IMAGE;
              }}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_top,#064e3b_0%,#020806_62%)] p-8 text-center transition-transform duration-700 group-hover:scale-105">
              <div className="flex h-20 w-20 items-center justify-center rounded-md border border-emerald-300/30 bg-emerald-400/10 text-4xl text-emerald-200">
                <FaDownload />
              </div>
              <div>
                <p className="font-moderniz text-lg text-white">PDF</p>
                <p className="mt-2 font-cascadia text-xs uppercase tracking-[0.2em] text-emerald-200/70">Certificate</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-emerald-500/20 backdrop-blur-md p-2 rounded-full border border-emerald-400/30">
                  <FaExternalLinkAlt className="text-emerald-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/0 via-transparent to-lime-500/0 group-hover:from-emerald-500/10 group-hover:to-lime-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL PROYEK
// ===================================
const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const demoLink = project.demo || project.link;
  const sourceLink = project.github;
  const hasDemo = demoLink && demoLink !== '#';
  const hasSource = sourceLink && sourceLink !== '#';
  const tech = normalizeTech(project.tech);

  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": "FM", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "JWT", "Figma": <FaFigma />, "Storybook": "SB",
    "JavaScript": <FaJsSquare />, "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />,
    "Linux": <FaLinux />, "Python": <FaPython />, "Networking": <FaNetworkWired />,
    "Firewall": <FaShieldAlt />, "OWASP": <FaShieldAlt />, "SOC": <FaServer />,
    "Documentation": <PiCodeBold />, "Defense": <FaShieldAlt />,
    "PostgreSQL": <SiPostgresql />, "Vercel": <SiVercel />, "Git & GitHub": <FaGithub />,
    "Django": <SiDjango />, "DRF": "DRF", "PHP": <SiPhp />, "Symfony": <SiSymfony />,
    "MySQL": <SiMysql />, "SQLite": <SiSqlite />
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-5xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-3 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-y-auto custom-scrollbar">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <img
              src={projectImage(project)}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_PROJECT_IMAGE;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t, i) => (
                  <span key={i} className="flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {techIcons?.[t]} {t}
                  </span>
                ))}
              </div>

              <h2 className="text-3xl font-bold dark:text-white text-slate-900 mb-4 leading-tight">{project.title}</h2>
              <p className="dark:text-slate-300 text-slate-600 leading-relaxed mb-6 text-lg">{project.description}</p>

              {project.featured && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
                  <span className="text-yellow-400">⭐ Featured Project</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-white/10">
              {hasDemo && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}

              {hasSource && (
                <a
                  href={sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 dark:bg-slate-800 bg-slate-700 dark:hover:bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl dark:border-slate-700 border-slate-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaGithub className="text-xl" />
                  <span>Source Code</span>
                </a>
              )}

              {!hasDemo && !hasSource && (
                <div className="w-full rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-6 py-4 text-center font-cascadia text-sm text-emerald-100/80">
                  Links will be added soon.
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project, onClick }) => {
  const tech = normalizeTech(project.tech);
  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": "FM", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "JWT", "Figma": <FaFigma />, "Storybook": "SB",
    "Linux": <FaLinux />, "Python": <FaPython />, "Networking": <FaNetworkWired />,
    "Firewall": <FaShieldAlt />, "OWASP": <FaShieldAlt />, "SOC": <FaServer />,
    "Documentation": <PiCodeBold />, "Defense": <FaShieldAlt />,
    "Django": <SiDjango />, "DRF": "DRF", "PHP": <SiPhp />, "Symfony": <SiSymfony />,
    "PostgreSQL": <SiPostgresql />, "MySQL": <SiMysql />, "SQLite": <SiSqlite />
  };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.97 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" } }}
      type="button"
      onClick={() => onClick(project)}
      className="group relative h-64 sm:h-72 w-full overflow-hidden rounded-lg text-left shadow-lg outline-none transition-shadow duration-500 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-emerald-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020403] dark:shadow-none dark:hover:shadow-emerald-500/30"
      aria-label={`View details for ${project.title}`}
      data-cursor="interactive"
    >
      <img
        src={projectImage(project)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(event) => {
          event.currentTarget.src = FALLBACK_PROJECT_IMAGE;
        }}
      />
      <div className="absolute inset-0 dark:bg-black/60 bg-slate-900/70 dark:group-hover:bg-black/40 group-hover:bg-slate-900/50 transition-colors duration-500"></div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-100 transition-opacity duration-300">
        <div className="translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">{project.title}</h3>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
              <FaExternalLinkAlt className="text-white" />
            </div>
          </div>
          <p className="text-slate-200 dark:text-slate-300 mt-2 text-sm line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">{project.description}</p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 3).map((t, i) => {
              const icon = techIcons?.[t];

              return (
                <span key={i} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/20 backdrop-blur-sm">
                  {icon && <span className="text-sm leading-none">{icon}</span>}
                  <span>{t}</span>
                </span>
              );
            })}
            {tech.length > 3 && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                +{tech.length - 3}
              </span>
            )}
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-300/25 bg-black/35 px-3 py-2 font-cascadia text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Open details
            <FaExternalLinkAlt className="text-[10px]" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg border border-white/10 group-hover:border-emerald-400/50 transition-colors duration-300 pointer-events-none"></div>
    </motion.button>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const certificateLink = certificate.link || '#';
  const isPdf = certificate.fileType === 'pdf' || certificateLink.toLowerCase().includes('.pdf');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full dark:bg-slate-900/90 bg-white/95 backdrop-blur-xl rounded-3xl border dark:border-white/10 border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="dark:bg-black/40 bg-slate-200/80 hover:bg-red-500/20 backdrop-blur-md p-2 rounded-full dark:border-white/10 border-slate-300 hover:border-red-500/30 transition-all duration-300 group">
            <FaTimes className="dark:text-white/70 text-slate-600 group-hover:text-red-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-3/5 relative min-h-[300px] md:min-h-[500px] bg-slate-900">
          {isPdf ? (
            <iframe
              src={certificateLink}
              title={certificate.title}
              className="absolute inset-0 h-full w-full bg-slate-950/50"
            />
          ) : (
            <img
              src={certificateImage(certificate)}
              alt={certificate.title}
              className="absolute inset-0 w-full h-full object-contain p-4 bg-slate-950/50"
              onError={(event) => {
                event.currentTarget.src = FALLBACK_CERTIFICATE_IMAGE;
              }}
            />
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-center dark:bg-slate-900/50 bg-white">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider mb-4">
              {certificate.issuer}
            </div>
            <h2 className="text-2xl font-bold dark:text-white text-slate-900 mb-2 leading-tight">{certificate.title}</h2>
            <p className="text-slate-400 font-mono text-sm">{certificate.date}</p>
          </div>

          <div className="space-y-4 mt-auto">
            <a
              href={certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 group"
            >
              <FaDownload className="group-hover:animate-bounce" />
              <span>{isPdf ? 'Open / Download PDF' : 'Open Certificate'}</span>
            </a>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 dark:bg-slate-800 bg-slate-200 dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-300 text-slate-700 font-semibold rounded-xl transition-all duration-300"
            >
              Close Preview
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [previewProject, setPreviewProject] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();

  const [supabaseProjects, setSupabaseProjects] = useState([]);
  const [supabaseCertificates, setSupabaseCertificates] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      if (!supabase) {
        setLoadingProjects(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setSupabaseProjects(data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      if (!supabase) {
        setLoadingCerts(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setSupabaseCertificates(data);
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    // Hide navbar when any modal is open
    if (previewCertificate || previewProject) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, previewProject, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  useEffect(() => {
    const syncTabWithHash = () => {
      if (window.location.hash === '#certificates') {
        setActiveTab('Certificates');
      } else if (window.location.hash === '#projects') {
        setActiveTab('Projects');
      }
    };

    syncTabWithHash();
    window.addEventListener('hashchange', syncTabWithHash);

    return () => {
      window.removeEventListener('hashchange', syncTabWithHash);
    };
  }, []);

  // Keep the GitHub portfolio projects visible even when Supabase also has data.
  const activeProjects = [...supabaseProjects, ...portfolioProjects];

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title || 'Untitled Project',
        description: p.description || 'Project details will be added soon.',
        tech: normalizeTech(p.tags),
        demo: p.demo_url || '#',
        link: p.demo_url || '#',
        github: p.github_url || '#',
        image: p.image_url || FALLBACK_PROJECT_IMAGE,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return {
      ...p,
      tech: normalizeTech(p.tech),
      demo: p.demo || p.link || '#',
      github: p.github || '#',
      image: p.image || FALLBACK_PROJECT_IMAGE,
    };
  });

  const uniqueProjects = transformedProjects.filter((project, index, list) => {
    const key = project.github && project.github !== '#' ? project.github : project.title;
    return index === list.findIndex((item) => {
      const itemKey = item.github && item.github !== '#' ? item.github : item.title;
      return itemKey === key;
    });
  });

  // Keep local certificates visible even when Supabase also has data.
  const activeCertificates = [...supabaseCertificates, ...userCertificates];

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Certificates', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };

  return (
    <section id="project" className="py-20">
      <div id="certificates" className="scroll-mt-28" />

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span className="text-emerald-300"><LineShadowText shadowColor="#10b981">SELECTED</LineShadowText></span>
          {' '}
          <span className="text-white"><LineShadowText shadowColor="#bbbbbb">WORK</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-lg p-2 shadow-lg border border-emerald-400/20 bg-gradient-to-r from-[#020806] via-[#03140d] to-[#062415] backdrop-blur-md"
            style={{ boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.14)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-md font-semibold text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-emerald-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 bg-gradient-to-br from-[#052e1a] to-[#020806] rounded-md border border-emerald-400/20"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-lg p-0 md:p-6 shadow-xl border border-emerald-400/15 mx-auto max-w-7xl bg-clip-padding bg-black/35"
          style={{ boxShadow: "0 8px 32px 0 rgba(16, 185, 129, 0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 26, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -18, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Projects' && (
                <>
                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {uniqueProjects.length > 0 ? (
                        uniqueProjects.map((p, i) => (
                          <ProjectCard
                            key={p.id || i}
                            project={p}
                            onClick={setPreviewProject}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center text-slate-400 py-12">
                          No projects available yet.
                          {supabaseProjects.length === 0 && (
                            <div className="mt-4 text-sm text-emerald-400">
                              Projects will be updated here soon.
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </>
              )}
              {activeTab === 'Certificates' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto flex max-w-6xl flex-col gap-2 rounded-lg border border-emerald-400/15 bg-emerald-400/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="font-moderniz text-2xl text-white">Certificates</h3>
                          <p className="mt-1 font-cascadia text-sm text-slate-400">All certificates currently added to the portfolio.</p>
                        </div>
                      </div>
                      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                            // Transform DB data to match CertificateCard props
                            const certData = cert.id ? {
                              // From database (has UUID id)
                              title: cert.title,
                              issuer: cert.issuer,
                              date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                              link: cert.credential_url || '#',
                              image: cert.image_url || null,
                              fileType: cert.credential_url?.toLowerCase?.().includes('.pdf') ? 'pdf' : 'link',
                            } : cert; // From static data

                            return <CertificateCard key={cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                          })}
                        </AnimatePresence>
                      </motion.div>
                      {activeCertificates.length === 0 && (
                        <div className="text-center text-slate-400 py-12">
                          Certificates will be added soon.
                        </div>
                      )}
                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === 'Tech Stack' && (
                <div className="mx-auto max-w-5xl space-y-10">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="mb-5 border-b-2 border-emerald-400/20 pb-2 text-xl font-bold capitalize text-emerald-300">{category}</h3>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" style={{ perspective: '1200px' }}>
                        {techs.map((tech, i) => (
                          <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, y: 24, rotateX: -18 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.48, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ y: -10, rotateX: 10, rotateY: -8, scale: 1.04 }}
                            className="group relative min-h-36 overflow-hidden rounded-lg border border-emerald-400/15 bg-[#020806]/80 p-[1px] shadow-[0_18px_42px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:border-emerald-300/45"
                            style={{ transformStyle: 'preserve-3d' }}
                          >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.22),transparent_45%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative flex h-full min-h-36 flex-col items-center justify-center gap-4 rounded-lg bg-gradient-to-br from-slate-950/92 via-[#06130d]/92 to-black/92 p-5 text-center">
                              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/55 to-transparent" />
                              <div className="flex h-16 w-16 items-center justify-center rounded-md border border-emerald-300/20 bg-black/35 text-4xl shadow-[inset_0_1px_18px_rgba(16,185,129,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
                                {tech.icon}
                              </div>
                              <p className="font-cascadia text-sm font-semibold text-slate-300 transition-colors duration-300 group-hover:text-white">{tech.name}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
        {/* ✨ Project Detail Modal */}
        {previewProject && (
          <ProjectDetailModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;
