import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = <T extends Element>(
  ref: RefObject<T>,
  intersectionRatioCallbackList: [number, Function][],
  notIntersectionCallback?: Function
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    const thresholds = intersectionRatioCallbackList.map(
      ([intersectionRatio]) => intersectionRatio
    );

    const onIntersectionChange: IntersectionObserverCallback = (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          notIntersectionCallback?.();
        } else {
          let isCalled = false;
          intersectionRatioCallbackList.forEach(([intersectionRatio, cb]) => {
            if (entry.intersectionRatio >= intersectionRatio && !isCalled) {
              cb();
              isCalled = true;
            }
          });
        }

        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      });

    const observer = new IntersectionObserver(onIntersectionChange, {
      threshold: thresholds,
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, notIntersectionCallback, intersectionRatioCallbackList]);

  return {
    isIntersecting,
    intersectionRatio,
  };
};

export default useIntersectionObserver;
