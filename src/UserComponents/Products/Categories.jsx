import React from "react";
import { Link} from "react-router-dom";
const Categories = () => {
 

  return (
    <div className="max-w-6xl mx-auto ">
      <h2 className="text-4xl font-bold mb-6 text-center text-black mt-4 ">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Men */}
        <Link to="/products?category=Men&page=1" className="relative group">
          <img
            src="https://coveti.com/wp-content/uploads/2024/01/688ce0ff248282cdbbd636cff1e460c9.webp"
            alt="Men Shoes"
            
            className="w-full h-150  object-cover rounded-2xl shadow-md group-hover:opacity-90 transition"
          />
          <span className="absolute inset-0 flex items-center justify-center text-red-500  text-2xl font-bold bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition">
            Men
          </span>
        </Link>

        {/* Women */}
        <Link to="/products?category=Women&page=1" className="relative group">
          <img
            src="https://www.skechers.in/dw/image/v2/BGNZ_PRD/on/demandware.static/-/Sites-skechersin-Library/default/dw70136452/EOSS/Mobile/24-09-SKECHERS-12215500-MK-400px-x-500px-ANANYA-PINK-HOARDING_CC.jpg?sw=780&q=95"
            alt="Women Shoes"
            className="w-full h-150 object-cover rounded-2xl shadow-md group-hover:opacity-90 transition"
          />
          <span className="absolute inset-0 flex items-center justify-center text-red-500 text-2xl font-bold bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition">
            Women
          </span>
        </Link>

        {/* Kids */}
        <Link to="/products?category=Kids&page=1" className="relative group">
          <img
            src="https://qwintry.com/ru/file/view/kids-shoes-sale-picture-1.jpg"
            alt="Kids Shoes"
            className="w-full h-150 object-cover rounded-2xl shadow-md group-hover:opacity-90 transition"
          />
          <span className="absolute inset-0 flex items-center justify-center text-red-500 text-2xl font-bold bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition">
            Kids
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Categories;

