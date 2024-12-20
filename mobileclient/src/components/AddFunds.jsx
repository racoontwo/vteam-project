import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

function Account({}) {
    return (
        <div className="main-content">
            <div className="page-header">
                <Link to="/profile">
                    <FaArrowLeft className="back" />
                </Link>
                <h1>Add funds</h1>
            </div>

            <div className="page-footer">
                <button>Add funds</button>
            </div>
        </div>
    );
}

export default Account;