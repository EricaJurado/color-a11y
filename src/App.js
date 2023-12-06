import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import ContrastGrid from "./ContrastGrid";
import "./App.scss";

function App() {
  const [idx, setIdx] = useState(0);
  const [colors, setColors] = useState([
    {
      id: 0,
      color: "#FFFFFF",
      colorname: "White",
    },
  ]);
  return (
    <>
      <header>
        <h1>Color A11y</h1>
      </header>
      <main>
        <ColorPicker
          colors={colors}
          setColors={setColors}
          idx={idx}
          setIdx={setIdx}
        />
        <ContrastGrid colors={colors} />
      </main>
    </>
  );
}

export default App;
