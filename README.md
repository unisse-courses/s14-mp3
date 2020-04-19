# Foodies
## Team Members:
* GONZALES, Johann
* MARASIGAN, Giann Jericho
* DE LEON, Samantha

# Dependencies and Resources used
* NodeJS
* MongoDB Community Editon
* MongoDB Compass

# Setting Up
1. Clone the repository in your local directory using `git clone https://github.com/unisse-courses/s14-mp3.git`
2. Once the files have been copied we must open the folder using the command prompt for windows devices, or the terminal if you are using the macOS.
3. Next install the modules using `npm install`
4. After installing the modules we can start the application using `node index`.

# Addtional: Importing data 
* After the initial set up the group has included .json files which contain the sample data for the web application.
1. Open MongoDB Compass and navigate to "foodiesdb"
2. Select the "users" collection and click Add Data > Import File > Browse
3. Navigate back to to root folder of the web application and find the folder "data"
4. Select users.json and click import and the data should be seen in the collection
5. Repeat steps 2 to 4 with the "posts" collection and the "posts.json" data file
* If the database and the collections have not been created by the web application you can create them manualy with the database name being "foodiesdb" with two collections "users" and "posts"

# Landing Page
* To access the landing page open a brower and type into the url bar localhost:3000.
* In the Landing Page You have three options:
1. Login as Guest
2. Login as an Existing User
3. Create an Account

# Creating an Account
* Filling out all the fields will create a new account in the database.

# Logging in
* Choosing either logging in as a g.uest or as an existing user will redirect the user to the homepage
* Additionally, existing users must their credentials before being redirected to the homepage.

# Guest Limitations:
* Guests cannot open the account profile in the navigation bar.
* Guests cannot see the contents of any comments in any posts.
* Guests cannot also comment on any recipe post.

# Homepage
* The homepage will show the top five most upvoted posts

# Account Profiles
* Existing users can view their own profiles via the nav bar.

# Editing Account Details
* Existing users can edit their own account details

# Any Recipe Post
* Each recipe posts show the details of the posts which include:
1. Details of the user who posted it
2. Upvote count
3. Both the instructions and ingredients

# Editing Recipe Posts
* Accounts who posted the recipe can edit the details of the posts

# Search Page
* Both users and existing users can search other peoples account profiles or any recipe post