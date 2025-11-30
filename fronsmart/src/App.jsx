import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Infra from "./pages/Infra";
import Resources from "./pages/Resources";
import Services from "./pages/Services";
import Report from "./pages/Report";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";




function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">



      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/infra" element={<Infra />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/services" element={<Services />} />
          <Route path="/report" element={<Report />} />
            <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  );
}

export default App;
