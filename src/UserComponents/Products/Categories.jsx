import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <h2 className="text-1xl md:text-4xl  text-center text-black mb-12">
        Shop By Gender
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Men */}
        <div className="flex flex-col items-center">
          <img
            src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw60e174bd/Home-Page/Desktop/ITG69566_MRKTG_FALL25_M_SPORT_STAIRS_CONCRETE_W_700-x-H_609-pixels_Only-Model.jpg?sw=500&q=95"
            alt="Men Shoes"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
          <Link
            to="/products?category=Men&page=1"
            className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            SHOP MEN'S &gt;&gt;
          </Link>
        </div>

        {/* Women */}
        <div className="flex flex-col items-center">
          <img
            src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw746ab1d6/Home-Page/Desktop/Only-Model_ITG69708_MRKTG_F25_W_CC_STEPS_700px-x-609px.jpg?sw=500&q=95"
            alt="Women Shoes"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
          <Link
            to="/products?category=Women&page=1"
            className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            SHOP WOMEN'S &gt;&gt;
          </Link>
        </div>

        {/* Kids */}
        <div className="flex flex-col items-center">
          <img
            src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw12ea3609/Home-Page/Desktop/Only-Model_ITG66989_SP25_KIDS_G_PIGTAILS_CHECKERS_P_700px-x-609px_V1.jpg?sw=500&q=95"
            alt="Kids Shoes"
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
          <Link
            to="/products?category=Kids&page=1"
            className="mt-4 text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            SHOP KIDS &gt;&gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
