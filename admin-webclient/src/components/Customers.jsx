function Customers({ isLoggedIn, handleLogin, handleLogout }) {
    if (!isLoggedIn) {
        return (
            <div className="customers">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }
    return (
        <div className="customers">
            <h1>Customers</h1>
        </div>
    );
}

export default Customers;