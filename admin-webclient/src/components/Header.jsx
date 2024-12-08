import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header() {
    return (
      <div className="header">
        <h1>
          <Link to="/">admin webbklient</Link>
        </h1>
        <div className='buttons'>
            <button className="login-button">Log in</button>
        </div>
      </div>
    );
  }
  
  export default Header;