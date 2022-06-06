import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllActiveProducts } from "../../axios-services/products";
import { getAllCategories } from "../../axios-services/categories";
import "./productsStyle.css"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    const getProductList = async () => {
      const products = await getAllActiveProducts();
      setProducts(products);
      setProductsToDisplay(products)
    }
    const getCategoryList = async () => {
      const categoryList = await getAllCategories();
      setCategoryList(categoryList);
    }

    getProductList();
    getCategoryList();
  }, [])


  return (
    <div className='productPage'>
      <h1
        style={{
          margin: '5px',
          textAlign: 'center',
          fontFamily: 'cursive',
          fontSize: '3rem'
        }}>PRODUCTS</h1>
      <select
        name='productCategory'
        id='productCategory'
        style={{
          margin: '30px',
          fontSize: '1.1rem',
          borderRadius: '10px',
          padding: '0.2rem 0.8rem'
        }}
        onChange={(event) => {
          if (event.target.value === 'none') {
            return;
          } else if (event.target.value === 'all') {
            setProductsToDisplay(products);
          } else {
            setProductsToDisplay(products.filter(product => product.categoryId === parseInt(event.target.value)))
          }
        }}
      >
        <option value='none'>- Select Product Category -</option>
        <option value='all'>All Products</option>
        {categoryList.sort().map((category) =>
          <option
            key={category.id}
            value={category.id}
          >{`${category.name.charAt(0).toUpperCase() + category.name.slice(1)}`}</option>
        )}
      </select>
      <div className='productDisplay'> {productsToDisplay.map(product =>
        <div className='productCard' key={product.id}>
          <Link to={`/products/${product.id}`}>
            <div className='productPictureDiv'>
              <img src={`${product.picture}`} className='productPicture' alt={`${product.name}`} />
            </div>
            <h3>{`${product.name}`}</h3>
          </Link>
          <p>{`${product.description}`}</p>
          <p>{`$${product.price / 100}`}</p>
        </div>
      )}
      </div>
    </div>

  )
}


export default ProductList;
