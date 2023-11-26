import { useCallback, useEffect, useRef, useState } from "react";

import getMatchingRoute from "./getMatchingRoute";

const ROOT_MARGIN = "200px";

export default function usePrefetchLink(to, prefetch = true) {
  const [prefetched, setPrefetched] = useState(false);
  const ref = useRef(null);

  const preloadRoute = useCallback(() => {
    const route = getMatchingRoute(to);
    if (route) {
      try {
        route.preload();
        setPrefetched(true);
      } catch (error) {
        console.error("Error while preloading route:", error);
      }
    }
  }, [to]);

  useEffect(() => {
    if (!prefetched && prefetch) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            preloadRoute();
            observer.unobserve(ref.current);
          }
        },
        { rootMargin: ROOT_MARGIN }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        observer.disconnect();
      };
    }
  }, [prefetched, prefetch, preloadRoute]);

  const handleMouseEnter = useCallback(() => {
    if (!prefetched) {
      preloadRoute();
    }
  }, [prefetched, preloadRoute]);

  return { handleMouseEnter, ref };
}
