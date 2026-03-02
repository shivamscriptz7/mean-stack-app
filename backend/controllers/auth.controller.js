const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/mysql');

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  db.query(
    'INSERT INTO users(username,password) VALUES (?,?)',
    [req.body.username, hash],
    () => res.json({ message: 'Registered' })
  );
};

exports.login = (req, res) => {
  db.query(
    'SELECT * FROM users WHERE username=?',
    [req.body.username],
    async (err, result) => {
      if (!result.length) return res.status(401).send();
      const valid = await bcrypt.compare(req.body.password, result[0].password);
      if (!valid) return res.status(401).send();
      const token = jwt.sign({ id: result[0].id }, 'secret');
      res.json({ token });
    }
  );
};
