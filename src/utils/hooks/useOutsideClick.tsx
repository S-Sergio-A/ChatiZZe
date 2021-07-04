import React, { useEffect } from "react";

export default function useOutsideClick(
  elementRef: React.MutableRefObject<any | null>,
  actionToCall: any,
  anotherElementRef?: React.MutableRefObject<any | null>
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (anotherElementRef?.current) {
        if (elementRef.current && !elementRef.current.contains(event.target) && !anotherElementRef.current.contains(event.target)) {
          console.log(elementRef.current.contains(event.target), anotherElementRef.current.contains(event.target));
          actionToCall();
        }
      } else {
        if (elementRef.current && elementRef.current !== event.target) {
          actionToCall();
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [actionToCall, elementRef]);
}
