import React from 'react'
import { Link } from "react-router-dom";

const Admin = () => {
    
    return (
        <main>
            <Link to='/allProducts'>
            <button id="registerButton">All Products</button>
            </Link>
            <Link to='/allUsers'>
            <button id="registerButton">All Users</button>
            </Link>
            <Link to='/allReviews'>
            <button id="registerButton">All Reviews</button>
            </Link>
        </main>
    )
}

export default Admin