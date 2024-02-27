import.meta.glob("/src/styles/*.(scss|css)", { eager: true });

import { Fragment, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "@layouts/App";
import ErrorBoundary from "@layouts/Error";
import Loading from "@layouts/Loading";
import NotFound from "@layouts/NotFound";

const LAZY_ROUTES = import.meta.glob("/src/screens/**/*.lazy.jsx");

const EAGER_ROUTES = import.meta.glob(
  ["/src/screens/**/*.jsx", "!/src/screens/**/*.lazy.jsx"],
  { eager: true }
);

const getAction = async (module, ...args) => {
  const { action } = await module();
  return action && typeof action === "function" ? action(...args) : null;
};

const getLoader = async (module, ...args) => {
  const { loader } = await module();
  return loader && typeof loader === "function" ? loader(...args) : null;
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

const createRoutes = (routes, modules, isEager) => {
  const keys = Object.keys(modules);
  const length = keys.length;
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    const route = createRoute(modules[key], isEager);
    const segments = createPathSegments(key);
    insertRoute(routes, segments, route);
  }
  return routes;
};

const EagerRoutes = createRoutes([], EAGER_ROUTES, true);
export const LazyRoutes = createRoutes([], LAZY_ROUTES, false);

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
    future={{ v7_startTransition: true }}
  />
);
