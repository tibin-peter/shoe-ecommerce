import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", description: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data.filter(p => p.status !== "inactive"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    // Prevent duplicates
    const exists = products.some(p => p.name.toLowerCase() === form.name.toLowerCase());
    if (exists) {
      alert("Product already exists!");
      return;
    }

    await axios.post(API_URL, { ...form, status: "active" });
    setForm({ name: "", category: "", price: "", description: "" });
    fetchProducts();
  };

  const updateProduct = async (id, updated) => {
    await axios.put(`${API_URL}/${id}`, updated);
    fetchProducts();
  };

  const softDelete = async (id) => {
    await axios.patch(`${API_URL}/${id}`, { status: "inactive" });
    fetchProducts();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Management</h2>

      {/* Add Product Form */}
      <div className="mb-6">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 mr-2" />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 mr-2" />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 mr-2" />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 mr-2" />
        <button onClick={addProduct} className="bg-blue-600 text-white px-4 py-2">Add</button>
      </div>

      {/* Products Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>Category</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b">
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>
                <button onClick={() => updateProduct(p.id, { ...p, price: p.price + 10 })} className="bg-yellow-500 text-white px-2 py-1 mr-2">Update</button>
                <button onClick={() => softDelete(p.id)} className="bg-red-600 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
