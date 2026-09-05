import { 
  ArrowUp, 
  Mail, 
  Download
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { downloadPortfolioZip } from '../utils/downloadZip';

export default function Footer() {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const dark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadZip = async () => {
    await downloadPortfolioZip((msg) => showToast(msg));
  };

  return (
    <footer className={`py-12 border-t transition-colors ${
      dark ? 'bg-[#06070B] border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
              dark ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
            }`}>
              BT
            </div>
            <div className="text-xs">
              <span className={`font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Barath T</span>
              <span className="mx-2">•</span>
              <span>Computer Science & Engineering</span>
            </div>
          </div>

          {/* Center Actions: Download ZIP source code */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'bg-white/5 border-white/10 text-indigo-300 hover:text-white hover:border-indigo-500/40'
                  : 'bg-indigo-50/70 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
              }`}
              title="Download full redesigned source code as ZIP"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project ZIP</span>
            </button>
          </div>

          {/* Right Socials & Scroll to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/BarathThanigai"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="GitHub profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/barath-t-4361b8318/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:contactmebarath@gmail.com"
              className={`p-2 rounded-lg border transition-colors ${
                dark ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Email address"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${
                dark ? 'border-white/10 bg-white/5 text-gray-300 hover:text-white' : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
