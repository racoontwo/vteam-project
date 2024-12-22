import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './styles/main.scss';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Scan from './components/Scan';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import Wallet from './components/Wallet';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to test login
    const customerId = 1;

    const handleLogin = () => {
        setIsLoggedIn(true);
        console.log('Logged in');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log('Logged out');
    };

    return (
        <Router>
            <div className="main">
                {isLoggedIn && <Navbar onLogout={handleLogout} />}
                <div className="main-content">
                    <Routes>
                        {isLoggedIn ? (
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="*" element={<Home />} />
                                <Route path="/scan" element={<Scan />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/account" element={<Account onLogout={handleLogout}/>} />
                                <Route path="/wallet" element={<Wallet customerId={customerId} />} />
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="*" element={<Login onLogin={handleLogin} />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

