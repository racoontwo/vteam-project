import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './styles/main.scss';
import Profile from './components/Profile';
import Account from './components/Account';
import Wallet from './components/Wallet';
import History from './components/History';
import HistoryDetails from './components/HistoryDetails';
import AddFunds from './components/AddFunds';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import { CustomerProvider } from './context/CustomerContext';

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
        <CustomerProvider customerId={customerId}>
            <Router>
                <div className="main">
                    <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route path="*" element={<Home isLoggedIn={isLoggedIn} />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/wallet" element={<Wallet />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/history-details" element={<HistoryDetails />} />
                            <Route path="/add-funds" element={<AddFunds />} />
                            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />} />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </CustomerProvider>
    );
}

export default App;

