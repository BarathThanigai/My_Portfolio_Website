import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { HiExternalLink, HiCode, HiStar } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: 'easeOut' } }),
};

const FILTERS = ['All', 'Data Science','AI/ML','Cybersecurity', 'Full Stack', 'DevOps','Computer Vision'];

function ProjectCard({ project, dark, index }) {
  return (
    <motion.article
      variants={fadeUp} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col rounded-xl border p-6 transition-all duration-200 ${
        dark
          ? 'bg-[#111118] border-[#1E1E2A] hover:border-indigo-900/50 hover:shadow-lg hover:shadow-indigo-950/50'
          : 'bg-white border-[#E2E4EB] hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <HiCode size={18} className={dark ? 'text-indigo-400' : 'text-indigo-500'} />
          {project.featured && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold mono ${
              dark ? 'bg-amber-900/25 text-amber-400 border border-amber-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              <HiStar size={10} /> Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a href={project.github} target="_blank" rel="noreferrer"
            className={`p-1.5 rounded-md transition-colors ${dark ? 'hover:bg-white/8 text-gray-500 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'}`}
            aria-label="View source"><SiGithub size={14} /></a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              className={`p-1.5 rounded-md transition-colors ${dark ? 'hover:bg-white/8 text-gray-500 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'}`}
              aria-label="Live demo"><HiExternalLink size={14} /></a>
          )}
        </div>
      </div>
      <h3 className={`text-base font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
      <p className={`text-sm leading-relaxed flex-1 mb-5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(t => (
          <span key={t} className={`px-2 py-0.5 text-[11px] font-medium mono rounded ${
            dark ? 'bg-[#1A1A25] text-gray-400 border border-[#2A2A38]' : 'bg-gray-100 text-gray-500 border border-gray-200'
          }`}>{t}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [filter, setFilter] = useState('All');

  const filtered = projects.filter((p) => {
  if (filter === 'All') return true;
  if (filter === 'Featured') return p.featured;

  return p.categories?.includes(filter);
});

  return (
    <section id="projects" className={`py-24 ${dark ? 'bg-[#0D0D16]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`mono text-xs font-semibold tracking-widest uppercase mb-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Projects
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-8 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Things I've built
        </motion.h2>

        <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 mono ${
                filter === f ? 'bg-indigo-600 text-white'
                  : dark ? 'bg-[#111118] border border-[#1E1E2A] text-gray-400 hover:text-white hover:border-indigo-900/50'
                    : 'bg-white border border-[#E2E4EB] text-gray-500 hover:text-gray-800 hover:border-indigo-200'
              }`}>{f}</button>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => <ProjectCard key={p.id} project={p} dark={dark} index={i} />)}
        </div>

        <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 text-center">
          <a href="https://github.com/BarathThanigai?tab=repositories" target="_blank" rel="noreferrer"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${dark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-800'}`}>
            <SiGithub size={15} /> View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}