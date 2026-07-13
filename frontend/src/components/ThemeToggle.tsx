import { useTheme } from './ThemeContext';
import { Sun, Moon, Laptop } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-zinc-800/80 p-1 rounded-full border border-gray-200/50 dark:border-zinc-700/50" id="theme-toggle-container">
      <button
        id="theme-toggle-light"
        onClick={() => setTheme('light')}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'light'
            ? 'bg-white text-zinc-900 shadow-sm'
            : 'text-gray-400 dark:text-zinc-400 hover:text-gray-600 dark:hover:text-zinc-200'
        }`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        id="theme-toggle-dark"
        onClick={() => setTheme('dark')}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-zinc-900 text-white shadow-sm'
            : 'text-gray-400 dark:text-zinc-400 hover:text-gray-600 dark:hover:text-zinc-200'
        }`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        id="theme-toggle-system"
        onClick={() => setTheme('system')}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'system'
            ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
            : 'text-gray-400 dark:text-zinc-400 hover:text-gray-600 dark:hover:text-zinc-200'
        }`}
        title="System Theme"
      >
        <Laptop className="h-4 w-4" />
      </button>
    </div>
  );
}
