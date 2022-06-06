const express = require('express');
const reviewsRouter = express.Router()
const {Reviews} = require('../db')

reviewsRouter.use((req, res, next) => {
    console.log('A request is being made to /reviews');
    next();
});

reviewsRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await Reviews.getAllReviews();
        return res.send(reviews);
    } catch (error) {
        throw error;
    }
})

reviewsRouter.get('/:productId', async (req, res, next) => {
    try {
        const {productId} = req.params;
        const reviews = await Reviews.getReviewsByProductId(productId);
        return res.send(reviews);
    } catch (error) {
        throw error;
    }
})

module.exports = reviewsRouter