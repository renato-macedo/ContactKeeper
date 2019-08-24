const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongodb connection
mongoose.connect('mongodb+srv://renato:123@cluster0-ubjaz.mongodb.net/contactkeeper?retryWrites=true&w=majority', {
    useNewUrlParser: true 
});

// json middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));