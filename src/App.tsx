import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import RouteResultPage from "./pages/RouteResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HALAMAN AWAL */}
        <Route path="/" element={<Landing />} />

        {/* LOGIN ADMIN */}
        <Route path="/login" element={<Login />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* ROUTE RESULT */}
        <Route path="/route" element={<RouteResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

