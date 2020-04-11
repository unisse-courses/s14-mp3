### **TODO**
1. ALL PAGES (10 pages in total)
- [x] Index
- [x] User Login
- [x] Create Account
- [ ] Homepage
  - [ ] Loading the SPECIFIC recipe post after clicking a post preview
  - [ ] Loading the Top 5 Most Recent Pages
- [ ] Searchpage
  - [X] Search Button -> Uses get function to look for post / account
  - [ ] Should show all the deets + no errors for both post / account
  - [X] Shows partial results (example: u searched pan instead of "pancakes" but it still shows up)
- [x] Create Post
  - [x] Save Button -> Should add a new post in the db
- [ ] Edit Post
  - [ ] Save Button -> Should update the post info in the db
  - [ ] Post info should be pre-loaded na
- [ ] Recipe Post
  - [ ] Reply Button -> Should append the reply INSIDE of the list of the specific comment
  - [ ] Fix the formatting of the Nested Replies within the Comment (mali yung pag format ko sa html dati so pls fix it na lang rin -sam)
  - [ ] Edit Post Button -> Should send the post info to the Edit Post Route
  - [ ] Delete Post Button (IN MODAL) -> Should delete the post from the db
  - [ ] Upvote & Downvote Button -> Should update the upvote value in db
- [ ] Account Profile
  - [X] Edit Account Button -> Should send the account info to the Edit Account Route
  - [ ] Delete Account Button (IN MODAL) -> Should delete the user from the db
  - [ ] Should have ALL of the posts under that user pre-loaded
  - [X] Loads the current user's account info
- [ ] Edit Account Profile
  - [ ] Update Button -> Should update the user info in the db
  - [X] Account info should be pre-loaded na

2. IN GENERAL
- [X] "Remember me" feature
- [ ] Each page AFTER LOGIN should have its own route ("/:id")
  - [X] Can see the current user's info in navbar
  - [X] Can see the current user's info after clicking their profile FROM Navbar

THEN im not sure if need MVC agad but the last thing to do is:

3. CSS THINGS (do this after all the db things)
  - fix logos
    - logos in index.hbs (guest icon & registered user account icon)
    - brand logo in navbar (fixed size so its not stretched)
  - look for default icon for account?
  - color scheme
    - change colors of buttons accdg to color schems (¿)
