import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addNewProduct } from '../axios-services';

const AddProduct = () => {

    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState(0);
    const [newProductPrice, setNewProductPrice] = useState(99999);
    const [newProductActive, setNewProductActive] = useState(false);

    const productToAdd = {
        name: newProductName,
        description: newProductDescription,
        category: newProductCategory,
        quantity: newProductQuantity,
        price: newProductPrice,
        isActive: newProductActive
    }

    return (
        <>
            <h1>Add A New Product</h1>
            <form>
                <label htmlFor='newProductName'>Name (required): </label>
                <input
                    type='text'
                    id='newProductName'
                    name='newProductName'
                    required
                    onChange={(event) => setNewProductName(event.target.value)}
                />
                <br />
                <label htmlFor='newProductDescription'>Description: </label>
                <input
                    type='text'
                    id='newProductDescription'
                    name='newProductDescription'
                    style={{ height: "3rem", width: "300px" }}
                    onChange={(event) => setNewProductDescription(event.target.value)}
                />
                <br />
                <label htmlFor='newProductCategory'>Category (required): </label>
                <input
                    type='text'
                    id='newProductCategory'
                    name='newProductCategory'
                    required
                    onChange={(event) => setNewProductCategory(event.target.value)}
                />
                <br />
                <label htmlFor='newProductQuantity'>Quantity: </label>
                <input
                    type='number'
                    id='newProductQuantity'
                    name='newProductQuantity'
                    required
                    onChange={(event) => setNewProductQuantity(event.target.value)}
                />
                <br />
                <label htmlFor='newProductPrice'>Price: </label>
                <input
                    type='float'
                    id='newProductPrice'
                    name='newProductPrice'
                    required
                    onChange={(event) => setNewProductPrice(event.target.value * 100)}
                />
                <br />
                <label htmlFor='newProductActive'>Status: </label>
                <select
                    id='newProductActive'
                    name='newProductActive'
                    required
                    onChange={(event) => 
                        setNewProductActive(event.target.value === "Active")
                    }
                >
                    <option>Not Active</option>
                    <option>Active</option>

                </select>
                <br/>
                <br/>
                <Link to='/allProducts'>
                <button>Back</button>
                </Link>
                <button
                    onClick={async (event) => {
                        event.preventDefault();
                        await addNewProduct(productToAdd);
                    }}
                >Add Product</button>
            </form>


        </>


    )



}



export default AddProduct;