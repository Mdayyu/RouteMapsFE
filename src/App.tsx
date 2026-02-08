import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RouteResultPage from "./pages/RouteResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/route" element={<RouteResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

