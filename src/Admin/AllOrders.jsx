import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/orders";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(API_URL);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📦 All Orders</h2>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.userName}</td>
              <td className="p-2 border">
                {order.items.map((item, i) => (
                  <div key={i}>
                    {item.productName} (x{item.qty})
                  </div>
                ))}
              </td>
              <td className="p-2 border font-semibold">${order.total}</td>
              <td
                className={`p-2 border font-bold ${
                  order.status === "Active"
                    ? "text-green-600"
                    : order.status === "Cancelled"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {order.status}
              </td>
              <td className="p-2 border">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
