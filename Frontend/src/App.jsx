import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sing from "./components/Sing";
import Login from "./components/Login";
import Course from "./components/Coures";
import Contact from "./components/Contact";
import About from "./components/About";
import ForgotPassword from "./components/Forgatepassword";
import ResetPassword from "./components/ResetPassword";
import UploadBook from "./components/UplodeBook";
import NotFound from "./components/NotFound";
import BuyNOW from "./components/BuyNow";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />;
          <Route path="/register" element={<Sing />} />;
          <Route path="/login" element={<Login />} />;
          <Route path="/coures" element={<Course />} />;
          <Route path="/contact" element={<Contact />} />;
          <Route path="/about" element={<About />} />;
          <Route path="/forgot-password" element={<ForgotPassword />} />;
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/uplode-book" element={<UploadBook/>}/>
          <Route path="/buy" element={<BuyNOW/>}/>
          <Route path="*" element={<NotFound/>} /> 


        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
