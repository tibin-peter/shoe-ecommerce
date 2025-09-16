import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaBan, FaUser, FaCheckCircle } from "react-icons/fa";

const API_URL = "http://localhost:3001/users";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from DB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Toggle block/unblock
  const toggleBlock = async (id, blocked) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, { blocked: !blocked });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, blocked: res.data.blocked } : u))
      );
    } catch (err) {
      console.error("Error updating block status:", err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          👥 Manage All Users
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full table-auto border-collapse bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 text-black">{u.id}</td>

                    <td className="px-4 py-2 font-medium text-black">{u.name}</td>
                    <td className="px-4 py-2 text-black">{u.email}</td>
                    <td className="px-4 py-2 text-black">
                      {u.blocked ? (
                        <span className="text-red-600 font-semibold flex items-center gap-1">
                          <FaBan /> Blocked
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <FaCheckCircle /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-3 justify-center">
                      <button
                        onClick={() => toggleBlock(u.id, u.blocked)}
                        className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${
                          u.blocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                      >
                        {u.blocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
