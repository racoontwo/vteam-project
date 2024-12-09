function Login({ isLoggedIn, handleLogin, handleLogout }) {
    return (
        <div className="login">
            <h1>Log in</h1>
            {isLoggedIn ? (
                <button className="login-button" onClick={handleLogout}>Log out</button>
            ) : (
                <button className="login-button" onClick={handleLogin}>Log in</button>
            )}
        </div>
    );
}

export default Login;