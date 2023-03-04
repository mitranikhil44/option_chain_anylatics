import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Nifty from "./components/Nifty";
import BankNifty from "./components/BankNifty";
import About from "./components/About";
import Home from "./components/Home";
import "./App.css";
import FinNifty from "./components/FinNifty";

const App = () => {
  const host = `https://scalping-option-chain-backend.vercel.app/`;

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home host={host} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/nifty" element={<Nifty host={host} />} />
          <Route exact path="/bank_nifty" element={<BankNifty host={host} />} />
          <Route exact path="/fin_nifty" element={<FinNifty host={host} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
