import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiFramer, SiVite,
  SiGo, SiNodedotjs, SiPython, SiRust,
  SiPostgresql, SiRedis, SiMongodb, SiClickhouse,
  SiDocker, SiKubernetes, SiGooglecloud, SiGithubactions, SiTerraform,
  SiApachekafka, SiGit, SiLinux, SiGrafana,
} from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' } }),
};

const categories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#000000' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', Icon: SiFramer, color: '#0055FF' },
      { name: 'Vite', Icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    name: 'Backend & Languages',
    skills: [
      { name: 'Go', Icon: SiGo, color: '#00ACD7' },
      { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
      { name: 'Python', Icon: SiPython, color: '#3776AB' },
      { name: 'Rust', Icon: SiRust, color: '#CE422B' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
      { name: 'ClickHouse', Icon: SiClickhouse, color: '#FFCC01' },
    ],
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', Icon: FaAmazon, color: '#FF9900' },
      { name: 'GCP', Icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', Icon: SiKubernetes, color: '#326CE5' },
      { name: 'GitHub Actions', Icon: SiGithubactions, color: '#2088FF' },
      { name: 'Terraform', Icon: SiTerraform, color: '#7B42BC' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Kafka', Icon: SiApachekafka, color: '#231F20' },
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
      { name: 'Grafana', Icon: SiGrafana, color: '#F46800' },
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