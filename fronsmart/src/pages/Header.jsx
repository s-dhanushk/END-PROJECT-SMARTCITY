import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Map } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Infrastructure", path: "/Infra" },
    { label: "Services", path: "/Services" },
    { label: "Reports", path: "/Report" },
    {label: "Resources", path:"/resources"},
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="backdrop-blur-md bg-white/70 shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
            <Map size={22} />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-gray-800">
            Smart Village
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-gray-600 font-medium hover:text-indigo-600 transition ${
                isActive(item.path) ? "text-indigo-700 font-bold" : ""
              }`}
            >
              {item.label}

              {/* Active underline indicator */}
              {isActive(item.path) && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded bg-indigo-600"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <nav className="flex flex-col py-3 px-6 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition ${
                  isActive(item.path)
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
