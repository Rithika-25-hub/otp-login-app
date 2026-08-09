import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Checkout from "./Pages/Checkout";

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