// IMPORTS
  const express = require('express');
  const path = require('path');
  const exphbs = require('express-handlebars');
  const handlebars = require('handlebars');
  const bodyParser = require('body-parser');

// EXPRESS APP
  const app = express();
  const port = 3000; // sam: bc thats whats in the specs

  const router = require('./routes/routes');

// ENGINE SET-UP
  app.engine( 'hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    helpers: {
        incremented: function(index) {
            index++;
            return index;
        }
    }
  }));

  app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// HOME ROUTE FOR INDEX PAGE
  app.get('/', function(req, res) {
        res.render('index', {
        // for main.hbs
          styles: "css/styles_outside.css",
          tab_title: "Index",
          body_class: "outside"
      });
  });

// ALL THE OTHER ROUTES
  app.use('/', router);

// STATIC FILES  
  app.use(express.static('public'));

// LISTENER
  app.listen(port, function() {
    console.log('App listening at port '  + port)
  });