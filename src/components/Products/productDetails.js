import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../axios-services/products';
import "./productsStyle.css"

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
                <img src={`${product.picture}`} alt={`${product.name}`} />
            </div>
            <div>
                <h2>{`${product.name}`}</h2>
                {!product.quantity ?
                    <p>*OUT OF STOCK*</p>
                    :
                    null
                }
                <p>{`${product.description}`}</p>
                <p>{`$${product.price / 100}`}</p>
                <Link to='/products'>
                    <button>Back</button>
                </Link>
            </div>
        </div>

    )
}

export default ProductDetails; 