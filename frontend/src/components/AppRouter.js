import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FastRecord from "../pages/FastRecord";
import Home from "../pages/Home";
import InitialPage from "../pages/InitialPage";
import Mypage from "../pages/Mypage";
import Record from "../pages/Record";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Storage from "../pages/Storage";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/fastrecord" element={<FastRecord />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/record" element={<Record />}></Route>
          <Route path="/storage" element={<Storage />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
