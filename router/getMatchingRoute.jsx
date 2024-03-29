import { LazyRoutes } from "./Router";

const regexCache = new Map();

export default function getMatchingRoute(path) {
  let regex;

  for (const route of LazyRoutes) {
    regex = regexCache.get(route.path);

    if (!regex) {
      const newPath = route.path
        .replace(/:[^/]+/g, "([^/]+)")
        .replace(/\*/g, ".*");
      regex = new RegExp(`^${newPath}$`);
      regexCache.set(route.path, regex);
    }

    if (regex.test(path)) {
      return route;
    }
  }

  return null;
}
