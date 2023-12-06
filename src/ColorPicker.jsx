import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { getItemColorForBackground } from "./colorutils";
import { getColorName } from "./colorname";
import PropTypes from "prop-types";

import DeleteIcon from "@mui/icons-material/Delete";

/**
 * ColorPicker component for selecting and managing colors.
 *
 * @component
 * @param {string[]} props.colors - Array of colors
 * @param {function} props.setColors - Function to update colors array
 * @param {number} props.idx - Last index id
 * @param {function} props.setIdx - Function to update last index id
 * @returns {JSX.Element} The ColorPicker component.
 */
const ColorPicker = ({ colors, setColors, idx, setIdx }) => {
  const [color, setColor] = useState("#ffffff");
  const [currColorIndex, setCurrColorIndex] = useState(0);
  const [currColorName, setCurrColorName] = useState("White");

  useEffect(() => {
    if (currColorIndex >= colors.length) {
      setCurrColorIndex(0);
      setColor(colors[0]);
    }
  }, [colors, currColorIndex]);

  const handleColorChange = async (newColor) => {
    setColor(newColor.hex);
    let colorsCopy = [...colors];

    try {
      const colorName = await getColorName(newColor.hex);
      setCurrColorName(colorName);
      colorsCopy[currColorIndex] = {
        color: newColor.hex,
        id: colors[currColorIndex].id,
        colorname: colorName,
      };
      setColors(colorsCopy);
    } catch (error) {
      console.error("Error getting color name:", error);
    }
  };

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        color: color,
        id: idx + 1,
        colorname: currColorName,
      },
    ]);
    setIdx(idx + 1);
    setCurrColorIndex(colors.length);
  };

  const handleRemoveColor = (index) => {
    let colorsCopy = [...colors];
    colorsCopy.splice(index, 1);

    if (index >= colorsCopy.length - 2) {
      setCurrColorIndex(0);
      setColor(colorsCopy[0]);
      setColors(colorsCopy);
    } else {
      setColor(colorsCopy[index]);
      setColors(colorsCopy);
    }
  };

  const handleClearColors = () => {
    setColors([]);
    setCurrColorIndex(0);
  };

  return (
    <>
      <button onClick={handleClearColors}>Clear</button>
      <div id="color-picker">
        <ChromePicker
          color={color}
          onChange={handleColorChange}
          disableAlpha={true}
          id="chrome-picker"
          width="45%"
        />
        <>
          <div id="color-list">
            {colors.map((color, index) => (
              <div
                key={color.id}
                className={
                  index === currColorIndex
                    ? "color-swatch selected"
                    : "color-swatch"
                }
                style={{
                  backgroundColor: color.color,
                }}
                onClick={() => setCurrColorIndex(index)}
              >
                <span
                  className="color-swatch-text"
                  style={{
                    color: getItemColorForBackground(color.color),
                  }}
                >
                  {color.color} {color.colorname}
                </span>
                <DeleteIcon
                  onClick={() => handleRemoveColor(index)}
                  style={{
                    color: getItemColorForBackground(color.color),
                  }}
                />
              </div>
            ))}
            <button onClick={handleAddColor}>Add</button>
          </div>
        </>
      </div>
    </>
  );
};

ColorPicker.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      colorname: PropTypes.string,
    })
  ).isRequired,
  setColors: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  setIdx: PropTypes.func.isRequired,
};

export default ColorPicker;
