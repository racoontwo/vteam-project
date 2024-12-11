import { Link } from 'react-router-dom';

function Signup({onSignup}) {
    return (
        <div className="login">
            <img src="../public/scooter.svg" alt="Login Image" />
            <h2>Sign up</h2>
            <form onSubmit={onSignup}>
                <input type="text" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm Password" required />
                <button type="submit">Sign up</button>
            </form>
            <Link to="/login">Log in</Link>
        </div>
    );
}

export default Signup;