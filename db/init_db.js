const {
  client,
  User,
  Products,
  Reviews,
  Payments,
  Cart,
  Categories,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in reverse of build order 
    console.log("Dropping all tables...");

    await client.query(`
    DROP TABLE IF EXISTS payments;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS categories;
    `)

    console.log("Finished dropping all tables");

    // build tables
    // split these into separate queries since one of them was breaking
    console.log("Starting to build tables...");

    await client.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL
      ); 
      `); console.log("categories")

    await client.query(`
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      "categoryId" INTEGER NOT NULL REFERENCES categories(id),
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      "isActive" BOOLEAN DEFAULT false,
      picture TEXT
    );
    `); console.log("products")

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT false
    ) 
    `); console.log("users")

    await client.query(`
      CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      paid BOOLEAN DEFAULT false
    );
    `); console.log("cart")

    await client.query(`
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      "writerId" INTEGER REFERENCES users(id),
      "productId" INTEGER REFERENCES products(id),
      "productName" VARCHAR(255) REFERENCES products(name),
      "starRating" INTEGER NOT NULL,
      body TEXT NOT NULL
    );
    `); console.log("reviews")

    await client.query(`
    CREATE TABLE payments(
      id SERIAL PRIMARY KEY,
      "cardNum" INTEGER NOT NULL,
      "expDate" DATE NOT NULL,
      cvv INTEGER NOT NULL,
      "billingAddress" TEXT NOT NULL,
      "cardName" VARCHAR(255) NOT NULL
    );
    `); console.log("payments")

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

    // Creating categories of products
    console.log("Starting to create categories...");
    const categoriesToCreate = [
      { name: "toys" },
      { name: "clothing" },
      { name: "accessories" },
      { name: "games" },
      { name: "books" },
      { name: "other" }
    ]
    const categories = await Promise.all(categoriesToCreate.map(Categories.createCategory))
    console.log("Categories created:", categories);


    // Creating dummy products
    console.log('Starting to create products...')


    const productPicturesToCreate = {
      AlphaDucky: 'https://cdn11.bigcommerce.com/s-jnapaiw/images/stencil/1280x1280/products/2945/4049/Sunny_duck__52036.1400093435.jpg?c=2',
      SisterDucky: 'https://i5.walmartimages.com/asr/3593788e-22cd-4a3c-883b-e177ab0d97ef.1a27b3bf92f8f5628c5acf3fa9c447d4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      BabyDucky: 'https://amsterdamduckstore.com/wp-content/uploads/2015/10/baby-blue-rubber-duck-front-e1569756109220.jpg',
      DuckyShirt: 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91PRUxw3EKL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UL1500_.png',
      DuckyHat: 'https://m.media-amazon.com/images/I/81ZmkBJewcL._AC_UL1500_.jpg',
      DuckyUmbrella: 'https://cdn.shopify.com/s/files/1/2280/6547/products/Rubber-Duck-Print-Pattern-Foldable-Umbrella_2d42b71f-050e-421e-b900-e5eef4ef336c_720x.jpg?v=1631332434',
      BoomerDucky: 'https://i.ebayimg.com/images/g/tCEAAOSwN~VeZDXh/s-l500.jpg',
      Duck: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg',
      LuckyDuck: 'https://basspro.scene7.com/is/image/BassPro/2439609_100039400_is'
    }



    const productsToCreate = [
      { name: 'Alpha Ducky', description: 'This is the first rubber ducky to ever be created.', categoryId: 1, quantity: 100, price: 999, isActive: true, picture: productPicturesToCreate.AlphaDucky },
      { name: 'Sister Ducky', description: 'She is the sister of Alpha Ducky.', categoryId: 1, quantity: 100, price: 999, isActive: true, picture: productPicturesToCreate.SisterDucky },
      { name: 'Baby Ducky', description: 'Baby Duck Doo Doo doo doo doo doo..', categoryId: 1, quantity: 100, price: 799, isActive: true, picture: productPicturesToCreate.BabyDucky },
      { name: 'Ducky Shirt', description: 'Crew neck t-shirt with ducky logo', categoryId: 2, quantity: 0, price: 1549, isActive: true, picture: productPicturesToCreate.DuckyShirt },
      { name: 'Ducky Hat', description: 'White cap with ducky logo', categoryId: 2, quantity: 100, price: 1999, isActive: true, picture: productPicturesToCreate.DuckyHat },
      { name: 'Ducky Umbrella', description: 'Large golf umbrella with ducky logos', categoryId: 3, quantity: 50, price: 2399, isActive: true, picture: productPicturesToCreate.DuckyUmbrella },
      { name: 'Boomer Ducky', description: 'This old ducky is no longer active.', categoryId: 1, quantity: 0, price: 999, isActive: false, picture: productPicturesToCreate.BoomerDucky },
      { name: 'Duck', description: 'Bucephala albeola', categoryId: 6, quantity: 20, price: 4999, isActive: true, picture: productPicturesToCreate.Duck },
      { name: 'Lucky Ducks Game', description: 'The Lucky Ducks Game is a fun and engaging activity for children and parents to play together', categoryId: 4, quantity: 40, price: 2499, isActive: true, picture: productPicturesToCreate.LuckyDuck }
    ]

    const products = await Promise.all(productsToCreate.map(Products.createProduct));

    console.log('Products created:', products);

    // Creating dummy users
    console.log('Starting to create users...')

    const usersToCreate = [
      { email: 'DonnyD@hotmail.com', username: 'DonnyD', password: 'OGduck31', isAdmin: false },
      { email: 'countduckula@yahoo.com', username: 'TheCount', password: 'veggies1988', isAdmin: false },
      { email: 'BigDaff@utk.edu', username: 'Daffy', password: 'ihateporky', isAdmin: false },
      { email: 'admin@gmail.com', username: 'Admin', password: 'admin1', isAdmin: true },

    ]
    const users = await Promise.all(usersToCreate.map(User.createUser));

    console.log('Users created:', users);

    // Creating dummy reviews
    console.log('Starting to create reviews...')

    const reviewsToCreate = [
      { writerId: 1, productId: 1, productName: 'Alpha Ducky', starRating: 5, body: 'This is literally the best duck ever made.' },
      { writerId: 2, productId: 2, productName: 'Sister Ducky', starRating: 5, body: 'My 57 month old loved it! Would buy again!' },
      { writerId: 3, productId: 3, productName: 'Baby Ducky', starRating: 1, body: 'Honestly so trash do not waste your money on this.' },
      { writerId: 4, productId: 3, productName: 'Baby Ducky', starRating: 3, body: 'A good starting point for duck collectors but not the best.' }
    ]
    const reviews = await Promise.all(reviewsToCreate.map(Reviews.createReview));
    console.log('Reviews created:', reviews);

  // creating cart
  console.log("creating cart...")
    const cartToCreate = [
    {userId: 1, productId:2},
    {userId: 1, productId:1}
 ]
    const cart = await Promise.all(cartToCreate.map(Cart.createCart))
 
  console.log("cart created:", cart);  

    // Creating dummy payments
    console.log("Starting to create payments...")
    const paymentsToCreate = [
      { cardNum: 12345678, expDate: 20250522, cvv: 123, billingAddress: '1234 Main St', cardName: 'Donald Duck' },
      { cardNum: 87654321, expDate: 20250623, cvv: 321, billingAddress: '4321 Church St', cardName: 'Count Duckula' },
      { cardNum: 10100101, expDate: 20250724, cvv: 987, billingAddress: '1337 Cherokee Blvd', cardName: 'Daffy Duck' },
    ]

    const payments = await Promise.all(paymentsToCreate.map(Payments.createPayments))
    console.log("Payments created:", payments)

  } catch (error) {
    throw error;
  }


}





buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());