import { memo, useRef } from "react";

import { NavLink as RouterNavLink } from "react-router-dom";
import usePrefetchLink from "./usePrefetchLink";

export default memo(({ to, prefetch = true, className, ...props }) => {
  const ref = useRef(null);
  const { handleMouseEnter } = usePrefetchLink(to, prefetch);

  return (
    <RouterNavLink
      ref={ref}
      to={to}
      onMouseEnter={handleMouseEnter}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "pending" : "",
          isActive ? "active" : "",
          isTransitioning ? "transitioning" : "",
          className || "",
        ].join(" ")
      }
      {...props}
    />
  );
});
