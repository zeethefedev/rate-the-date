import React from "react";
import { ICONS } from "../utils/icon";

function SVGIcon({
  icon,
  color = "currentColor",
  height = "1em",
  width = "1em",
  disabled,
}) {
  const currentIcon = ICONS.find((ic) => ic.name === icon);
  return (
    <div>
      {currentIcon && (
        <svg
          viewBox={currentIcon.viewBox || "0 0 1024 1024"}
          fill={disabled ? "gray" : color}
          height={height}
          width={width}
        >
          <path fillRule={currentIcon.fillRule} d={currentIcon.path} />
        </svg>
      )}
    </div>
  );
}

export default SVGIcon;
