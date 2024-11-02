import React from "react";
import "./Card.css";

interface CardProps {
  backType?: "gray" | "default";
  layoutType: "grid" | "flex";
  className?: string;
  children: any;
}

export const Card = ({ backType = "default", className = "", layoutType = "flex", children }: CardProps) => {
  return (
    <div className={`card ${layoutType === "flex" ? "flex j-c-c a-i-c f-f-c-n" : "grid"} ${backType} ${className ? className : ""}`}>
      {children}
    </div>
  );
};
