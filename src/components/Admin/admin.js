import React from 'react'
import { Link } from "react-router-dom";
import './adminStyle.css'

const Admin = () => {

    return (
        <main>
            <h1>Administrator Views</h1>
            <div className='adminButtons'>
                <Link to='/allProducts'>
                    <button id="allProductsButton">All Products</button>
                </Link>
                <Link to='/allUsers'>
                    <button id="allUsersButton">All Users</button>
                </Link>
                <Link to='/allReviews'>
                    <button id="allReviewsButton">All Reviews</button>
                </Link>
            </div>
        </main>
    )
}

export default Admin