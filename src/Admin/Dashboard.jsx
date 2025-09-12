
import { useState } from "react";
import Products from "./Products";
import Users from "./Users";
import AllOrders from "./AllOrders"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <button
          className={`block w-full text-left py-2 px-3 rounded ${activeTab === "products" ? "bg-gray-600" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`block w-full text-left py-2 px-3 rounded ${activeTab === "users" ? "bg-gray-600" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`block w-full text-left py-2 px-3 rounded ${activeTab === "AllOrders" ? "bg-gray-600" : ""}`}
          onClick={() => setActiveTab("AllOrders")}
        >
          All Orders
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {activeTab === "products" && <Products />}
        {activeTab === "users" && <Users />}
        {activeTab === "AllOrders" && <AllOrders/>}
      </div>
    </div>
  );
};

export default Dashboard;
