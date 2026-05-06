const express = require('express');
const router = express.Router();
const { auth, admin } = require('../middleware/auth');
const { readData, usersPath } = require('../utils/db');

router.get('/', [auth, admin], (req, res) => {
  const users = readData(usersPath);
  const customers = users.filter(u => u.role === 'customer');
  res.json(customers);
});

module.exports = router;
