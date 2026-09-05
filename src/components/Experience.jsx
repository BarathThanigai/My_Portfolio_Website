import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Building2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { experience } from '../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }
  }),
};

export default function Experience() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="experience" className={`py-28 relative ${dark ? 'bg-[#0B0C13]' : 'bg-gray-50/70'}`}>
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
            Career & Research
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Where I've worked & researched
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className={`absolute left-4 sm:left-[22px] top-4 bottom-4 w-[2px] ${
              dark ? 'bg-white/10' : 'bg-gray-200'
            }`}
          />

          <div className="space-y-8 pl-10 sm:pl-16">
            {experience.map((job, i) => {
              const isPatent = job.type.toLowerCase() === 'patent';
              return (
                <motion.div
                  key={job.id}
                  variants={fadeUp}
                  custom={i + 2}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Timeline node icon */}
                  <div
                    className={`absolute -left-10 sm:-left-16 top-6 w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                      isPatent
                        ? dark 
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/20' 
                          : 'bg-amber-50 border-amber-300 text-amber-700 shadow-md'
                        : i === 0
                          ? dark
                            ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400 shadow-lg shadow-indigo-500/20'
                            : 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-md'
                          : dark
                            ? 'bg-[#121420] border-white/15 text-gray-400 group-hover:text-white group-hover:border-white/30'
                            : 'bg-white border-gray-300 text-gray-500 group-hover:text-gray-900 group-hover:border-gray-400'
                    }`}
                  >
                    {isPatent ? (
                      <Award className="w-4 h-4" />
                    ) : job.type === 'Club' ? (
                      <Users className="w-4 h-4" />
                    ) : (
                      <Briefcase className="w-4 h-4" />
                    )}
                  </div>

                  {/* Experience Card */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                      isPatent
                        ? dark
                          ? 'bg-[#11131E] border-amber-500/25 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-950/20'
                          : 'bg-white border-amber-200/80 hover:border-amber-300 hover:shadow-lg shadow-amber-50/50'
                        : dark
                          ? 'bg-[#0E1017] border-white/10 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-950/30'
                          : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50'
                    }`}
                  >
                    {/* Header with Title, Org, and Badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`text-base sm:text-lg font-bold tracking-tight ${
                            dark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {job.role}
                          </h3>
                          {isPatent && (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                              dark ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800'
                            }`}>
                              <Sparkles className="w-3 h-3" /> Published Patent
                            </span>
                          )}
                        </div>
                        <div className={`text-sm font-semibold mt-1 flex items-center gap-1.5 ${
                          dark ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{job.org}</span>
                        </div>
                      </div>

                      {/* Type and Duration */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg border ${
                          isPatent
                            ? dark ? 'bg-amber-950/30 border-amber-800/40 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
                            : job.type === 'Full-time'
                              ? dark ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : dark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'
                        }`}>
                          {job.type}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-xs font-mono ${
                          dark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {job.duration}
                        </span>
                      </div>
                    </div>

                    {/* Achievements bullets */}
                    <ul className="space-y-2.5">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isPatent
                                ? dark ? 'text-amber-400' : 'text-amber-500'
                                : dark ? 'text-indigo-400' : 'text-indigo-500'
                            }`}
                          />
                          <span className={`text-xs sm:text-sm leading-relaxed ${
                            dark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
