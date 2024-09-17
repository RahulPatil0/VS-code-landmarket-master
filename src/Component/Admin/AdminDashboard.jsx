import React, { useState } from 'react';
import './Sidebar.css';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';

const AdminDashboard = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <Layout>
            <div className="grid-container ">
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </Layout>
    );
}


export default AdminDashboard;