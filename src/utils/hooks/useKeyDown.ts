import { useEffect } from "react";

export default function useKeyDown(keyCode: string, onClick: () => void, deps?: any[], mustBeRemoved?: boolean) {
  useEffect(() => {
    if (mustBeRemoved) {
      document.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(event: any) {
      const condition = deps ? deps.every((m) => Boolean(m)) : true;
      if (condition && event.code === keyCode && !event.shiftKey) {
        event.preventDefault();
        onClick();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, deps, mustBeRemoved]);
}
