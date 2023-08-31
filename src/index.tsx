import "./App.css";
import React, { ReactElement } from "react";

import Home from "./components/Home";
import "react-toastify/dist/ReactToastify.css";

function App(): ReactElement {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
