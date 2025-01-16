import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useCustomer } from '../context/CustomerContext';

function Wallet() {
    const { customer, error, loading } = useCustomer();

    return (
        <div className="main-content profile-content">
            <div className="page-header">
                <Link to="/profile">
                    <FaArrowLeft className="back" />
                </Link>
                <h1>Wallet</h1>
            </div>
            <div className="wallet">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {customer && (
                    <div className="wallet-content">
                        <h1 className='balance'>{customer.balance} Kr</h1>
                        <p>Available balance</p>
                    </div>
                )}
            </div>
            <div className="page-footer">
                <div className="footer-content">
                    <Link to="/add-funds">
                        <button>Add funds</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Wallet;