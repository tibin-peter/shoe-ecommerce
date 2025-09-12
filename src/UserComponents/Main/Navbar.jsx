import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBox,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useApp } from "../../Context/useApp"; // created context

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  // From context
  const { user, wishlist, cart, logout } = useApp();

  //fech products from db
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
      } catch (error) {
        console.error("cant fetch", error);
      }
    };
    fetchProducts();
  }, []);

  //Filter product name and discription base if the letter include
  const suggestions = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      product.discription
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())
  );
  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    if (suggestions.length > 0) {
      // Navigate to the first suggestion
      navigate(`/products/${suggestions[0].id}`);
    } else {
      // fallback → maybe navigate to a search results page
      navigate(`/products?search=${searchTerm}`);
    }
  }
};

  return (
    <nav className="bg-black px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img
              src="https://i.pinimg.com/474x/f9/1a/a3/f91aa37eae15b0b16e6f0a5fb40f7732.jpg"
              alt="logo"
              className="h-12 w-12 object-cover rounded-full"
            />
          </Link>
        </div>

        {/* Middle - Nav links */}
        <div className="hidden md:flex justify-center space-x-10 py-3 text-sky-50 font-medium">
          <Link to="/Products" className="hover:text-red-600 transition-colors">
            Products
          </Link>
          <Link to="/products?category=Men&page=1" className="hover:text-red-600 transition-colors">
            Men 
          </Link>
          <Link to="/products?category=Women&page=1" className="hover:text-red-600 transition-colors">
            Women
          </Link>
          <Link to="/products?category=Kids&page=1" className="hover:text-red-600 transition-colors">
            Kids
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:block relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {/* Suggestion List */}
          {searchTerm && (
            <ul className="mt-2 bg-black border rounded-lg shadow max-h-40 overflow-y-auto absolute top-full">
              {suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <li
                      key={product.id}
                      className="px-3 py-2 cursor-pointer hover:bg-red-600"
                      onClick={() => setSearchTerm(product.name)} // fill input on click
                    >
                      {product.name}
                    </li>
                  </Link>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-500">No matches found</li>
              )}
            </ul>
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-6 text-sky-50 relative">
          {
            (user)&&// if user not logged in these links are invisible
            <>
              <Link
                to="/orders"
                className="flex items-center gap-2 hover:text-red-600"
              >
                <FaBox /> <span>Orders</span>
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center gap-2 hover:text-red-600"
              >
                <FaHeart />
                <span>
                  Wishlist
                  {user && wishlist?.length > 0 && ` (${wishlist.length})`}
                </span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 hover:text-red-600"
              >
                <FaShoppingCart />{" "}
                <span>
                  Cart {user && cart?.length > 0 && ` (${cart.reduce((sum,item)=>sum+item.quantity,0)})`}
                </span>
              </Link>
             </>
          }

          {/* Account dropdown */}
          <div className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="flex items-center gap-2 hover:text-red-600"
            >
              <FaUser /> <span>Account</span>
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg py-2 border">
                {!user ? (
                  <>
                    <Link
                      to="/Login"
                      className="block px-4 py-2 hover:bg-red-500"
                      onClick={() => setAccountOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/Registration"
                      className="block px-4 py-2 hover:bg-red-500"
                      onClick={() => setAccountOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout();
                      setAccountOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-500"
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-4 text-white">
          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-red-600"
          >
            <FaBox /> Orders
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center gap-2 hover:text-red-600"
          >
            <FaHeart /> Wishlist ({wishlist.length})
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-red-600"
          >
            <FaShoppingCart /> Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
