import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Default
  });

  // Verify and correct localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== 'light' && saved !== 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }, []);

  // Update theme attributes on changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // Apply transitioning class to body for animation
    document.body.classList.add('theme-transitioning');
    
    // Apply updates
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);

    // Remove transitioning class after transition completes (300ms)
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  };

  return (
    <button
      data-testid="theme-toggle"
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '8px 16px',
        cursor: 'pointer'
      }}
    >
      {theme === 'light' ? '🌙 Темная тема' : '☀️ Светлая тема'}
    </button>
  );
}
