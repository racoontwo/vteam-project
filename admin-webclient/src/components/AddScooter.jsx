import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddScooter() {
    // State variables
    const [newScooter, setNewScooter] = useState({ latitude: '', longitude: '', battery: 100 });
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const navigate = useNavigate();

    // Add a new scooter
    const handleAddScooter = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/v1/scooters/new-scooter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify(newScooter),
            });

            if (!response.ok) {
                throw new Error('Failed to add scooter');
            }

            navigate('/scooters');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="add-scooter">
            <h1>Add Scooter</h1>
            <form onSubmit={handleAddScooter}>
                <input
                    type="text"
                    placeholder="Latitude"
                    value={newScooter.latitude}
                    onChange={(e) => setNewScooter({ ...newScooter, latitude: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={newScooter.longitude}
                    onChange={(e) => setNewScooter({ ...newScooter, longitude: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Battery"
                    value={newScooter.battery}
                    onChange={(e) => setNewScooter({ ...newScooter, battery: e.target.value })}
                    required
                />
                <button type="submit">Add Scooter</button>
                <Link to="/scooters">
                    <button>Back</button>
                </Link>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AddScooter;
