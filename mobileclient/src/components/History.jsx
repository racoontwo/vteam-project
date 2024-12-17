import { Link } from 'react-router-dom';

function History({ onLogout }) {
    return (
        <div className="history">
            <h1>History</h1>
            <Link to="/">
                <button onClick={onLogout}>Logout</button>
            </Link>
        </div>
    );
}

export default History;