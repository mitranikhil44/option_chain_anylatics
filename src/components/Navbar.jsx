import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinkRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNavbar = () => {
    navLinkRef.current.classList.remove("hidden");
    navLinkRef.current.classList.toggle("toggleNav");
  };

  const closeNavbar = () => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    if (!mediaQuery.matches) {
      navLinkRef.current.classList.add("hidden");
      navLinkRef.current.classList.toggle("toggleNav");
    }
  };

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
                  <button
                    className={`text-gray-300 bg-gradient-to-r from-indigo-400 to-sky-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-400 px-3 py-2 mr-2 rounded-lg text-sm font-medium focus:outline-none ${
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
                    <div className="absolute z-10 top-10 left-0 space-y-2">
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
                  <Link
  to="/about"
  className="text-gray-300 bg-gradient-to-r rounded-lg from-indigo-400 to-sky-500 hover:bg-gradient-to-r hover:from-sky-500 hover:to-indigo-400 px-3 py-[0.60rem] text-sm font-medium focus:outline-none"
>
  About Us
</Link>

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
