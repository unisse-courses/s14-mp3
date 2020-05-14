// ROUTER DECLARATION
  const router = require('express').Router();
  
// IMPORTING MODELS
  const userModel = require('../models/users');
  const postModel = require('../models/posts');
  const ingredientsModel = require('../models/ingredients');
  const commentsModel = require('../models/comments');

// // IMPORTING VALIDATION
//   const {check} = require('express-validator');
//   const validation = {
//     signupValidation: [
//       //check if EMAIL is not empty
//       check('EMAIL', 'Email is required.').notEmpty(),

//       //same thing with the firstname, lastname, etc.
//       check('FIRSTNAME', 'First name is required.').notEmpty(),
//       check('LASTNAME', 'Last name is required.').notEmpty(),
//       check('USERNAME', 'Username is required; must be greater than 6 and less than 15 characters.').isLength({min: 6, max: 15}),
//       check('PASSWORD', 'Password must be greater than 6 characters.').isLength({min: 6})
//     ]
//   };
//   const { validationResult } = require('express-validator');


//IMPORTING BCRYPT
  const bcrypt = require('bcrypt');

//MULTER
  const multer = require('multer');
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
    }
  });

  var upload = multer({storage: storage});

// GLOBAL VARIABLES
  var rememberMe = false;

  var currUser = {
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    bio: '',
    profilepic: ''
  };

  var count;

  var isGuest;

/* -------------------------------------------------- ALL THE OTHER ROUTES -------------------------------------------------- */

// LOG-IN
  router.get('/log-in', function(req, res) {
      res.render('UserLogin', {
        styles: "css/styles_outside.css",
        tab_title: "Log-In",
        body_class: "outside",
      })  
  });

// HOMEPAGE
  router.get('/home', function(req, res) {
      res.render('Homepage', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Homepage",
          body_class: "inside",
          navUser: currUser.username,
          navIcon: currUser.profilepic
      })
  });
  
// SEARCH PAGE
  router.get('/search', function(req, res) {
    res.render('SearchPage', {
      // for main.hbs
        styles: "css/styles_inside.css",
        tab_title: "Search Page",
        body_class: "inside",
        navUser: currUser.username,
        navIcon: currUser.profilepic,
    })
  });

// ACCOUNT PROFILE
  router.get('/account-profile/:param', function(req, res){
    var user_route = "^" + req.params.param;
    
    userModel.getCurrAccountInfo(req.params.param, function(data){
      postModel.getOwnPosts(data.email, function (posts){
        console.log(posts);

        if(data){
          console.log(data);
          res.render('AccountProfile', {
            styles:     "../css/styles_inside.css",
            tab_title:  "Account Profile",
            body_class: "inside",
            
            firstname:  data.firstname,
            lastname:   data.lastname,
            username:   data.username,
            bio:        data.bio,
            profilepic: data.profilepic,
            email:      data.email,
            posts:      posts,

            navUser: currUser.username,
            navIcon: currUser.profilepic
          });
        }
        else {
          result = {
            message: "Account does not exist"
          }

          res.send(result.message);
        }
      })
      
    });

  });

// CREATE ACCOUNT
  router.get('/create-account', function(req, res) {
    res.render('CreateAccount', {
      // for main.hbs
        styles: "css/styles_outside.css",
        tab_title: "Create Account",
        body_class: "outside",
        navUser: currUser.username,
        navIcon: currUser.profilepic
    })
  });

// EDIT ACCOUNT
  router.get('/edit-account', function(req, res) {
      res.render('EditAccountProfile', {
        styles:     "css/styles_inside.css",
        tab_title:  "Edit Account",
        body_class: "inside",
        navUser: currUser.username,
        navIcon: currUser.profilepic,
        email:      currUser.email,
        firstname:  currUser.firstname,
        lastname:   currUser.lastname,
        username:   currUser.username,
        password:   "",
        profilepic: currUser.profilepic,
        bio:        currUser.bio
      });
  });

// RECIPE POST
  router.get('/recipe-post/:param', function(req, res) {
    var id = req.params.param;

    postModel.getOnePost(id,function(data){


      if(data){
        var acc = "account-profile/" + data.user.username;

          res.render('RecipePost', {
            // for main.hbs
              styles: "../css/styles_inside.css",
              tab_title: "Recipe Post",
              body_class: "inside",
              navUser: currUser.username,
              navIcon: currUser.profilepic,
                
              title: data.title,
              upvote_score: data.upvotes,
              date_posted: data.dateposted,
              time_posted: data.timeposted,
              username: data.user.username,
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              picture: data.recipe_picture,
              description: data.description,
              ingredients: data.ingredients,
              instructions: data.instructions,
              comment_count: data.comments.length,
              account_link: acc,
              post: true
            })
      }
    })    
  });

// CREATE RECIPE POST
  router.get('/create-recipe', function(req, res) {
      res.render('CreateRecipePost', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Create Post",
          body_class: "inside",
          navUser: currUser.username,
          navIcon: currUser.profilepic,

          // FEATURE: '/addPost'
      })
  });

// EDIT RECIPE POST
  router.get('/edit-recipe/:param', function(req, res) {
    var id = req.params.param;

    postModel.getOnePost(id,function(data){


      if(data){
        if(currUser.username == data.user.username) {
        

          res.render('EditRecipePost', {
            // for main.hbs
              styles: "../css/styles_inside.css",
              tab_title: "Edit Post",
              body_class: "inside",
              navUser: currUser.username,
              navIcon: currUser.profilepic,
              
              stuff: data
          })
      
        }
        else {
          result = {
            message: "You cannot edit other user's recipe posts"
          }
          res.send(result);
        }
      }
    })

  });

/* --------------------------------------------- FEATURES & OTHER POST REQUESTS --------------------------------------------- */

/* ----------- FEATURES BEFORE LOGIN ------------ */

// [LOG-IN] Actions After Clicking Login Button
  router.post('/loginACTION', function(req, res) {
    var result;
    console.log("checked: " + req.body.remember);

    rememberMe = req.body.remember;

    var account = {
      username:  req.body.username,
      password:   req.body.password,
    }

    if (account.username == "Guest"){
      currUser = {
        username: account.username,
        profilepic: "../images/default_profile.png"
      }

      result = {
        success: true,
        message: account.username + " has logged in!",
        returnData: currUser
      }
      res.send(result);
    }
    else
    {

        userModel.getCurrAccountInfo(account.username, function(accountResult){
          console.log(accountResult);

          if(accountResult){ // if the username entered exists in the db
              console.log("USERNAME EXISTS IN DB");

              bcrypt.compare(account.password, accountResult.password, function(err, equal){
                if(equal) {
                  console.log("PASSWORD IS RIGHT");
                  
                  req.session.email = accountResult.email;

                  currUser = {
                    email:      accountResult.email,
                    firstname:  accountResult.firstname,
                    lastname:   accountResult.lastname,
                    username:   accountResult.username, 
                    password:   accountResult.password, 
                    profilepic: accountResult.profilepic,
                    bio:        accountResult.bio
                    
                  }

                  result = {
                    success:    true,
                    message:    "Login Successful!",
                    firstname:  currUser.firstname,
                    lastname:   currUser.lastname,
                    username:   currUser.username,
                    profilepic: currUser.profilepic
                  }

                  //postModel.updateAllPosts(currUser.firstname, currUser.lastname, currUser.username, currUser.password, currUser.bio, currUser.profilepic)

                  console.log(currUser.username + " has logged in!");
                  console.log("Current user:");
                  console.log(currUser);

                  res.send(result);
                }

                else { // the username exists but the password is wrong
                  console.log("PASSWORD IS WRONG");

                  result = {
                    success: false,
                    message: "Invalid username or password"
                  }
                  
                  res.send(result);

                }
              })              
            }

            else{ // if the username doesnt exist
              console.log("USERNAME DOESNT EXIST IN DB");
              
                result = {
                  success: false,
                  message: "Invalid username or password"
                }
                
                res.send(result);
            }
        });
    }
  });

// [LOG-IN] Remember Me Checkbox Actions
  router.post('/remember', function(req, res){
  if(rememberMe == "true"){
    var stuff = {
      username: currUser.username,
      remember: rememberMe
    }
    res.send(stuff)
  }
  else{
    var stuff = {
      username: "",
      remember: rememberMe
    }
    res.send(stuff)
  }
  })

/* --------------- ACCOUNT STUFF --------------- */

// [ACCOUNT PROFILE] SKIPPED
  router.post("/userposts", function (req, res){
      postModel.getOwnPosts(currUser.email, function(data){
        console.log(data);
        res.send(data);
      })
  });

// [CREATE ACCOUNT] Adding an Account to the DB
  router.post("/addAccount", function (req, res) {

    console.log("the request:");
    console.log(req.body);

    if(req.file) {
      upload.single('PROFILEPIC');

      console.log("the picture");
      console.log(req.file);

      console.log("the destination of the pic");
      console.log(req.file.path);
    }
    else {
      console.log("the picture");
      console.log("- default account icon -")
    }

    //var errors = validationResult(req.body);

    // if (!errors.isEmpty()){
    //   errors = errors.errors;

    //   var details = {};
    //   var i;
    //   for (i = 0; i < errors.length; i++)
    //   {
    //     details[errors[i].param + 'Error'] = errors[i].msg;
    //   }

    //   console.log(details);

    //   res.render('CreateAccount', {
    //     // for main.hbs
    //       styles: "../css/styles_outside.css",
    //       tab_title: "Create Account",
    //       body_class: "outside",
    //       navUser: currUser.username,
    //       navIcon: currUser.profilepic,
    //       EMAILError: details.EMAILError,
    //       FIRSTNAMEError: details.FIRSTNAMEError,
    //       LASTNAMEError: details.LASTNAMEError,
    //       USERNAMEError: details.USERNAMEError,
    //       PASSWORDError: details.PASSWORDError
    //   });
    // }

    // else {
      // DEFAULT PHOTO OPTION
      var photoInput = '/images/default_profile.png'

      if(!(req.body.profilepic == "")) {
        photoInput = '/images/' + req.body.profilepic.filename;
      }

      var email =     req.body.email;
      var fName =     req.body.firstname;
      var lName =     req.body.lastname;
      var uName =     req.body.username;
      var password =  req.body.password;
      var photo =     photoInput;
      var bio =       req.body.bio;

      bcrypt.hash(password, 2, function(err, hash){
        var theUser = {
          email:      email,
          firstname:  fName,
          lastname:   lName,
          username:   uName,
          password:   hash,
          profilepic: photo,
          bio:        bio
        };

        console.log(theUser);
        userModel.createNewAccount(theUser, function(err, new_user){
          var result;
          
          if (err) {
            console.log(err.errors);
    
            result = {success: false, message: "User was not created!"}
            console.log(result);
            
            res.send(result);
          }
          else {
            console.log("User was created!");
            console.log(new_user);
    
            result = {success: true, message: "User was created!"}

            res.send(result);
          }
        })
      });
    //}    
    
  });

// [CREATE ACCOUNT] Unique Email Validation
  router.post('/uniqueEmailCheck', function(req, res) {
    var emailInput = req.body.email;

    console.log("email entered: " + emailInput);
    console.log("checking if this email is unique");

    userModel.checkUniqueEmail(emailInput, function(emailResult){
      if (emailResult) { // emailInput is taken (and in same capitalization)
        console.log(emailInput + " is NOT UNIQUE");
          
        result = { success: false }
        res.send(result);
      }
      else {
        console.log(emailInput + " is UNIQUE");

        result = { success: true }
        res.send(result);
      }
    });

  });

// [CREATE ACCOUNT] Unique Username Validation
  router.post('/uniqueUsernameCheck', function(req, res) {
    var usernameInput = req.body.username;

    console.log("username entered: " + usernameInput);
    console.log("checking if this username is unique");

    userModel.checkUniqueUsername(usernameInput, function(usernameResult){
      if (usernameResult) { // usernameInput is taken (and in same capitalization)
        console.log(usernameInput + " is NOT UNIQUE");
          
        result = { success: false }
        res.send(result);
      }
      else {
          console.log(usernameInput + " is UNIQUE");

          result = { success: true }
          res.send(result);
      }
    });

  });

// [EDIT ACCOUNT] Updates the Account in the DB
  router.post('/edit-account/', function(req, res) {
    var query = {
      email: currUser.email
    };
    var update
    console.log("something")
    console.log(req.body)
    if (req.body.editprofilepic == "")
    {
      update = {
        firstname:  req.body.editfirstname,
        lastname:   req.body.editlastname,
        username:   req.body.editusername,
        password:   req.body.editpassword,
        profilepic: '/images/default_profile.png', 
        bio:        req.body.editbio
      };
    }
    else{
      update = {
        firstname: req.body.editfirstname,
        lastname: req.body.editlastname,
        username: req.body.editusername,
        password: req.body.editpassword,
        profilepic: req.body.editprofilepic,
        bio: req.body.editbio
      };
    }
    
    userModel.editCurrAccountInfo(query, update, function(user) {

        currUser = {
          email:      currUser.email,
          firstname:  update.firstname,
          lastname:   update.lastname,
          username:   update.username, 
          password:   update.password, 
          bio:        update.bio, 
          profilepic: update.profilepic
        }

      console.log("UPDATE OBJECT = " + JSON.stringify(update));
      console.log("curruser OBJECT = " + JSON.stringify(currUser));
      
      postModel.updateAllPosts(currUser.firstname, currUser.lastname, currUser.username, currUser.password, currUser.bio, currUser.profilepic)
  
    });

    res.send(currUser);
  });

// [EDIT ACCOUNT] Username Username Validation Part 2
  router.post('/uniqueUsernameCheckEDIT', function(req, res) {
    var usernameInput = req.body.username;

    console.log("username entered: " + usernameInput);
    console.log("checking if this username is unique");

    userModel.findSpecificEmail(usernameInput, function(usernameResult){
      if (usernameResult) {
        console.log(usernameInput + " is NOT UNIQUE");
          
        result = { success: false, current: currUser.username }
        res.send(result);

      }
      else {
        console.log(usernameInput + " is UNIQUE");

        result = { success: true, current: currUser.username }
        res.send(result);
      }
    });

  });

// [DELETE ACCOUNT] Deletes the Account in the DB
  router.post('/delete-account', function(req, res) {
    userModel.deleteAccount(currUser.email, function(){

      currUser.email = "";
      currUser.firstname = "";
      currUser.lastname = "";
      currUser.username = "";
      currUser.password = "";
      currUser.profilepic = "";
      currUser.bio = "";
      res.send(true);
    });

  });

/* ------------ RECIPE POST STUFF ------------ */

// [RECIPE POST] Creates a Comment in the DB
  router.post('/addCommentRow', function(req, res) {
    console.log(req.body);

    postModel.getOnePost(req.body.recipe_id, function(data){
    

      var commentsList = [];

      if ('comments' in req.body){
        commentList = req.body.comments;
      }

      commentsList.push(req.body);

      postModel.addComments(data._id, commentsList, function(stuff){

        res.send(stuff);
      })
    })
  });

// [RECIPE POST] Gets the Array of Comments from the DB
  router.post('/getComments', function(req, res) {
    postModel.getOnePost(req.body._id, function(postComments){


      var stuff = {
        comments: postComments.comments
      }

      console.log(stuff.comments);

      res.send(stuff);
    })
  });

// [RECIPE POST] Upvoting / Downvoting a Post
  router.post('/changeVote', function(req, res) {


    console.log(req.body.num);
    var query = {
      _id: req.body.num
    }

    var update = {
      upvotes: req.body.val
    }

    postModel.updateOnePost(query, update, function(count) {  
      console.log(count.upvotes);
      var number = {
        value: count.upvotes
      }
      res.send(number);

    });


  });

// [CREATE RECIPE POST] Creates the Post in the DB
  router.post('/addPost', upload.single('THUMBNAIL'), function(req, res) {

    console.log(req.body);

    // making ingredient objects
      var bigContainer = [];
      var i = 0;

      for (i = 0 ; i < req.body.ingredients.length; i++){
        var smthg = {
          name: req.body.ingredients[i].name,
          quantitiy: req.body.ingredients[i].quantity,
          amount: req.body.ingredients[i].amount,
        };

        bigContainer.push(smthg)
      };

    // DEFAULT PHOTO OPTION
    var photoInput = '/images/default_post.jpg'

    if(!(req.body.recipe_picture == "")) {
      photoInput = '/images/' + req.file.filename;
    }
    
    postModel.numDocuments(function(count){
      var new_post = {
        _id: count + 1,
        title: req.body.title,
        user: currUser,
        upvotes: req.body.upvotes,
        dateposted: req.body.dateposted,
        timeposted: req.body.timeposted,
        recipe_picture: photoInput,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
        
      };
      console.log(count);

      postModel.newPost(new_post, function(err, newpost) {
        var result;
    
        if (err) {
          console.log(err);
    
          result = { success: false, message: "Recipe post was not created!" }
          res.send(result);
        }
        else {
          console.log("Successfully created a recipe post!");
          //console.log(new_post);
          
          result = { success: true, message: "Recipe post created!", _id: new_post._id}
    
          res.send(result);
        }
    
      });
    })
    
    
  });

// [EDIT RECIPE POST] SKIPPED
  router.post('/loadLists', function(req, res) {
      postModel.getOnePost(req.body.id,function(data){
        if(err) throw err;

        console.log(data.ingredients);
        console.log(data.instructions)
        if(data){
          res.send(data)
        }

      });
  });

// [EDIT RECIPE POST] Loading Instructions in Edit Page
  router.post('/loadInstructions', function(req, res) {
    
      postModel.getOnePost(req.body.id,function(data){
        

        if(data){
          res.send(data.instructions)
        }

      });
  });

// [EDIT RECIPE POST] Loading Ingredients in Edit Page
  router.post('/loadIngredients', function(req, res) {
    
      postModel.getOnePost(req.body.id,function(data){
        

        if(data){
          res.send(data.ingredients)
        }

      });
  });

// [EDIT RECIPE POST] Updates the Post in the DB
  router.post('/updatePost', function(req, res) {
    var query = {
      _id: req.body._id
    }

    var update;

    postModel.getOnePost(req.body._id, function(data){
      if (req.body.recipe_picture == "")
    {
      update = {
        _id: data._id,
        title: req.body.title,
        user: data.user,
        upvotes: data.upvotes,
        dateposted: data.dateposted,
        timeposted: data.timeposted,
        recipe_picture: data.recipe_picture,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        comments: data.comments
      }
    }
    else
    {
      update = {
        _id: data._id,
        title: req.body.title,
        user: data.user,
        upvotes: data.upvotes,
        dateposted: data.dateposted,
        timeposted: data.timeposted,
        recipe_picture: req.body.recipe_picture,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        comments: data.comments
      }
    }
    console.log(update)
    postModel.updateOnePost(query, update, function(new_post){
      res.send(new_post)
    })

    });
  });

// [DELETE RECIPE POST] Deletes the Post in the DB
  router.post('/deletePost', function(req, res){
    postModel.removePost(req.body.num, function(){
      res.send(true);
    })
  })

/* ------- OTHER FEATURES AFTER LOGIN ------- */

// [HOMEPAGE] Getting the Top Five Posts w/ the Most Upvotes
  router.post('/getTopFive', function(req, res){
    postModel.topFive(function(data){

      res.send(data);
    })  
  });

// [SEARCH PAGE] Searches for a Post in the DB
  router.post('/find-post', function(req, res) {
    var searchingFor = req.body.searchingFor;
    var results;

    
    postModel.findByTitle(searchingFor, function(searchResults){
      if(searchResults.length >= 1){
        console.log(searchResults);

        results = {
          success: true,
          posts: searchResults
        }

        res.send(results);
      }
      //else, only return success false
      else {
        console.log("The post does not exist in the database");

        results = {
          success: false,
        }

        res.send(results);
      }
      
    });
  })

// [SEARCH PAGE] Searches for an Account in the DB
  router.post('/find-account', function(req, res) {
    var searchingFor = req.body.searchingFor;
    var results;

  
    userModel.getAllAccounts(searchingFor, function(accounts){
      if(accounts.length >= 1){
        console.log(accounts);

        results = {
          success: true,
          users: accounts
        };

        res.send(results);
      }
      //else, only return success false
      else {
        console.log("The account does not exist in the database");

        results = {
          success: false
        }

        res.send(results);
      }
      
    });

  });

/* --------------------------------------------- END OF FEATURES --------------------------------------------- */

// I FORGOT WHAT THIS DOES BASTA THIS IS IMPORTANT
  module.exports = router;