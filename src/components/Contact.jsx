import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:yourmail@gmail.com?subject=Portfolio Contact from ${form.name}&body=Name: ${form.name}%0AEmail: ${form.email}%0A%0A${form.message}`;

    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-semibold mb-10">
        Contact
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT: Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I’m open to internships, full-time opportunities, and collaboration
            on interesting web projects. Feel free to reach out.
          </p>

          <div className="space-y-3 text-sm">
            <p>
              📧 Email:{" "}
              <span className="text-blue-600">yourmail@gmail.com</span>
            </p>

            <p>
              💼 LinkedIn:{" "}
              <a className="text-blue-600 hover:underline" href="#">
                linkedin.com/in/yourprofile
              </a>
            </p>

            <p>
              💻 GitHub:{" "}
              <a className="text-blue-600 hover:underline" href="#">
                github.com/yourprofile
              </a>
            </p>
          </div>

        </motion.div>

        {/* RIGHT: Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 border rounded-xl dark:border-white/10 space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-transparent dark:border-white/10 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md bg-transparent dark:border-white/10 outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border rounded-md bg-transparent dark:border-white/10 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md 
                       hover:bg-blue-700 transition"
          >
            Send Message
          </button>

        </motion.form>

      </div>
    </section>
  );
}