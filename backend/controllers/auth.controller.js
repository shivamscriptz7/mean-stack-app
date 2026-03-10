// importing required packages
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/mysql');

// register user
exports.register = async (req, res) => {

  // hashing the password before saving into database
  const hash = await bcrypt.hash(req.body.password, 10);

  // inserting username and hashed password into users table
  db.query(
    'INSERT INTO users(username,password) VALUES (?,?)',
    [req.body.username, hash],

    // sending response after successful registration
    () => res.json({ message: 'Registered' })
  );
};

// login user
exports.login = (req, res) => {

  // checking if username exists in database
  db.query(
    'SELECT * FROM users WHERE username=?',
    [req.body.username],

    async (err, result) => {

      // if user not found return unauthorized
      if (!result.length) return res.status(401).send();

      // comparing entered password with stored hashed password
      const valid = await bcrypt.compare(req.body.password, result[0].password);

      // if password is incorrect return unauthorized
      if (!valid) return res.status(401).send();

      // generating JWT token using user id
      const token = jwt.sign({ id: result[0].id }, 'secret');

      // sending token in response
      res.json({ token });
    }
  );
};