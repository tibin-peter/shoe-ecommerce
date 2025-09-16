import React from "react"; 
import Slides from "./Slides";
import Footer from "./Footer";
import Categories from "../Products/Categories";
import Navbar from "./Navbar";
import Products from "../Products/Products";

const Home = () => {
  return (
   <>
   <Navbar/>
    <div className="bg-white  from-gray-300 to-gray-700">
      <div
        className="h-screen  bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw359333f9/Campaign-Run-Landing/Desktop-Campaign-Run-Landing/orange-aero-burst-hero-desktop-10-09-2025.jpg?sw=1600&q=95')",
        }}
      >
        {/* Page text */}
        
      </div>
      <Slides />
      <Categories />
      <Products/>
      <Footer />
    </div>
    </>
  );
};

export default Home;
