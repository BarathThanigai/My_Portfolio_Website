import { motion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  ShieldCheck, 
  BarChart3, 
  ArrowUpRight, 
  Compass
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  }),
};

const highlights = [
  {
    icon: Code,
    label: 'Software Engineering',
    desc: 'Building scalable, reliable, and maintainable software.',
    color: 'indigo'
  },
  {
    icon: Cpu,
    label: 'Artificial Intelligence & Machine Learning',
    desc: 'Exploring AI, machine learning and intelligent systems.',
    color: 'cyan'
  },
  {
    icon: ShieldCheck,
    label: 'Cybersecurity',
    desc: 'Developing secure applications and threat detection solutions.',
    color: 'emerald'
  },
  {
    icon: BarChart3,
    label: 'Data Science',
    desc: 'Transforming data into actionable insights.',
    color: 'amber'
  },
];

const paragraphs = [
  "I'm a Computer Science student at VIT Chennai with a passion for software engineering, artificial intelligence, and data science. I enjoy designing and building applications that combine intuitive user experiences with scalable backend systems and intelligent, data-driven solutions.",
  "My experience spans full-stack development, machine learning, data analytics, and cybersecurity, with hands-on projects built using technologies such as React, FastAPI, Node.js, Express.js, PostgreSQL, MongoDB, and modern AI frameworks. From AI-powered claim verification systems and cybersecurity digital twins to predictive analytics platforms, business intelligence dashboards, and large-scale web crawling systems, I enjoy tackling diverse technical challenges that have real-world impact.",
  "I'm passionate about solving real-world problems through technology and continuously expanding my knowledge by exploring emerging tools, frameworks, and software engineering practices. I enjoy turning ideas into practical, impactful applications while focusing on clean design, maintainable code, and user-centric experiences.",
];

export default function About() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="about" className={`py-28 relative ${dark ? 'bg-[#08090E]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`font-mono text-xs font-semibold tracking-widest uppercase mb-2 ${
              dark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            About
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Built with purpose,<br />
            <span className={dark ? 'text-gray-400' : 'text-gray-500'}>driven by curiosity.</span>
          </motion.h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Bio paragraphs */}
          <div className="lg:col-span-6 space-y-6">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`text-[15px] sm:text-base leading-relaxed ${
                  dark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-2"
            >
              <a
                href="https://www.linkedin.com/in/barath-t-4361b8318/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-all group ${
                  dark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                }`}
              >
                <span>Visit my LinkedIn Profile</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 4 Core Pillars & Current Focus Bento */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                  dark
                    ? 'bg-[#0E1017] border-white/10 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-950/40'
                    : 'bg-gray-50/70 border-gray-200 hover:border-indigo-200 hover:bg-white hover:shadow-lg hover:shadow-indigo-100/50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                    dark ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`text-sm font-bold mb-1.5 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {label}
                </h3>
                <p className={`text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {desc}
                </p>
              </motion.div>
            ))}

            {/* Current Focus Banner */}
            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`sm:col-span-2 p-5 rounded-2xl border transition-all ${
                dark
                  ? 'bg-gradient-to-r from-indigo-950/30 to-violet-950/20 border-indigo-500/20'
                  : 'bg-gradient-to-r from-indigo-50/70 to-violet-50/50 border-indigo-100 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Compass className={`w-4 h-4 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span
                  className={`text-xs font-bold font-mono uppercase tracking-wider ${
                    dark ? 'text-indigo-400' : 'text-indigo-600'
                  }`}
                >
                  Current Focus
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
                Building software that solves real-world problems through innovation, collaboration, and continuous learning.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
