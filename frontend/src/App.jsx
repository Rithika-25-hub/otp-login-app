import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;