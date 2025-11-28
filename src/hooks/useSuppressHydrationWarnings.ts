"use client";

import { useEffect, useState } from "react";

/**
 * Hook to manually suppress hydration warnings caused by external scripts or browser extensions
 * (e.g., Night Eye, Grammarly).
 *
 * This forces a re-render *after* the client side has run, ensuring the server/client HTML matches
 * for the critical elements, while ignoring external attributes.
 */
export const useSuppressHydrationWarning = () => {
  const [mounted, setMounted] = useState(false);

  // Set mounted state on client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  // We return a simple object. The key is what we care about.
  return { suppressHydrationWarning: !mounted };
};
