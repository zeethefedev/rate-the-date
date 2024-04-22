import React from "react";
import { ICONS } from "../utils/icon";
import { toElement } from "../utils/methods";

import "../style/SubComponent.css";

function SVGIcon({
  icon,
  strokeColor = "currentColor",
  height = "16",
  width = "16",
  disabled,
}) {
  const currentIcon = ICONS.find((ic) => ic.name === icon);
  return (
    <div
      className="icon-wrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={height}
          width={width}
          viewBox="0 0 24 24"
          fill={disabled ? "none" : currentIcon.fill || "none"}
          stroke={disabled ? "gray" : strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {toElement(currentIcon.rendered)}
        </svg>
      )}
    </div>
  );
}

export default SVGIcon;
