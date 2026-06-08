export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-white/10 text-center text-sm text-gray-500">

      <p>© {new Date().getFullYear()} Barath. All rights reserved.</p>

      <p className="mt-2">
        Built with React + Tailwind
      </p>

    </footer>
  );
}