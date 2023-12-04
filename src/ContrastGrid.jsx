import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isContrastCompliant } from "./colorutils";

const createColorGrid = (backgroundColors, textColors) => {
  let colorGrid = [];
  backgroundColors.forEach((backgroundColor) => {
    let row = [];
    textColors.forEach((textColor) => {
      row.push({
        backgroundColor: backgroundColor,
        textColor: textColor,
        isContrastCompliant: isContrastCompliant(backgroundColor, textColor),
      });
    });
    colorGrid.push(row);
  });

  return colorGrid;
};

const ContrastGrid = ({ colors }) => {
  const [colorGrid, setColorGrid] = useState(createColorGrid(colors, colors));

  useEffect(() => {
    console.log(colors);
    setColorGrid(createColorGrid(colors, colors));
  }, [colors]);

  return (
    <div>
      {colorGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="color-row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="color-swatch"
              style={{
                backgroundColor: color.backgroundColor,
                color: color.textColor,
              }}
            >
              {color.isContrastCompliant ? "✓" : "✕"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

ContrastGrid.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContrastGrid;
