import React, { useEffect } from "react";

export default function useOutsideClick(elementRef: React.MutableRefObject<any | null>, actionToCall: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        elementRef.current && !elementRef.current.contains(event.target)
      ) {
        actionToCall();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [actionToCall, elementRef]);
}
