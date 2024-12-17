import { useEffect, useState } from 'react';

function Customers({ isLoggedIn }) {
    const [customers, setCustomers] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = "http://localhost:5001/api/v1";
    console.log(`${baseUrl}/customers/all-customers`);

    useEffect(() => {

        const fetchCustomer = async () => {
            try {
                const response = await fetch(`${baseUrl}/customers/all-customers`);
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
        }

        fetchCustomer();
    }, [baseUrl]);

    console.log(customers);

    if (!isLoggedIn) {
        return (
            <div className="customers">
                <h2>Please log in to view this page.</h2>
            </div>
        );
    }
    return (
        <div className="customers">
            <h2>Customers</h2>
            {loading && <p>Loading...</p>}
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
                            <tr key={customer._id}>
                                <td>{customer._id}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Customers;