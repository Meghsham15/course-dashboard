import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {


    return (
        <nav>
            <Link to={`/`}><HomeIcon className="profile-icon" titleAccess="All Courses" /></Link>
            <Link to={`/dashboard`}><AccountCircleIcon className="profile-icon" titleAccess="User dashboard" /></Link>
            
        </nav>
    )

}

export default Navbar;