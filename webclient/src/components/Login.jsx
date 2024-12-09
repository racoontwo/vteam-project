import { Link } from "react-router-dom";

function Login({ isLoggedIn, handleLogin, handleLogout }) {
    return (
        <div className="login">
            <h1>Log in</h1>
            {isLoggedIn ? (
                <Link to="/">
                    <button className="login-button" onClick={handleLogout}>Log out</button>
                </Link>
            ) : (
                <Link to="/">
                    <button className="login-button" onClick={handleLogin}>Log in</button>
                </Link>
            )}
        </div>
    );
}

export default Login;