import { memo, useCallback, useRef } from "react";

import { Link as RouterLink } from "react-router-dom";
import usePrefetchLink from "../../router/usePrefetchLink";

const Link = ({ to, prefetch = true, ...props }) => {
  const ref = useRef(null);

  const handleMouseEnter = useCallback(() => {
    usePrefetchLink(to, prefetch).handleMouseEnter();
  }, [to, prefetch]);

  return (
    <RouterLink ref={ref} to={to} onMouseEnter={handleMouseEnter} {...props} />
  );
};

export default memo(Link);
