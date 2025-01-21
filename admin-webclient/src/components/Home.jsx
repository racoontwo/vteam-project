import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home({ isLoggedIn }) {
    // State variables
    const [scooters, setScooters] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
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

        // Fetch customers from the API
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/v1/customers/all-customers`, {
                    headers: {  
                        'x-api-key': apiKey,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScooter();
        fetchCustomer();

        // fetch every 10 seconds
        const interval = setInterval(() => {
            fetchScooter();
            fetchCustomer();
            console.log("fetching scooters and customers");
        }, 10000);

        return () => clearInterval(interval);
    }, [baseUrl]);

    // If the user is not logged in, show a message
    if (!isLoggedIn) {
        return (
            <div className="overview">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }

    return (
        <div className="overview">
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {scooters && customers && (
                <>

                    <div className="cards">
                        <div className="card">
                            <h2>Scooters</h2>
                            <p>{scooters.data.length}</p>
                        </div>
                        <div className="card">
                            <h2>Customers</h2>
                            <p>{customers.data.length}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;