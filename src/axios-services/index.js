import axios from "axios";

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
    const { data } = await axios.get("https://localhost:4000/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get("https://localhost:4000/api/products");
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getAllActiveProducts() {
  try {
    const { data } = await axios.get(
      "https://localhost:4000/api/products/active"
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getActiveProductsByCategory(category) {
  try {
    const { data } = await axios.get(
      `/https://localhost:4000/api/products/category/${category}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(
      `https://localhost:4000/api/products/${productId}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function addNewProduct(productToAdd) {
  try {
    const { data } = await axios.post("https://localhost:4000/api/products", {
      name: productToAdd.name,
      description: productToAdd.description,
      categoryId: productToAdd.categoryId,
      quantity: productToAdd.quantity,
      price: productToAdd.price,
      isActive: productToAdd.isActive,
      picture: productToAdd.picture,
    });
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateProduct(productId, updatedProductValues) {
  try {
    const { data } = await axios.patch(
      `https://localhost:4000/api/products/${productId}`,
      updatedProductValues
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteProduct(productId) {
  try {
    const { data } = await axios.delete(
      `https://localhost:4000/api/products/${productId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const { data } = await axios.get(`https://localhost:4000/api/categories/`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryById(categoryId) {
  try {
    const { data } = await axios.get(
      `https://localhost:4000/api/categories/${categoryId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { data: users } = await axios.get("https://localhost:4000/api/users");
    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function getCartProducts() {
  try {
    const { data } = await axios.get(`https://localhost:4000/api/cart`);
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

export async function getAllReviews() {
  try {
    const { data: reviews } = await axios.get(
      "https://localhost:4000/api/reviews"
    );
    return reviews;
  } catch (err) {
    console.error(err);
  }
}
