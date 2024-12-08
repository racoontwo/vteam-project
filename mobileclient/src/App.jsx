import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/main.scss';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Scan from './components/Scan';
import Profile from './components/Profile';

function App() {
    return (
        <Router>
            <div className="main">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Home />} />
                        <Route path="/scan" element={<Scan />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Navbar />
            </div>
        </Router>
    );
}

export default App;
