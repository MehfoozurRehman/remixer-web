import { memo } from "react";

function Loop({ iterations = 1, children }) {
  const loop = Array.from({ length: iterations }, (_, i) => i);

  return loop.map((_, i) => (
    <React.Fragment key={i}>{children}</React.Fragment>
  ));
}

export default memo(Loop);
