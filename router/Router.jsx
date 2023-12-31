import.meta.glob("/src/styles/*.(scss|css)", { eager: true });

import { Fragment, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "@layouts/App";
import Loading from "@layouts/Loading";

const LAZY_ROUTES = import.meta.glob("/src/screens/**/*.lazy.jsx");

const EAGER_ROUTES = import.meta.glob(
  ["/src/screens/**/*.jsx", "!/src/screens/**/*.lazy.jsx"],
  { eager: true }
);

const ErrorBoundary = lazy(() => import("@layouts/Error"));
const NotFound = lazy(() => import("@layouts/NotFound"));

const getAction = async (module, ...args) => {
  const { action } = await module();

  if (action && typeof action === "function") {
    return action(...args);
  }

  return null;
};

const getLoader = async (module, ...args) => {
  const { loader } = await module();

  if (loader && typeof loader === "function") {
    return loader(...args);
  }

  return null;
};

const createRoute = (module, isEager) => {
  const Component = isEager ? module.default : lazy(() => module);

  const element = Component ? <Component /> : <Fragment />;
  const errorElement = <ErrorBoundary />;

  const preload = isEager ? null : module;
  const loader = isEager ? module?.loader : getLoader.bind(null, module);
  const action = isEager ? module?.action : getAction.bind(null, module);

  return { element, loader, action, preload, errorElement };
};

const createPathSegments = (key) => {
  const lowerCasePath = key.toLowerCase();

  if (key === lowerCasePath) {
    const errorMessage = `Path "${key}" is in lowercase.`;
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  return key
    .replace(/\/src\/screens|\.jsx|\[\.{3}.+\]|\.lazy/g, "")
    .replace(/\[(.+?)\]/g, ":$1")
    .toLowerCase()
    .split("/")
    .filter((p) => p !== "" && !p.includes("_"));
};

const insertRoute = (routes, segments, route) => {
  const insert = /^\w|\//.test(route.path) ? "unshift" : "push";

  const insertNode = (parent, segment, index) => {
    const path = segment.replace(/index|\./g, "");
    const root = index === 0;
    const leaf = index === segments.length - 1 && segments.length > 1;
    const node = !root && !leaf;

    if (root) {
      const dynamic = path.startsWith("[") || path === "*";
      if (dynamic) return parent;
      const last = segments.length === 1;
      if (last) {
        routes.push({ path, ...route });
        return parent;
      }
    }

    if (root || node) {
      const current = root ? routes : parent.children;
      const found = current?.find((route) => route.path === path);
      found
        ? (found.children ??= [])
        : current?.[insert]({ path: path, children: [] });
      return found || current?.[insert === "unshift" ? 0 : current.length - 1];
    }

    if (leaf) {
      parent?.children?.[insert]({ path: path.replace(/\/$/, ""), ...route });
    }

    return parent;
  };

  segments.reduce(insertNode, {});
};

const createEagerRoutes = (eagers) => {
  const routes = Object.keys(eagers).reduce((routes, key) => {
    const route = createRoute(eagers[key], true);
    const segments = createPathSegments(key);
    insertRoute(routes, segments, route);
    return routes;
  }, []);

  return routes;
};

const createLazyRoutes = (lazys) => {
  const routes = Object.keys(lazys).reduce((routes, key) => {
    const route = createRoute(lazys[key], false);
    const segments = createPathSegments(key);
    insertRoute(routes, segments, route);
    return routes;
  }, []);

  return routes;
};

const EagerRoutes = createEagerRoutes(EAGER_ROUTES);

export const LazyRoutes = createLazyRoutes(LAZY_ROUTES);

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: () => <ErrorBoundary isFullPage />,
    children: [...EagerRoutes, ...LazyRoutes],
  },
  { path: "*", Component: NotFound },
]);

export default () => (
  <RouterProvider
    router={router}
    fallbackElement={<Loading />}
    future={{
      v7_startTransition: true,
    }}
  />
);
