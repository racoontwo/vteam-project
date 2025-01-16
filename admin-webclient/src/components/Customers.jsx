import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Customers({ isLoggedIn }) {
    const [customers, setCustomers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
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

        fetchCustomer();
    }, [baseUrl]);

    // Handle row expansion to show more details
    const handleExpand = (customerId) => {
        if (expandedRows.includes(customerId)) {
            setExpandedRows(expandedRows.filter(id => id !== customerId));
        } else {
            setExpandedRows([...expandedRows, customerId]);
        }
    };
    // Delete customer by id
    const handleDelete = async (customerId) => {
        try {
            const response = await fetch(`${baseUrl}/api/v1/customers/delete-one-customer`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                },
                body: JSON.stringify({ _id: customerId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }

            // Update the state to remove the deleted customer
            setCustomers({ data: customers.data.filter(customer => customer._id !== customerId) });

        } catch (error) {
            setError(error.message);
        }
    };

    // Show a message if the user is not logged in
    if (!isLoggedIn) {
        return (
            <div className="customers">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }

    return (
        <div className="customers">
            <div className="page-header">
                <h1>Customers</h1>
                <Link to="/add-customer">
                    <button>Add Customer</button>
                </Link>
            </div>
            {loading && <h2>Loading...</h2>}
            {error && <p>{error}</p>}
            {customers && (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.data.map(customer => (
                            <React.Fragment key={customer._id}>
                                <tr onClick={() => handleExpand(customer._id)}>
                                    <td>{customer._id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                </tr>
                                {expandedRows.includes(customer._id) && (
                                    <tr className="expanded">
                                        <td colSpan="3">
                                            <div className="expanded-content">
                                                <p>{customer.firstName} {customer.lastName}</p>
                                                <button onClick={() => handleDelete(customer._id)}>Delete</button>
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

export default Customers;