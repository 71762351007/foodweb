const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const cors = require('cors');

// Initialize MongoDB connection
mongoDB();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['https://foodweb-5xchzs1w9-71762351007s-projects.vercel.app', 'https://foodweb-1-3y09.onrender.com'];  
    // Allow requests with no 'origin' (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Enable cookies to be sent across different origins
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Define API routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Base endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
