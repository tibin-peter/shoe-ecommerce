import { Link } from "react-router-dom";
import { useApp } from "../../Context/useApp";
import { useState, useEffect } from "react";
import Navbar from "../Main/Navbar";

const Cart = () => {
  const { cart, decreaseQuantity, removeFromCart, placeOrder ,increaseQuantity} = useApp();
  const [total, setTotal] = useState(0);

  // calculate total whenever cart changes
  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    setTotal(sum);
  }, [cart]);


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mt-20 mb-6 text-center text-gray-800">
          🛒 Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Your cart is empty
          </p>
        ) : (

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                {/* Product image */}
                <Link to={`/Products/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                </Link>

                {/* Details */}
                <div className="flex-1 px-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="font-bold text-gray-700">₹{item.price}</p>
                  <p className="text-yellow-500">⭐ {item.rating}</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-lg"
                  >
                    -
                  </button>
                  <span className="font-semibold text-black">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 text-black hover:bg-gray-300 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Total & Checkout */}
        {cart.length > 0 && (
          <div className="mt-8 p-6 bg-white shadow-md rounded-lg text-center">
            <h3 className="text-xl font-bold text-gray-800">Total: ₹{total}</h3>
            <Link to="/Payment">
              <button
                onClick={() => placeOrder({ type: "cart" })}
                className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
              >
                ✅ Place Order
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
