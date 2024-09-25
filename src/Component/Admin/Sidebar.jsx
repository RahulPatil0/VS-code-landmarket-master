import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/Auth";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  
  // const [auth, updateAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
  //   updateAuth({
  //     username: null,
  //     token: null,
  //     userId: null,
  //     role: null
    // });
  
  //   navigate("/");  // Redirect immediately after logout
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> Admin Dashboard
        </div>

        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin">
            <BsGrid1X2Fill className="icon" /> Report 
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/properties">
            <BsFillArchiveFill className="icon" /> Properties
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/users">
            <BsFillGrid3X3GapFill className="icon" /> Users 
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/admin/orders">
            <BsFillGrid3X3GapFill className="icon" /> User Orders
          </Link>
        </li>

        {/* <li className="sidebar-list-item">
          <Link to="/admin/feedback">
            <BsFillGrid3X3GapFill className="icon" /> Feedback
          </Link>
        </li> */}

        <li className="sidebar-list-item">
          <Link onClick={handleLogout}>
            <BsFillGearFill className="icon" /> Log out
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;