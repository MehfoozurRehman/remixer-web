import { Suspense, memo, useRef } from "react";

import Loading from "@/layouts/Loading";

const SuspenseAfterInitialRender = ({ fallback = <Loading />, children }) => {
  const isInitialRenderRef = useRef(true);

  if (isInitialRenderRef.current) {
    isInitialRenderRef.current = false;
    return <>{children}</>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default memo(SuspenseAfterInitialRender);
