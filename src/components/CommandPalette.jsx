import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mail, 
  Moon, 
  Sun, 
  FolderGit2, 
  Briefcase, 
  Sparkles, 
  Code2, 
  Download
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { projects } from '../data/projects';
import { downloadPortfolioZip } from '../utils/downloadZip';

export default function CommandPalette({ isOpen, onClose, onSelectProject }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggle } = useTheme();
  const { showToast } = useToast();
  const dark = theme === 'dark';

  const defaultActions = useMemo(() => [
    {
      id: 'section-about',
      title: 'Navigate to About',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'section-projects',
      title: 'Explore Projects (9 projects)',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'section-experience',
      title: 'View Experience & Patent',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'section-skills',
      title: 'View Skills & Tech Stack',
      category: 'Navigation',
      icon: Code2,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'section-contact',
      title: 'Contact & Hire Barath',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'action-resume',
      title: 'Download Resume (PDF)',
      category: 'Actions',
      icon: Download,
      action: () => {
        const link = document.createElement('a');
        link.href = '/Barath T - Resume.pdf';
        link.download = 'Barath T - Resume.pdf';
        link.click();
        showToast('Resume download started!');
        onClose();
      }
    },
    {
      id: 'action-email',
      title: 'Copy Email Address (contactmebarath@gmail.com)',
      category: 'Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText('contactmebarath@gmail.com');
        showToast('Email copied to clipboard!');
        onClose();
      }
    },
    {
      id: 'action-theme',
      title: `Switch to ${dark ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: dark ? Sun : Moon,
      action: () => {
        toggle();
        showToast(`Switched to ${dark ? 'Light' : 'Dark'} theme`);
        onClose();
      }
    },
    {
      id: 'action-zip',
      title: 'Download Source Code ZIP',
      category: 'Actions',
      icon: Download,
      action: async () => {
        onClose();
        await downloadPortfolioZip((msg) => showToast(msg));
      }
    }
  ], [dark, toggle, showToast, onClose]);

  const projectActions = useMemo(() => {
    return projects.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: `${p.categories.join(', ')} • ${p.tech.slice(0, 4).join(', ')}`,
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        if (onSelectProject) {
          onSelectProject(p);
        } else {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        onClose();
      }
    }));
  }, [onClose, onSelectProject]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return [...defaultActions, ...projectActions];
    }
    const q = query.toLowerCase();
    const matchesDefault = defaultActions.filter(
      (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
    const matchesProjects = projectActions.filter(
      (p) => p.title.toLowerCase().includes(q) || (p.subtitle && p.subtitle.toLowerCase().includes(q))
    );
    return [...matchesDefault, ...matchesProjects];
  }, [query, defaultActions, projectActions]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden z-10 ${
              dark 
                ? 'bg-[#0E1017] border-white/10 text-white shadow-black/80' 
                : 'bg-white border-gray-200 text-gray-900 shadow-xl'
            }`}
          >
            {/* Header / Input */}
            <div className={`flex items-center gap-3 px-4 py-3.5 border-b ${dark ? 'border-white/10' : 'border-gray-100'}`}>
              <Search className={`w-4 h-4 shrink-0 ${dark ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command, project, or technology..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm outline-none placeholder-gray-500"
              />
              <kbd className={`px-2 py-0.5 text-[10px] font-mono rounded border ${
                dark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'
              }`}>
                ESC
              </kbd>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-500">
                  No matching commands or projects found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors ${
                        isSelected
                          ? dark
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                          : dark
                            ? 'hover:bg-white/5 text-gray-300'
                            : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected
                            ? 'bg-indigo-500 text-white'
                            : dark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <div className="font-medium text-xs sm:text-sm truncate">{item.title}</div>
                          {item.subtitle && (
                            <div className={`text-[11px] truncate ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border shrink-0 ${
                        dark ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-400'
                      }`}>
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] mono ${
              dark ? 'border-white/10 bg-white/[0.02] text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}>
              <div className="flex items-center gap-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Barath T Portfolio</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
