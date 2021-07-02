import React, { useState } from "react";
import { Button } from "../Button";
import "./MenuButton.css";
import { useTranslation } from "react-i18next";

export default function MenuButton() {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();

  return (
    <Button
      className="btn-i-l btn-i d-t"
      type="button"
      onClick={() => {
        if (clicksCount !== 0) {
          setToggle(!(clicksCount % 2));
        } else {
          setToggle(true);
        }
        setClicksCount(clicksCount + 1);
      }}
      ariaLabel={t("navbar.ariaLabel.langButton")}
    >
      <img src="http://localhost:3000/icons/menu.svg" alt="" className="icon" />
    </Button>
  );
}
