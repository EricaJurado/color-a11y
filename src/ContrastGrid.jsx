import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isContrastCompliant } from "./colorutils";

const createColorGrid = (backgroundColors, textColors) => {
  let colorGrid = [];
  backgroundColors.forEach((backgroundColor) => {
    let row = [];
    textColors.forEach((textColor) => {
      row.push({
        backgroundColor: backgroundColor.color,
        textColor: textColor.color,
        backgroundName: backgroundColor.name,
        textName: textColor.name,
        isContrastCompliant: isContrastCompliant(
          backgroundColor.color,
          textColor.color
        ),
      });
    });
    colorGrid.push(row);
  });

  return colorGrid;
};

const ContrastGrid = ({ colors }) => {
  const [colorGrid, setColorGrid] = useState(createColorGrid(colors, colors));

  useEffect(() => {
    setColorGrid(createColorGrid(colors, colors));
  }, [colors]);

  return (
    <div id="contrast-grid">
      {/* horizontal label */}
      <div className="color-row hex-label-row">
        <div className="hex-label"></div> {/* Empty cell for top-left corner */}
        {colors.map((color, index) => (
          <div key={index} className="hex-label">
            {color.color}
          </div>
        ))}
      </div>

      {colorGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="color-row">
          {/* vertical label */}
          <div className="hex-label">{colors[rowIndex].color}</div>
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
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      colorname: PropTypes.string,
    })
  ).isRequired,
};

export default ContrastGrid;
