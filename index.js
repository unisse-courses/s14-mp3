// IMPORTS
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

// EXPRESS APP
const app = express();
const port = 3000; // sam: bc thats whats in the specs

// IMPORTING THE MODEL
const userModel = require('./models/users');
const postModel = require('./models/posts');
const ingredientsModel = require('./models/ingredients');
const commentsModel = require('./models/ingredients');

// IMPORTS FOR IMAGE UPLOADS
  // to be updated wt code once we find smth that works ;~;

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

// GLOBAL VARIABLES
var rememberMe;

var currUser = {
  email: '',
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  bio: '',
  profilepic: ''
};

    // var lastUser | we can use this for the last person who logged in ?

var loginValidation = "";

/* -------------------------------------------------- ALL THE DUMMY DATA -------------------------------------------------- */
// TODO: AFTER doing the AJAX, we place the dummy data in .json files (data folder -> json files)

// ARRAY OF USERS (TOTAL: 5)  
  var users = [
    // DUMMY USER 1
    {
      firstname: 'Ted',
      lastname: 'Mosby',
      username: 'prof_Brosby',
      password: 'himym',
      bio: 'Somewhere out there, there is a yellow umbrella for everyone. You must be patient.',
      profilepic: '/images/profilepic/ted.jpg'
    },

    // DUMMY USER 2
    {
      firstname: 'Barney',
      lastname: 'Stinson',
      username: 'the_barnacle',
      password: 'suitup69',
      bio: 'Tonight is the night that we make everything Legen... wait for it... Dary. LEGENDARY!',
      profilepic: '/images/profilepic/barney.jpg'
    },

    // DUMMY USER 3
    {
      firstname: 'Robin',
      lastname: 'Scherbatsky',
      username: 'robin_mnews',
      password: 'metronews',
      bio: 'If you have chemistry then you only need more thing, timing.',
      profilepic: '/images/profilepic/robin.jpg'
    },

    // DUMMY USER 4
    {
      firstname: 'Lily',
      lastname: 'Aldrin',
      username: 'Lilypad',
      password: 'marvin',
      bio: 'You can\'t just skip to where you want to be.',
      profilepic: '/images/profilepic/lily.jpg'
    },

    // DUMMY USER 5
    {
      firstname: 'Marshall',
      lastname: 'Eriksen',
      username: 'bigFudge',
      password: 'daisy',
      bio: 'ALL HAIL BEERCULES!',
      profilepic: '/images/profilepic/marsh.jpg'
    },
  ];

// ARRAY OF POSTS (TOTAL: 5)  
  var posts = [ 
    // DUMMY POST 1
    {
      title: 'Pancakes',
      user: {
        firstname: 'Ted',
        lastname: 'Mosby',
        username: 'prof_Brosby',
        profilepic: '/images/profilepic/ted.jpg'
      },
      upvotes: '10',
      dateposted: 'February 28, 2020',
      timeposted: '10:00 AM',
      recipe_picture: '/images/recipe/recipe1.png',
      description: 'A pancake is a flat cake, often thin and round, prepared from a starch-based batter that may contain eggs, milk and butter and cooked on a hot surface such as a griddle or frying pan, often frying with oil or butter.',
      ingredients: [
        {
          name: 'flour',
          quantity: '10',
          unit: 'ounces'
        },
        {
          name: 'sugar',
          quantity: '3',
          unit: 'Tbsp'
        },
        {
          name: 'baking powder',
          quantity: '4',
          unit: 'tsp'
        },
        {
          name: 'baking soda',
          quantity: '1/2',
          unit: 'tsp'
        },
        {
          name: 'salt',
          quantity: '1',
          unit: 'tsp'
        },
        {
          name: 'eggs',
          quantity: '2',
          unit: 'large'
        },
        {
          name: 'vegetable oil',
          quantity: '1/4 (more for the pan)',
          unit: 'cups'
        },
        {
          name: 'whole milk',
          quantity: '1- and 1/2',
          unit: 'cups'
        },
        {
          name: 'vanilla extract (optional)',
          quantity: '1/2',
          unit: 'tsp'
        }
      ],
      instructions: [
        'In one bowl, combine dry ingredients: flour, sugar, baking powder, baking soda, and salt. Whisk to combine.',
        'In another bowl, combine eggs, vegetable oil, and whole milk. Optional: you can also add ½ teaspoon of vanilla extract here. Whisk to combine.',
        'Combine the two bowls and mix together gently with a rubber spatula. The batter should still be lumpy with a few dry streaks of flour. Don’t overmix the pancakes!',
        'Cover the batter and let it rest at room temperature for 10 minutes.',
        'Heat 1 teaspoon of vegetable oil in a nonstick skillet.',
        'Ladle one scoop of batter into the skillet and cook for a few minutes. Once bubbles appear on the surface and around the edge of the pancake, cook and flip for a few minutes more.',
        'Stack your pancakes up and serve with syrup and butter if desired. Enjoy!'
      ],
      comments: [
        // DUMMY COMMENT 1
        {
          user: {
              firstname: 'Marshall',
              lastname: 'Eriksen',
              username: 'bigFudge',
              profilepic: '/images/profilepic/marsh.jpg'
          },
          content:'I love Pancakes!',
          date: 'February 28, 2020',
          time: '11:39 AM',
          replies: [
            // DUMMY REPLY 1
            {
              user: {
                  firstname: 'Ted',
                  lastname: 'Mosby',
                  username: 'prof_Brosby',
                  profilepic: '/images/profilepic/ted.jpg'
              },
              content:'thanks for the support marsh!',
              date: 'February 28, 2020',
              time: '12:30 AM',
            }
          ]
        }
      ]
    },

    // DUMMY POST 2
    {
      title: 'Ube Roll',
      user: {
          firstname: 'Barney',
          lastname: 'Stinson',
          username: 'the_barnacle',
          profilepic: '/images/profilepic/barney.jpg'
      },
      upvotes: '20',
      dateposted: 'March 6, 2020',
      timeposted: '1:27 AM',
      recipe_picture: '/images/recipe/recipe2.png',
      description: 'Ube Roll is made out of rolled ube.',
      ingredients: [
        {
          name: 'powdered ube',
          quantity: '3',
          unit: 'Tbsp'
        },
        {
          name: 'water',
          quantity: '1/2',
          unit: 'cup'
        },
        {
          name: 'eggs',
          quantity: '4',
          unit: 'medium'
        },
        {
          name: 'granulated sugar',
          quantity: '1/2',
          unit: 'cup'
        },
        {
          name: 'cake flour',
          quantity: '40',
          unit: 'grams'
        },
        {
          name: 'ube flavoring',
          quantity: '1/2',
          unit: 'tsp'
        },
        {
          name: 'violet food coloring',
          quantity: '1/4',
          unit: 'tsp'
        },
        {
          name: 'vegetable oil',
          quantity: '2',
          unit: 'Tbsp'
        },
      ],
      instructions: [
        'Preheat oven to 325°F',
        'Add 3 Tbsp of powdered ube to ½ cup boiling water until a thick paste forms to get rehydrated ube. Set aside to cool and cover to keep moist.',
        'In a stand mixer bowl at medium speed, add in 4 egg whites and slowly mix in ½ cup of granulated sugar. Then add egg yolks, one at a time, until incorporated. Sift in 40 grams of cake flour on medium speed. Afterwards, combine 50 grams of rehydrated ube, ½ tsp ube flavoring, ¼ tsp of violet food coloring, and 2 Tbsp vegetable oil. Slowly mix for 30 seconds until just combined.',
        'Grease a quarter sheet pan, 9 by 13 inches, and place parchment paper on top. Spread out cake batter into a thin layer and tap on counter to remove any bubbles',
        'Place in 325°F oven for 10-15 minutes until it springs back when touched.',
        'Place on cooling rack for about 20 minutes until completely cooled',
        'On a stovetop, place a large pot of water and bring to a simmer',
        'In a new stand mixer bowl, combine 6- and 1/2 ounces of egg whites, 1 cup sugar, and 2 tsp of vanilla extract. Place bowl over the large pot of simmering water and stir until it reaches 160°F. Then, place in a stand mixer and mix at high speed for 5 minutes until it triples in volume and cools off. Ideally until room temperature.',
        'Put stand mixer on medium speed and slowly add in 4 softened sticks (room temperature) butter, half a stick at a time, and wait for it to be completely incorporated before adding the next half stick of butter.',
        'After that is done, place on high speed for another minute until it is smooth and creamy.',
        'Check cake to see if it is completely cooled and flip over onto parchment paper. Slowly remove parchment paper from bottom. Flip over once again so it is facing up like it did when it came out of the oven.',
        'Cover with buttercream icing.',
        'Slowly roll it up lengthwise. Put inside the fridge for at least an hour for it to become firm.',
        'Take out, add 3 dollops of buttercream icing on top, and enjoy!'
      ],
      comments: [
        // DUMMY COMMENT 1
        {
          user: {
              firstname: 'Robin',
              lastname: 'Scherbatsky',
              username: 'robin_mnews',
              profilepic: '/images/profilepic/robin.jpg'
          },
          content:'I am gonna expect that cake on our wedding day okay?',
          date: 'March 10, 2020',
          time: '11:50 AM',
          replies: [
            // DUMMY REPLY 1
            {
              user: {
                  firstname: 'Barney',
                  lastname: 'Stinson',
                  username: 'the_barnacle',
                  profilepic: '/images/profilepic/barney.jpg'
              },
              content:'Wow. thanks for the pressure Robin, Sheesh!',
              date: 'March 10, 2020',
              time: '12:00 PM',
            }
          ]
        }
      ]
    },

    // DUMMY POST 3
    {
      title: 'Hot Cocoa',
      user: {
          firstname: 'Lily',
          lastname: 'Aldrin',
          username: 'lilypad',
          profilepic: '/images/profilepic/lily.jpg'
      },
      upvotes: '55',
      dateposted: 'March 8, 2020',
      timeposted: '9:00 AM',
      recipe_picture: '/images/recipe/recipe3.png',
      description: 'Hot Cocoa is made out of cocoa powder and toasty water',
      ingredients: [
        {
          name: 'Whole milk',
          quantity: '2',
          unit: 'parts'
        },
        {
          name: 'Heavy cream',
          quantity: '1',
          unit: 'part'
        },
        {
          name: 'Evaporated milk',
          quantity: '1',
          unit: 'part'
        },
        {
          name: 'Sweetened condensed milk (optional - if you want an ultra-creamy hot chocolate)',
          quantity: '1',
          unit: 'part'
        },
        {
          name: 'Ghirardelli cocoa powder',
          quantity: '1/2',
          unit: 'cup'
        },
        {
          name: '70% dark baking chocolate',
          quantity: '1/2',
          unit: 'cup'
        },
        {
          name: 'Sugar',
          quantity: '1/2',
          unit: 'cup'
        },
        {
          name: 'Salt',
          quantity: '1',
          unit: 'pinch'
        },
        {
          name: 'Ground Cinnamon',
          quantity: '1',
          unit: 'pinch (small)'
        },
        {
          name: 'Instant coffee (Optional)',
          quantity: '1',
          unit: 'tsp'
        },
        {
          name: 'Whipped Cream'
        },
        {
          name: 'Chocolate shavings'
        },
        {
          name: 'Graham cracker',
          quantity: '1',
          unit: 'small'
        },
        {
          name: 'Marshmallow',
          quantity: '1',
          unit: 'small'
        }
      ],
      instructions: [
        'Add your 2 parts whole milk, 1 part heavy cream, and 1 part of evaporated milk to a saucepan.',
        'Heat milk and whisk while heating. Heat to steaming hot  but not boiling - around 190° F.',
        'Add 1/2 cup of Ghiradelli cocoa powder to the milk. Then add 1/2 cup of 70% dark baking chocolate and whisk together.',
        'Add 1/2 cup of sugar and continue to whisk until everything is mixed in completely.',
        'Add 1 pinch of salt and a small pinch of ground cinnamon. Add instant coffee if you would like. Whisk to combine all ingredients.',
        'Pour hot chocolate into a cup and cover with whipped cream.',
        'Shave chocolate on top of the whipped cream.',
        'Add graham cracker to the top of the whipped cream and coat top with whipped cream.',
        'Stick marshmallow on top of graham cracker. Then toast marshmallow to your liking.',
        'Serve and enjoy!'
      ],
      comments: [
        // DUMMY COMMENT 1
        {
          user: {
              firstname: 'Ted',
              lastname: 'Mosby',
              username: 'prof_Brosby',
              profilepic: '/images/profilepic/ted.jpg'
          },
          content:'Damn, Marshall is so lucky!',
          date: 'March 10, 2020',
          time: '3:00 PM',
          replies: [
            // DUMMY REPLY 1
            {
              user: {
                firstname: 'Marshall',
                lastname: 'Eriksen',
                username: 'bigFudge',
                profilepic: '/images/profilepic/marsh.jpg'
              },
              content:'The luckiest. I love you Lilypad.',
              date: 'March 10, 2020',
              time: '3:07 PM',
            },

            // DUMMY REPLY 2
            {
              user: {
                  firstname: 'Lily',
                  lastname: 'Aldrin',
                  username: 'lilypad',
                  profilepic: '/images/profilepic/lily.jpg'
              },
              content:'I love you too Marshmallow.',
              date: 'March 10, 2020',
              time: '3:10 PM',
            }
          ]
        }
      ]
    },

    // DUMMY POST 4
    {
      title: 'Onigiri',
      user: {
          firstname: 'Robin',
          lastname: 'Scherbatsky',
          username: 'robin_mnews',
          profilepic: '/images/profilepic/robin.jpg'
      },
      upvotes: '13',
      dateposted: 'March 6, 2020',
      timeposted: '11:27 AM',
      recipe_picture: '/images/recipe/recipe4.png',
      description: 'Onigiri is a rice meal molded into a triangle shape that is wrapped in seaweed',
      ingredients: [
        {
          name: 'Water',
          quantity: '2',
          unit: 'cups, divided'
        },
        {
          name: 'Rice wine vinegar',
          quantity: '3',
          unit: 'Tbsp, separated'
        },
        {
          name: 'Soy sauce',
          quantity: '3',
          unit: 'Tbsp'
        },
        {
          name: 'Mirin',
          quantity: '1',
          unit: 'Tbsp'
        },
        {
          name: 'Sake',
          quantity: '1',
          unit: 'Tbsp'
        },
        {
          name: 'Rice',
          quantity: '1',
          unit: 'cup'
        },
        {
          name: 'Sugar',
          quantity: '2',
          unit: 'Tbsp, separated'
        },
        {
          name: 'Salt',
          quantity: '1',
          unit: 'tsp'
        }
      ],
      instructions: [
        'Start by adding the kelp to a bowl of water for 15 minutes. Remove and thinly slice into strips. Add to a saute pan along with ½ a cup of water, 1 Tbsp rice wine vinegar, 3 Tbsp of soy sauce, 1 Tbsp mirin, and 1 Tbsp sake. Cook over medium heat and bring to a simmer for about 10 minutes before adding 1 Tbsp of sugar. Sprinkle with sesame seeds, and then add kelp to a bowl and set aside.',
        'Take your sour pickled Japanese plums (also known as umeboshi) and remove the pits. Give them a little chop or mash them with a fork and set aside.',
        'For the rice, start by rinsing the rice multiple times to remove the starch. The first couple times you wash it, it’ll be very cloudy. Continue to wash until it almost runs clear.',
        'Add rice to a rice cooker or pressure cooker along with 1½ cups of water. Cook for 7 minutes on high pressure and then release the pressure using the pressure valve.',
        'Spread the rice onto a sheet pan and drizzle with a mixture of 2 Tbsp of rice wine vinegar, 1 Tbsp sugar, and 1 tsp of salt. Give it a little mix to combine.',
        'To form the Onigiri, have a small bowl of water ready because you want your hands to be wet or the rice will stick to them.',
        'For the umeboshi nigiri, form the rice into a disc, add your umeboshi, and then cover the other side with another disc of rice. Form into a disc the size of a hockey puck',
        'For the kelp, form the rice into a disc, add the kelp along with another disc of rice and then form that into a triangle.',
        'Add a strip of seaweed to each of your onigiri.',
        'Serve and enjoy!'
      ],
      comments: [
        // DUMMY COMMENT 1
        {
          user: {
              firstname: 'Barney',
              lastname: 'Stinson',
              username: 'the_barnacle',
              profilepic: '/images/profilepic/barney.jpg'
          },
          content:'Since when did you learn making Japanese food?',
          date: 'March 7, 2020',
          time: '1:00 PM',
          replies: [
            // DUMMY REPLY 1
            {
              user: {
                  firstname: 'Robin',
                  lastname: 'Scherbatsky',
                  username: 'robin_mnews',
                  profilepic: '/images/profilepic/robin.jpg'
              },
              content:'Since I newscasted in Japan remember? idiot.',
              date: 'March 7, 2020',
              time: '4:00 PM',
            }
          ]
        }
      ]
    },

    // DUMMY POST 5
    {
      title: 'Takoyaki',
      user: [
        {
          firstname: 'Marshall',
          lastname: 'Eriksen',
          username: 'bigFudge',
          profilepic: '/images/profilepic/marsh.jpg'
        }
      ],
      upvotes: '65',
      dateposted: 'March 6, 2020',
      timeposted: '1:43 PM',
      recipe_picture: '/images/recipe/recipe5.png',
      description: 'Takoyaki is usually made with squid.',
      ingredients: [
        {
          name: 'All-purpose flour',
          quantity: '120',
          unit: 'grams'
        },
        {
          name: 'Baking powder',
          quantity: '2',
          unit: 'tsp'
        },
        {
          name: 'Salt',
          quantity: '1/2',
          unit: 'tsp'
        },
        {
          name: 'Eggs',
          quantity: '2',
          unit: 'Large'
        },
        {
          name: 'Low Sodium Soy sauce',
          quantity: '1',
          unit: 'Tbsp'
        },
        {
          name: 'Dashi broth',
          quantity: '1- and 1/2',
          unit: 'cups'
        }
      ],
      instructions: [
        'Begin by cutting your plain cooked octopus into bite-sized chunks, and then set aside.',
        'In a mixing bowl, combine 120 grams of all-purpose flour with 2 tsp of baking powder and 1/2 tsp of salt. Whisk to combine. Add 2 large eggs, 1 Tbsp of low sodium soy sauce, and 1 and 1/2 cups of dashi broth. Mix to combine.',
        'Heat your Takoyaki pan over a medium high heat with some vegetable oil, making sure that each hole is coated.',
        'Add your batter and make sure every hole is filled before adding your primary fillings right in the middle. Cover all batter with a sprinkling of bonito flakes, red pickled ginger, and tenkasu.',
        'Using a pair of chopsticks, get under each takoyaki and rotate about 90°, and then add some more supplemental batter to help them become more spherical.',
        'Flip the whole thing over being sure to tuck all the batter and bits in. Continue to turn and tuck until they are all round, golden brown, and crispy.',
        'Add to a plate and top with okonomiyaki sauce, japanese mayo, aonori, and bonito flakes.',
        'Serve and Enjoy!'
      ],
      comments: [
        // DUMMY COMMENT 1
        {
          user: {
              firstname: 'Robin',
              lastname: 'Scherbatsky',
              username: 'robin_mnews',
              profilepic: '/images/profilepic/robin.jpg'
          },
          content:'Marshall can cook! I am so proud of you.',
          date: 'March 7, 2020',
          time: '10:08 AM',
          replies: [
            // DUMMY REPLY 1
            {
              user: {
                  firstname: 'Marshall',
                  lastname: 'Eriksen',
                  username: 'bigFudge',
                  profilepic: '/images/profilepic/marsh.jpg'
              },
              content:'Wow. I sense the sarcasm Robin',
              date: 'March 7, 2020',
              time: '10:09 AM',
            }
          ]
        }
      ]
    }
    
  ];

/* -------------------------------------------------- ROUTES -------------------------------------------------- */
var count;
// INDEX
  app.get('/', function(req, res) {
      loginValidation = ""; // clearing the login validation warning

      res.render('index', {
        // for main.hbs
          styles: "css/styles_outside.css",
          tab_title: "Index",
          body_class: "outside"
      });
  });

// USER LOGIN
  app.get('/log-in', function(req, res) {

    var LogInWords = "";
    var LogInColor = "";

    if(loginValidation == "Invalid username or password"){
        LogInWords = "Invalid username or password"
        LogInColor = "color: red";
    }
    else {
      loginCtr = 0;
      LogInWords = "";
      LogInColor = "color: #F1F7ED";
    }

    if(rememberMe == 'true'){
      res.render('UserLogin', {
        styles: "css/styles_outside.css",
        tab_title: "Log-In",
        body_class: "outside",
        username: currUser.username,
        password: currUser.password,
        isChecked: true,
        LogInWarning: LogInWords,
        LogInWarning_Color: LogInColor
      })
    }
    else{
      res.render('UserLogin', {
        styles: "css/styles_outside.css",
        tab_title: "Log-In",
        body_class: "outside",
        username: currUser.username,
        password: currUser.password,
        isChecked: false,
        LogInWarning: LogInWords,
        LogInWarning_Color: LogInColor
      })
    }

      
  });

// HOMEPAGE
  app.get('/home', function(req, res) {
    loginValidation = ""; // clearing the login validation warning

    var data = posts
    
    

    postModel.countDocuments({}).exec(function(err, c){
      count = {
        something: c
      };
    })

    /*
      I found sample code on how we could get the top X posts
      var below is supposed to sort the all the posts by ascending order ( 1 = ascending),
      and limit the returned results to at most 5 posts

      also var below doesnt do anything yet, naka display lang muna siya while we fix the other stuffs AHAHAHA
    */

    var topFive = postModel.find().sort({'upvotes': 1}).limit(5);

    /*
      we can prob send these first five using res.render() 
      then kung if may change ng top 5 we can use a JS function to update the home page na lang
    */

      res.render('Homepage', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Homepage",
          body_class: "inside",
          posts: data,
          navUser: currUser.username

      })
  });

  function getAccountProfile(req, res, next) {
    userModel.find({}).sort({username: 1}).exec().then(result => {
      var userObjects = [];

      result.forEach(function(doc) {
        userObjects.push(doc.toObject());
      });
      
      //console.log(userObjects);
      
      res.render('AccountProfile', {
        user: userObjects,
        styles: "css/styles_inside.css",
        tab_title: "Account Profile",
        body_class: "inside"
      });
    });
  };

// ACCOUNT PROFILE
  //app.get('/account-profile', getAccountProfile);

  app.get('/account-profile', function(req, res){
    loginValidation = ""; // clearing the login validation warning
    console.log(count)
    res.render('AccountProfile', {
      styles:     "css/styles_inside.css",
      tab_title:  "Account Profile",
      body_class: "inside",
      
      firstname:  currUser.firstname,
      lastname:   currUser.lastname,
      username:   currUser.username,
      bio:        currUser.bio,
      profilepic: currUser.profilepic,
      email:      currUser.email,
      navUser:    currUser.username
    });
  });

// CREATE ACCOUNT PROFILE
  app.get('/create-account', function(req, res) {
    loginValidation = ""; // clearing the login validation warning

    res.render('CreateAccount', {
      // for main.hbs
        styles: "css/styles_outside.css",
        tab_title: "Create Account",
        body_class: "outside"
    })
  });

// EDIT ACCOUNT PROFILE
  app.get('/edit-account', function(req, res) {
      loginValidation = ""; // clearing the login validation warning

      res.render('EditAccountProfile', {
        styles:     "css/styles_inside.css",
        tab_title:  "Edit Account",
        body_class: "inside",
        navUser:    currUser.username,
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
  app.get('/create-recipe', function(req, res) {
      loginValidation = ""; // clearing the login validation warning

      res.render('CreateRecipePost', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Create Post",
          body_class: "inside",
          navUser: currUser.username

          // FEATURE: '/addPost'
      })
  });

// EDIT RECIPE POST
  app.get('/edit-recipe', function(req, res) {
      loginValidation = ""; // clearing the login validation warning

      res.render('EditRecipePost', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Edit Post",
          body_class: "inside",
          navUser: currUser.username
        
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
  app.get('/recipe-post/:param', function(req, res) {
    loginValidation = ""; // clearing the login validation warning
    
    var id = req.params.param;

    postModel.findOne({_id: id}).exec(function(err, data){
      if(err) throw err;

      if(data){
        res.render('RecipePost', {
          // for main.hbs
            styles: "../css/styles_inside.css",
            tab_title: "Recipe Post",
            body_class: "inside",
            
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
            comments: data.comments,
            post: true,
            navUser: currUser.username
        })
      }
    })
          
      
  });

// SEARCH PAGE
  app.get('/search', function(req, res) {
      loginValidation = ""; // clearing the login validation warning

      res.render('SearchPage', {
        // for main.hbs
          styles: "css/styles_inside.css",
          tab_title: "Search Page",
          body_class: "inside",
          navUser: currUser.username
        
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
    console.log("the request:");
    console.log(req.body);

    var theUser = new userModel( {
      email:      req.body.EMAIL,
      firstname:  req.body.FIRSTNAME,
      lastname:   req.body.LASTNAME,
      username:   req.body.USERNAME,
      password:   req.body.PASSWORD,
      profilepic: req.body.PROFILEPIC,
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

  app.post('/uniqueEmailCheck', function(req, res) {
    var emailInput = req.body.email;

    console.log("email entered: " + emailInput);
    console.log("checking if this email is unique");

    userModel.findOne({email: emailInput}, function(err, emailResult) {
      if (emailResult) {
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
  

// USER LOGIN FEATURE
  // POST
app.post('/loginACTION', function(req, res) {
    var result;
    console.log("checked: " + req.body.remember)
    rememberMe = req.body.remember;
  
    var account = {
      username:  req.body.USER,
      password:   req.body.PASS,
    }

    if (account.username == "Guest"){
      currUser = {
        username: account.username
      }

      result = {
        success: true,
        message: account.username + " has logged in!",
        returnData: currUser
      }
      console.log(result.message);
    }
    else
    {
      userModel.findOne({username: account.username}, function (err, accountResult){
      
      if(accountResult){
        currUser = {
          email:      accountResult.email,
          firstname:  accountResult.firstname,
          lastname:   accountResult.lastname,
          username:   accountResult.username, 
          password:   accountResult.password, 
          profilepic: accountResult.profilepic,
          bio:        accountResult.bio
          
        }
        console.log(currUser.username + " has logged in!");
        console.log("Current user:");
        console.log(currUser);

        res.redirect("/home");

        console.log("cleared the loginValidation");
      }
      else{
        result = {
          success: false,
          message: "Invalid username or password"
        }
        console.log(result);

        loginValidation = "Invalid username or password";
        
        res.redirect("/log-in");
      }
    });}
  });

// EDIT ACCOUNT PROFILE
  app.post('/edit-account', function(req, res) {
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
        profilepic: currUser.profilepic,
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
    
    userModel.findOneAndUpdate(query, update, { new: false }, function(err, user) {
      if (err) throw err;
      console.log(" new name");
      console.log(user.firstname);
      currUser = {
        email:      user.email,
        firstname:  user.firstname,
        lastname:   user.lastname,
        username:   user.username, 
        password:   user.password, 
        bio:        user.bio, 
        profilepic: user.profilepic
      };

      res.send(currUser);
    });
  });

//DELETE ACCOUNT
  app.post('/delete-account', function(req, res) {
    

    userModel.findOneAndRemove({email: currUser.email}, function(err) {
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

// POST
  app.post('/addPost', function(req, res) {

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
    
    postModel.countDocuments().exec(function(err, count){
      var new_post = new postModel({
        title: req.body.title,
        user: currUser,
        upvotes: req.body.upvotes,
        dateposted: req.body.dateposted,
        timeposted: req.body.timeposted,
        recipe_picture: `${req.body.recipe_picture}.png`,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        _id: count
      });
  
  
      new_post.save(function(err, new_post) {
        var result;
    
        if (err) {
          console.log(err.errors);
    
          result = { success: false, message: "Recipe post was not created!" }
          res.send(result);
        }
        else {
          console.log("Successfully created a recipe post!");
          console.log(new_post);
          
          result = { success: true, message: "Recipe post created!" }
    
          res.send(result);
        }
    
      });
    })
    
    
  });

// CREATE RECIPE POST


// UPDATE RECIPE POST


// DELETE RECIPE POST


// POST COMMENT
  app.post('/addCommentRow', function(req, res) {
    var comment = { 
      user: {
        firstname:  req.body.user.firstname,
        lastname:   req.body.user.lastname,
        username:   req.body.user.username,
        profilepic: req.body.user.profilepic
      },
      content:      req.body.content,
      date:         req.body.date,
      time:         req.body.time,
      replies:      req.body.replies
    }
  
    posts[0].comments.push(comment);
  
    res.status(200).send(posts[0].comments);
  })


// VIEW COMMENT
  app.get('/getCommentRow', function(req, res) {
    res.status(200).send(posts[0].comments);
  });

// DELETE COMMENT
    // TODO: not sure how for ajax


// SEARCH RECIPE POST
app.post('/find-post', function(req, res) {
  var searchingFor = req.body.searchingFor;
  var results;
  
  //call database
  /*
    Below would potentially look for all the posts with that title
    
    Maybe what we can do is return back the results then we use JS to form the
    format the results to be able to stick it in seachpage.hbs
  */
  var searchPattern = "^" + searchingFor;
  postModel.find({title: {$regex: searchPattern}}).populate('user').exec( function(err, searchResults){
    
    /*
      HERE SAM
      console.log(searchResults[0].user.firstname)
    */

    console.log(searchResults)
    if(searchResults){
      results = {
        success: true,
        posts: searchResults
      }
    }
    //else, only return success false
    else
    {
      results = {
        success: false,
      }
    }
    res.send(results);
  });
})

// SEARCH ACCOUNT NAME
app.post('/find-account', function(req, res) {
  var searchingFor = req.body.searchingFor;
  var results;
  
  //call database
  /*
    Below would potentially look for all the users with that username
    
    Maybe what we can do is return back the results then we use JS to form the
    format the results to be able to stick it in seachpage.hbs
  */
  var pattern = "^" + searchingFor;
  userModel.find({username: {$regex: pattern}}).exec( function(err, accounts){
    console.log("this is in index");
    console.log(accounts)
    if(accounts){
      results = {
        success: true,
        users: accounts
      }
    }
    //else, only return success false
    else
    {
      results = {
        success: false,
      }
    }
    res.send(results);
  });

  /*
    i honestly dont know if the .find() will work here
  */

  
})

// UPVOTE/DOWNVOTE

app.post('/upvote', function(req, res) {
  var num =     req.body.num;
  var first =   req.body.firstname;
  var last =    req.body.lastname;
  var usrname = req.body.username;

  
  postModel.findOneAndUpdate( {'user.firstname': first}, function(err, user) {
    if (err) throw err;
    console.log(user);
    res.send(user);
  });
  

});


app.post('/downvote', function(req, res) {
  var num =     req.body.num;
  var first =   req.body.firstname;
  var last =    req.body.lastname;
  var usrname = req.body.username;

  postModel.findOneAndUpdate( {'user.firstname': first}, function(err, user) {
    if (err) throw err;
    console.log(user);
    res.send(user);
  });
})

/* -------------------------------------------------- divider lang po -------------------------------------------------- */

// STATIC FILES  
app.use(express.static('public'));

// LISTENER
app.listen(port, function() {
  console.log('App listening at port '  + port)
});