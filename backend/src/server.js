const express = require('express');
const app = express();
const connectDB = require('../config/db');
const cors = require('cors');
const path = require('path');

// mongodb connection
connectDB();
app.use(cors());
// json middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

  app.get('*', (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, 'frontend', 'build', 'index.html')
    );
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
