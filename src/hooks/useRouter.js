import { useState, useEffect } from 'react';

export function useRouter() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    // path can be 'welcome', '/welcome', '#/welcome', etc.
    let hash = path;
    if (!hash.startsWith('#')) {
      if (!hash.startsWith('/')) {
        hash = '/' + hash;
      }
      hash = '#' + hash;
    }
    window.location.hash = hash;
  };

  let route = 'welcome';
  let params = {};

  const cleanHash = currentHash.replace(/^#/, ''); // Remove leading #
  const parts = cleanHash.split('/').filter(Boolean); // e.g. ["lesson", "1"]

  if (parts.length === 0 || parts[0] === 'welcome') {
    route = 'welcome';
  } else if (parts[0] === 'login') {
    route = 'login';
  } else if (parts[0] === 'dashboard') {
    route = 'dashboard';
  } else if (parts[0] === 'lesson' && parts[1]) {
    route = 'lesson';
    params.id = parts[1];
  } else if (parts[0] === 'admin') {
    route = 'admin';
  }

  return { route, params, navigate };
}
