const path = require('path');
const express = require('express');
const { redirect } = require('react-router-dom');
const app = express();

app.use(express.static(path.join(process.env.PWD, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/*', function (req, res) {
  res.redirect('/');
});

app.listen(3060);
