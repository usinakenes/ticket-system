import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// screens and routes
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Event from './pages/Event/Event'
import MyTickets from './pages/MyTickets/MyTickets';
import Navbar from './components/Navbar/Navbar';
import { useDispatch } from "react-redux";
import { setLoggedIn, setLoggedOut } from "./redux/loggedIn";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = () => {
      fetch("/api/auth/login/success")
        .then(res => res.json())
        .then(data => {
          if (data.ok) {
            dispatch(setLoggedIn(data.user));
          }
          else{
            dispatch(setLoggedOut());
          }
        });
    }
    getUser();
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventId" element={<Event />} />
          <Route path="/event/:eventId/popup" element={<Event />} />
          <Route path="/my-tickets" element={<MyTickets />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;