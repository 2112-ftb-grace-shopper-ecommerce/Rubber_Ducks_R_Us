import axios from 'axios';


export async function getAllReviews() {
  try {
    const { data: reviews } = await axios.get('/api/reviews');
    return reviews;
  } catch (err) {
    console.error(err);
  }
}

export async function getReviewsByProductId(productId) {
  try {
    const { data: reviews } = await axios.get(`/api/reviews/${productId}`);
    return reviews;
  } catch (err) {
    console.error(err);
  }
}