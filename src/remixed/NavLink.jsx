import { memo, useCallback, useRef } from "react";

import { NavLink as RouterLink } from "react-router-dom";
import usePrefetchLink from "@router/usePrefetchLink";

const NavLink = ({ to, prefetch = true, ...props }) => {
  const ref = useRef(null);

  const prefetchLink = usePrefetchLink(to, prefetch);

  const handleMouseEnter = useCallback(() => {
    prefetchLink.handleMouseEnter();
  }, [to, prefetch]);

  return (
    <RouterLink ref={ref} to={to} onMouseEnter={handleMouseEnter} {...props} />
  );
};

export default memo(NavLink);
