import { useState, useEffect } from "react";
import axios from "axios";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch orders from DB
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3001/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/orders/${id}`, {
        status: newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Apply search & filter
  const filteredOrders = orders.filter((order) => {
    const firstItem =
      order.items && order.items.length > 0 ? order.items[0] : null;

    const matchesSearch =
      (firstItem?.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      order.userId?.toString().includes(search);

    const matchesFilter =
      filter === "All" || (firstItem?.category || "") === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className=" p-6 bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Orders</h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border bg-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 text-sm text-gray-700">{order.id}</td>
                <td className="p-3">
                  <img
                    src={
                      order.items?.[0]?.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={order.items?.[0]?.name || "No product"}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                </td>
                <td className="p-3 text-sm font-medium text-gray-900">
                  {order.items?.[0]?.name || "No Product"}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  User {order.userId}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {order.items?.[0]?.category || "—"}
                </td>
                
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-3 text-sm font-semibold text-gray-900">
                  ${order.total?.toFixed(2) || "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
