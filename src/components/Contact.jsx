import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { HiMail, HiArrowRight } from 'react-icons/hi';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' } }),
};

const socials = [
  { icon: HiMail, label: 'Email', value: 'contactmebarath@gmail.com', href: 'mailto:contactmebarath@gmail.com' },
  { icon: SiGithub, label: 'GitHub', value: 'github.com/BarathThanigai', href: 'https://github.com/BarathThanigai' },
  { icon: FaLinkedinIn, label: 'LinkedIn', value: 'linkedin.com/in/barath-t-4361b8318/', href: 'https://www.linkedin.com/in/barath-t-4361b8318/' },
];

export default function Contact() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const inputClass = `w-full px-4 py-2.5 text-sm rounded-lg border outline-none transition-all duration-200 ${
    dark
      ? 'bg-[#0D0D16] border-[#1E1E2A] text-white placeholder-gray-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600/20'
      : 'bg-white border-[#E2E4EB] text-gray-900 placeholder-gray-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/20'
  }`;

  return (
    <section id="contact" className={`py-24 ${dark ? 'bg-[#0D0D16]' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`mono text-xs font-semibold tracking-widest uppercase mb-2 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>
          Contact
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Let's work together
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className={`text-[15px] mb-14 max-w-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          I'm currently open to new opportunities — full-time roles or project collaborations. Drop me a message and I'll get back within a day.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {sent ? (
              <div className={`h-full flex flex-col items-center justify-center text-center rounded-xl border p-12 ${dark ? 'bg-[#111118] border-[#1E1E2A]' : 'bg-gray-50 border-[#E2E4EB]'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${dark ? 'bg-indigo-900/30' : 'bg-indigo-50'}`}>
                  <HiMail size={20} className="text-indigo-500" />
                </div>
                <h3 className={`font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>Message sent!</h3>
                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>I'll reply to your inbox soon.</p>
              </div>
            ) : (
              <form
                    onSubmit={async (e) => {
                      e.preventDefault();

                      try {
                        const response = await fetch("http://127.0.0.1:8000/contact", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(form),
                        });

                        if (!response.ok) {
                          throw new Error("Failed to send message");
                        }

                        setSent(true);
                        setForm({ name: "", email: "", message: "" });
                      } catch (error) {
                        console.error(error);
                        alert("Message failed to send. Please try again.");
                      }
                    }}
                    className="space-y-4"
                  >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Name</label>
                    <input className={inputClass} placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                    <input type="email" className={inputClass} placeholder="jane@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Message</label>
                  <textarea rows={5} className={inputClass} placeholder="Tell me about your project or role..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-indigo-900/20 hover:-translate-y-0.5">
                  Send message <HiArrowRight size={15} />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3">
            {socials.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} 
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 group ${dark ? 'bg-[#111118] border-[#1E1E2A] hover:border-indigo-900/50' : 'bg-gray-50 border-[#E2E4EB] hover:border-indigo-200 hover:bg-white'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${dark ? 'bg-indigo-900/25' : 'bg-indigo-50'}`}>
                  <Icon size={16} className={dark ? 'text-indigo-400' : 'text-indigo-600'} />
                </div>
                <div>
                  <div className={`text-xs font-medium mb-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
                  <div className={`text-sm font-medium transition-colors ${dark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{value}</div>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}