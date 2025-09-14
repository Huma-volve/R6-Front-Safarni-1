import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Favorite from "./pages/Favorite/Favorite";
import Compare from "./pages/Compare/Compare";
import Layout from "./components/layout/layout";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Tour from "./pages/Tours/Tours";
import NotFound from "./pages/NotFound/NotFound";
import DestinationPage from "./pages/DestinationPage/DestinationPage";
import ScrollToTop from "./components/ScrollTop/ScrollTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="compare" element={<Compare />} />
          <Route path="maps" element={<Map />} />
          <Route path="tours" element={<Tour />} />
          <Route path="destination/:id" element={<DestinationPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
