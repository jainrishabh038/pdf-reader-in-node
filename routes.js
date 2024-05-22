const express = require('express');
const app = express();
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('home', { name: 'what are you doing', about: 'do you know me' });
  });
  app.get('/about', (req, res) => {
    res.render('about', { name: 'ritik', about: 'do you know me' });
  });
};
