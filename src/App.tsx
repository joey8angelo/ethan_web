import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
