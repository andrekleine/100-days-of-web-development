const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Paths
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/restaurants', (req, res) => {
  const jsonFilePath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(jsonFilePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get('/recommend', (req, res) => {
  res.render('recommend');
});

app.post('/recommend', (req, res) => {
  const restaurant = req.body;
  const jsonFilePath = path.join(__dirname, 'data', 'restaurants.json');

  const fileData = fs.readFileSync(jsonFilePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(jsonFilePath, JSON.stringify(storedRestaurants));

  res.redirect('/confirm');
});

app.get('/confirm', (req, res) => {
  res.render('confirm');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000);
