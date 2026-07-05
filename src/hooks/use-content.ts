import { useEffect, useState } from 'react';

export function useContent<T>(contentKey: string, defaults: T) {
  const [content, setContent] = useState<T>(defaults);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/content/${contentKey}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Content fetch failed'))))
      .then((data) => {
        if (cancelled) return;
        setContent(data ?? defaults);
      })
      .catch(() => {
        if (!cancelled) setContent(defaults);
      })
      .finally(() => {
        if (!cancelled) setIsLoaded(true);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentKey]);

  return { content, isLoaded };
}
