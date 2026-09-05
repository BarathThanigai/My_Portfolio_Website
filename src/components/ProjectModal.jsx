import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Tag } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function ProjectModal({ project, onClose }) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col ${
            dark 
              ? 'bg-[#0F1118] border-white/10 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          {/* Header */}
          <div className={`flex items-start justify-between p-6 border-b ${dark ? 'border-white/10' : 'border-gray-100'}`}>
            <div className="space-y-1.5 pr-6">
              <div className="flex flex-wrap items-center gap-2">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                      dark
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {cat}
                  </span>
                ))}
                {project.featured && (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                    dark 
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                dark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div>
              <h3 className={`text-xs font-mono font-semibold uppercase tracking-wider mb-2 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                Overview & Architecture
              </h3>
              <p className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className={`w-4 h-4 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <h3 className={`text-xs font-mono font-semibold uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Technologies & Frameworks
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 text-xs font-mono rounded-lg border transition-colors ${
                      dark
                        ? 'bg-white/5 border-white/10 text-gray-300 hover:border-indigo-500/40 hover:text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-indigo-300 hover:text-indigo-700'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className={`p-6 border-t flex flex-wrap items-center justify-end gap-3 ${
            dark ? 'border-white/10 bg-white/[0.02]' : 'border-gray-100 bg-gray-50'
          }`}>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/15 text-white hover:bg-white/10'
                  : 'border-gray-300 text-gray-800 hover:bg-white'
              }`}
            >
              <FaGithub className="w-4 h-4" />
              View Source Code
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
