import React, { useState, useEffect } from "react";
import "./homeStyle.css"
import { Link } from "react-router-dom";
import { getAllActiveProducts } from "../../axios-services/products";


const Home = () => {

    const [featuredProducts, setFeaturedProducts] = useState([]);


    useEffect(() => {
        const getFeaturedProducts = async () => {
            const products = await getAllActiveProducts();
            setFeaturedProducts(products.slice(0, 4))
        }

        getFeaturedProducts();
    }, [])



    return (
        <>
            <div className="banner">
                <img src="https://greatatlanticoutfitters.com/wp-content/uploads/2014/08/24443376_s.jpg" alt='Grand Opening'/>
                <div className="welcome">
                    <h1>Welcome to Ducks 'R' Us</h1>
                    <p>We are now open!</p>
                    <p id="welcomeMsg">At Ducks 'R' Us, we believe in the power of play and creativity.
                        Ducks 'R' Us offers a great selection of well-curated duck-themed toys, games, and
                        products for kids and adults to help bring creativity into their lives. Whether you are
                        looking for fun decor or are in need of a duck friend to help debug your problems, Ducks 'R' Us
                        is committed to meeting all of your ducking needs.</p>
                    <br />
                    <Link
                        to='/products'
                        id='shopNow'>SHOP NOW</Link>
                </div>
            </div>
            <div className="featuredProducts">
                <h2>Featured Products</h2>

                <div className='featuredProductList'> {featuredProducts.map(product =>
                    <div className='featuredProductCard' key={product.id}>
                        <Link to={`/products/${product.id}`}>
                            <div className='featuredProductPictureDiv'>
                                <img src={`${product.picture}`} className='featuredProductPicture' alt={`${product.name}`} />
                            </div>
                        </Link>
                    </div>
                )}
                </div>


            </div>
        </>
    )
}


export default Home;