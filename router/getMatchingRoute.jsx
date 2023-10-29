import { LazyRoutes } from "./Router";

const regexCache = new Map();

export default function getMatchingRoute(path) {
  return (
    LazyRoutes.find((route) => {
      const regex =
        regexCache.get(route.path) ||
        (() => {
          const newRegex = new RegExp(
            `^${route.path.replace(/:[^/]+/g, "([^/]+").replace(/\*/g, ".*")}$`
          );
          regexCache.set(route.path, newRegex);
          return newRegex;
        })();

      return regex.test(path);
    }) || null
  );
}
