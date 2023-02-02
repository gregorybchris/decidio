import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import About from "./About";
import Editor from "./Editor";
import Home from "./Home";
import Library from "./Library";
import Nav from "./Nav";
import New from "./New";

export default function App() {
  return (
    <div className="font-sen text-lg text-slate-700">
      <BrowserRouter>
        <Nav />
        <div className="mt-12 px-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/editor/:slug" element={<Editor />} />
            <Route path="/library" element={<Library />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
