import { motion } from "framer-motion";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-semibold mb-10">
        Experience
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 border rounded-xl 
                       bg-white dark:bg-white/5 
                       dark:border-white/10 
                       hover:-translate-y-1 hover:shadow-lg 
                       transition-all duration-300"
          >

            {/* Header */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {exp.company}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {exp.role}
                </p>
              </div>

              <span className="text-xs text-gray-500">
                {exp.duration}
              </span>
            </div>

            {/* Points */}
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {exp.points.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

          </motion.div>
        ))}

      </div>

    </section>
  );
}