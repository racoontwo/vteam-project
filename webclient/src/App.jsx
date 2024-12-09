import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                <Header
                    isLoggedIn={isLoggedIn}
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home 
                            isLoggedIn={isLoggedIn} 
                            handleLogin={handleLogin} 
                            handleLogout={handleLogout} 
                            />} />
                        <Route path="/login" element={<Login 
                            isLoggedIn={isLoggedIn} 
                            handleLogin={handleLogin} 
                            handleLogout={handleLogout} 
                            />} />
                        <Route path="/signup" element={<Signup 
                            isLoggedIn={isLoggedIn} 
                            handleLogin={handleLogin} 
                            handleLogout={handleLogout} 
                            />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
