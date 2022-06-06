const express = require('express');
const usersRouter = express.Router()
const jwt = require('jsonwebtoken');
const { User } = require('../db');

usersRouter.use((req, res, next) => {
  console.log('A request is being made to /users');
  next();
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.getAllUsers()
    return res.send(users)
  } catch (error) {
    throw error
  }
})


// REGISTER
usersRouter.post('/register', async (req, res, next) => {
  const { email, username, password } = req.body;
  const _userByUsername = await User.getUserByUsername(username);
  const _userByEmail = await User.getUserByEmail(email);

  try {
    if (_userByUsername || _userByEmail) {
      return next({
        name: 'UserExistsError',
        message: 'A user with that username/email already exists'
      });
    }

    const newUser = await User.createUser({
      email,
      username,
      password,
      isAdmin: false
    });
    const token = jwt.sign(newUser, process.env.JWT_SECRET);
    return res.send({
      user: newUser,
      message: "Thank you for signing up",
      token: token
    });
  } catch ({name, message}) {
    return next({ name, message})
  }
});


// login a user
usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  // the request must have both for it to work
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  }

  try {
    const user = await User.getUser({ username, password });
    if (!user) {
      return next({
        name: 'IncorrectCredentialsError',
        message: 'Username or password is incorrect'
      });
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);
    process.env.token = token;

    return res.send({
      user: user,
      message: "You're logged in!",
      token: token
    })

  } catch (error) {
    throw error
  }
});

// UPDATE
usersRouter.patch('/:userId', async (req, res, next) => {

  try {
    const { userId } = req.params;
  const { email, username, isAdmin } = req.body;
  const originalUser = await User.getUserByUserId(userId);

  const updatedUserValues = {};

  if (email) updatedUserValues.email = email;
  if (username) updatedUserValues.username = username;
  if (isAdmin !== undefined) updatedUserValues.isAdmin = isAdmin;

  if (!originalUser) {
    console.error({
      name: 'NoUserError',
      message: 'There is no user to update'
    })
  }

  if (parseInt(originalUser.id) === parseInt(userId)) {
    const updatedUser = await User.updateUser(userId, updatedUserValues);
    return res.send(updatedUser)
  } else {
    console.error({
      name: 'InvalidUpdate',
      message: 'User update could not be completed'
    });
    return;
  }
  } catch (error) {
    throw error;
  }
})



// DELETE
usersRouter.delete('/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await User.deleteUser(userId);
  deletedUser.success = true;
  return res.send(deletedUser)
})

module.exports = usersRouter
