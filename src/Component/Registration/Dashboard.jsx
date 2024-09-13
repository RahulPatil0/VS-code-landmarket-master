import React, { useState } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import './Dashboard.css';
import Layout from '../Layout/Layout';


const Dashboard = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <Layout>
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-logo">LandMarket</h2>
        <ul className="sidebar-menu">
          <li className="menu-item">Dashboard</li>
          <li className="menu-item">Properties</li>
          <li className="menu-item">Messages</li>
          <li className="menu-item">Transactions</li>
          <li className="menu-item">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <div className="header-right">
            {/* Search Icon */}
            <div className="icon-wrapper">
              <FaSearch className="header-icon search-icon" />
            </div>

            {/* Notifications */}
            <div className="icon-wrapper">
              <FaBell className="header-icon" onClick={toggleNotifications} />
              {showNotifications && (
                <div className="notifications-dropdown">
                  <p>No new notifications</p>
                  {/* Add more notification items here */}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="profile-section" onClick={toggleProfileDropdown}>
              <FaUserCircle className="header-icon" />
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <p>Profile Information</p>
                  <p>Change Password</p>
                  <p onClick={() => alert('Update Profile clicked')}>Update Profile</p>
                  <p onClick={() => alert('Sign Out clicked')}>Sign Out</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <p>Welcome to your dashboard! Here you can manage your properties, view transactions, and more.</p>
          {/* You can add more content such as cards, graphs, tables, etc. */}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
