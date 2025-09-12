import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <h1 className="text-white text-4xl font-bold text-center">
        Our page has come to an end, but our <br />
        relationship with you has not.
      </h1>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-7">
        {/* Logo and About */}
        <div>
          <p className="text-sm leading-6">
            Step into style with Shoes World. Quality, comfort, and design
            crafted for every occasion.
          </p>
          <Link to="/">
            <img
              src="https://i.pinimg.com/474x/f9/1a/a3/f91aa37eae15b0b16e6f0a5fb40f7732.jpg"
              alt="logo image"
              className="h-12 w-12 object-cover rounded-full"
            />
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:text-white">
                Products
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="/" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="/" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="/" className="hover:text-white">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Tibin. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
