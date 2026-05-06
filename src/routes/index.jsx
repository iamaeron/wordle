import { Route, Routes } from "react-router-dom";
import Home from "./home";
import Solo from "./solo";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solo" element={<Solo />} />
    </Routes>
  );
}
