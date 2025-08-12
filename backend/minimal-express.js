// Absolutely minimal Express test
const express = require('express');

console.log('Creating Express app...');
const app = express();

console.log('Setting up basic route...');
app.get('/', (req, res) => {
  res.send('Hello World!');
});

console.log('Starting server...');
app.listen(3000, () => {
  console.log('Server running on port 3000');
});