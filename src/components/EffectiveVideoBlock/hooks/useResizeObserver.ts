import { RefObject, useEffect } from "react";

const useResizeObserver = <T extends Element>(
  ref: RefObject<T>,
  ResizeHandler: Function
) => {
  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) =>
        entries.forEach(() => {
          ResizeHandler();
        })
      );

      resizeObserver.observe(ref.current);

      return () => resizeObserver.disconnect();
    }
  }, [ResizeHandler, ref]);
};

export default useResizeObserver;
