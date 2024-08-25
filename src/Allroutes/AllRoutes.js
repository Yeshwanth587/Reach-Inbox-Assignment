import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import DashBoard from '../pages/DashBoard';

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AllRoutes;