import { motion } from "framer-motion";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-semibold mb-10">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 border rounded-xl dark:border-white/10 
                       bg-white dark:bg-white/5 
                       hover:-translate-y-1 hover:shadow-xl 
                       transition-all duration-300"
          >

            {/* Title */}
            <h3 className="text-xl font-semibold">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-md 
                             bg-gray-100 dark:bg-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="text-sm text-green-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>

          </motion.div>
        ))}

      </div>

    </section>
  );
}