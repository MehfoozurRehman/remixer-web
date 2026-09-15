import { Children, memo } from "react";

export const Case = ({ children }) => children;

export const Default = ({ children }) => children;

const Switch = ({ expression, children }) => {
  let defaultCase;
  const selectedCase = Children.toArray(children).find((child) => {
    if (child.type === Default) {
      defaultCase = child;
      return false;
    }
    return child.type === Case && child.props.value === expression;
  });

  return selectedCase || defaultCase || null;
};

export default memo(Switch);
