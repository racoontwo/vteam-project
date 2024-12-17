import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/main.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Map from './components/Map';
import Scooters from './components/Scooters';
import Customers from './components/Customers';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to test login
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
            <Header
                isLoggedIn={isLoggedIn}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
            <Sidebar />
            <div className="main">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                         />} />
                        <Route path="*" element={<Home
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />} />
                        <Route path="/login" element={<Login
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />} />
                        <Route path="/map" element={<Map
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />} />
                        <Route path="/scooters" element={<Scooters
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />} />
                        <Route path="/customers" element={<Customers
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleLogout={handleLogout}
                        />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;