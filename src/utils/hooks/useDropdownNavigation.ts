import { useEffect } from "react";

export default function useDropdownNavigation({
  focused,
  list,
  cursor,
  setCursor,
  onEnterClick,
  onArrowClick,
  deps,
  mustBeRemoved
}: {
  focused: boolean;
  list: any[];
  cursor: number;
  setCursor: (val: number) => void;
  onEnterClick: () => void;
  onArrowClick?: () => void;
  deps?: any[];
  mustBeRemoved?: boolean;
}) {
  useEffect(() => {
    if (mustBeRemoved) {
      document.removeEventListener("keydown", useNavigationKeysListener);
    }

    function useNavigationKeysListener(event: any) {
      if (focused) {
        if (event.code === "ArrowUp" && cursor > 0) {
          setCursor(cursor - 1);
          if (onArrowClick) {
            onArrowClick();
          }
        } else if (event.code === "ArrowDown" && cursor < list.length - 1) {
          setCursor(cursor + 1);
          if (onArrowClick) {
            onArrowClick();
          }
        } else if (event.code === "Enter") {
          onEnterClick();
        }
      }
    }

    document.addEventListener("keydown", useNavigationKeysListener);
    return () => {
      document.removeEventListener("keydown", useNavigationKeysListener);
    };
  }, [focused, mustBeRemoved, deps]);
}
