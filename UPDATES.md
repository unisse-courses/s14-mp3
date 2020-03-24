### **UPDATES**
**[SAM] UPDATES FOR 03/23/2020 6:55pm**
1. css files
  - i made two css files instead
    - styles_inside.css for the files that are after log-in
    - style_outside.css for the files that are before log-in
2. in main.hbs
  - body can be two types of classes depending if theyre inside or outside
  - for the navbar partial problem, we can use an #if statement & hopefully it will work

**[JOHANN] UPDATES FOR 03/24/2020 3:30pm?**
1. Main update: Made an external JS file (scripts.js) which should hold all of our sccripts
  - removed scripts for index.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for CreateAccount.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for UserLogin.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for Homepage.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for AccountProfile.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for EditAccountProfile.hbs and transferred to scripts.js, navigations now fixed
  - removed scripts for CreateRecipePost.hbs and transferred to scripts.js, navigations now fixed, TO DO: Fix VALIDATION
  - removed scripts for EditRecipePost.hbs and transferred to scripts.js, navigations now fixed, TO DO: FIX VALIDATION
  - removed scripts for SearchPage.hbs and transferred to scripts.js, navigations now fixed
  
2. Made the nav bar into a partial
  - all the navigations and buttons works
  - guest access still the same

3. Added Preview image(found in CreateAccount and EditAccount)
  - need to set size restriction so the pic doesnt take up the entire screen
  - formating basically
  - maybe will put preview pic in creating and editing recipe post
---
### **TODO**
- main.hbs
  - finish statements that need helpers
- all the other files
  - decide which elements need helpers + if they need to be in index.js
- fix logos
  - logos in index.hbs (guest icon & registered user account icon)
  - brand logo in navbar (fixed size so its not stretched)
- look for default icon for account?
  - so that we dont need to go thru the hassle of doing validation for an image file
  - but then i just realized we might need file validation for the create/edit recipe post image so idk
