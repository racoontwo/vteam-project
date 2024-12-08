import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaMapMarkedAlt } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";

function Navbar() {
    return (
        <div className="navbar">
            <nav className="nav">
                <Link to="/" className="nav-item">
                    <FaMapMarkedAlt className="nav-icon" />
                    <span>Map</span>
                </Link>
                <Link to="/scan" className="nav-item">
                    <BiQrScan className="nav-icon" />
                    <span>Scan</span>
                </Link>
                <Link to="/profile" className="nav-item">
                    <FaCircleUser className="nav-icon" />
                    <span>Profile</span>
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;
