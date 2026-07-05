import { useEffect, useState } from 'react';

export interface ServiceRecord {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  iconName: string;
  handlingSteps: { title: string; description: string }[];
  whyChooseUs: string[];
  sortOrder: number;
}

export function useServices() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load services'))))
      .then((data: ServiceRecord[]) => setServices(data))
      .catch(() => setServices([]))
      .finally(() => setIsLoaded(true));
  }, []);

  return { services, isLoaded };
}

export function useService(slug: string | undefined) {
  const [service, setService] = useState<ServiceRecord | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setIsLoaded(false);
    setNotFound(false);

    fetch(`/api/services/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        if (!res.ok) throw new Error('Failed to load service');
        return res.json();
      })
      .then((data) => setService(data))
      .catch(() => setNotFound(true))
      .finally(() => setIsLoaded(true));
  }, [slug]);

  return { service, isLoaded, notFound };
}
