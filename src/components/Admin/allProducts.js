/* this will allow admins to add, edit, & delete products on the front end */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../axios-services/products';






const AllProductsList = () => {
    const isAdmin = localStorage.getItem("isAdmin")
    const [products, setProducts] = useState([]);
    const noImageUrl = 'https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=20&m=1216251206&s=170667a&w=0&h=A72dFkHkDdSfmT6iWl6eMN9t_JZmqGeMoAycP-LMAw4=';

    useEffect(() => {
        const getProductsList = async () => {
            const products = await getAllProducts();
            setProducts(products);
        }
        getProductsList();
    }, [])



    return (
        <>
        { isAdmin === "true" ? <div>
            <h1>ALL PRODUCTS</h1>
            <Link to='/allProducts/add'>
                <button>Add New Product</button>
            </Link>
            <br />
            <div> {products.map(product =>
                <div
                    key={product.id}
                    style={{
                        borderStyle: "solid",
                        borderWidth: "2px",
                        borderRadius: "5px",
                        padding: "10px",
                        margin: "10px",
                        maxWidth: "40vw"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}>
                        <Link to={`/allProducts/edit/${product.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button
                            onClick={async () => {
                                if (window.confirm("Are you sure you want to delete this product?") === true) {
                                    await deleteProduct(product.id);
                                    alert('Product has been deleted')
                                    setProducts(products.filter((filteredProduct) => filteredProduct.id !== product.id))
                                }
                            }}
                        >Delete</button>
                    </div>
                    <br />
                    <div 
                        className="productInfo"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexBasis: "auto"
                        }}
                        >
                            {
                                product.picture
                                ?
                                <img 
                                    src={`${product.picture}`}
                                    alt={`${product.name}`}
                                    style = {{
                                        maxWidth: "150px",
                                        maxHeight: "150px",
                                        marginRight: "20px"
                                    }}
                                    />
                                    :
                                    <img
                                    src={noImageUrl}
                                    alt='Not Available'
                                    style = {{
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                        marginRight: "20px"
                                    }}
                                    />
                            }
                        <div>
                            <h3 style={{margin: "10px 0px 5px"}}>{`Name: ${product.name}`}</h3>
                            <p style={{margin: "5px 0px", wordWrap: "break-word"}}>{`Description: ${product.description}`}</p>
                            <p style={{margin: "5px 0px"}}>{`Category: ${product.category_name.charAt(0).toUpperCase() + product.category_name.slice(1)}`}</p>
                            <p style={{margin: "5px 0px"}}>{`Quantity: ${product.quantity}`}</p>
                            <p style={{margin: "5px 0px"}}>{`Price: $${product.price / 100}`}</p>
                            {product.isActive ?
                                <p style={{ color: "green", fontWeight: "bold", margin: "5px 0px" }}>ACTIVE</p>
                                :
                                <p style={{ color: "red", fontWeight: "bold", margin: "5px 0px" }}>NOT ACTIVE</p>
                            }
                        </div>
                    </div>
                </div>
            )}
            </div>
            <Link to='/admin'>
                <button>Back</button>
            </Link>
        </div> : <p>Administrator Access Required</p>}
        </>

    )

}


export default AllProductsList;