import React from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmailComp from "./Components/EmailComp";
import About from "./Components/About";
import Contact from "./Components/Contact";
function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<EmailComp />} />
        <Route  path="/about" element={<About />} />
        <Route  path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
