import { useCustomer } from '../context/CustomerContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import React from 'react';

function History() {
    // Get customer info
    const { customer, error, loading } = useCustomer();

    return (
        <div className="main-content">
            <div className="page-header">
                <Link to="/profile">
                    <FaArrowLeft className="back" />
                </Link>
                <h1>History</h1>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {customer && (
                <ul className="history-list">
                    {customer.rentalHistory.map((rental) => (
                        <li key={rental._id}>
                            <Link to={`/history-details`} state={{ rental }} className="history-item">
                                <div className="history-details">
                                    <span className="history-minutes">{rental.durationMinutes} min</span>
                                    <span className="history-date">{new Date(rental.endTime).toLocaleDateString()}</span>
                                </div>
                                <span className="history-cost">{rental.cost} Kr</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default History;