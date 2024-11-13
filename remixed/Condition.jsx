import { memo } from "react";

export function True({ children }) {
  return children;
}

export function False({ children }) {
  return children;
}

function Condition({ expression, children }) {
  return expression ? children[0] : children[1];
}

export default memo(Condition);
