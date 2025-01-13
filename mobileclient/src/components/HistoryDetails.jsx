import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import React from 'react';

function HistoryDetails() {
    const location = useLocation();
    const { rental } = location.state;
    console.log(rental);

    return (
        <div className="main-content">
            <div className="page-header">
                <Link to="/history">
                    <FaArrowLeft className="back" />
                </Link>
                <h1>Details</h1>
            </div>
            {rental && (
                <ul className="details-list">
                    <li>
                        <span>Date:</span>
                        <span>{new Date(rental.endTime).toLocaleDateString()}</span>
                    </li>
                    <li>
                        <span>Duration:</span>
                        <span>{rental.durationMinutes} minutes</span>
                    </li>
                    <li>
                        <span>Cost:</span>
                        <span>{rental.cost} Kr</span>
                    </li>
                    <li>
                        <span>Start latitude:</span>
                        <span>{rental.startLocation.latitude}</span>
                    </li>
                    <li>
                        <span>Start longitude:</span>
                        <span>{rental.startLocation.longitude}</span>
                    </li>
                    <li>
                        <span>End latitude:</span>
                        <span>{rental.endLocation.latitude}</span>
                    </li>
                    <li>
                        <span>End longitude:</span>
                        <span>{rental.endLocation.longitude}</span>
                    </li>

                </ul>
            )}
        </div>
    );
}

export default HistoryDetails;
