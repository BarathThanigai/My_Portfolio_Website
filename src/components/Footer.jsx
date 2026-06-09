import { useTheme } from '../context/ThemeContext';
import { SiGithub, SiX } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <footer className={`py-8 border-t ${dark ? 'border-[#1E1E2A] bg-[#09090F]' : 'border-[#E2E4EB] bg-[#F8F8FC]'}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`text-xs mono ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
          © 2025 Alex Kim · Built with React & Tailwind CSS
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: SiGithub, href: 'https://github.com', label: 'GitHub' },
            { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: SiX, href: 'https://x.com', label: 'X' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className={`p-2 rounded-md transition-colors ${dark ? 'text-gray-600 hover:text-gray-300 hover:bg-white/5' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}