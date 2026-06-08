import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-6"
      >

        <h2 className="text-3xl font-semibold">About Me</h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          I am a Full Stack Developer focused on building scalable web applications
          with clean architecture, performant UI systems, and modern frontend engineering practices.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-8">

          <div className="p-5 border rounded-lg dark:border-white/10 hover:scale-[1.02] transition">
            <h3 className="font-semibold">Frontend</h3>
            <p className="text-sm text-gray-500">React, Vite, Tailwind</p>
          </div>

          <div className="p-5 border rounded-lg dark:border-white/10 hover:scale-[1.02] transition">
            <h3 className="font-semibold">Backend</h3>
            <p className="text-sm text-gray-500">Node.js, Express</p>
          </div>

          <div className="p-5 border rounded-lg dark:border-white/10 hover:scale-[1.02] transition">
            <h3 className="font-semibold">Database</h3>
            <p className="text-sm text-gray-500">MongoDB, MySQL</p>
          </div>

        </div>

      </motion.div>

    </section>
  );
}