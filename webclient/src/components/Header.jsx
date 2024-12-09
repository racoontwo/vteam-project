import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";

function Header({ isLoggedIn, handleLogin, handleLogout }) {
    return (
      <div className="header">
        <h1>
          <Link to="/">kund webbklient</Link>
        </h1>
        <div className="buttons">
            {isLoggedIn ? (
                <>
                    <Link to="/" onClick={handleLogout} className="logout-button">Log out</Link>
                    <Link to="/profile" className="profile-icon">
                        <MdAccountCircle />
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/login">
                        <button className="login-button">Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button className="login-button">Sign up</button>
                    </Link>
                </>
            )}
        </div>
      </div>
    );
  }
  
  export default Header;