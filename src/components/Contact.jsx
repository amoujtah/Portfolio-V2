import { motion } from 'framer-motion';
import { FaEnvelope, FaExternalLinkAlt, FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';

const contactLinks = [
  {
    name: 'LinkedIn',
    description: 'Connect with me professionally.',
    url: 'https://www.linkedin.com/in/adam-moujtahid-0416b019a/',
    icon: <FaLinkedin />,
    accent: 'from-[#0A66C2]/28 via-[#0A66C2]/12 to-emerald-400/8',
    iconClass: 'border-[#0A66C2]/45 bg-[#0A66C2]/18 text-[#8fc7ff]',
    actionClass: 'text-[#9fd0ff]',
  },
  {
    name: 'GitHub',
    description: 'Explore my code and security labs.',
    url: 'https://github.com/amoujtah/amoujtah',
    icon: <FaGithub />,
    accent: 'from-white/18 via-slate-400/10 to-emerald-400/8',
    iconClass: 'border-white/25 bg-white/10 text-white',
    actionClass: 'text-slate-100',
  },
  {
    name: 'CV',
    description: 'View or download my resume.',
    url: '/cv.pdf',
    download: 'Moujtahid-Adam-CV.pdf',
    icon: <FaFileAlt />,
    accent: 'from-lime-400/22 via-emerald-400/10 to-cyan-400/8',
    iconClass: 'border-lime-300/40 bg-lime-300/12 text-lime-200',
    actionClass: 'text-lime-100',
  },
  {
    name: 'Email',
    description: 'Send me a message directly.',
    url: 'mailto:moujtahidadamk5@gmail.com',
    icon: <FaEnvelope />,
    accent: 'from-emerald-400/24 via-cyan-400/10 to-white/8',
    iconClass: 'border-emerald-300/40 bg-emerald-300/12 text-emerald-200',
    actionClass: 'text-emerald-100',
    action: 'Send email',
  },
];

const isRealLink = (url) => url && url !== '#';

const Contact = () => {
  return (
    <section className="relative overflow-hidden px-4 py-20 pb-32">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-500/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-cascadia text-sm uppercase tracking-[0.32em] text-emerald-300/75">
            Contact
          </p>
          <h2 className="font-moderniz text-4xl font-bold text-white md:text-6xl">
            GET IN <span className="text-emerald-300">TOUCH</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-cascadia text-base leading-relaxed text-slate-400 md:text-lg">
            Use the links below to reach me, review my work, or open my CV.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactLinks.map((link, index) => {
            const ready = isRealLink(link.url);

            return (
              <motion.a
                key={link.name}
                href={link.url}
                download={link.download}
                target={ready && !link.download ? '_blank' : undefined}
                rel={ready && !link.download ? 'noopener noreferrer' : undefined}
                aria-disabled={!ready}
                onClick={(event) => {
                  if (!ready) event.preventDefault();
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/72 p-6 text-left shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-colors duration-300 hover:border-emerald-300/45"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative z-10 flex h-full min-h-48 flex-col justify-between">
                  <div>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-md border text-3xl transition-transform duration-300 group-hover:scale-105 ${link.iconClass}`}>
                      {link.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{link.name}</h3>
                    <p className="mt-3 font-cascadia text-sm leading-relaxed text-slate-400">
                      {link.description}
                    </p>
                  </div>

                  <div className={`mt-8 flex items-center justify-between border-t border-white/10 pt-4 font-cascadia text-sm ${link.actionClass}`}>
                    <span>{link.action || (link.download ? 'Download CV' : ready ? 'Open link' : 'Link pending')}</span>
                    <FaExternalLinkAlt className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
