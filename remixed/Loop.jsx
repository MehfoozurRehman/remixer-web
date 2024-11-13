import React, { memo } from "react";

function Loop({ iterations = 1, children }) {
  return (
    <>
      {Array.from({ length: iterations }, (_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ))}
    </>
  );
}

export default memo(Loop);
