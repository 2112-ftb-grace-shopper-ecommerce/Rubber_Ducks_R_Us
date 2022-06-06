import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../axios-services/products';
import { getAllCategories } from '../../axios-services/categories';
import { Link } from 'react-router-dom';





const EditProduct = () => {


    const { productId } = useParams();
    const [originalProduct, setOriginalProduct] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [updatedProductName, setUpdatedProductName] = useState(null);
    const [updatedProductDescription, setUpdatedProductDescription] = useState(null);
    const [updatedProductCategory, setUpdatedProductCategory] = useState(null);
    const [updatedProductQuantity, setUpdatedProductQuantity] = useState(null);
    const [updatedProductPrice, setUpdatedProductPrice] = useState(null);
    const [updatedProductActive, setUpdatedProductActive] = useState(null);
    const [updatedProductPicture, setUpdatedProductPicture] = useState(null);


    useEffect(() => {
        const getProductToEdit = async () => {
            const originalProduct = await getProductById(productId);
            setOriginalProduct(originalProduct);
        }

        const getCategoryList = async () => {
            const categoryList = await getAllCategories();
            setCategoryList(categoryList);
        }

        getProductToEdit();
        getCategoryList();
    }, [productId]);

    let updatedProductValues = {}


    if (updatedProductName) updatedProductValues.name = updatedProductName;
    if (updatedProductDescription) updatedProductValues.description = updatedProductDescription;
    if (updatedProductPrice) updatedProductValues.price = updatedProductPrice;
    if (updatedProductQuantity) updatedProductValues.quantity = updatedProductQuantity;
    if (updatedProductCategory) updatedProductValues.categoryId = parseInt(updatedProductCategory);
    if (updatedProductActive !== null) updatedProductValues.isActive = updatedProductActive;
    if (updatedProductPicture) updatedProductValues.picture = updatedProductPicture;


    return (
        <div className='editProductPage'>
            <h1>Update Product Information</h1>
            <img
                src={`${originalProduct.picture}`}
                alt={`${originalProduct.name}`}
                style={{
                    maxWidth: "200px",
                    marginBottom: "30px"
                }}
            />
            <form className='adminProductCard'>
                <label htmlFor="updateProductName">Name: </label>
                <input
                    type="text"
                    id="updateProductName"
                    name="updateProductName"
                    defaultValue={originalProduct.name}
                    onChange={(event) => setUpdatedProductName(event.target.value)}
                />
                <br />
                <label htmlFor="updateProductDescription">Description: </label>
                <input
                    type="text"
                    id="updateProductDescription"
                    name="updateProductDescription"
                    defaultValue={originalProduct.description}
                    onChange={(event) => setUpdatedProductDescription(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductCategory'>Category: </label>
                <select
                    id='updateProductCategory'
                    name='updateProductCategory'
                    onChange={(event) =>
                        setUpdatedProductCategory(event.target.value)
                    }
                >
                    {categoryList.map(category =>

                        category.id === originalProduct.categoryId ?
                            <option
                                key={category.id}
                                value={category.id}
                                selected
                            >
                                {`${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}
                            </option>
                            :
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {`${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}
                            </option>
                    )}
                </select>
                <br />
                <label htmlFor='updateProductQuantity'>Quantity: </label>
                <input
                    type='number'
                    id='updateProductQuantity'
                    name='updateProductQuantity'
                    defaultValue={originalProduct.quantity}
                    onChange={(event) => setUpdatedProductQuantity(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductPrice'>Price (in cents): </label>
                <input
                    type='number'
                    id='updateProductPrice'
                    name='updateProductPrice'
                    defaultValue={originalProduct.price}
                    onChange={(event) => setUpdatedProductPrice(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductPicture'>Picture URL: </label>
                <input
                    type='text'
                    id='updateProductPicture'
                    name='updateProductPicture'
                    defaultValue={originalProduct.picture}
                    onChange={(event) => setUpdatedProductPicture(event.target.value)}
                />
                <br />
                <label htmlFor='updateProductActive'>Status: </label>
                <select
                    id='updateProductActive'
                    name='updateProductActive'
                    onChange={(event) =>
                        setUpdatedProductActive(event.target.value === "Active")
                    }
                >
                    {originalProduct.isActive ?
                        <>
                            <option>Not Active</option>
                            <option selected>Active</option>
                        </>
                        :
                        <>
                            <option selected>Not Active</option>
                            <option>Active</option>
                        </>
                    }
                </select>
                <br />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <Link to='/allProducts'>
                        <button>Back</button>
                    </Link>

                    <button
                        onClick={async (event) => {
                            event.preventDefault();
                            const result = await updateProduct(productId, updatedProductValues);
                            if (result) alert('Product has been updated');
                        }}
                    >Submit Changes</button>

                </div>
            </form>
        </div>

    )




}


export default EditProduct;