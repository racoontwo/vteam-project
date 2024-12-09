function Home({ isLoggedIn, handleLogin, handleLogout }) {
    if (!isLoggedIn) {
        return (
            <div className="overview">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }
    return (
        <div className="overview">
            <h1>Overview</h1>
        </div>
    );
}

export default Home;