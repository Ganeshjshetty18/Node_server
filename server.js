// server.js

const express = require('express');
const app = express();
const contactRoutes = require('./api');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 9000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(cors());
  
// Routes
app.use('/contacts', contactRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
