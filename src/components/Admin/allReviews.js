import React from 'react';
import { Link } from 'react-router-dom';

/* this will show all reviews on front end and should probably 
also be only visible to Admins since reviews will be attached to
their respective products */


const ReviewsList = (props) => {
    const { reviews } = props
    const isAdmin = localStorage.getItem("isAdmin")

    return(
        <>
         { isAdmin === "true" ? <div>
            <h1>REVIEWS</h1>
            <div className='actionButtons'>
            <Link to='/admin'>
                <button>Back</button>
            </Link>
            </div>
            <div> {reviews.map(review =>
                <div className='adminReviewCard' key={review.id}>
                    <h3>Rating: {`${review.starRating}`}</h3>
                    <h3>Product: {`${review.productName}`}</h3>
                    <p>{`${review.body}`}</p>
                </div>
            )}
            </div>
            </div> : <p>Administrator Access Required</p>}
        </>
    )
}


export default ReviewsList