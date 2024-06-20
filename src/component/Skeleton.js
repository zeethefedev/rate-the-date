import React from "react";

function Skeleton({ width, height, variant }) {
  const skeletonStyle = { width, height };
  return <span className="skeleton" style={skeletonStyle}></span>;
}

export default Skeleton;
