import { memo } from "react";

export const True = ({ children }) => <>{children}</>;

export const False = ({ children }) => <>{children}</>;

const Condition = ({ expression, children }) => {
  return expression ? children[0] : children[1];
};

export default memo(Condition);
