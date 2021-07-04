import React, { useContext, useEffect, useRef } from "react";
import { Button } from "../Button";
import "./MenuButton.css";
import { useTranslation } from "react-i18next";
import { MenuContext } from "../../../context/menu/MenuContext";

export default function MenuButton() {
  const [t] = useTranslation();
  const { showMenu, setRef } = useContext(MenuContext);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    setRef(menuButtonRef);
  }, [menuButtonRef]);

  return (
    <Button
      className="btn-pr btn-i d-t"
      type="button"
      onClick={() => {
        showMenu(true);
      }}
      ariaLabel={t("navbar.ariaLabel.langButton")}
      buttonRef={menuButtonRef}
    >
      <span className="flex a-i-c j-c-c">
        <img src="http://localhost:3000/icons/menu.svg" alt="" className="icon" />
      </span>
    </Button>
  );
}
