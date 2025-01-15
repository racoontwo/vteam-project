import { createContext, useContext, useEffect, useState } from 'react';

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ customerId, children }) => {
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    // const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseUrl = "http://localhost:4000";

    useEffect(() => {
        if (!customerId) {
            setError('Customer ID is required');
            setLoading(false);
            return;
        }

        const fetchCustomer = async () => {
            try {
                const response = await fetch(`${baseUrl}/customers?_id=${customerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch customer');
                }
                const data = await response.json();
                setCustomer(data[0]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId, baseUrl]);

    return (
        <CustomerContext.Provider value={{ customer, error, loading }}>
            {children}
        </CustomerContext.Provider>
    );
};
