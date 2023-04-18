import { RefObject, useEffect } from "react";

const useWheel = <T extends HTMLElement>(ref: RefObject<T>) => {
  useEffect(() => {
    if (ref.current) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        ref.current?.scrollBy({ left: e.deltaY, behavior: "smooth" });
      };

      ref.current.addEventListener("wheel", handleWheel, { passive: false });

      return () => ref.current?.removeEventListener("wheel", handleWheel);
    }
  }, [ref]);
};

export default useWheel;
