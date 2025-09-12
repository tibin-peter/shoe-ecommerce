import React from "react"; 
import Slides from "./Slides";
import Footer from "./Footer";
import Categories from "../Products/Categories";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
   <>
   <Navbar/>
    <div className="bg-white ">
      <div
        className="h-screen  bg-cover bg-center "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1712167631738-4dab9e53c853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Page text */}
        <div className=" pt-70">
          <h1 className="text-white text-4xl font-bold pl-20">
            Nike <br /> Men's Air Force
          </h1>
          <Link to={"/Products"}>
            <button className="px-6 py-3 ml-20 mt-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
      <Slides />
      <Categories />
      <Footer />
    </div>
    </>
  );
};

export default Home;
