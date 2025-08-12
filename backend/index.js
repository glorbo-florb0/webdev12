const express = require('express');
const { connectDB, sequelize } = require('./db/database');
const cors = require('cors');
require("dotenv").config();


require('./db/associations');
const Product = require('./model/productModel');

const app = express();
const PORT = process.env.PORT || 3000;


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


app.use('/api/user', require('./routes/userRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/comment', require('./routes/commentRoute'));
app.use('/api/correction', require('./routes/correctionRoute'));
app.use('/api/shop', require('./routes/shopRoute'));


async function seedProductsIfEmpty() {
  const count = await Product.count();
  if (count === 0) {
    await Product.bulkCreate([
      { name: 'T-34 Tank Model Kit', description: 'Detailed 1:35 scale model kit of the iconic Soviet T-34 tank', price: 45.99, category: 'models', image: '/pictures/modelt34.png', stock: 15, isActive: true, tags: ['tank','model','soviet','ww2'] },
      { name: 'Tiger Tank T-Shirt', description: 'Premium cotton t-shirt featuring the German Tiger tank design', price: 24.99, category: 'clothing', image: '/pictures/tigert.png', stock: 50, isActive: true, tags: ['tank','clothing','german','ww2'] },
      { name: 'Sherman Tank Poster', description: 'High-quality poster of the American M4 Sherman tank', price: 12.99, category: 'posters', image: '/pictures/shermanpos.png', stock: 25, isActive: true, tags: ['tank','poster','american','ww2'] },
      { name: 'Tank Commander Cap', description: 'Authentic-style tank commander cap with embroidered insignia', price: 34.99, category: 'accessories', image: '/pictures/tankcommandercap.png', stock: 20, isActive: true, tags: ['tank','accessories','military','cap'] },
      { name: 'Tank Warfare History Book', description: 'Comprehensive guide to tank warfare from WWI to modern era', price: 29.99, category: 'books', image: '/pictures/boook.png', stock: 30, isActive: true, tags: ['tank','book','history','military'] },
    ]);
    console.log('Seeded initial products');
  }
}

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  await seedProductsIfEmpty();
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
};

startServer();
