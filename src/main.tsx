import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Programs from './components/Programs';
import Transaksi from './components/Transaksi';
import Settings from './components/Settings';
import Sidebar from './layout/Sidebar';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Fungsi untuk toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken");
    // Jika pengguna belum login, arahkan ke halaman login
    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/logout") {
      navigate("/login");
    }
  }, [navigate, location]);
  
  // Determine if current page should show sidebar
  const shouldShowSidebar = !["/login", "/logout"].includes(location.pathname);
  
  return (
    <div className="app-container flex">
      {/* Sidebar hanya tampil jika bukan di halaman login dan logout */}
      {shouldShowSidebar && (
        <Sidebar 
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          isLoggedIn={!!localStorage.getItem("authToken")}
        />
      )}
      
      <div
        className="main-content transition-all duration-300 ease-in-out"
        style={{
          marginLeft: shouldShowSidebar ? (isSidebarOpen ? "250px" : "80px") : "0px",
          width: shouldShowSidebar 
            ? `calc(100% - ${isSidebarOpen ? "250px" : "80px"})` 
            : "100%",
        }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
};

// Render aplikasi
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <App />
  </Router>
);

export default App;