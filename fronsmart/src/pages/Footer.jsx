import React from "react";
import { Map, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Branding */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Map size={22} className="text-indigo-600" />
            <span className="text-lg font-semibold text-gray-700">
              Smart Village Management
            </span>
          </div>
          
          {/* Navigation */}
          <div className="flex space-x-6 text-gray-600">
            <a href="/" className="hover:text-indigo-600 transition">Dashboard</a>
            <a href="/infra" className="hover:text-indigo-600 transition">Infrastructure</a>
            <a href="/services" className="hover:text-indigo-600 transition">Services</a>
            <a href="/report" className="hover:text-indigo-600 transition">Reports</a>
            <a href="/resources" className="hover:text-indigo-600 transition">Resources</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white transition"
            >
              <Github size={18} />
            </a>
            <a
              href="mailto:citysupport@example.com"
              className="p-2 rounded-full bg-gray-100 hover:bg-indigo-600 hover:text-white transition"
            >
              <Mail size={18} />
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Smart Village | Developed with ❤️ for Community
        </div>
      </div>
    </footer>
  );
};

export default Footer;
