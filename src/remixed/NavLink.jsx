import { memo, useCallback, useRef } from "react";

import { NavLink as RouterLink } from "react-router-dom";
import usePrefetchLink from "../../router/usePrefetchLink";

const NavLink = ({ to, prefetch = true, ...props }) => {
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => {
    usePrefetchLink(to, prefetch).handleMouseEnter();
  }, [to, prefetch]);

  return (
    <RouterLink ref={ref} to={to} onMouseEnter={handleMouseEnter} {...props} />
  );
};

export default memo(NavLink);
