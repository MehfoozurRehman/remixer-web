import { LazyRoutes } from "./Router";

const regexCache = new Map();

export default function getMatchingRoute(path) {
  for (const route of LazyRoutes) {
    if (!regexCache.has(route.path)) {
      const newPath = route.path
        .replace(/:[^/]+/g, "([^/]+)")
        .replace(/\*/g, ".*");
      regexCache.set(route.path, new RegExp(`^${newPath}$`));
    }

    if (regexCache.get(route.path).test(path)) {
      return route;
    }
  }

  return null;
}
