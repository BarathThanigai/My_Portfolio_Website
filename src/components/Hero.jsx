import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Copy, 
  Check, 
  MapPin, 
  Sparkles, 
  Mail, 
  ChevronDown 
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import profile from '../assets/photo.jpeg';

const TITLES = [
  'CSE student at VIT - Chennai',
  'Exploring AI & Machine Learning',
  'Creating Data-Driven Solutions',
  'Building Scalable Software'
];

const STATS = [
  { num: '15+', label: 'Projects Built' },
  { num: '465+', label: 'GitHub Contributions' },
  { num: '20+', label: 'Technologies Explored' },
  { num: '13', label: 'HackerRank Skill Verification Certificates' }
];

function InteractiveCanvas({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999 };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const spacing = 36;

    const render = () => {
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 130;
          const influence = Math.max(0, 1 - dist / maxDist);

          const radius = 1 + influence * 1.8;
          const baseAlpha = dark ? 0.08 : 0.06;
          const alpha = baseAlpha + influence * (dark ? 0.45 : 0.35);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(99, 102, 241, ${alpha})`
            : `rgba(79, 70, 229, ${alpha})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function Typewriter({ texts }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = texts[idx];
    let timer;

    if (!deleting) {
      if (displayed.length < target.length) {
        timer = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setDeleting(true);
        }, 2200);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 28);
      } else {
        timer = setTimeout(() => {
          setDeleting(false);
          setIdx((prev) => (prev + 1) % texts.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, texts]);

  return (
    <span className="inline-flex items-center gap-1 min-h-[1.5em]">
      <span>{displayed}</span>
      <span className="inline-block w-[3px] h-[1.1em] bg-indigo-500 animate-pulse rounded-full" />
    </span>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const dark = theme === 'dark';

  const copyEmail = () => {
    navigator.clipboard.writeText('contactmebarath@gmail.com');
    setCopied(true);
    showToast('Email copied to clipboard: contactmebarath@gmail.com');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.05, y: y * 0.05 });
  };

  const handleCardMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden" id="home">
      <InteractiveCanvas dark={dark} />

      {/* Ambient background glows */}
      <div className={`absolute top-1/4 -left-40 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none ${
        dark ? 'bg-indigo-600/15' : 'bg-indigo-200/50'
      }`} />
      <div className={`absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none ${
        dark ? 'bg-violet-600/15' : 'bg-violet-200/45'
      }`} />

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium border ${
                dark 
                  ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-400' 
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            {/* Main Name & Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
              >
                Barath T
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 }}
                className={`text-xl sm:text-2xl md:text-3xl font-semibold mt-3 ${
                  dark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              >
                <Typewriter texts={TITLES} />
              </motion.div>
            </div>

            {/* Preserved Bio Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className={`text-base sm:text-[17px] leading-relaxed max-w-xl space-y-3 ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <p>
                I'm a Computer Science student passionate about technology, problem-solving, and continuous learning.
              </p>
              <p>
                I enjoy building practical and impactful projects while exploring new tools and technologies across full-stack development, data science, artificial intelligence, machine learning and software engineering.
              </p>
            </motion.div>

            {/* Action Buttons & Quick Copy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/Barath T - Resume.pdf"
                download="Barath T - Resume.pdf"
                onClick={() => showToast('Resume download started!')}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  dark
                    ? 'border-white/10 text-white hover:bg-white/[0.06]'
                    : 'border-gray-300 text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>

              {/* One-click email copy button */}
              <button
                onClick={copyEmail}
                className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-mono rounded-xl border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  copied
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : dark
                      ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.04]'
                      : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                title="Click to copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </motion.div>

            {/* Social quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 pt-1"
            >
              <span className={`text-xs font-mono uppercase tracking-wider ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Connect:
              </span>
              <a
                href="https://github.com/BarathThanigai"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg border transition-colors ${
                  dark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="GitHub profile"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/barath-t-4361b8318/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg border transition-colors ${
                  dark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="LinkedIn profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contactmebarath@gmail.com"
                className={`p-2 rounded-lg border transition-colors ${
                  dark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right Column Profile Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative group w-full max-w-[340px]"
            >
              {/* Glow backdrop behind photo */}
              <div
                className={`absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100 ${
                  dark ? 'bg-indigo-600/30' : 'bg-indigo-300/40'
                }`}
              />

              {/* Photo Frame Container */}
              <div
                className={`relative rounded-3xl overflow-hidden border p-2 shadow-2xl transition-colors duration-300 ${
                  dark
                    ? 'bg-[#0E1017] border-white/10 shadow-black/80'
                    : 'bg-white border-gray-200 shadow-indigo-100/70'
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gray-900">
                  <img
                    src={profile}
                    alt="Barath T"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />

                  {/* Badge on Photo: Location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[11px]">
                      <MapPin className="w-3 h-3 text-indigo-400" />
                      VIT Chennai
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/80 backdrop-blur-md text-[11px] font-medium font-mono">
                      CSE
                    </span>
                  </div>
                </div>

                {/* Micro Floating Badges around Card */}
                <div className="p-3 pt-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Barath T</h3>
                      <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Computer Science & Engineering</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Sparkles className="w-3 h-3" /> Patent Holder
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Accents */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-3 -right-3 px-3 py-1.5 rounded-xl border shadow-lg backdrop-blur-md text-[11px] font-mono font-semibold ${
                  dark ? 'bg-[#121420]/90 border-white/10 text-indigo-300' : 'bg-white/95 border-gray-200 text-indigo-700'
                }`}
              >
                ✨ AI & Full Stack
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl border shadow-lg backdrop-blur-md text-[11px] font-mono font-semibold ${
                  dark ? 'bg-[#121420]/90 border-white/10 text-emerald-400' : 'bg-white/95 border-gray-200 text-emerald-700'
                }`}
              >
                🚀 15+ Projects
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className={`mt-16 pt-8 border-t border-dashed grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 ${
            dark ? 'border-white/10' : 'border-gray-200'
          }`}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                dark ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.num}
              </div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className={`p-2 rounded-full border transition-all duration-200 hover:-translate-y-1 animate-bounce ${
              dark ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Scroll to About section"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
