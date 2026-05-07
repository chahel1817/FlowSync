const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { readData, usersPath, writeData } = require('../utils/db');

const JWT_SECRET = process.env.JWT_SECRET || 'flowsync_secret_key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData(usersPath);
    
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const users = readData(usersPath);

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role || 'customer'
    };

    users.push(newUser);
    writeData(usersPath, users);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login, signup };
