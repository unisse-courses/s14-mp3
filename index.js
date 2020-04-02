// IMPORTS
  const express = require('express');
  const path = require('path');
  const exphbs = require('express-handlebars');
  const handlebars = require('handlebars');
  const bodyParser = require('body-parser');

// EXPRESS APP
  const app = express();
  const port = 3000; // sam: bc thats whats in the specs

// ENGINE SET-UP
  app.engine( 'hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    helpers: {
        /*
            ideas so far

            helpers that can be used for the navbar partial:
            - getFirstName (for the dropdown)
            - getProfilePic (for the icon)
        */
    }
  }));

  app.set('view engine', 'hbs');

  // Configuration for handling API endpoint data
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// GLOBAL VARIABLES
    /*
      var currUser = {
          firstname: fname,
          lastname: lname,
          username: uname,
          password: pass,
          bio: biog,
          profilepic: dp
      }

      // var lastUser | we can use this for the last person who logged in ?
    */

    var users = [
      {
        firstname: 'Ted',
        lastname: 'Mosby',
        username: '@prof_Brosby',
        password: 'himym',
        bio: 'Somewhere out there, there is a yellow umbrella for everyone. You must be patient.',
        profilepic: '/images/profilepic/ted.jpg'
      },
      {
        // copy ontop
      }
    ];

    var posts = [ 
      {
        // data from lucidcharts
      },
      {
        // copy ontop
      }
    ];

    var ingredients = [ 
      {
        // data from lucidcharts
      },
      {
        // copy ontop
      }
    ];

    var comments = [ 
      {
        // data from lucidcharts
      },
      {
        // copy ontop
      }
    ];

/* -------------------------------------------------- ROUTES -------------------------------------------------- */

  // INDEX
    app.get('/', function(req, res) {
        res.render('index', {
          // for main.hbs
            styles: "css/styles_outside.css",
            tab_title: "Index",
            body_class: "outside"
        });
    });

  // USER LOGIN
    app.get('/log-in', function(req, res) {
        res.render('UserLogin', {
          // for main.hbs
            styles: "css/styles_outside.css",
            tab_title: "Log-In",
            body_class: "outside"
          
          // for this page (!!!deal with this after mongoose!!!)
            /* sam:
                possible variables to transfer:

                lastUser: currUser.username,
                lastPass: currUser.password
                
                i think there will be variables here since theres a "remember me" option which should
                generate the login info of the last person who logged in + checked the box
            */
        })
    });

  // HOMEPAGE
    app.get('/home', function(req, res) {
        res.render('Homepage', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Homepage",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:

                - object array for the 5 posts in the homepage ?
                    each containing:
                    - username
                    - first name
                    - last name
                    - recipe post title
                    - post description
                    - upvote score
                    - date posted
                    - time posted
            */
        })
    });

  // ACCOUNT PROFILE
    app.get('/account-profile', function(req, res) {
      res.render('AccountProfile', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Account Profile",
          body_class: "inside"
        
        // for this page
            /* sam:
                possible variables to transfer:

                - object array for the posts
                    (for this one, idk how we'll do it if it will have ALL posts or if we'll just have 5 posts per page
                    then theres a next page to view older posts ?? basta we'll figure it out sana sa db parts)
                - top part of acc profile
                    - firstname
                    - lastname
                    - username
                    - bio
                    - profilepic
            */
        }
      )
    });

  // CREATE ACCOUNT PROFILE
    app.get('/create-account', function(req, res) {
      res.render('CreateAccount', {
        // for main.hbs
          styles: "css/styles_outside.css",
          tab_title: "Create Account",
          body_class: "outside"
        
        // for this page
            /* sam:
                possible variables to transfer:
                - wala ata since nagaaccept pa lang ng info (?)
            */
      })
    });

  // EDIT ACCOUNT PROFILE
    app.get('/edit-account', function(req, res) {
        res.render('EditAccountProfile', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Edit Account",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:
                - firstname
                - lastname
                - password
                - bio
                - profilepic
            */
        })
    });

  // CREATE RECIPE POST
    app.get('/create-recipe', function(req, res) {
        res.render('CreateRecipePost', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Create Post",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:
                - title
                - description of post
                - table of ingredients
                - table of instructions
            */
        })
    });

  // EDIT RECIPE POST
    app.get('/edit-recipe', function(req, res) {
        res.render('EditRecipePost', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Edit Post",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:
                - title
                - description of post
                - table of ingredients
                - table of instructions

                QUESTION: will the date and time posted change after a person has updated it ???
            */
        })
    });

  // RECIPE POST
    app.get('/recipe-post', function(req, res) {
        res.render('RecipePost', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Recipe Post",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:
                - title
                - upvotes score
                - date posted
                - time posted
                - username
                - first name
                - lastname

                - description of post
                - table of ingredients
                - table of instructions

                - comment count
                - comments
                - replies
            */
        })
    });

  // SEARCH PAGE
    app.get('/search', function(req, res) {
        res.render('SearchPage', {
          // for main.hbs
            styles: "css/styles_inside.css",
            tab_title: "Search Page",
            body_class: "inside"
          
          // for this page
            /* sam:
                possible variables to transfer:
                - im actually not sure if it needs any ??
            */
        })
    });

/* -------------------------------------------------- FEATURES -------------------------------------------------- */
  // CREATE ACCOUNT
    // POST
    app.post('/addAccount', function(req, res) {
      var user = {
        firstname:  req.body.first,
        lastname:   req.body.last,
        username:   req.body.user,
        password:   req.body.pass,
        bio:        req.body.bio
      };
    
      users.push(account);
    
      res.status(200).send(account);
    });

  // USER LOGIN FEATURE
    // POST
    app.post('/loginAccount', function(req, res) {
      var info = {
        // replace with info
      }
    
      users.push(account);
    
      res.status(200).send(account);
    });

  
  // VIEW ACCOUNT PROFILE

  
  // EDIT ACCOUNT PROFILE

  
  // DELETE ACCOUNT PROFILE

  
  // CREATE RECIPE POST

  
  // VIEW RECIPE POST

  
  // UPDATE RECIPE POST

  
  // DELETE RECIPE POST

  
  // POST COMMENT

  
  // VIEW COMMENT

  
  // UPDATE COMMENT

  
  // DELETE COMMENT

  
  // SEARCH RECIPE POST

  
  // SEARCH ACCOUNT NAME

  
  // UPVOTE/DOWNVOTE




/* -------------------------------------------------- divider lang po -------------------------------------------------- */

// STATIC FILES  
  app.use(express.static('public'));

// LISTENER
  app.listen(port, function() {
    console.log('App listening at port '  + port)
  });
