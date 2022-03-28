import { useEffect, useRef } from "react";

export const useObserver = (ref, isLoading, callback) => {
  const observer = useRef();

  useEffect(() => {
    if (!(isLoading || !ref?.current)) {
      if (observer.current) observer.current.disconnect();

      let options = {
        root: null,
        threshold: 0,
      };

      const callbackObserver = (entries, observer) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      };

      observer.current = new IntersectionObserver(callbackObserver, options);
      observer.current.observe(ref.current);
    }
  }, [isLoading, ref]);
};
