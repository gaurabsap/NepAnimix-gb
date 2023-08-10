import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import { ContextApi } from "./pages/context/Context";
import AdWatch from "./pages/AdWatch";
function App() {
  return (
    <>
      <ContextApi>
        <div className="flex flex-col">
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/anime/:id" element={<AdWatch />} />
              <Route path="/search" element={<Search />} />
            </Routes>
            {/* <Popular /> */}
          </BrowserRouter>
        </div>
      </ContextApi>
    </>
  );
}

export default App;
