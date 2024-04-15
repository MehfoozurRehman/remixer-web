import { memo } from "react";

export function Case({ children }) {
  return children;
}

export function Default({ children }) {
  return children;
}

function Switch({ expression, children }) {
  const cases = children.filter((child) => child.type.name === "Case");
  const defaultCase = children.find((child) => child.type.name === "Default");

  const selectedCase = cases.find((child) => child.props.value === expression);

  return selectedCase || defaultCase;
}

export default memo(Switch);
