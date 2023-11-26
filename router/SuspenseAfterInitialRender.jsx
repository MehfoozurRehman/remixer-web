import { Suspense, memo, useRef } from "react";

export default memo(({ fallback, children }) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;
    return <>{children}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
});
