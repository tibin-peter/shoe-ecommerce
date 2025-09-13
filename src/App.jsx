import React from 'react';
import './App.css';
import Login from './Authentication/Login';
import Registration from './Authentication/Registration';
import Navbar from './UserComponents/Main/Navbar';
import Home from './UserComponents/Main/Home';
import { Routes, Route } from 'react-router-dom';
import Slides from './UserComponents/Main/Slides';
import Products from './UserComponents/Products/Products';
import Logout from './Authentication/Logout';
import Details from './UserComponents/Products/Details';
import Wishlist from './UserComponents/Products/Wishlist';
import Footer from './UserComponents/Main/Footer';
import Categories from './UserComponents/Products/Categories';
import Orders from './UserComponents/OrderandPayment/Orders';
import Payment from "./UserComponents/OrderandPayment/Payment";
import Cart from './UserComponents/Products/Cart';
import Dashboard from './Admin/Dashboard';
import AuthRoute from './Context/AuthRoute';
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path='/products' element={<Products />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Slides' element={<Slides />} />
        <Route path='/Footer' element={<Footer />} />


        {/* Restricted pages for guests */}
        <Route path="/Login" element={<AuthRoute restricted><Login /></AuthRoute>} />
        <Route path="/Registration" element={<AuthRoute restricted><Registration /></AuthRoute>} />

        {/* Protected routes for logged in users */}
        <Route path='/Logout' element={<AuthRoute requireAuth><Logout /></AuthRoute>} />
        <Route path='/wishlist' element={<AuthRoute requireAuth><Wishlist /></AuthRoute>} />
        <Route path='/Payment' element={<AuthRoute requireAuth><Payment /></AuthRoute>} />
        <Route path='/Cart' element={<AuthRoute requireAuth><Cart /></AuthRoute>} />
        <Route path='/Orders' element={<AuthRoute requireAuth><Orders /></AuthRoute>} />

        {/* Admin-only route */}
        <Route path='/Dashboard' element={<AuthRoute requireAuth requireRole="admin"><Dashboard /></AuthRoute>} />
      </Routes>
    </>
  );
}

export default App;
