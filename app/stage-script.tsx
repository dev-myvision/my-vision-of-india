'use client';

import { useEffect } from 'react';

// Starts the 3D stage (public/js/stage.js) once the page has hydrated.
// It is an ES module, which next/script would preload as a classic script and fetch twice.
// A module runs once per URL, so a second mount does nothing.
export default function StageScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/js/stage.js';
    document.body.appendChild(script);
  }, []);
  return null;
}
