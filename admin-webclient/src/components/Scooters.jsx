import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Scooters({ isLoggedIn }) {
    // State variables
    const [scooters, setScooters] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [filter, setFilter] = useState('all');
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

        console.log(scooters);

        // fetch every 10 seconds
        const interval = setInterval(() => {
            fetchScooter();
            console.log("fetching scooters");
        }, 10000);

        return () => clearInterval(interval);
    }, [baseUrl]);

    // Handle row expansion to show more details
    const handleExpand = (scooterId) => {
        if (expandedRows.includes(scooterId)) {
            setExpandedRows(expandedRows.filter(id => id !== scooterId));
        } else {
            setExpandedRows([...expandedRows, scooterId]);
        }
    };
    // Delete scooter by id
    const handleDelete = async (scooterId) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/scooters/delete-one-scooter`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({ _id: scooterId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete scooter');
            }

            // Update the state to remove the deleted scooter
            setScooters({ data: scooters.data.filter(scooter => scooter._id !== scooterId) });

        } catch (error) {
            setError(error.message);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter scooters by search term
    const filteredScooters = scooters ? scooters.data.filter(scooter => {
        if (filter === 'all') return true;
        if (filter === 'lowBattery') return scooter.battery < 20;
        if (filter === 'highBattery') return scooter.battery >= 20;
        if (filter === 'rented') return scooter.status === 'rented';
        if (filter === 'available') return scooter.status === 'available';
        return true;
    }) : [];

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
            <div className="page-header">
                <h1>Scooters</h1>
                <Link to="/add-scooter">
                    <button>Add scooter</button>
                </Link>
            </div>
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {scooters && (
                <>
                    <label htmlFor="filter">Filter by:</label>
                    <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="lowBattery">Low Battery</option>
                        <option value="highBattery">High Battery</option>
                        <option value="rented">Rented</option>
                        <option value="available">Available</option>
                    </select>
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
                            {filteredScooters.map(scooter => (
                                <React.Fragment key={scooter._id}>
                                    <tr 
                                        onClick={() => handleExpand(scooter._id)} 
                                        className={scooter.battery < 20 ? 'low-battery' : ''}
                                    >
                                        <td>{scooter._id}</td>
                                        <td>{scooter.status}</td>
                                        <td>{scooter.battery}</td>
                                        <td>{scooter.speed}</td>
                                    </tr>
                                    {expandedRows.includes(scooter._id) && (
                                        <tr className={`expanded ${scooter.battery < 20 ? 'low-battery' : ''}`}>
                                            <td colSpan="4">
                                                <div className="expanded-content">
                                                    <div className="expanded-details">
                                                        <p>Location: {scooter.location.latitude}, {scooter.location.longitude}</p>
                                                        <p>User: {scooter.user}</p>
                                                        <p>Trip Log: {scooter.tripLog}</p>
                                                    </div>
                                                    <div className="expanded-actions">
                                                        <button onClick={() => handleDelete(scooter._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Scooters;