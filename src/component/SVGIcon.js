import React from "react";
import { ICONS } from "../utils/icon";
import "../style/SubComponent.css";

function SVGIcon({
  icon,
  color = "currentColor",
  height = "1em",
  width = "1em",
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
          viewBox={currentIcon.viewBox || "0 0 1024 1024"}
          fill={disabled ? "gray" : color}
          height={height}
          width={width}
        >
          {currentIcon.path.length > 1 ? (
            <g fill={disabled ? "gray" : color} fillRule={currentIcon.fillRule}>
              {currentIcon.path.map((p) => (
                <path d={p} />
              ))}
            </g>
          ) : (
            <path fillRule={currentIcon.fillRule} d={currentIcon.path[0]} />
          )}
        </svg>
      )}
    </div>
  );
}

export default SVGIcon;
