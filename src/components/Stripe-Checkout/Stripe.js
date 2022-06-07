import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
// May need to import Product images. import './StripeStyle.css';
import StripeContainer from './StripeContainer';


function Stripe(props) {
    const [showItem, setShowItem] = useState(false);
    return (
        <div className='App'>
            <Link to='/Home'>
            <div className='duck-logo'><a href="https://imgbb.com/"><img src="https://i.ibb.co/3TYvCMq/8850cbee960349b896d3845ddd45fc32.png" alt="8850cbee960349b896d3845ddd45fc32" border="0" /></a></div>
            </Link>
                {showItem ? (
                <StripeContainer totalAmount={props.totalAmount} />
            ) : (
                <>
                    <h3>${props.totalAmount}</h3>
                    <div className='shipping'>Free Shipping (Please allow 5-7 business days)</div>
                    <img src={''} alt='' />

                    
                    <button onClick={() => setShowItem(true)}>Purchase Product</button>
                </>
            )}
        </div>
    );
}

export default Stripe;