import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import React from "react";
import { Button } from "../Button";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [t] = useTranslation();

  return (
    <Button
      ariaLabel={t("ariaLabel.button.top")}
      type="button"
      className="btn-sec btn-top"
      onClick={() =>
        timer(20).subscribe(() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        )
      }
      tabIndex={3000}
    >
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512.005 512.005" xmlSpace="preserve">
        <path
          d="M466.22,205.787L263.553,3.12c-4.16-4.16-10.923-4.16-15.083,0L45.804,205.787c-21.803,21.803-21.803,57.28,0,79.083
          s57.28,21.803,79.083,0l77.781-77.781v251.584c0,29.397,23.936,53.333,53.333,53.333s53.333-23.936,53.333-53.333V207.088
          l77.781,77.781c21.803,21.803,57.28,21.803,79.083,0C488.001,263.088,488.001,227.589,466.22,205.787z"
        />
      </svg>
    </Button>
  );
}
