import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../axios-services/products';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    

useEffect(() => {
    const getProductDetails = async () => {
        const product = await getProductById(productId);
        setProduct(product);
    }
    getProductDetails();
}, [productId])



    return (
        <div className='productDetailsPage'>
            <div>
            <img src={`${product.picture}`} />
            </div>
            <div>
            <h3>{`${product.name}`}</h3>
            <p>{`${product.description}`}</p>
            <p>{`$${product.price}`}</p>
            <Link to='/products'>
                <button>Back</button>
            </Link>
            </div>
        </div>

    )
}

export default ProductDetails; 