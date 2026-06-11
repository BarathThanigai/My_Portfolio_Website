import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const current = navLinks
        .map(l => document.getElementById(l.toLowerCase()))
        .reduce((acc, s) => (s && window.scrollY >= s.offsetTop - 120 ? s.id : acc), '');
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? dark
            ? 'bg-[#09090F]/90 border-b border-[#1E1E2A] backdrop-blur-xl'
            : 'bg-[#F8F8FC]/90 border-b border-[#E2E4EB] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`mono font-semibold text-sm tracking-wider ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}
        >
          <span className="font-bold">Barath T</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                active === link.toLowerCase()
                  ? dark ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-900/8'
                  : dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className={`p-2 rounded-md transition-all duration-200 ${
              dark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-900/5'
            }`}
            aria-label="Toggle theme"
          >
            {dark ? <HiSun size={17} /> : <HiMoon size={17} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 rounded-md transition-colors ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
          >
            {open ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`md:hidden px-6 pb-4 pt-2 border-t ${
              dark ? 'bg-[#09090F]/95 border-[#1E1E2A]' : 'bg-[#F8F8FC]/95 border-[#E2E4EB]'
            } backdrop-blur-xl`}
          >
            {navLinks.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  active === link.toLowerCase()
                    ? dark ? 'text-white bg-white/10' : 'text-gray-900 bg-gray-900/8'
                    : dark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}