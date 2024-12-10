import { Link } from 'react-router-dom';

function Login({onLogin}) {
    return (
        <div className="login">
            <img src="../public/scooter.svg" alt="Login Image" />
            <h2>Log in</h2>
            <form onSubmit={onLogin}>
                <input type="text" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Log in</button>
            </form>
            <Link to="/signup">Sign up</Link>
        </div>
    );
}

export default Login;