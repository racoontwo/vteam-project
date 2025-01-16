import { Link } from 'react-router-dom';

function Signup({onSignup}) {
    return (
        <div className="main-content">
            <div className="login">
                <h1>Sign up</h1>
                <form onSubmit={onSignup}>
                    <input type="text" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button type="submit">Sign up</button>
                </form>
                <Link to="/login">Log in</Link>
            </div>
        </div>
    );
}

export default Signup;