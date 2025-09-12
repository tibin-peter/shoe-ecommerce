import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Main/Navbar";
import { useApp } from "../../Context/useApp";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { wishlist, addToWishlist, addToCart } = useApp();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category") || "";
  const page = parseInt(queryParams.get("page")) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        let data = res.data;

        if (category) {
          data = data.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
        }

        setProducts(data);
        setCurrentPage(page);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [category, page]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "lowToHigh") return a.price - b.price;
    if (sort === "highToLow") return b.price - a.price;
    return 0;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-700">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl md:text-4xl mt-20 font-extrabold text-center text-yellow-400 mb-10 tracking-wide">
          {category ? `${category} Collection` : "Explore All Products"}
        </h2>

        {/* Sort Dropdown */}
        <div className="flex justify-end mb-8">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 shadow hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800  rounded-2xl shadow-lg overflow-hidden hover:shadow-yellow-500/40 hover:scale-[1.02] transition duration-300 relative"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => addToWishlist(product)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900 shadow-md hover:bg-yellow-700 transition"
              >
                <Heart
                  className={`w-6 h-6 ${
                    wishlist.some((item) => item.id === product.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-300"
                  }`}
                />
              </button>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-70 object-cover"
              />

              {/* Product Info */}
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">${product.price}</p>
                <p className="text-yellow-400 text-sm mb-4">
                  ⭐⭐⭐ {product.rating}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="text-yellow-400 font-medium underline mb-4 block hover:text-yellow-300 transition"
                >
                  View Details
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}

        <div className="flex justify-center items-center mt-12 space-x-4">
          {/* Previous button */}
          {currentPage > 1 && (
            <Link
              to={`/products?category=${category}&page=${currentPage - 1}`}
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition"
            >
              ⬅️ Previous
            </Link>
          )}

          {/* Current page indicator */}
          <span className="px-4 py-2 font-semibold text-gray-800 bg-yellow-300 rounded-lg shadow-md">
            {currentPage}
          </span>

          {/* Next button */}
          {currentPage < totalPages && (
            <Link
              to={`/products?category=${category}&page=${currentPage + 1}`}
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition"
            >
              Next ➡️
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
