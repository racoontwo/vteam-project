import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header() {
    return (
      <div className="header">
        <h1>
          <Link to="/">kund webbklient</Link>
        </h1>
        <div className="buttons">
            <button className="login-button">Log in</button>
            <button className="login-button">Sign up</button>
        </div>
      </div>
    );
  }
  
  export default Header;