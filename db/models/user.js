// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");

async function createUser({ email, username, password, isAdmin }) {
  try {
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(password, saltRounds);

    const { rows: [user] } = await client.query(`
        INSERT INTO users(
            email,
            username,
            password,
            "isAdmin" 
        ) VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, email, username;
        `, [email, username, hashedPwd, isAdmin]
    );
    return user;
  } catch (error) {

    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
    SELECT  id, email, username
    FROM users
    `, [])
    return users
  } catch (error) {
    throw error
  }
}

const getUserByUserId = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT  id, email, username
      FROM users 
      WHERE id = $1;
      `, [userId]);
    return user;
  } catch (error) {
    throw error
  }
}

async function getUserByUsername(username) {
  try {
    const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
        `, [username]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE email = $1;
        `, [email]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
      const user = await getUserByUsername(username);
      if(!user) return;
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordsMatch) {
          const { rows: [selectedUser] } = await client.query(`
          SELECT *
          FROM users
          WHERE username=$1 and password=$2;
          `, [username, hashedPassword]);
          delete selectedUser.password;
          return selectedUser;
      } 
  } catch (error) {
      throw error;
  }
}


module.exports = {
  // add your database adapter fns here
  createUser,
  getAllUsers,
  getUserByUserId,
  getUserByUsername,
  getUserByEmail,
  getUser
};