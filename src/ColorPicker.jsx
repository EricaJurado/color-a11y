import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { hexToRgb } from "./colorutils";

const ColorPicker = ({ colors, setColors }) => {
  const [color, setColor] = useState("#ffffff");
  const [currColorIndex, setCurrColorIndex] = useState(0);

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

  const handleClearColors = () => {
    setColors([]);
    setCurrColorIndex(0);
  };

  const getTextColorForBackground = (backgroundColor) => {
    const threshold = 128;
    const [r, g, b] = hexToRgb(backgroundColor);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const labelTextColor = luminance > threshold ? "#000000" : "#ffffff";
    return labelTextColor;
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
                className="color-swatch"
                style={{
                  backgroundColor: color,
                }}
                onClick={() => setCurrColorIndex(index)}
              >
                <span
                  className="color-swatch-text"
                  style={{
                    color: getTextColorForBackground(color),
                  }}
                >
                  {color}
                </span>
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
