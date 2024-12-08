import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/main.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Header />
            <Sidebar />
            <div className="main">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;