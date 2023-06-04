const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const fileName = file.split('.')[0];
  if (fileName !== 'index') {
    router.use(`/api/${fileName}`, require(`./${fileName}.js`));
  }
});

module.exports = router;
