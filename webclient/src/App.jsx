import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './styles/main.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <div className="main">
                <Header />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
