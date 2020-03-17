// IMPORTS
  const express = require('express');
  const path = require('path');
  const exphbs = require('express-handlebars');
  const handlebars = require('handlebars');

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

// GLOBAL VARIABLES
    /*
    sam:    i commented this bit for now bc im thinking of placing these in the helpers
            pero sa helpers it would be 1 getter per variable (getFirstName, getLastName, etc)

            also i havent watched the ajax vid from the time this has been pushed to github, so ill give updates
            na lang sa gc if ever the next lessons can help

    // will change these values into the db connection things once we know how
    var fname = "Ted";
    var lname = "Mosby";
    var uname = "@prof_Brosby";
    var pass = "himym";
    var biog = "Somewhere out there, there is a yellow umbrella for everyone. You must be patient.";
    var dp = "/images/profilepic/ted.jpg";

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

/* -------------------------------------------------- ROUTES -------------------------------------------------- */

  // INDEX
    app.get('/', function(req, res) {
        res.render('index'); // sam: wala namang ibang variables needed since no user info here
    });

  // USER LOGIN
    app.get('/log-in', function(req, res) {
        res.render('UserLogin', {
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
            /* sam:
                possible variables to transfer:
                - wala ata since nagaaccept pa lang ng info (?)
            */
      })
    });

  // EDIT ACCOUNT PROFILE
    app.get('/edit-account', function(req, res) {
        res.render('EditAccountProfile', {
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
            /* sam:
                possible variables to transfer:
                - im actually not sure if it needs any ??
            */
        })
    });

/* -------------------------------------------------- divider lang po -------------------------------------------------- */

// STATIC FILES  
  app.use(express.static('public'));

// LISTENER
  app.listen(port, function() {
    console.log('App listening at port '  + port)
  });
