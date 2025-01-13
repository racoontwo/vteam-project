import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Scooters({ isLoggedIn }) {
    const [scooters, setScooters] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        // Fetch scooters from the API
        const fetchScooter = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/scooters/all-scooters`, {
                    headers: {  
                        'x-api-key': apiKey,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch scooters');
                }
                const data = await response.json();
                setScooters(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScooter();
    }, [baseUrl]);

    // Handle row expansion to show more details
    const handleExpand = (ScooterId) => {
        if (expandedRows.includes(ScooterId)) {
            setExpandedRows(expandedRows.filter(id => id !== ScooterId));
        } else {
            setExpandedRows([...expandedRows, ScooterId]);
        }
    };
    // Delete scooter by id
    const handleDelete = async (ScooterId) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/scooters/delete-one-scooter`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({ id: ScooterId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete scooter');
            }

            // Update the state to remove the deleted scooter
            setScooters({ data: scooters.data.filter(scooter => scooter.id !== ScooterId) });

        } catch (error) {
            setError(error.message);
        }
    };

    // Show a message if the user is not logged in
    if (!isLoggedIn) {
        return (
            <div className="scooters">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }

    return (
        <div className="scooters">
            <div className="scooters-header">
                <h1>Scooters</h1>
                <Link to="/add-scooter">
                    <button>Add scooter</button>
                </Link>
            </div>
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {scooters && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Battery</th>
                            <th>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scooters.map(scooter => (
                            <React.Fragment key={scooter.id}>
                                <tr onClick={() => handleExpand(scooter.id)}>
                                    <td>{scooter.id}</td>
                                    <td>{scooter.status}</td>
                                    <td>{scooter.battery}</td>
                                    <td>{scooter.speed}</td>
                                </tr>
                                {expandedRows.includes(scooter.id) && (
                                    <tr className="expanded">
                                        <td colSpan="4">
                                            <div className="expanded-content">
                                                <p>Location: {scooter.location.latitude}, {scooter.location.longitude}</p>
                                                <p>User: {scooter.user}</p>
                                                <p>Trip Log: {scooter.tripLog}</p>
                                                <button onClick={() => handleDelete(scooter.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Scooters;