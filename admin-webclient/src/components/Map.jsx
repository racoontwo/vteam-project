function Map({ isLoggedIn, handleLogin, handleLogout }) {
    if (!isLoggedIn) {
        return (
            <div className="map">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }
    return (
        <div className="map">
            <h1>Map</h1>
        </div>
    );
}

export default Map;