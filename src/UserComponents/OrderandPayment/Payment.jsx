import React, { useState } from "react";
import { useApp } from "../../Context/useApp";
import { useLocation } from "react-router-dom";
import Navbar from "../Main/Navbar";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { cart, placeOrder, user, orders } = useApp();
  const location = useLocation();

  const [buyer, setBuyer] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    phone: "",
    payment: "COD",
  });
  const [localOrders, setLocalOrders] = useState(orders);

  // for user
  if (!user) return <p className="text-center mt-10">Please log in first.</p>;

  const singleProduct = location.state?.product;
  const itemsToPay = singleProduct ? [singleProduct] : cart;

  const subtotal = itemsToPay.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.05;
  const shipping = subtotal > 1000 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!buyer.name || !buyer.address || !buyer.phone) {
      toast.error("⚡ Please fill all buyer details!");
      return;
    }

    const newOrder = {
      ...buyer,
      items: itemsToPay,
      subtotal,
      tax,
      shipping,
      total,
      date: new Date().toISOString(),
      status: "pending",
      userId: user.id,
    };

    placeOrder(newOrder);
    toast.success("✅ Order placed successfully!");
  };

  // for admin

  const updateOrderStatus = (orderId, newStatus) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order #${orderId} marked as ${newStatus}`);
  };

  if (user.role === "admin") {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto p-6 mt-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Admin – Manage Orders
          </h2>

          {localOrders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <div className="space-y-6">
              {localOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 shadow bg-gray-100"
                >
                  {/* Order Info */}
                  <div className="flex justify-between mb-4">
                    <div>
                      <p>
                        <span className="font-medium">Order ID:</span>{" "}
                        {order.id}
                      </p>
                      <p>
                        <span className="font-medium">User:</span> {order.name}{" "}
                        ({order.email})
                      </p>
                    </div>
                    <div className="text-right">
                      <p>
                        Date:{" "}
                        {new Date(order.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="border p-1 rounded bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border rounded p-2 bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
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

                  {/* Totals */}
                  <div className="text-right mt-3 font-semibold">
                    Total: ₹{order.total.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  // default for user
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6 mt-10 bg-gray-500">
        {/* Left: Items & Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Now</h2>
          {itemsToPay.length === 0 ? (
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

        {/* Right: Buyer Info */}
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

            {/* Payment */}
            <div>
              <label className="block font-semibold mb-2">Payment Method</label>
              <select
                name="payment"
                value={buyer.payment}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-200"
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
