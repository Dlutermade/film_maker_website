import { useEffect, useState } from "react";

const useScrollHidden = (hiddenPx: number) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handler = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      setHidden(scrollTop > lastScrollTop && scrollTop > hiddenPx);

      lastScrollTop = scrollTop;
    };

    document.addEventListener("scroll", handler);

    return () => document.removeEventListener("scroll", handler);
  }, [hiddenPx]);

  return {
    hidden,
  };
};

export default useScrollHidden;
