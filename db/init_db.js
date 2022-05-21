const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');


const {
  createProduct
} = require('./models/products')

const {
  createCart
} = require('./models/cart')


async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping all tables...");

    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS products;
    
    `)

    console.log("Finished dropping all tables");

    // build tables in correct order
    console.log("Starting to build tables...");

    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price FLOAT NOT NULL
    );

    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER,
      "productId" INTEGER,
      status TEXT NOT NULL
      );
    `);
    //   CREATE TABLE orders (
    //     id SERIAL PRIMARY KEY,
    //     "userId" INTEGER REFERENCES users(id),
    //     "cartId" INTEGER REFERENCES cart(id)
    //   );
    
    // );

    console.log("Finished building all tables");

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    
    // Creating dummy products
    console.log('Starting to create products...')

   

    const productsToCreate = [
      {name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', quantity: 100, price: 9.99},
      {name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', quantity: 100, price: 9.99},
      {name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', quantity: 100, price: 7.99}
    ]

    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log('Products created:');
    console.log(products);

    console.log('Finished creating products!')
 
    const cartToCreate = [
    {userId: 1, productId:2, status: "completed"},
    {userId: 1, productId:1, status: "completed"}
 ]
    const cart = await Promise.all(cartToCreate.map(createCart))
 
  console.log("created Cart", cart);  
    
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());