import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }
  }),
};

export default function Contact() {
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const dark = theme === 'dark';

  // Automatically use the correct backend
  // Local: http://127.0.0.1:8000
  // Production: VITE_API_URL from Vercel
  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://127.0.0.1:8000';

  const copyEmail = () => {
    navigator.clipboard.writeText('contactmebarath@gmail.com');
    setCopied(true);
    showToast('Email address copied to clipboard!');

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Frontend validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.message.trim()
    ) {
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setLoading(true);

    try {
      // Send form data to FastAPI backend
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      // Backend returned an error
      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to send message'
        );
      }

      // Successfully sent
      setSubmitted(true);

      setForm({
        name: '',
        email: '',
        message: ''
      });

      showToast('Thank you! Your message has been sent.');

      // Celebration
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: {
            y: 0.7
          }
        });
      } catch {
        // Ignore confetti errors
      }

    } catch (error) {
      console.error('Contact form error:', error);

      setErrorMessage(
        'Something went wrong. Please try emailing directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-28 relative ${
        dark ? 'bg-[#08090E]' : 'bg-white'
      }`}
    >
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
            Contact
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Let's connect
          </motion.h2>

        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >

            <p
              className={`text-base leading-relaxed ${
                dark ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              I'm always open to discussing new projects, internship
              opportunities, or collaborations. Whether you have a
              question or just want to say hi, feel free to reach out!
            </p>

            {/* Email Card */}
            <div
              className={`p-5 rounded-2xl border transition-all ${
                dark
                  ? 'bg-[#0E1017] border-white/10'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div
                    className={`p-2.5 rounded-xl ${
                      dark
                        ? 'bg-indigo-500/10 text-indigo-400'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                  </div>

                  <div>

                    <div
                      className={`text-xs font-mono uppercase tracking-wider ${
                        dark
                          ? 'text-gray-400'
                          : 'text-gray-500'
                      }`}
                    >
                      Direct Email
                    </div>

                    <a
                      href="mailto:contactmebarath@gmail.com"
                      className={`text-sm font-semibold tracking-tight hover:underline ${
                        dark
                          ? 'text-white'
                          : 'text-gray-900'
                      }`}
                    >
                      contactmebarath@gmail.com
                    </a>

                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className={`p-2 rounded-xl border transition-colors ${
                    copied
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : dark
                        ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                        : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3">

              <a
                href="https://github.com/BarathThanigai"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all group ${
                  dark
                    ? 'bg-[#0E1017] border-white/10 hover:border-white/25 text-white'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-900 hover:bg-white'
                }`}
              >

                <div className="flex items-center gap-2.5">
                  <FaGithub className="w-5 h-5" />

                  <span className="text-sm font-semibold">
                    GitHub
                  </span>
                </div>

                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />

              </a>

              <a
                href="https://www.linkedin.com/in/barath-t-4361b8318/"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all group ${
                  dark
                    ? 'bg-[#0E1017] border-white/10 hover:border-indigo-500/30 text-white'
                    : 'bg-gray-50 border-gray-200 hover:border-indigo-200 text-gray-900 hover:bg-white'
                }`}
              >

                <div className="flex items-center gap-2.5">

                  <FaLinkedin className="w-5 h-5 text-blue-500" />

                  <span className="text-sm font-semibold">
                    LinkedIn
                  </span>

                </div>

                <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />

              </a>

            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >

            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-xl ${
                dark
                  ? 'bg-[#0E1017] border-white/10 shadow-black/40'
                  : 'bg-white border-gray-200 shadow-gray-100'
              }`}
            >

              {submitted ? (

                /* Success State */
                <div className="py-12 text-center space-y-4">

                  <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                    <Check className="w-6 h-6" />
                  </div>

                  <h3
                    className={`text-xl font-bold ${
                      dark
                        ? 'text-white'
                        : 'text-gray-900'
                    }`}
                  >
                    Message Sent Successfully!
                  </h3>

                  <p
                    className={`text-sm max-w-md mx-auto ${
                      dark
                        ? 'text-gray-300'
                        : 'text-gray-600'
                    }`}
                  >
                    Thank you for reaching out! I've received
                    your note and will get back to you as soon
                    as possible.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                  >
                    Send Another Note
                  </button>

                </div>

              ) : (

                /* Form */
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">

                      <AlertCircle className="w-4 h-4 shrink-0" />

                      <span>
                        {errorMessage}
                      </span>

                    </div>
                  )}

                  {/* Name */}
                  <div>

                    <label
                      className={`block text-xs font-mono font-medium mb-1.5 ${
                        dark
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Your Name
                    </label>

                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value
                        })
                      }
                      placeholder="e.g., Alex Morgan"
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all ${
                        dark
                          ? 'bg-[#141622] border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label
                      className={`block text-xs font-mono font-medium mb-1.5 ${
                        dark
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Your Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value
                        })
                      }
                      placeholder="e.g., alex@company.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all ${
                        dark
                          ? 'bg-[#141622] border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />

                  </div>

                  {/* Message */}
                  <div>

                    <label
                      className={`block text-xs font-mono font-medium mb-1.5 ${
                        dark
                          ? 'text-gray-300'
                          : 'text-gray-700'
                      }`}
                    >
                      Your Message
                    </label>

                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          message: e.target.value
                        })
                      }
                      placeholder="Tell me about your project, idea, or inquiry..."
                      className={`w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all resize-none ${
                        dark
                          ? 'bg-[#141622] border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                      }`}
                    />

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0"
                  >

                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}

                  </button>

                </form>

              )}

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}