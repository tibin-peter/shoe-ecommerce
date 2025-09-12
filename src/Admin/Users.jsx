import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data.filter(u => u.status !== "inactive"));
  };

  const blockUser = async (id, blocked) => {
    await axios.patch(`${API_URL}/${id}`, { blocked });
    fetchUsers();
  };

  const softDelete = async (id) => {
    await axios.patch(`${API_URL}/${id}`, { status: "inactive" });
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Email</th><th>Role</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.blocked ? "Blocked" : "Active"}</td>
              <td>
                <button onClick={() => blockUser(u.id, !u.blocked)} className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  {u.blocked ? "Unblock" : "Block"}
                </button>
                <button onClick={() => softDelete(u.id)} className="bg-red-600 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
