import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { experience } from '../data/experience';
import { HiCheckCircle, HiBriefcase } from 'react-icons/hi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

export default function Experience() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="experience" className={`py-24 ${dark ? '' : 'bg-[#F8F8FC]'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`mono text-xs font-semibold tracking-widest uppercase mb-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Experience
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-14 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Where I've worked
        </motion.h2>

        <div className="relative">
          <div className={`absolute left-0 md:left-[13px] top-2 bottom-2 w-px ${dark ? 'bg-[#1E1E2A]' : 'bg-[#E2E4EB]'}`} />
          <div className="space-y-6 pl-8 md:pl-12">
            {experience.map((job, i) => (
              <motion.div key={job.id} variants={fadeUp} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
                <div className={`absolute -left-8 md:-left-12 top-5 w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                  i === 0
                    ? dark ? 'bg-indigo-900/30 border-indigo-600' : 'bg-indigo-50 border-indigo-500'
                    : dark ? 'bg-[#111118] border-[#2A2A38]' : 'bg-white border-[#D1D5DB]'
                }`}>
                  <HiBriefcase size={11} className={i === 0 ? (dark ? 'text-indigo-400' : 'text-indigo-600') : (dark ? 'text-gray-600' : 'text-gray-400')} />
                </div>

                <div className={`p-6 rounded-xl border transition-colors ${dark ? 'bg-[#111118] border-[#1E1E2A] hover:border-indigo-900/40' : 'bg-white border-[#E2E4EB] hover:border-indigo-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className={`text-base font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{job.role}</h3>
                      <div className={`text-sm font-medium mt-0.5 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>{job.org}</div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2.5 py-1 text-xs rounded-full mono font-medium ${
                        job.type === 'Full-time'
                          ? dark ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : dark ? 'bg-amber-900/20 text-amber-400 border border-amber-900/30' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>{job.type}</span>
                      <span className={`text-xs mono ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{job.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {job.achievements.map((a, ai) => (
                      <li key={ai} className="flex items-start gap-2.5">
                        <HiCheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${dark ? 'text-indigo-500/60' : 'text-indigo-400'}`} />
                        <span className={`text-[13px] leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}