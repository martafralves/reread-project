import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigBar from "./components/NavigBar";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

function App() {
  return (
    <Router>
          <NavigBar/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          </Routes>
      </Router>
  );
}

export default App;
