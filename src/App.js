import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import ContrastGrid from "./ContrastGrid";
import "./App.scss";

function App() {
  const [colors, setColors] = useState([]);
  return (
    <div className="App">
      <h1>Color A11y</h1>
      <ColorPicker colors={colors} setColors={setColors} />
      <ContrastGrid colors={colors} />
    </div>
  );
}

export default App;
