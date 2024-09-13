// Settings.jsx
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ProfileInformation from './ProfileInformation';
import ChangePassword from './ChangePassword';
import Notifications from './Notifications';
import Privacy from './Privacy';
import HelpSupport from './HelpSupport';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <ul className="settings-menu">
          <li>
            <Link to="/settings/profile">Profile Information</Link>
          </li>
          <li>
            <Link to="/settings/change-password">Change Password</Link>
          </li>
          <li>
            <Link to="/settings/notifications">Notification Preferences</Link>
          </li>
          <li>
            <Link to="/settings/privacy">Privacy & Security</Link>
          </li>
          <li>
            <Link to="/settings/help-support">Help & Support</Link>
          </li>
        </ul>
      </div>

      <div className="settings-content">
        <Routes>
          <Route path="/profile" element={<ProfileInformation />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help-support" element={<HelpSupport />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
