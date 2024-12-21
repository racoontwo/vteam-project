import { Link } from 'react-router-dom';

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

function Profile() {
    return (
        <div className="main-content">
            <div className="profile">
                <h1>Profile</h1>
                <Link to="/account">
                    <MdOutlineAccountCircle className="icon" />
                    <h3>Account</h3>
                    <FaAngleRight className="angle" />
                </Link>
                <Link to="/wallet">
                    <IoWalletOutline className="icon" />
                    <h3>Wallet</h3>
                    <FaAngleRight className="angle" />
                </Link>
                <Link to="/history">
                    <MdHistory className="icon" />
                    <h3>History</h3>
                    <FaAngleRight className="angle" />
                </Link>
            </div>
        </div>
    );
}

export default Profile;