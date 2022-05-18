const client = require('../client');

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
}


async function createProduct({ name, description, price, quantity }) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products (name, description, price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [name, description, price, quantity]);
        return product;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const {rows: products} = await client.query(`
        SELECT *
        FROM products
        `)
        return products;
    } catch (error) {
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1;
        `, [productId])
        return product;
    } catch (error) {
        throw error;
    }
}