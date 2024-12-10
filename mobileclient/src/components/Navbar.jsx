import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { TbMap2 } from "react-icons/tb";
import { MdOutlineQrCode } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

function Navbar() {
    return (
        <div className="navbar">
            <nav className="nav">
                <Link to="/" className="nav-item">
                    <TbMap2 className="nav-icon" />
                    <span>Map</span>
                </Link>
                <Link to="/scan" className="nav-item">
                    <MdOutlineQrCode className="nav-icon qr" />
                </Link>
                <Link to="/profile" className="nav-item">
                    <MdOutlineAccountCircle className="nav-icon" />
                    <span>Profile</span>
                </Link>
            </nav>
        </div>
    );
}

export default Navbar;
