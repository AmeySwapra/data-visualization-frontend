import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntensityPage from "./pages/IntensityPage";
import RegionPage from "./pages/RegionPage";
import SectorPage from "./pages/SectorPage";
import LikelihoodPage from "./pages/LikelihoodPage";
import RelevancePage from "./pages/RelevancePage";
import CountryPage from "./pages/CountryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntensityPage />} />
          <Route path="/region" element={<RegionPage/>} />
          <Route path="/sector" element={<SectorPage/>} />
          <Route path="/likelihood" element={<LikelihoodPage/>} />
          <Route path="/relevance" element={<RelevancePage/>} />
          <Route path="/country" element={<CountryPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
