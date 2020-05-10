
const router = require('express').Router();

const userModel = require('../models/users');
const postModel = require('../models/posts');
const ingredientsModel = require('../models/ingredients');
const commentsModel = require('../models/comments');


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

router.get('/account-profile/:param', function(req, res){
  var user_route = "^" + req.params.param;
  
  userModel.getOne(req.params.param, function(data){
    postModel.ownPosts(data.email, function (posts){
      console.log(posts);


      if(data){
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


// CREATE ACCOUNT PROFILE
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

// EDIT ACCOUNT PROFILE
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
      password:   currUser.password,
      profilepic: currUser.profilepic,
      bio:        currUser.bio
    });
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

  postModel.getOne(id,function(data){
    if(err) throw err;

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


// RECIPE POST
router.get('/recipe-post/:param', function(req, res) {
  var id = req.params.param;

  postModel.getOne(id,function(data){


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



router.post('/getTopFive', function(req, res){
    postModel.topFive(function(data){

      res.send(data);
    })  
  })

router.post("/userposts", function (req, res){

    postModel.ownPosts(currUser.email, function(data){
      console.log(data);
      res.send(data);
    })
})

router.post('/loadLists', function(req, res) {
    

    postModel.getOne(req.body.id,function(data){
      if(err) throw err;

      console.log(data.ingredients);
      console.log(data.instructions)
      if(data){
        res.send(data)
      }

    });
});

router.post('/loadInstructions', function(req, res) {
  
    postModel.getOne(req.body.id,function(data){
      if(err) throw err;

      if(data){
        res.send(data.instructions)
      }

    });
  });

router.post('/loadIngredients', function(req, res) {
  
    postModel.getOne(req.body.id,function(data){
      if(err) throw err;

      if(data){
        res.send(data.ingredients)
      }

    });
});

router.post('/addAccount', function(req, res) {
    console.log("the request:");
    console.log(req.body);

    // DEFAULT PHOTO OPTION
    var photoInput = '/images/default_profile.png'

    if(!(req.body.PROFILEPIC == "")) {
      photoInput = `${req.body.PROFILEPIC}.png`;
    }

    var theUser = new userModel( {
      email:      req.body.EMAIL,
      firstname:  req.body.FIRSTNAME,
      lastname:   req.body.LASTNAME,
      username:   req.body.USERNAME,
      password:   req.body.PASSWORD,
      profilepic: photoInput,
      bio:        req.body.BIO
    });

    theUser.save(function(err, theUser) {
      var result;

      if (err) {
        console.log(err.errors);

        result = {success: false, message: "User was not created!"}
        console.log(result);
        
        res.redirect("/create-account");
      }
      else {
        console.log("User was created!");
        console.log(theUser);

        res.redirect("/log-in");
      }
    })
  });

  router.post('/uniqueEmailCheck', function(req, res) {
    var emailInput = req.body.email;

    console.log("email entered: " + emailInput);
    console.log("checking if this email is unique");

    var regexInput = "^" + emailInput;

    userModel.findOne({ "email" : { $regex: regexInput, $options: 'i' } }, function(err, emailResult) {
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

  router.post('/uniqueUsernameCheck', function(req, res) {
    var usernameInput = req.body.username;

    console.log("username entered: " + usernameInput);
    console.log("checking if this username is unique");

    var regexInput = "^" + usernameInput;

    userModel.findOne({ "username" : { $regex: regexInput, $options: 'i' } }, function(err, usernameResult) {
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
  

// USER LOGIN FEATURE
  // POST
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

        userModel.getOne(account.username, function(accountResult){

          
          if(accountResult){ // if the username entered exists in the db
              console.log("USERNAME EXISTS IN DB");

              if(account.password == accountResult.password) { // if the password entered matches with the password from the db
                console.log("PASSWORD IS RIGHT");
              
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

                postModel.updateAllPosts(currUser.firstname, currUser.lastname, currUser.username, currUser.password, currUser.bio, currUser.profilepic)
                console.log("All Account Information has been updated");

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
      

  router.post('/remember', function(req, res){
  if(rememberMe == "true"){
    var stuff = {
      username: currUser.username,
      password: currUser.password,
      remember: rememberMe
    }
    res.send(stuff)
  }
  else{
    var stuff = {
      username: "",
      password: "",
      remember: rememberMe
    }
    res.send(stuff)
  }
  })

// EDIT ACCOUNT PROFILE
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
    
    userModel.editOne(query, update, function(user) {
 
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

  router.post('/uniqueUsernameCheckEDIT', function(req, res) {
    var usernameInput = req.body.username;

    console.log("username entered: " + usernameInput);
    console.log("checking if this username is unique");

    userModel.findSpecific(usernameInput, function(next){
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

//DELETE ACCOUNT
  router.post('/delete-account', function(req, res) {
    userModel.deleteAccount(currUser.email, function(){
      if (err) throw err;
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

// CREATE RECIPE POST
  router.post('/addPost', function(req, res) {

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
      photoInput = `${req.body.recipe_picture}.png`;
    }
    
    postModel.countDocuments().exec(function(err, count){
      var new_post = new postModel({
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
        
      });
      console.log(count);
  
      new_post.save(function(err, new_post) {
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

// UPDATE RECIPE POST
  router.post('/updatePost', function(req, res) {
    var query = {
      _id: req.body._id
    }

    var update

    postModel.getOne(req.body._id, function(data){
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


// DELETE RECIPE POST

  router.post('/deletePost', function(req, res){
    postModel.findPostAndRemove(req.body.num, function(){
      if(err) throw err;

      res.send(true);
    })
  })
// POST COMMENT
  router.post('/addCommentRow', function(req, res) {
    console.log(req.body);

    postModel.getOne(req.body.recipe_id, function(data){
    

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


// VIEW COMMENT
router.post('/getComments', function(req, res) {
  postModel.getOne(req.body._id, function(postComments){


    var stuff = {
      comments: postComments.comments
    }

    console.log(stuff.comments);

    res.send(stuff);
  })
});


// SEARCH RECIPE POST
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

// SEARCH ACCOUNT NAME
router.post('/find-account', function(req, res) {
  var searchingFor = req.body.searchingFor;
  var results;

 
  userModel.getAll(searchingFor, function(accounts){
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

// UPVOTE/DOWNVOTE

router.post('/changeVote', function(req, res) {


  console.log(req.body.num);
  var query = {
    _id: req.body.num
  }

  var update = {
    upvotes: req.body.val
  }

  postModel.updateOnePost(query, update, function(count) { 
    
    postModel.findOneAndUpdate(query, update,function(err, count) { 
      
      
      console.log(count.upvotes);
      var number = {
        value: count.upvotes
      }
      res.send(number);
    });
  });


});


module.exports = router;