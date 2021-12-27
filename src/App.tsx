import "./App.css";

import React from "react";

import Home from "./container/Home";
import { mockShirtList } from "./container/Home/Home.constant";

function App() {
  return (
    <div>
      <Home mockShirtList={mockShirtList} />
    </div>
  );
}

export default App;
