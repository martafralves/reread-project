import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigBar from "./components/NavigBar";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";
import AddBook from "./views/AddBook";
import EditBook from "./views/EditBook";
import BookProfile from "./views/BookProfile";
import Search from "./views/Search";

function App() {
  return (
    <div>
    <Router>
          <NavigBar/>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/addbook" element={<AddBook/>}/>
          <Route path="/editbook/:id" element={<EditBook/>}/>
          <Route path="/book/:id" element={<BookProfile/>}/>
          <Route path="/search" element={<Search/>}/>
          </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
