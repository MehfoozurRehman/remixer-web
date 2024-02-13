import { Suspense, memo, useRef } from "react";

const SuspenseAfterInitialRender = memo(({ fallback, children }) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;
    return <>{children}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
});

export default SuspenseAfterInitialRender;
