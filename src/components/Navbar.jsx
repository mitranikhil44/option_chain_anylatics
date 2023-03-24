import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Navigation component
const Navbar = () => {
// Define state variables
const navLinkRef = useRef(null); // Reference to navigation links
const [isOpen, setIsOpen] = useState(false); // Toggle for menu

// Toggle menu
const toggleMenu = () => {
  setIsOpen(!isOpen);
};

// Toggle navbar
const toggleNavbar = () => {
  navLinkRef.current.classList.remove("hidden");
  navLinkRef.current.classList.toggle("toggleNav");
};

// Get navbar object from react-router
let navigate = useNavigate();

// Handle logout
const handleLogout = () => {
  localStorage.removeItem("x-auth-token");
  navigate("/login" || "/signUp");
};

// Close navbar on small screens
const closeNavbar = () => {
  const mediaQuery = window.matchMedia("(min-width: 640px)");
  if (!mediaQuery.matches) {
    navLinkRef.current.classList.add("hidden");
    navLinkRef.current.classList.toggle("toggleNav");
  }
};

// JSX for navbar component
  return (
    <header className="sticky top-0 left-0 z-10">
      <div className="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 py-3">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/">
            <img
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Option Chain Analytics Logo"
              className="h-10"
            />
          </Link>
          <button
            className="block sm:hidden outline-none focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg
              className="h-6 w-6 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
          <nav
            className="hidden sm:flex sm:items-center sm:justify-end"
            ref={navLinkRef}
            onClick={closeNavbar}
          >
            <div className="ml-10 flex items-center justify-center space-x-4">
              <div className="flex space-x-4">
                <div className="relative">
                  <Link
                    to="/dasboard"
                    className="text-gray-300 bg-gradient-to-r rounded-lg from-indigo-400 to-sky-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-400 px-3 py-[0.60rem] text-sm font-medium focus:outline-none"
                  >
                    Dasboard
                  </Link>
                  <button
                    className={`ml-2 text-gray-300 bg-gradient-to-r from-indigo-400 to-sky-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-400 px-3 py-2 mr-2 rounded-lg text-sm font-medium focus:outline-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    Indices{" "}
                    <svg
                      className="inline-block h-3 w-3 ml-1 transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 6.707a1 1 0 0 1 0 1.414L4.414 10l1.879 1.879a1 1 0 1 1-1.414 1.414L2.586 10.707a1 1 0 0 1 0-1.414L4.879 6.293a1 1 0 0 1 1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute z-10 top-10 left-0 space-y-2 my-2">
                      <Link
                        to="/nifty"
                        className="block px-4 py-2 text-gray-800 rounded-lg bg-gradient-to-r from-pink-400 to-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-400"
                      >
                        Nifty 50
                      </Link>
                      <Link
                        to="/bank_nifty"
                        className="block px-4 py-2 text-gray-800 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-400"
                      >
                        Bank Nifty
                      </Link>
                      <Link
                        to="/fin_nifty"
                        className="block px-4 py-2 text-gray-800 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-400"
                      >
                        Fin Nifty
                      </Link>
                    </div>
                  )}
                  {!localStorage.getItem("x-auth-token") ? (
                    <>
                      <Link
                        className="py-2 px-4 ml-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg mr-2"
                        to="/login"
                        role="button"
                      >
                        Login
                      </Link>
                      <Link
                        className="py-2 px-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-lg"
                        to="/signUp"
                        role="button"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button
                      className="py-[.34rem] px-2 mr-2 bg-gray-100 text-red-500 hover:bg-gray-200 rounded-lg focus:outline-none transition-colors duration-300"
                      onClick={handleLogout}
                      role="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 2.293a1 1 0 011.414 0l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414L16.586 11H3a1 1 0 010-2h13.586l-5.293-5.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Log out
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
