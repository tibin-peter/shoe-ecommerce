import React from "react";
import { useApp } from "../../Context/useApp";
import Navbar from "../Main/Navbar";

const Orders = () => {
  const { orders, user } = useApp();
  if (!user) return <p>Please log in to see your orders.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto ">
      <Navbar/>
      <h2 className="text-4xl font-bold mt-26 mb-4 text-center text-black">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-black">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-md bg-gray-500">
              {/* Order Info */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-white">
                  <span className="font-medium">Order ID:</span> {order.id}
                </p>
                <p className="text-sm text-white">
                  Ordered on:{" "}
                  {new Date(order.date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border rounded-lg p-3"
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
                      <p className="text-white">{item.description}</p>
                      <p className="text-white">
                        Price:{" "}
                        <span className="font-medium">₹{item.price}</span>
                      </p>
                      <p className="text-white">⭐ {item.rating}</p>
                    </div>

                    {/* Single Item Price */}
                    <div className="font-bold text-lg text-green-900">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="mt-4 text-right">
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
