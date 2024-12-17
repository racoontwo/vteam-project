import { Link } from 'react-router-dom';

import { MdOutlineAccountCircle } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

function Profile() {
    return (
        <div className="profile">
            <h1>Profile</h1>
            <Link to="/account">
                <MdOutlineAccountCircle className="icon" />
                Account
                <FaAngleRight className="angle" />
            </Link>
            <Link to="/wallet">
                <IoWalletOutline className="icon" />
                Wallet
                <FaAngleRight className="angle" />
            </Link>
            <Link to="/history">
                <MdHistory className="icon" />
                History
                <FaAngleRight className="angle" />
            </Link>
        </div>
    );
}

export default Profile;