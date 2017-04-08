const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log +'\n', (err) => {
    if (err) {
      console.log('Unable to  apend to server.log');
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
app.get('/', (req, res) => {
  // res.send('Hello Express!');
  // res.send({
  //   name: 'Piotrinho',
  //   likes: ['Volleyball','Football']
  // });
    res.render('home.hbs', {
      pageTitle: 'Welcome here!',
      welcomeMessage: 'Here goes fancy message! Enjoy!',

    });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/error', (req, res) => {
  res.send({
    errorMessage: 'Error! Something bad happen...'
  });
});


app.listen(port, () => {
    console.log(`Server is app on port ${port}`)
});
