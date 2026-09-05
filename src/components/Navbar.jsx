import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Search, 
  Download,
  FolderArchive
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { downloadPortfolioZip } from '../utils/downloadZip';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ onOpenSearch }) {
  const { theme, toggle } = useTheme();
  const { showToast } = useToast();
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Scroll progress
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Active section spy
      const current = navLinks
        .map((l) => document.getElementById(l.id))
        .reduce((acc, section) => {
          if (section && scrollY >= section.offsetTop - 140) {
            return section.id;
          }
          return acc;
        }, '');
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-indigo-500 transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 pt-3 pb-2 transition-all">
        <div
          className={`max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 rounded-2xl flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? dark
                ? 'bg-[#0A0B10]/85 border border-white/[0.08] backdrop-blur-xl shadow-lg shadow-black/40'
                : 'bg-white/85 border border-black/[0.06] backdrop-blur-xl shadow-lg shadow-gray-200/50'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo / Name */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group text-left"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-105 ${
              dark ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
            }`}>
              BT
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-bold tracking-tight transition-colors ${
                dark ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-indigo-600'
              }`}>
                Barath T
              </span>
              <span className={`text-[10px] font-mono tracking-wide ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                Software & AI
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? dark
                        ? 'text-white font-semibold'
                        : 'text-gray-950 font-semibold'
                      : dark
                        ? 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-black/[0.03]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        dark ? 'bg-white/10' : 'bg-gray-100'
                      }`}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Controls */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Quick Command Palette Button */}
            <button
              onClick={onOpenSearch}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                dark 
                  ? 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20' 
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Search</span>
              <kbd className={`px-1 py-0.2 rounded text-[10px] ${
                dark ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-600'
              }`}>
                ⌘K
              </kbd>
            </button>

            {/* Resume button */}
            <a
              href="/Barath T - Resume.pdf"
              download="Barath T - Resume.pdf"
              onClick={() => showToast('Resume download started!')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20'
                  : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Source ZIP button */}
            <button
              onClick={async () => {
                await downloadPortfolioZip((msg) => showToast(msg));
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/10 text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white'
                  : 'border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title="Download portfolio source code (ZIP)"
            >
              <FolderArchive className="w-3.5 h-3.5 text-indigo-400" />
              <span>ZIP Code</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className={`p-2 rounded-lg border transition-all ${
                dark
                  ? 'border-white/10 text-amber-400 hover:bg-white/[0.06]'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 text-gray-300' : 'border-gray-200 text-gray-700'
              }`}
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggle}
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 text-amber-400' : 'border-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'
              }`}
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className={`sm:hidden mt-2 p-4 rounded-2xl border shadow-xl backdrop-blur-2xl ${
                dark
                  ? 'bg-[#0A0B10]/95 border-white/10 shadow-black/80 text-white'
                  : 'bg-white/95 border-gray-200 shadow-gray-200/80 text-gray-900'
              }`}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active === link.id
                        ? dark ? 'bg-indigo-600/20 text-indigo-400 font-semibold' : 'bg-indigo-50 text-indigo-700 font-semibold'
                        : dark ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <div className="pt-2 mt-2 border-t border-dashed border-gray-200 dark:border-white/10 flex flex-col gap-2">
                  <a
                    href="/Barath T - Resume.pdf"
                    download="Barath T - Resume.pdf"
                    onClick={() => {
                      showToast('Resume download started!');
                      setMobileOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Resume (PDF)
                  </a>

                  <button
                    onClick={async () => {
                      setMobileOpen(false);
                      await downloadPortfolioZip((msg) => showToast(msg));
                    }}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border ${
                      dark
                        ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                        : 'bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <FolderArchive className="w-3.5 h-3.5 text-indigo-400" />
                    Download Project Source (ZIP)
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
