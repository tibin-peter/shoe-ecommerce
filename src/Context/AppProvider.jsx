import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3001";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stored in localStorage
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading]=useState(true)

  // Load session from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchUserData(parsedUser.id).finally(()=>setLoading(false)); // Load wishlist/cart/orders for that user
    }else{
      setLoading(false)
    }
  }, []);

  // Fetch user-specific data
  const fetchUserData = async (userId) => {
    try {
      const [wishlistRes, cartRes, orderRes] = await Promise.all([
        fetch(`${API_URL}/wishlist?userId=${userId}`),
        fetch(`${API_URL}/cart?userId=${userId}`),
        fetch(`${API_URL}/orders?userId=${userId}`),
      ]);

      setWishlist(await wishlistRes.json());
      setCart(await cartRes.json());
      setOrders(await orderRes.json());
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // User authentication
  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    await fetchUserData(userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setWishlist([]);
    setCart([]);
    setOrders([]);
  };

  // Wishlist
  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("❌Please log in to use wishlist!");
      navigate("/Login");
      return;
    }

    const exists = wishlist.find((item) => item.productId === product.id);

    try {
      if (exists) {
        // Remove from wishlist
        const res = await fetch(`${API_URL}/wishlist/${exists.id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setWishlist((prev) => prev.filter((item) => item.id !== exists.id));
        }
      } else {
        // Add to wishlist
        const res = await fetch(`${API_URL}/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            productId: product.id,
            userId: user.id,
          }),
        });
        if (res.ok) {
          const newItem = await res.json();
          setWishlist((prev) => [...prev, newItem]);
        }
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  // Cart
  // ✅ Add to Cart
  const addToCart = async (product) => {
    if (!user) {
      toast.error("❌ Please log in to add to cart!");
      navigate("/Login");
      return;
    }

    // Calculate total quantity already in cart
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantity >= 5) {
      toast.error("🛑 Cart limit reached! (Max 5 items in total)");
      return;
    }

    const exists = cart.find((item) => item.productId === product.id);

    try {
      if (exists) {
        // Increase quantity but check limit again
        if (totalQuantity + 1 > 5) {
          toast.error("🛑 Cannot add more, cart is full (max 5 items total)");
          return;
        }

        const res = await fetch(`${API_URL}/cart/${exists.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: exists.quantity + 1 }),
        });

        if (res.ok) {
          const updatedItem = await res.json();
          setCart((prev) =>
            prev.map((item) =>
              item.id === updatedItem.id ? updatedItem : item
            )
          );
          toast.success("🔼 Increased product quantity");
        }
      } else {
        // If new product → add fresh
        const res = await fetch(`${API_URL}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...product,
            productId: product.id,
            userId: user.id,
            quantity: 1,
          }),
        });

        if (res.ok) {
          const newItem = await res.json();
          setCart((prev) => [...prev, newItem]);
          toast.success("✅ Product added to cart");
        }
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("❌ Failed to add to cart");
    }
  };

  //  Remove from Cart
  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCart((prev) => prev.filter((item) => item.id !== id));
        toast.success("🗑️ Removed item from cart");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("❌ Failed to remove item");
    }
  };

  //  Increase quantity
  const increaseQuantity = async (id) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setCart((prev) => prev.map((c) => (c.id === id ? updatedItem : c)));
      }
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  //  Decrease quantity
  const decreaseQuantity = async (id) => {
    const item = cart.find((c) => c.id === id);
    if (!item) return;

    if (item.quantity === 1) {
       toast.error("⚠️ Minimum quantity is 1");
    }

    try {
      const res = await fetch(`${API_URL}/cart/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setCart((prev) => prev.map((c) => (c.id === id ? updatedItem : c)));
      }
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // Orders
  const placeOrder = async ({ type, product = null }) => {
    if (!user) {
      toast.error("❌You have to login to buy");
      navigate("/Login");
      return;
    }

    try {
      let items = [];
      let subtotal = 0;

      if (type === "single" && product) {
        // Single product
        items = [product];
        subtotal = Number(product.price);
      } else if (type === "cart") {
        // Cart checkout
        items = cart;
        subtotal = cart.reduce(
          (sum, item) => sum + Number(item.price) * (item.quantity || 1),
          0
        );
      } else {
        throw new Error("Invalid order type or missing product");
      }

      const tax = subtotal * 0.1;
      const shipping = 50;
      const total = subtotal + tax + shipping;

      const orderData = {
        userId: user.id,
        date: new Date().toISOString(),
        items,
        subtotal,
        tax,
        shipping,
        total,
      };

      // Save order
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const newOrder = await res.json();
        setOrders((prev) => [...prev, newOrder]);

        if (type === "cart") {
          // Clear cart only if it was a cart order
          const cartRes = await fetch(`${API_URL}/cart?userId=${user.id}`);
          const cartItems = await cartRes.json();

          for (let item of cartItems) {
            await fetch(`${API_URL}/cart/${item.id}`, { method: "DELETE" });
          }

          setCart([]);
        }

        return { success: true, order: newOrder };
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  const value = {
    user,
    login,
    logout,
    wishlist,
    setWishlist,
    addToWishlist,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    orders,
    placeOrder,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
