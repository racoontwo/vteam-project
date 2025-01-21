import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AddCustomer() {
    // State variables
    const [newCustomer, setNewCustomer] = useState({ firstName: '', lastName: '' });
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;
    const navigate = useNavigate();

    // Add a new customer
    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/api/v1/customers/new-customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,

                },
                body: JSON.stringify(newCustomer),
            });

            if (!response.ok) {
                throw new Error('Failed to add customer');
            }

            navigate('/customers');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="add-customer">
            <h1>Add Customer</h1>
            <form onSubmit={handleAddCustomer}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newCustomer.firstName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newCustomer.lastName}
                    onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                    required
                />
                <button type="submit">Add Customer</button>
                <Link to="/customers">
                    <button>Back</button>
                </Link>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default AddCustomer;
