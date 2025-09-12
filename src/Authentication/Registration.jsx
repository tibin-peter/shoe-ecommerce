import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    conformpassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  Check if user already exists by email
      const existing = await axios.get(
        `http://localhost:3001/users?email=${form.email}`
      );

      if (existing.data.length > 0) {
        toast.error(" ❌ User already exists with this email!");
        return;
      }

      //  Create new user default role: user
      await axios.post("http://localhost:3001/users", {
        ...form,
        role: "user",
      });

      toast.success(" ✅ Registration successful! Please login.");
      navigate("/Login");
      setForm({ name: "", email: "", password: "", conformpassword: "" });
    } catch (err) {
      console.error("Error registering user:", err);
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
        <h2 className="text-2xl mb-4 font-bold">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
          required
        />
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
        <input
          type="password"
          name="conformpassword"
          placeholder="Conform Password"
          value={form.conformpassword}
          onChange={handleChange}
          className="border w-full p-2 mb-3"
          required
        />
        <button
          type="submit"
          className="bg-red-500 text-white w-full py-2 rounded"
        >
          Register
        </button>
        <Link
          to="/Login"
          className="flex items-center gap-2 hover:text-red-500"
        >
          <span>Have already an Account?</span>
        </Link>
      </form>
    </div>
  );
};

export default Registration;
