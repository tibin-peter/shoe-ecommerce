import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_URL = "http://localhost:3001";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(0);
  const [profit, setProfit] = useState(0);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [timeFilter, setTimeFilter] = useState("month"); // for line chart
  const [categoryFilter, setCategoryFilter] = useState("month"); // for pie chart

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/orders`),
        ]);

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();

        setUsers(usersData);
        setOrders(ordersData);

        // Total sales (sum of order.total)
        const totalSales = ordersData.reduce(
          (acc, order) => acc + (Number(order.total) || 0),
          0
        );
        setSales(totalSales);

        // Profit (assuming 30% of subtotal for demo)
        const totalProfit = ordersData.reduce(
          (acc, order) => acc + (order.subtotal * 0.3 || 0),
          0
        );
        setProfit(totalProfit);

        // Build charts
        buildLineChart(ordersData, timeFilter);
        buildPieChart(ordersData, categoryFilter);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  // Rebuild line chart when filter changes
  useEffect(() => {
    if (orders.length > 0) {
      buildLineChart(orders, timeFilter);
    }
  }, [timeFilter]);

  // Rebuild pie chart when filter changes
  useEffect(() => {
    if (orders.length > 0) {
      buildPieChart(orders, categoryFilter);
    }
  }, [categoryFilter]);

  // Line chart builder
  const buildLineChart = (ordersData, filter) => {
    const grouped = {};

    ordersData.forEach((order) => {
      const date = new Date(order.date);
      let key = "";

      if (filter === "year") {
        key = date.getFullYear();
      } else if (filter === "month") {
        key = date.toLocaleString("default", { month: "short", year: "numeric" });
      } else if (filter === "week") {
        const week = getWeekNumber(date);
        key = `${date.getFullYear()}-W${week}`;
      }

      if (!grouped[key]) {
        grouped[key] = { profit: 0, sales: 0 };
      }
      grouped[key].sales += Number(order.total) || 0;
      grouped[key].profit += Number(order.subtotal) * 0.3 || 0;
    });

    const chartData = Object.keys(grouped).map((k) => ({
      period: k,
      sales: grouped[k].sales,
      profit: grouped[k].profit,
    }));

    setLineData(chartData);
  };

  // Pie chart builder (by category)
  const buildPieChart = (ordersData, filter) => {
    const grouped = {};

    ordersData.forEach((order) => {
      const date = new Date(order.date);
      let include = false;

      if (filter === "year") {
        include = date.getFullYear() === new Date().getFullYear();
      } else if (filter === "month") {
        include =
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear();
      } else if (filter === "week") {
        include =
          getWeekNumber(date) === getWeekNumber(new Date()) &&
          date.getFullYear() === new Date().getFullYear();
      }

      if (include) {
        order.items.forEach((item) => {
          const category = item.category || "Other";
          if (!grouped[category]) grouped[category] = 0;
          grouped[category] += (item.price || 0) * (item.quantity || 0);
        });
      }
    });

    const chartData = Object.keys(grouped).map((cat) => ({
      name: cat,
      value: grouped[cat],
    }));

    setPieData(chartData);
  };

  // Helper: get week number
  const getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  return (
    <div className="flex-1 p-8">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-black">Dashboard</h1>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profit */}
          <div className="bg-green-400 shadow rounded-lg p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FaChartLine className="text-green-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-black">Total Profit</h3>
              <p className="text-2xl font-bold text-black">${profit.toFixed(2)}</p>
              <p>50% Increment from last month</p>
            </div>
          </div>

          {/* Users */}
          <div className="bg-blue-400 shadow rounded-lg p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-black">Total Users</h3>
              <p className="text-2xl font-bold text-black">{users.length}</p>
              <p>30% Decrement from last month</p>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-yellow-400 shadow rounded-lg p-4 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaShoppingCart className="text-yellow-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-black">Total Orders</h3>
              <p className="text-2xl font-bold text-black">{orders.length}</p>
              <p>15% Increment from last month</p>
            </div>
          </div>

          {/* Sales */}
          <div className="bg-red-400 shadow rounded-lg p-4 flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <FaDollarSign className="text-red-600 text-2xl" />
            </div>
            <div>
              <h3 className="text-black">Total Sales</h3>
              <p className="text-2xl font-bold text-black">${sales.toFixed(2)}</p>
              <p>45% Increment from last month</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line chart */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center pb-5">
              <h3 className="text-lg font-semibold text-black">Sales Report</h3>
              <select
                className="border rounded px-2 py-1  text-black"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#8884d8" />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie chart (categories) */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center pb-5">
              <h3 className="text-lg font-semibold text-black">Most Sales</h3>
              <select
                className="border rounded px-2 py-1  text-black"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="year">Year</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
