import React from "react";

const SVG = ({
  style={},
  fill="#000",
  width="100%",
  className="",
  viewBox = "0 0 32 32"
}) => (
  <svg
    width={width}
    style={style}
    heigth={width}
    fill={fill}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill={fill}
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg> 
);
export default SVG;