import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Search from "./pages/Search";

import { ContextApi } from "./pages/context/Context";
import AdWatch from "./pages/AdWatch";
import Genre from "./pages/Genre";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Details from "./pages/Details";
import Watch from "./pages/Watch";
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <ContextApi>
        <LoadingBar
          color={"red"}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="flex flex-col">
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/anime/:id" element={<AdWatch />} />
              <Route path="/search" element={<Search />} />
              <Route path="/genre/:id" element={<Genre />} />
              <Route path="/watch/:id" element={<Watch />} />
            </Routes>
            {/* <Popular /> */}
          </BrowserRouter>
        </div>
      </ContextApi>
    </>
  );
}

export default App;
