import { Link } from 'react-router-dom';

function Home({ isLoggedIn, handleLogin, handleLogout }) {
    return (
        <div className="home">
            <div className="home-container">
                {isLoggedIn ? (
                    <>
                        <h1>Go to your profile<br />to see activity</h1>
                        <Link to="/profile">
                            <button className="login-button">Profile</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <h1>Log in to see <br />your activity</h1>
                        <Link to="/login">
                            <button className="login-button">Log in</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;