import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./About";
import Archive from "./Archive";
import Decide from "./Decide";
import Home from "./Home";
import Nav from "./Nav";

export default function App() {
  return (
    <div className="font-sen text-slate-700 text-lg">
      <BrowserRouter>
        <Nav />
        <div className="px-10 mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/decide" element={<Decide />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
