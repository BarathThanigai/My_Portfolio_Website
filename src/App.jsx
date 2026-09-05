import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import { Search } from 'lucide-react';

function PortfolioApp() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Global keyboard shortcut for Command Palette: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/25">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onQuickView={(proj) => setSelectedProject(proj)} />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {/* Interactive Command Palette Modal */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating ⌘K Quick Action Pill for Easy Discoverability */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono font-medium shadow-xl border backdrop-blur-xl bg-[#0E1017]/80 hover:bg-[#0E1017] text-gray-300 hover:text-white border-white/15 dark:bg-[#0E1017]/80 dark:border-white/15 dark:text-gray-300 dark:hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
          title="Press ⌘K to open command palette"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400" />
          <span>Quick Find</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-400">⌘K</kbd>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PortfolioApp />
      </ToastProvider>
    </ThemeProvider>
  );
}
