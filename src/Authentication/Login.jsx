import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/useApp";
import toast from "react-hot-toast";


const Login = () => {
  const { login } = useApp(); // get login from context
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${form.email}&password=${form.password}`
      );
      if (res.data.length > 0) {
        const user = res.data[0];

        login(user);
        toast.success(" ✅Login successfull! ");
        if (user.role === "admin") navigate("/Dashboard");
        else navigate("/");
      } else {
        toast.error("Invalid email or password ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex justify-center items-center  h-screen w-full bg-cover bg-center "
      style={{
        backgroundImage:
          "url('https://c0.wallpaperflare.com/preview/1001/454/569/unpaired-red-air-jordan-1-shoe.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-black p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4 font-bold ">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
        <Link
          to="/Registration"
          className="flex items-center gap-2 hover:text-red-500"
        >
          <span>Create an Account</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
