import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-15 h-15 rounded-full overflow-hidden">
            <img
              src="https://www.shutterstock.com/shutterstock/videos/1064545633/thumb/1.jpg?ip=x480"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-blue-400">Shoe-Shop</h1>
        </div>
        <h1 className="text-2xl font-bold text-center mb-5">Admin </h1>
        <nav className="space-y-2">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `block w-full py-2 px-3 rounded ${isActive ? "bg-gray-600" : ""}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="allOrders"
            className={({ isActive }) =>
              `block w-full py-2 px-3 rounded ${isActive ? "bg-gray-600" : ""}`
            }
          >
            All Orders
          </NavLink>
          <NavLink
            to="allusers"
            className={({ isActive }) =>
              `block w-full py-2 px-3 rounded ${isActive ? "bg-gray-600" : ""}`
            }
          >
            All Users
          </NavLink>
          <NavLink
            to="allproducts"
            className={({ isActive }) =>
              `block w-full py-2 px-3 rounded ${isActive ? "bg-gray-600" : ""}`
            }
          >
            All Products
          </NavLink>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
