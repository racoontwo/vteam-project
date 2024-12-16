import { useEffect, useState } from 'react';

function Wallet({ customerId }) {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (!customerId) {
            setError('Customer ID is required');
            setLoading(false);
            return;
        }

        const fetchCustomer = async () => {
            try {
                const response = await fetch(`${baseUrl}/customers/${customerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer');
                }
                const data = await response.json();
                setCustomer(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomer();
    }
    , [customerId, baseUrl]);

    return (
        <div className="wallet">
            <h2>Wallet</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {customer && (
                <div>
                    <h1>{customer.balance} Kr</h1>
                </div>
            )}
        </div>
    );
}

export default Wallet;