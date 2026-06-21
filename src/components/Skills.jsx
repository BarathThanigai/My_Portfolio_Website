import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  SiHtml5, SiReact, SiJavascript, SiTailwindcss, SiFramer, SiVite,
  SiPython, SiOpenjdk, SiC, SiCplusplus,
  SiNodedotjs,SiExpress, SiFastapi, SiDjango, SiJsonwebtokens,
  SiPostgresql, SiMongodb, SiMysql,
  SiHuggingface, SiPandas, SiNumpy, SiScikitlearn, SiPytorch,
  SiDocker, SiGit, SiGithub, SiPostman,
} from 'react-icons/si';
import { FaCss3Alt, FaDatabase, FaCode, FaChartBar, FaRobot, FaEye } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' } }),
};

const categories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Java', Icon: SiOpenjdk, color: '#ED8B00' },
      { name: 'C', Icon: SiC, color: '#A8B9CC' },
      { name: 'C++', Icon: SiCplusplus, color: '#00599C' },
      { name: 'MATLAB', Icon: FaCode, color: '#0076A8' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: FaCss3Alt, color: '#1572B6' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Express.js', Icon: SiExpress, color: '#8b8b8b' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'Django', Icon: SiDjango, color: '#092E20' },
      { name: 'REST API', Icon: TbApi, color: '#3B82F6' },
      { name: 'JWT Authentication', Icon: SiJsonwebtokens, color: '#D63AFF' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'Oracle SQL', Icon: FaDatabase, color: '#f21111' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    skills: [
      { name: 'Hugging Face', Icon: SiHuggingface, color: '#FFD21E' },
      { name: 'Ollama', Icon: FaRobot, color: '#898989' },
      { name: 'Pandas', Icon: SiPandas, color: '#3d14e1' },
      { name: 'NumPy', Icon: SiNumpy, color: '#045570' },
      { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#F7931E' },
      { name: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
      { name: 'MediaPipe', Icon: FaEye, color: '#4285F4' },
    ],
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#848484' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Power BI', Icon: FaChartBar, color: '#F2C811' },
    ],
  },
];

function SkillChip({ name, Icon, color, dark, delay }) {
  return (
    <motion.div
      variants={fadeUp} custom={delay} initial="hidden" whileInView="visible" viewport={{ once: true }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-sm font-medium cursor-default transition-colors ${
        dark
          ? 'bg-[#111118] border-[#1E1E2A] text-gray-300 hover:border-indigo-900/50 hover:text-white'
          : 'bg-white border-[#E2E4EB] text-gray-600 hover:border-indigo-200 hover:text-gray-900'
      }`}
    >
      <Icon size={15} style={{ color, flexShrink: 0 }} />
      {name}
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="skills" className={`py-24 ${dark ? '' : 'bg-[#F8F8FC]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`mono text-xs font-semibold tracking-widest uppercase mb-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Skills
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Technologies & tools
        </motion.h2>
        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <div key={cat.name}>
              <motion.div variants={fadeUp} custom={ci * 0.5} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`text-xs font-semibold mono uppercase tracking-widest mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                {cat.name}
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s, si) => (
                  <SkillChip key={s.name} {...s} dark={dark} delay={ci * 0.3 + si * 0.05} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}