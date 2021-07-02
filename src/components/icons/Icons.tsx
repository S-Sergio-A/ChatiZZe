import React from "react";
import arrowL from "../../../assets/images/icons/arrow-left_black.svg";
import arrowR from "../../../assets/images/icons/arrow-right_black.svg";

interface Icon {
  ariaLabel?: string;
}

function PrevIcon({ ariaLabel }: Icon) {
  return (
    <span className="btn-s btn-i" aria-label={ariaLabel}>
      <img src={arrowL} alt="" className="icon" />
    </span>
  );
}

function NextIcon({ ariaLabel }: Icon) {
  return (
    <span className="btn-s btn-i" aria-label={ariaLabel}>
      <img src={arrowR} alt="" className="icon" />
    </span>
  );
}

export { PrevIcon, NextIcon };
