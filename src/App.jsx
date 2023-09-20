import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import Search from "./pages/Search";

import { ContextApi } from "./pages/context/Context";
import AdWatch from "./pages/AdWatch";
import Genre from "./pages/Genre";

import Details from "./pages/Details";
import Watch from "./pages/Watch";
import { AnimeVideo } from "./pages/context/AnimeContext";
import Schedule from "./pages/Schedule";
import { Scedule } from "./pages/context/Scedule";
import { Auth } from "./pages/auth/authContext";
import { AddReact } from "./pages/context/React";

function App() {
  return (
    <>
      <AddReact>
        <Auth>
          <Scedule>
            <ContextApi>
              <AnimeVideo>
                <div className="flex flex-col">
                  <BrowserRouter>
                    {/* <Nav /> */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/details/:id" element={<Details />} />
                      <Route path="/anime/:id" element={<AdWatch />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/genre/:id" element={<Genre />} />
                      <Route path="/watch/:id" element={<Watch />} />
                      <Route path="/scedule" element={<Schedule />} />
                    </Routes>
                    {/* <Popular /> */}
                  </BrowserRouter>
                </div>
              </AnimeVideo>
            </ContextApi>
          </Scedule>
        </Auth>
      </AddReact>
    </>
  );
}

export default App;
