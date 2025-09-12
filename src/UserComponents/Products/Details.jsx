import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heart } from "lucide-react";
import { useApp } from "../../Context/useApp";
import Navbar from "../Main/Navbar";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {
    addToCart,
    cart,
    addToWishlist,
    increaseQuantity,
    decreaseQuantity,
    wishlist,
    placeOrder,
  } = useApp();
  const inCart = cart?.find((item) => item.productId === product?.id);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-8 items-start mt-26 bg-gray-900">
        {/* Left Product Image */}
        <div className="flex justify-center align-middle">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl shadow-lg w-full max-w-md object-cover transition duration-300 hover:scale-110 hover:shadow-2xl hover:brightness-90"
          />
        </div>

        {/* Right Product Info */}
        <div className="space-y-4 mt-20">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <button
              onClick={() => addToWishlist(product)}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlist.some((item) => item.id === product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500"
                }`}
              />
            </button>
          </div>

          <p className="text-lg font-semibold text-white">
            Price: <span className="text-green-600">${product.price}</span>
          </p>

          <p className="text-white-600">{product.discription}</p>

          <p className="text-yellow-500 font-medium">⭐ {product.rating}</p>

          <div className="flex gap-4 mt-6">
            {/* <button
              onClick={() => addToCart(product)}
              className=" ml-5 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Add to Cart
            </button> */}
            <>
              {!inCart ? (
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(inCart.id)}
                    disabled={inCart.quantity <= 1}
                    className="px-4 py-2  bg-blue-600 rounded text-white disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="font-semibold">{inCart.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(inCart.id)}
                    className="px-4 py-2  bg-blue-600 text-white rounded"
                  >
                    +
                  </button>
                </div>
              )}
            </>
            <Link to={"/Payment"}>
              <button
                onClick={() => placeOrder({ type: "single", product })}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
