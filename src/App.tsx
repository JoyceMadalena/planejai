import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Simulation from "./pages/Simulation";
import Summary from "./pages/Summary";
import Diagnosis from "./pages/Diagnosis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/simulacao" element={<Simulation />} />

        <Route path="/resumo" element={<Summary />} />

        <Route path="/diagnostico" element={<Diagnosis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
