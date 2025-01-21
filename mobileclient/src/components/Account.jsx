import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useCustomer } from '../context/CustomerContext';

function Account({ onLogout }) {
    // State variables
    const { customer, error, loading } = useCustomer();
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        // Set customer info
        if (customer) {
            setCustomerInfo({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email
            });
        }
    }, [customer]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value
        });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit", customerInfo);
    };

    return (
        <>
        <div className="page-header">
            <Link to="/profile">
                <FaArrowLeft className="back" />
            </Link>
            <h1>Account</h1>
            <button className="save-button" onClick={handleSubmit}>Save</button>
        </div>
        <div className="main-content account">
            <div className="page-content">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {customer && (
                    <form onSubmit={handleSubmit}>
                        <div className="name-inputs">
                            <input 
                                type="text" 
                                id="firstname" 
                                name="firstName" 
                                value={customerInfo.firstName} 
                                onChange={handleChange} 
                            />
                            <input 
                                type="text" 
                                id="lastname" 
                                name="lastName" 
                                value={customerInfo.lastName} 
                                onChange={handleChange} 
                            />
                        </div>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={customerInfo.email} 
                            onChange={handleChange} 
                        />
                    </form>
                )}
            </div>
            <div className="page-footer">
                <Link to="/">
                    <button onClick={onLogout}>Logout</button>
                </Link>
                <Link to="/">
                    <button className="delete-button">Delete Account</button>
                </Link>
            </div>
        </div>
        </>
    );
}

export default Account;