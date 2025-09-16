import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const API_URL = "http://localhost:3001/products";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    rating: "",
    category: "",
    description: "",
    image: "",
  });

  const productsPerPage = 6;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Add new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, {
        ...newProduct,
        id: Date.now().toString(),
        price: Number(newProduct.price),
        rating: Number(newProduct.rating),
      });
      setProducts((prev) => [...prev, res.data]);
      setShowAddForm(false);
      setNewProduct({
        name: "",
        price: "",
        rating: "",
        category: "",
        description: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Open Edit Modal
  const handleEdit = (product) => {
    setEditingProduct(product); // set selected product
    setShowEditForm(true); // show modal
  };

  // Update product in DB
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_URL}/${editingProduct.id}`, editingProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? res.data : p))
      );
      setShowEditForm(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Filter products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📦 Manage Products</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-1/2 bg-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg bg-gray-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg shadow-md bg-white p-4 flex flex-col"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {p.description}
              </p>
              <p className="mt-2 text-green-700 font-bold">₹{p.price}</p>
              <p className="text-yellow-500">⭐ {p.rating}</p>
              <p className="text-sm text-gray-600">{p.category}</p>

              <div className="flex justify-between mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center gap-1"
                  onClick={() => handleEdit(p)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center gap-1"
                  onClick={() => deleteProduct(p.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            <form onSubmit={addProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded-lg"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditForm && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-600 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={updateProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
                required
              />
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.rating}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    rating: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Category"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full border px-3 py-2 rounded-lg"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  onClick={() => setShowEditForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
