import { Link } from 'react-router-dom';

function Profile({ onLogout }) {
    return (
        <div className="profile">
            <h1>Profile</h1>
            <Link to="/">
                <button onClick={onLogout}>Logout</button>
            </Link>
        </div>
    );
}

export default Profile;