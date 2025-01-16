import { Link } from 'react-router-dom';

function Login({onLogin}) {
    return (
        <div className="main-content">
            <div className="login">
                <h1>Log in</h1>
                <form onSubmit={onLogin}>
                    <input type="text" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Log in</button>
                </form>
                <Link to="/signup">Sign up</Link>
            </div>
    </div>
    );
}

export default Login;