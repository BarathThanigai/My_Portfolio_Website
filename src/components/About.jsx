import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiCode, HiChip, HiShieldCheck, HiChartBar } from 'react-icons/hi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

const highlights = [
  {
    icon: HiCode,
    label: 'Software Engineering',
    desc: 'Building scalable, reliable, and maintainable software.'
  },
  {
    icon: HiChip,
    label: 'Artificial Intelligence',
    desc: 'Exploring machine learning and intelligent systems.'
  },
  {
    icon: HiShieldCheck,
    label: 'Cybersecurity',
    desc: 'Developing secure applications and threat detection solutions.'
  },
  {
    icon: HiChartBar,
    label: 'Data Science',
    desc: 'Transforming data into actionable insights.'
  },
];

export default function About() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="about" className={`py-24 ${dark ? 'bg-[#0D0D16]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`mono text-xs font-semibold tracking-widest uppercase mb-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          About
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Built with purpose,<br />driven by curiosity.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            {[
              "I'm a Computer Science student at VIT Chennai with a passion for software engineering, artificial intelligence, and data science. I enjoy designing and building applications that combine intuitive user experiences with scalable backend systems and intelligent, data-driven solutions.",
              "My experience spans full-stack development, machine learning, data analytics, and cybersecurity, with hands-on projects built using technologies such as React, FastAPI, Node.js, Express.js, PostgreSQL, MongoDB, and modern AI frameworks. From AI-powered claim verification systems and cybersecurity digital twins to predictive analytics platforms, business intelligence dashboards, and large-scale web crawling systems, I enjoy tackling diverse technical challenges that have real-world impact.",
              "I'm passionate about solving real-world problems through technology and continuously expanding my knowledge by exploring emerging tools, frameworks, and software engineering practices. I enjoy turning ideas into practical, impactful applications while focusing on clean design, maintainable code, and user-centric experiences.",
            ].map((para, i) => (
              <motion.p key={i} variants={fadeUp} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`text-[15px] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {para}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} className="pt-2">
              <a href="https://www.linkedin.com/in/barath-t-4361b8318/" target="_blank"
  rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors">
                Visit my LinkedIn Profile →
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className={`p-4 rounded-xl border transition-colors ${dark ? 'bg-[#111118] border-[#1E1E2A] hover:border-indigo-900/60' : 'bg-gray-50 border-[#E2E4EB] hover:border-indigo-200'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${dark ? 'bg-indigo-900/30' : 'bg-indigo-50'}`}>
                  <Icon size={16} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
                </div>
                <div className={`text-sm font-semibold mb-0.5 ${dark ? 'text-white' : 'text-gray-800'}`}>{label}</div>
                <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{desc}</div>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`col-span-2 p-4 rounded-xl border ${dark ? 'bg-indigo-900/15 border-indigo-900/30' : 'bg-indigo-50 border-indigo-100'}`}>
              <div className={`text-xs font-semibold mono uppercase tracking-wide mb-1.5 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>Current focus</div>
              <div className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                Building software that solves real-world problems through innovation, collaboration, and continuous learning.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}