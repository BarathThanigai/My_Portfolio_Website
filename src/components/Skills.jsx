import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Search, 
  Terminal, 
  Layers, 
  Database, 
  Cpu, 
  Wrench
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  SiHtml5, SiReact, SiJavascript, SiTailwindcss, SiFramer, SiVite,
  SiPython, SiOpenjdk, SiC, SiCplusplus,
  SiNodedotjs, SiExpress, SiFastapi, SiDjango, SiJsonwebtokens,
  SiPostgresql, SiMongodb, SiMysql,
  SiHuggingface, SiPandas, SiNumpy, SiScikitlearn, SiPytorch,
  SiDocker, SiGit, SiGithub, SiPostman,
} from 'react-icons/si';
import { FaCss3Alt, FaDatabase, FaCode, FaChartBar, FaRobot, FaEye } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
  }),
};

const categories = [
  {
    name: 'Programming Languages',
    icon: Code2,
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
    icon: Layers,
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
    icon: Terminal,
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
    icon: Database,
    skills: [
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'Oracle SQL', Icon: FaDatabase, color: '#f21111' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    icon: Cpu,
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
    icon: Wrench,
    skills: [
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#848484' },
      { name: 'Postman', Icon: SiPostman, color: '#FF6C37' },
      { name: 'Power BI', Icon: FaChartBar, color: '#F2C811' },
    ],
  },
];

export default function Skills() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const dark = theme === 'dark';

  const totalSkillsCount = useMemo(() => {
    return categories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, []);

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => selectedCategory === 'All' || cat.name === selectedCategory)
      .map((cat) => {
        if (!searchQuery.trim()) return cat;
        const q = searchQuery.toLowerCase();
        const filteredSkills = cat.skills.filter((s) => s.name.toLowerCase().includes(q));
        return { ...cat, skills: filteredSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className={`py-28 relative ${dark ? 'bg-[#0B0C13]' : 'bg-gray-50/60'}`}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`font-mono text-xs font-semibold tracking-widest uppercase mb-2 ${
                dark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              Technical Arsenal
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              Technologies & tools
            </motion.h2>
          </div>

          {/* Search bar inside Skills */}
          <div className="w-full md:w-72">
            <div className={`relative flex items-center rounded-xl border transition-all ${
              dark ? 'bg-[#121420] border-white/10 focus-within:border-indigo-500/50' : 'bg-white border-gray-200 focus-within:border-indigo-500/50 shadow-sm'
            }`}>
              <Search className={`w-4 h-4 ml-3.5 shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter tech stack..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm outline-none placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 text-xs text-gray-500 hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : dark
                  ? 'bg-[#121420] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            All Categories ({totalSkillsCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.name
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : dark
                    ? 'bg-[#121420] border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {cat.name} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Categories List */}
        <div className="space-y-8">
          {filteredCategories.length === 0 ? (
            <div className={`p-12 text-center rounded-2xl border ${
              dark ? 'bg-[#121420] border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-500'
            }`}>
              No skills found matching "{searchQuery}".
            </div>
          ) : (
            filteredCategories.map((cat, cIdx) => {
              const CategoryIcon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  variants={fadeUp}
                  custom={cIdx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                    dark ? 'bg-[#0E1017] border-white/10' : 'bg-white border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className={`p-1.5 rounded-lg ${dark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                      <CategoryIcon className="w-4 h-4" />
                    </div>
                    <h3 className={`text-xs font-mono uppercase tracking-widest font-bold ${
                      dark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {cat.name}
                    </h3>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                      dark ? 'bg-white/5 border-white/10 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-500'
                    }`}>
                      {cat.skills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => {
                      const IconComponent = skill.Icon;
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{ y: -2, scale: 1.02 }}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-default ${
                            dark
                              ? 'bg-[#141622] border-white/10 text-gray-300 hover:border-indigo-500/40 hover:text-white hover:shadow-md'
                              : 'bg-gray-50/80 border-gray-200 text-gray-700 hover:border-indigo-200 hover:text-gray-950 hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          <IconComponent
                            size={16}
                            style={{ color: skill.color }}
                            className="shrink-0"
                          />
                          <span>{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
