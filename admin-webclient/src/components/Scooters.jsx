function Scooters({ isLoggedIn, handleLogin, handleLogout }) {
    if (!isLoggedIn) {
        return (
            <div className="scooters">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }
    return (
        <div className="scooters">
            <h1>Scooters</h1>
        </div>
    );
}

export default Scooters;