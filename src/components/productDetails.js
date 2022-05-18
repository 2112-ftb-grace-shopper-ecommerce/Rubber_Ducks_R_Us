import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../axios-services';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    

useEffect(() => {
    const getProductDetails = async () => {
        const product = await getProductById(productId);
        setProduct(product);
    }
    getProductDetails();
}, [])



    return (
        <div className='productDetailsPage'>
            <h3>{`${product.name}`}</h3>
            <p>{`${product.description}`}</p>
            <p>{`$${product.price}`}</p>
            <Link to='/products'>
                <button>Back</button>
            </Link>
        </div>

    )
}

export default ProductDetails; 