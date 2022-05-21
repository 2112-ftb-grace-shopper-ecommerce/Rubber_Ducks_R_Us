import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
}
export async function getCartProducts() {
  try {
    const { data } = await axios.get(`/api/cart`);
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function removeFromCart(userId, productId) {
//   const dataToSend = {
//     userId,
//     productId,
//   };

//   try {
//     if (dataToSend.userId && dataToSend.productId) {
//       const { data } = await axios.patch(`/api/cart/remove`, dataToSend);
//       return data;
//     }
//   } catch (error) {
//     throw error;
//   }
// }