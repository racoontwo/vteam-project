import { Link } from 'react-router-dom';

function Account({ onLogout }) {
    return (
        <div className="account">
            <h1>Account</h1>
            <Link to="/">
                <button onClick={onLogout}>Logout</button>
            </Link>
        </div>
    );
}

export default Account;