import React, { useState } from "react";
import { ChromePicker } from "react-color";

const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");
  const [colorList, setColorList] = useState(["#ffffff"]);
  const [currColorIndex, setCurrColorIndex] = useState(0);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    let colors = [...colorList];
    colors[currColorIndex] = newColor.hex;
    setColorList(colors);
  };

  const handleAddColor = () => {
    setColorList([...colorList, color]);
    setCurrColorIndex(colorList.length);
  };

  const handleClearColors = () => {
    setColorList([]);
    setCurrColorIndex(0);
  };

  function getTextColorForBackground(backgroundColor) {
    const threshold = 128;
    const [r, g, b] = hexToRgb(backgroundColor);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const labelTextColor = luminance > threshold ? "#000000" : "#ffffff";
    return labelTextColor;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

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
            {colorList.map((color, index) => (
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
