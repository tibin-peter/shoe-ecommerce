import React from "react";
import axios from "axios";
import { useApp } from "../../Context/useApp";
import Navbar from "../Main/Navbar";

const Wishlist = () => {
  const { wishlist, setWishlist } = useApp();

  // Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) =>item.id!==id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="p-6">
      <Navbar/>
      <h1 className="text-4xl font-bold mt-24 mb-4 text-center text-black">My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (
        <p className="text-black ">No items in your wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl shadow p-4 flex flex-col items-center  bg-gray-400"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover mb-3 rounded"
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>
              <p className="text-yellow-500">⭐ {item.rating}</p>

              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
