import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { getItemColorForBackground } from "./colorutils";

import DeleteIcon from "@mui/icons-material/Delete";

/**
 * ColorPicker component for selecting and managing colors.
 *
 * @component
 * @param {string[]} props.colors - Array of colors
 * @param {function} props.setColors - Function to update colors array
 * @returns {JSX.Element} The ColorPicker component.
 */
const ColorPicker = ({ colors, setColors }) => {
  const [color, setColor] = useState("#ffffff");
  const [currColorIndex, setCurrColorIndex] = useState(0);

  useEffect(() => {
    if (currColorIndex >= colors.length) {
      setCurrColorIndex(0);
      setColor(colors[0]);
    }
  }, [colors, currColorIndex]);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    let colorsCopy = [...colors];
    colorsCopy[currColorIndex] = newColor.hex;
    setColors(colorsCopy);
  };

  const handleAddColor = () => {
    setColors([...colors, color]);
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
                key={index}
                className={
                  index === currColorIndex
                    ? "color-swatch selected"
                    : "color-swatch"
                }
                style={{
                  backgroundColor: color,
                }}
                onClick={() => setCurrColorIndex(index)}
              >
                <span
                  className="color-swatch-text"
                  style={{
                    color: getItemColorForBackground(color),
                  }}
                >
                  {color}
                </span>
                <DeleteIcon
                  onClick={() => handleRemoveColor(index)}
                  style={{
                    color: getItemColorForBackground(color),
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

export default ColorPicker;
