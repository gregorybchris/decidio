import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import About from "./About";
import Archive from "./Archive";
import Editor from "./Editor";
import Home from "./Home";
import Nav from "./Nav";
import New from "./New";

export default function App() {
  return (
    <div className="font-sen text-slate-700 text-lg">
      <BrowserRouter>
        <Nav />
        <div className="px-10 mt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/editor/:slug" element={<Editor />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
