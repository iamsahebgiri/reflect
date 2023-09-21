import { useEffect, useRef } from "react";

type RefType = HTMLElement | null;

const useOutsideHover = (
  ref: React.RefObject<RefType>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [ref, callback]);
};

export default useOutsideHover;
