require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const customerRoutes = require('./routes/customers');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/customers', customerRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('FlowSync CRM API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
