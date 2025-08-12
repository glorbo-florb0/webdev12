const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.options('*', cors());

// Test route to make sure server works
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Load routes one by one with error handling
const loadRoute = (path, routePath) => {
  try {
    console.log(`Loading route: ${routePath}`);
    const route = require(path);
    app.use(routePath, route);
    console.log(`✅ Successfully loaded: ${routePath}`);
  } catch (error) {
    console.error(`❌ Failed to load ${routePath}:`, error.message);
    console.error('Stack trace:', error.stack);
  }
};

// Load each route individually
loadRoute('./routes/userRoute', '/api/user');
loadRoute('./routes/productRoute', '/api/product');
loadRoute('./routes/commentRoute', '/api/comment');
loadRoute('./routes/correctionRoute', '/api/correction');
loadRoute('./routes/shopRoute', '/api/shop');

// Start server without database first to test routes
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`🔍 Test the server: http://localhost:${PORT}/test`);
});

// Optional: Add database connection after routes are loaded
setTimeout(async () => {
  try {
    console.log('🔌 Attempting database connection...');
    const { connectDB, sequelize } = require('./db/database');
    require('./db/associations');
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}, 1000);