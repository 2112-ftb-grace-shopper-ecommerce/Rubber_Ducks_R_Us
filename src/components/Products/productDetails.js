import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../axios-services/products';
import { getReviewsByProductId } from "../../axios-services/reviews";
import "./productsStyle.css"

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        const getProductDetails = async () => {
            const product = await getProductById(productId);
            setProduct(product);
        }
        const getProductReviews = async () => {
            const reviews = await getReviewsByProductId(productId);
            setReviews(reviews);
        }
        getProductDetails();
        getProductReviews();
    }, [productId])

    console.log(reviews)

    return (
        <div className='productDetailsPage'>
            <Link to='/products'>
                <button>Back</button>
            </Link>
            <div className='detailedProductInfo'>
                <img src={`${product.picture}`} alt={`${product.name}`} />
                <div>
                    <h2>{`${product.name}`}</h2>
                    {!product.quantity ?
                        <p>*OUT OF STOCK*</p>
                        :
                        null
                    }
                    <p>{`${product.description}`}</p>
                    <br/>
                    <p>{`$${product.price / 100}`}</p>
                </div>

            </div>
            <div className='detailedProductReviews'>
                <h3>Reviews</h3>
                {reviews.map(review =>
                    <div key={review.id} className='reviewCard'>
                        <h5>Rating: {`${review.starRating}`}</h5>
                        <h5>Product: {`${review.productName}`}</h5>
                        <p>{`${review.body}`}</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default ProductDetails; 