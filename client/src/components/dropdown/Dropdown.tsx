import React, { useEffect, useState } from "react";
import { timer } from "rxjs";
import useKeyDown from "../../utils/hooks/useKeyDown";
import "./Dropdown.css";

export const Dropdown = ({
  focused,
  setFocused,
  list,
  dropdownRef,
  children
}: {
  focused: boolean;
  setFocused: (val: boolean) => void;
  list?: any[];
  dropdownRef: React.MutableRefObject<any>;
  children?: any;
}) => {
  const [cursor, setCursor] = useState(0);

  const [firstRender, setFirstRender] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (focused && firstRender) {
      setFirstRender(false);
    } else if (!focused && !firstRender) {
      timer(300).subscribe(() => setHide(true));
    } else if (focused && !firstRender) {
      setHide(false);
    }
  }, [focused]);

  function useKeyDownListener() {
    useEffect(() => {
      function handleKeyDown(event: any) {
        if (focused && list) {
          if (event.code === "ArrowUp" && cursor > 0) {
            setCursor(cursor - 1);
          } else if (event.code === "ArrowDown" && cursor < list.length - 1) {
            setCursor(cursor + 1);
          } else if (event.code === "Enter") {
            list[cursor].click();
          }
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [focused]);
  }

  useKeyDownListener();

  useKeyDown(
    "Escape",
    () => {
      if (dropdownRef.current) {
        setHide(true);
        setFocused(false);
      }
    },
    [dropdownRef]
  );

  return (
    <div
      className={`${firstRender ? "none" : ""} ${hide ? "none" : ""} ${focused ? "show-dropdown" : "hide-dropdown"} dropdown`}
      ref={dropdownRef}
    >
      {list ? (
        <ul role="menu" className="flex j-c-f-s a-i-c f-f-c-n">
          {list &&
            list.map((item, index) => (
              <li key={index} className="flex a-i-c j-c-c f-w">
                {item}
              </li>
            ))}
        </ul>
      ) : (
        children
      )}
    </div>
  );
};
