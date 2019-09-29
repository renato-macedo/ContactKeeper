const express = require('express');
const app = express();
const connectDB = require('../config/db');
const cors = require('cors');

// mongodb connection
connectDB();
app.use(cors());
// json middleware
app.use(express.json({ extended:  false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));