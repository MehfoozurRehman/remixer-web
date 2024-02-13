import { memo, useRef } from "react";

import { NavLink as RouterNavLink } from "react-router-dom";
import usePrefetchLink from "./usePrefetchLink";

const NavLink = memo(({ to, prefetch = true, className, ...props }) => {
  const ref = useRef(null);
  const { handleMouseEnter } = usePrefetchLink(to, prefetch);

  const linkClassName = ({ isActive, isPending, isTransitioning }) => {
    const classNames = [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
      className || "",
    ];
    return classNames.join(" ");
  };

  return (
    <RouterNavLink
      ref={ref}
      to={to}
      onMouseEnter={handleMouseEnter}
      className={linkClassName}
      {...props}
    />
  );
});

export default NavLink;
