import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiDownload, HiArrowRight } from 'react-icons/hi';

const TITLES = ['CSE student at VIT - Chennai', 'Exploring AI & Machine Learning', 'Creating Data-Driven Solutions', 'Building Scalable Software'];

function DotGrid({ dark }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', handleMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 30) + 1;
      const rows = Math.ceil(canvas.height / 30) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * 30, y = r * 30;
          const dx = x - mouse.current.x, dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const factor = Math.max(0, 1 - dist / 120);
          const alpha = dark ? 0.12 + factor * 0.45 : 0.08 + factor * 0.35;
          ctx.beginPath();
          ctx.arc(x, y, 1 + factor * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${alpha})`;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, [dark]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.8 }} />;
}

function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1800); return () => clearTimeout(t); }
    const target = texts[idx];
    if (!deleting) {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else { setPause(true); setTimeout(() => setDeleting(true), 1800); }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else { setDeleting(false); setIdx((idx + 1) % texts.length); }
    }
  }, [displayed, deleting, idx, pause, texts]);

  return (
    <span className="inline-flex items-center gap-1">
      {displayed}
      <span className="inline-block w-0.5 h-6 bg-indigo-500 animate-pulse" />
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      <DotGrid dark={dark} />
      <div className={`absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none ${dark ? 'bg-indigo-900/20' : 'bg-indigo-100/60'}`} />
      <div className={`absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none ${dark ? 'bg-violet-900/15' : 'bg-violet-100/40'}`} />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="inline-flex items-center gap-2 mb-8">
            <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mono border ${dark ? 'bg-emerald-900/20 border-emerald-800/40 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for new opportunities
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
            Barath T
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className={`text-2xl sm:text-3xl font-semibold mb-6 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
            <Typewriter texts={TITLES} />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className={`text-lg leading-relaxed max-w-xl mb-10 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            I'm a Computer Science student passionate about technology, problem-solving, and continuous learning.

            I enjoy building practical and impactful projects while exploring new tools and technologies across full-stack development, data science, artificial intelligence, machine learning and software engineering.

          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap items-center gap-3">
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-indigo-900/25 hover:shadow-indigo-900/40 hover:-translate-y-0.5">
              Get in touch <HiArrowRight size={15} />
            </button>
            <a href="Barath T - Resume.pdf" download="Barath T - Resume.pdf" className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${dark ? 'border-[#1E1E2A] text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/10' : 'border-[#E2E4EB] text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
              <HiDownload size={15} /> Download Resume
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }} className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-dashed border-current/10">
            {[['15+', 'Projects Built'], ['320+', 'GitHub Contributions'], ['20+', 'Technologies Explored'], ['13', 'HackerRank Skill Verification Certificates']].map(([num, label]) => (
              <div key={label}>
                <div className={`text-2xl font-bold mono ${dark ? 'text-white' : 'text-gray-900'}`}>{num}</div>
                <div className={`text-xs mt-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}