const client = require('../client');



async function createReview({ writerId, productId, productName, starRating, body }) {
    try {
        const {rows: [review]} = await client.query(`
        INSERT INTO reviews ("writerId", "productId", "productName", "starRating", body)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `, [writerId, productId, productName, starRating, body]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function getAllReviews() {
    try {
        const {rows: reviews} = await client.query(`
        SELECT *
        FROM reviews
        `)
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function getReviewsByProductId(productId) {
    try {
        const {rows: reviews} = await client.query(`
        SELECT *
        FROM reviews
        WHERE "productId"=$1;
        `, [productId]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByProductId
}