import { useCallback, useEffect, useState } from "react";

import getMatchingRoute from "./getMatchingRoute";

const ROOT_MARGIN = "200px";

export default function usePrefetchLink(to, prefetch = true) {
  const [prefetched, setPrefetched] = useState(false);

  const preloadRoute = () => {
    const route = getMatchingRoute(to);
    if (route) {
      try {
        route.preload();
        setPrefetched(true);
      } catch (error) {
        console.error("Error while preloading route:", error);
      }
    }
  };

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
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [to, prefetch, prefetched]);

  const handleMouseEnter = useCallback(() => {
    if (!prefetched) {
      preloadRoute();
    }
  }, [to, prefetched]);

  return { handleMouseEnter };
}
