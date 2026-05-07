const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { auth, admin } = require('../middleware/auth');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Get all users (Admin only)
router.get('/', auth, admin, (req, res) => {
  const usersData = fs.readFileSync(usersFilePath, 'utf8');
  const users = JSON.parse(usersData);
  
  // Return users without passwords
  const safeUsers = users.map(({ password, ...user }) => user);
  res.json(safeUsers);
});

module.exports = router;
