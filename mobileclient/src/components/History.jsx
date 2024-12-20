import { useCustomer } from '../context/CustomerContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

function History() {
    const { customer, error, loading } = useCustomer();

    return (
        <div className="main-content">
            <div className="page-header">
                <Link to="/profile">
                    <FaArrowLeft className="back" />
                </Link>
                <h1>History</h1>
            </div>
            <div className="page-content">

            </div>
        </div>
    );
}

export default History;