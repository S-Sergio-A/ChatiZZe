import React from "react";
import "./Switch.css";

interface RegularSwitchProps {
  checked: boolean;
  action: any;
}

export default function Switch({ checked, action }: RegularSwitchProps) {
  return (
    <div className="switch flex a-i-c j-c-c" role="switch">
      <input id="switch" type="checkbox" checked={checked} onChange={action} />
      <label htmlFor="switch" />
    </div>
  );
}
