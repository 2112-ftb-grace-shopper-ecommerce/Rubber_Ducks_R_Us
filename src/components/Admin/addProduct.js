import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addNewProduct } from '../../axios-services/products';
import { getAllCategories } from '../../axios-services/categories';

const AddProduct = () => {

    const [categoryList, setCategoryList] = useState([])
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductCategory, setNewProductCategory] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState(-1);
    const [newProductPrice, setNewProductPrice] = useState(-1);
    const [newProductActive, setNewProductActive] = useState(false);
    const [newProductPicture, setNewProductPicture] = useState('');

    const productToAdd = {
        name: newProductName,
        description: newProductDescription,
        categoryId: newProductCategory,
        quantity: newProductQuantity,
        price: newProductPrice,
        isActive: newProductActive,
        picture: newProductPicture
    }


    useEffect(() => {
        const getCategoryList = async () => {
            const categoryList = await getAllCategories();
            setCategoryList(categoryList);
        }

        getCategoryList();
    }, []);


    return (
        <>
            <h1>Add A New Product</h1>
            <form className='adminProductCard'>
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
                    onChange={(event) => setNewProductDescription(event.target.value)}
                />
                <br />
                <label htmlFor='newProductCategory'>Category (required): </label>
                <select
                    id='newProductCategory'
                    name='newProductCategory'
                    required
                    onChange={(event) => {
                        setNewProductCategory(parseInt(event.target.value))
                    }
                    }
                    >
                    <option value=''>-- Select Product Category --</option>
                    {categoryList.map(category =>
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {`${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}
                        </option>
                    )}
                </select>
                <br />
                <label htmlFor='newProductQuantity'>Quantity (required): </label>
                <input
                    type='number'
                    id='newProductQuantity'
                    name='newProductQuantity'
                    required
                    onChange={(event) => setNewProductQuantity(parseInt(event.target.value))}
                />
                <br />
                <label htmlFor='newProductPrice'>Price (required): </label>
                <input
                    type='float'
                    id='newProductPrice'
                    name='newProductPrice'
                    required
                    onChange={(event) => setNewProductPrice(parseInt(event.target.value * 100))}
                />
                <br />
                <label htmlFor='newProductPicture'>Picture URL: </label>
                <input
                    type='text'
                    id='newProductPicture'
                    name='newProductPicture'
                    onChange={(event) => setNewProductPicture(event.target.value)}
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
                <br />
                <br />
                <div className='productCardButtons'>
                <Link to='/allProducts'>
                    <button>Back</button>
                </Link>
                <button
                    onClick={async (event) => {
                        event.preventDefault();
                        if (productToAdd.name === '' || productToAdd.categoryId === '' || productToAdd.quantity === -1 || productToAdd.price === -1) {
                            alert('Please fill out all required fields')
                            return;
                        }
                        const result = await addNewProduct(productToAdd);

                        if (!result) {
                            alert(`Error adding new product. Please try again.`)
                            return;
                        }

                        alert(`${productToAdd.name} has been added`)

                    }}
                >Add Product</button>
                </div>
            </form>


        </>


    )



}



export default AddProduct;