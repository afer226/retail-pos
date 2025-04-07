// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import SellingPage from './pages/SellingPage';
import ProductsPage from './pages/ProductsPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import CustomersPage from './pages/CustomersPage';
import SettingsPage from './pages/SettingsPage';

import './App.css'; // Import CSS

function App() {
  return (
    <Router>
      {/* Add a wrapper div with a class for Flexbox styling */}
      <div className="app-layout">
        <nav className="sidebar-nav"> {/* Added a class to nav for clarity */}
          <ul>
            <li>
              {/* Use NavLink for active class highlighting */}
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                Sell
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
                History
              </NavLink>
            </li>
            <li>
              <NavLink to="/customers" className={({ isActive }) => isActive ? "active" : ""}>
                *Customers
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                *Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Page Content - remains inside its own container */}
        <main className="page-container"> {/* Changed div to main for semantics */}
          <Routes>
            <Route path="/" element={<SellingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/history" element={<TransactionHistoryPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/settings" element={<SettingsPage />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;