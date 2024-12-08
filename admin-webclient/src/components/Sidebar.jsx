import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li><Link to="/">Overview</Link></li>
                <li><Link to="/scooters">Scooters</Link></li>
                <li><Link to="/customers">Customers</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
