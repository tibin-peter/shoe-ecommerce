import React, { useState } from "react";
import { useApp } from "../../Context/useApp";
import { useLocation } from "react-router-dom";
import Navbar from "../Main/Navbar";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart, placeOrder, user } = useApp();
  const location = useLocation();

  // If navigated with "Buy Now", product will be passed by location.state
  const singleProduct = location.state?.product;

  // Decide what to checkout single or cartfull
  const itemsToPay = singleProduct ? [singleProduct] : cart;
  

  const [buyer, setBuyer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    payment: "COD",
  });

  // Calculate totals
  const subtotal = itemsToPay.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.05; // 5% GST
  const shipping = subtotal > 1000 ? 0 : 50; // Free shipping above 1000
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!buyer.name || !buyer.address || !buyer.phone) {
      toast(" ⚡Please fill all buyer details!");
      return;
    }

    const newOrder = {
      ...buyer,
      items: itemsToPay,
      subtotal,
      tax,
      shipping,
      total,
      date: new Date().toLocaleString(),
    };

    placeOrder(newOrder);
    toast.success("✅Order placed successfully!");
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6 mt-26 bg-gray-500" >
      {/* Left: Items & Order Summary */}
      <div>
        <h2 className="text-2xl font-bold mb-4"> Order Now</h2>
        {itemsToPay.length > 0 ? (
          <p className="text-gray-500">No items selected for checkout.</p>
        ) : (
          <div className="space-y-4">
            {itemsToPay.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right: Buyer Info & Payment */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            value={buyer.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
          />

          {/* Payment Options */}
          <div c>
            <label className="block font-semibold mb-2">Payment Method</label>
            <select
              name="payment"
              value={buyer.payment}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-gray-400"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="NetBanking">Net Banking</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
