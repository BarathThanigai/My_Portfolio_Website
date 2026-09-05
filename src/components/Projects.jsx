import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Sparkles, 
  Search, 
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
  }),
};

const FILTERS = [
  'All',
  'Software Engineering',
  'Data Science',
  'AI/ML',
  'Cybersecurity',
  'Full Stack',
  'DevOps',
  'Computer Vision'
];

function ProjectCard({ project, dark, index, onQuickView }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 overflow-hidden ${
        dark
          ? 'bg-[#0E1017] border-white/10 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/50'
          : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/60'
      }`}
    >
      {/* Subtle cursor spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${
              dark ? 'rgba(99, 102, 241, 0.12)' : 'rgba(99, 102, 241, 0.08)'
            }, transparent 80%)`
          }}
        />
      )}

      <div>
        {/* Top bar: Category + Featured + Action links */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.featured && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                dark ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}>
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
              dark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'
            }`}>
              {project.categories[0]}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onQuickView(project)}
              className={`p-1.5 rounded-lg transition-colors ${
                dark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
              title="Quick view details"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-lg transition-colors ${
                dark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
              }`}
              title="View on GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-lg transition-colors ${
                  dark ? 'hover:bg-white/10 text-indigo-400 hover:text-indigo-300' : 'hover:bg-gray-100 text-indigo-600 hover:text-indigo-700'
                }`}
                title="Live demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(project)}
          className={`text-lg font-bold tracking-tight mb-2.5 transition-colors cursor-pointer ${
            dark ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'
          }`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 ${
          dark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {project.description}
        </p>
      </div>

      {/* Tech stack tags */}
      <div className="pt-4 border-t border-dashed border-gray-200 dark:border-white/10">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className={`px-2 py-0.5 text-[11px] font-mono rounded border ${
                dark 
                  ? 'bg-white/[0.04] text-gray-400 border-white/[0.08]' 
                  : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span
              onClick={() => onQuickView(project)}
              className={`px-2 py-0.5 text-[11px] font-mono rounded border cursor-pointer ${
                dark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              +{project.tech.length - 5} more
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects({ onQuickView }) {
  const { theme } = useTheme();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const dark = theme === 'dark';

  const counts = useMemo(() => {
    const map = { All: projects.length };
    FILTERS.forEach((f) => {
      if (f !== 'All') {
        map[f] = projects.filter((p) => p.categories.includes(f)).length;
      }
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchFilter = filter === 'All' || p.categories.includes(filter);
      if (!matchFilter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTech = p.tech.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchTech;
    });
  }, [filter, search]);

  return (
    <section id="projects" className={`py-28 relative ${dark ? 'bg-[#08090E]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`font-mono text-xs font-semibold tracking-widest uppercase mb-2 ${
                dark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              Selected Work
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              Things I've built
            </motion.h2>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <div className={`relative flex items-center rounded-xl border transition-all ${
              dark ? 'bg-[#0E1017] border-white/10 focus-within:border-indigo-500/50' : 'bg-gray-50 border-gray-200 focus-within:border-indigo-500/50'
            }`}>
              <Search className={`w-4 h-4 ml-3.5 shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm outline-none placeholder-gray-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="mr-3 text-xs text-gray-500">
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {FILTERS.map((f) => {
            const count = counts[f] || 0;
            const isSelected = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 font-mono ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : dark
                      ? 'bg-[#0E1017] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <span>{f}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : dark ? 'bg-white/5 text-gray-500' : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Cards Grid */}
        {filtered.length === 0 ? (
          <div className={`p-16 text-center rounded-2xl border ${
            dark ? 'bg-[#0E1017] border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
          }`}>
            No projects found matching the criteria.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                dark={dark}
                index={i}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

        {/* View all on GitHub */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/BarathThanigai?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:-translate-y-0.5 ${
              dark
                ? 'border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20'
                : 'border-gray-200 text-gray-700 hover:text-gray-950 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <FaGithub className="w-4 h-4" />
            <span>View all projects on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-500" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
