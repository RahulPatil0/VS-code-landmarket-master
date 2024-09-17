import React, { useState } from 'react';
import './Dashboard.css';
import Sidebar from './Sidebar';

const Dashboard = ({ children }) => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default Dashboard
