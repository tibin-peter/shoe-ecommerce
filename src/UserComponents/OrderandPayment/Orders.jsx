import React from "react";
import { useApp } from "../../Context/useApp";
import Navbar from "../Main/Navbar";

const Orders = () => {
  const { orders, user } = useApp();

  if (!user) return <p>Please log in to see your orders.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Navbar />
      <h2 className="text-4xl font-bold mb-6 text-center text-black">
        {user.role === "admin" ? "All Orders (Admin Panel)" : "My Orders"}
      </h2>

      {!orders || orders.length === 0 ? (
        <p className="text-black">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-md bg-gray-100"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Order ID:</span> {order.id}
                  </p>
                  {user.role === "admin" && (
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">User ID:</span>{" "}
                      {order.userId}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-700">
                    Ordered on:{" "}
                    {order.date
                      ? new Date(order.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      order.status === "cancelled"
                        ? "text-red-600"
                        : order.status === "delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {order.status || "Pending"}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {Array.isArray(order.items) && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border rounded-lg p-3 bg-white"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />

                      {/* Product Details */}
                      <div className="flex-1 ml-4">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-gray-800">
                          Price:{" "}
                          <span className="font-medium">₹{item.price}</span>
                        </p>
                        <p className="text-yellow-500">⭐ {item.rating}</p>
                      </div>

                      {/* Single Item Price */}
                      <div className="font-bold text-lg text-green-900">
                        ₹{item.price}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in this order.</p>
                )}
              </div>

              {/* Order Totals */}
              <div className="mt-4 text-right text-gray-800">
                <p>Subtotal: ₹{Number(order.subtotal || 0).toFixed(2)}</p>
                <p>Tax: ₹{Number(order.tax || 0).toFixed(2)}</p>
                <p>Shipping: ₹{Number(order.shipping || 0).toFixed(2)}</p>
                <p className="font-bold text-lg">
                  Total: ₹{Number(order.total || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
