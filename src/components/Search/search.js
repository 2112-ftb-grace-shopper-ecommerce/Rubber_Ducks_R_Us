import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './SearchStyle.css';
import SearchBar from './searchBar';
import Announcer from './announcer';
import { getAllActiveProducts } from "../../axios-services/products";

const filterProducts = (products, query) => {
    if (!query) {
        return products;
    }

    return products.filter((products) => {
        products.name = products.name.toLowerCase();
        return products.name.includes(query);
    });
};

const Search = () => {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(query || '');

    return (
        <Router>
            <div className="Search">

                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSubmit={async (e) => {
                        setFilteredProducts(filterProducts(await getAllActiveProducts(), searchQuery));
                    }}
                />
                <br/>
                <Announcer
                    message={`${filteredProducts.length} products`}
                />
                <ul>
                    {filteredProducts.map((product) => (
                        <Link to={`/products/${product.id}`}>
                        <li key={product.id}>{product.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </Router>
    );
};

// Whenever the message changes in your Announcer component, screen readers will read out the message.
// <Announcer message={`List has ${filteredPosts.length} posts`} />

export default Search;