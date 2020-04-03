$(document).ready(function() {
    console.log("ready test")

    $('#logout').click(function(){
        sessionStorage.clear();
    });
/* -------------------------------------------------- index.hbs -------------------------------------------------- */

    $("#noAccount").click(function () { 
        localStorage.setItem('isGuest', 0);
        
        window.location.href = "home";
        
    });

    $("#yesAccount").click(function () { 
        
        window.location.href = "log-in";
        
    });

    
/* -------------------------------------------------- UserLogin.hbs -------------------------------------------------- */
    $("#loginButton").click(function () { 
        var user = document.getElementById("inputUser").value
        var pass = document.getElementById("inputPassword").value
        
        //to verify if crednetials have been retrieved
        console.log(user + " " + pass)
            if (user == ""){
                document.getElementById("warning1").textContent ='Please input your username'
                document.getElementById("warning1").style.color = "red";
                return false
            }
                    
            if(pass == ""){
                document.getElementById("warning1").textContent ='Please input your password'
                document.getElementById("warning1").style.color = "red";
                return false;
            }
                
            localStorage.setItem('isGuest', 1);
            
            alert()
        
    });


/* -------------------------------------------------- CreateAccount.hbs -------------------------------------------------- */

    $("#createAccount").click(function () { 
        var first = document.getElementById("firstName").value
        var last = document.getElementById("lastName").value
        var user = document.getElementById("userName").value
        var pass = document.getElementById("password").value
        //var pic = document.getElementById("profilePic").value
        var bio = document.getElementById("bio").value

        if (first == ""){
             document.getElementById("validFirst").textContent ='Missing first name'
            document.getElementById("validFirst").style.color = "red";
            return false
        }
        else
            document.getElementById("validFirst").style.color = "#F1F7ED";
                    
        if(last == ""){
            document.getElementById("validLast").textContent ='Missing last name'
            document.getElementById("validLast").style.color = "red";
            return false;
        }
        else
            document.getElementById("validLast").style.color = "#F1F7ED";

        if(user == ""){
            document.getElementById("validUser").textContent ='Please input your password'
            document.getElementById("validUser").style.color = "red";
            return false;
        }
        else
            document.getElementById("validUser").style.color = "#F1F7ED";

        if(pass == ""){
            document.getElementById("validPass").textContent ='Please input your password'
            document.getElementById("validPass").style.color = "red";
            return false;
        }
        else
            document.getElementById("validPass").style.color = "#F1F7ED";

        var user = {
            firstname: first,
            lastname: last,
            username: user,
            password: pass,
            bio: bio
        };

        console.log(first, last, user, pass, bio);

        $.post('addAccount', user, function(data,status) {
            console.log(data);
            if(data.success){
                alert("You may now login")
            }
        });
    });


    function showPreview(file) {
        if (file.files && file.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
            $('#previewPic').attr('src', e.target.result);
        }
        reader.readAsDataURL(file.files[0]); 
        console.log("preview shown")
        }
    }
      
    $("#profilePic").change(function() {
        showPreview(this);
    });

/* -------------------------------------------------- Homepage.hbs -------------------------------------------------- */

if (localStorage.getItem('isGuest') == 0){
    $('#accProfile').addClass("disabled")
    $('#create').hide()
    $('#navbar-dropdown').html("Guest User")
  }
  else{
    $('#accProfile').addClass("enabled")
    $('#create').show()
  }

  $('#logout').click(function(){
    sessionStorage.clear();
  })

/* -------------------------------------------------- CreateRecipePost.hbs -------------------------------------------------- */
if (window.location.href.includes("create-recipe")){
    var i;

// initializing array of ingredients
var ulist = document.getElementsByTagName("UL")[1];
var arrIngredients = ulist.getElementsByTagName("LI");
    
for (i = 0; i < arrIngredients.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close1";
    span.appendChild(txt);
    arrIngredients[i].appendChild(span);
}

var close1 = document.getElementsByClassName("close1");
var i;
for (i = 0; i < close1.length; i++) {
    close1[i].onclick = function() {
    var div = this.parentElement;
    div.remove();
    }
}

// initializing array of instructions
    var olist = document.getElementsByTagName("OL")[0];
    var arrInstructions = olist.getElementsByTagName("LI");

    for (i = 0; i < arrInstructions.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close2";
        span.appendChild(txt);
        arrInstructions[i].appendChild(span);
    }

    var close2 = document.getElementsByClassName("close2");
    var i;
    for (i = 0; i < close2.length; i++) {
        close2[i].onclick = function() {
        var div = this.parentElement;
        div.remove();
        }
    }
}




$("#postRecipe").click(function () { 
    //var thumb = document.getElementById("thumbnail").value;
    var desc = document.getElementById("description").value;
    var ingred = document.getElementById("ulist").value;
    var instruct = document.getElementById("olist").value;

    
    /*
    if (thumb == ""){
        document.getElementById("warning").textContent ='Please provide a brief description of your recipe';
        document.getElementById("warning").style.color = "red";
        return false;
    }
    else {
        document.getElementById("warning").style.color = "white";
        document.getElementById("warning").textContent ='';
    }
    */

    if (desc == ""){
        $(".warning").val('Please provide a brief description of your recipe');
        $(".warning").css("color", "red");
        return false;
    }
    else {
        document.getElementById("warning").style.color = "white";
        document.getElementById("warning").value ='';
    }
          
    if(ingred == ""){
        $(".warning").val('Please list down the ingredients used');
        $(".warning").css("color", "red");
        return false;
    }
    else {
        document.getElementById("warning").style.color = "white";
        document.getElementById("warning").value ='';
    }

    if(instruct == ""){
        $(".warning").val('Please list the steps in creating the recipe');
        $(".warning").css("color", "red");
        
        return false;
    }
    else {
        document.getElementById("warning").style.color = "white";
        document.getElementById("warning").value ='';
    }
      
    console.log("Recipe Post Created!"); 
      
  });
//adding an ingredient to the list
$("#addIngredient").click(function () { 
    var li = document.createElement("li");
    var inputValue1 = document.getElementById("ulinput1").value;
    var inputValue2 = document.getElementById("ulinput2").value;
    var inputValue3 = document.getElementById("ulinput3").value;

    var inputALL = inputValue1 + " " + inputValue2 + " " + inputValue3;

    var t = document.createTextNode(inputALL);
    li.appendChild(t);
    if (inputValue1 === '' && inputValue2 === '' && inputValue3 === '') {
        alert("You must write something!");
    } else {
        document.getElementById("ulist").appendChild(li);
    }
    document.getElementById("ulinput1").value = "";
    document.getElementById("ulinput2").value = "";
    document.getElementById("ulinput3").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close1";
    span.appendChild(txt);
    li.appendChild(span);
    li.className = "list_item";
      
    for (var i = 0; i < close1.length; i++) {
        close1[i].onclick = function() {
            var div = this.parentElement;
            div.remove();
        }
    }
  });
//add instuction to the list
$("#addInstruction").click(function () { 
    var li = document.createElement("li");
    var inputValue = document.getElementById("olinput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
    document.getElementById("olist").appendChild(li);
    }
    document.getElementById("olinput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close2";
    span.appendChild(txt);
    li.appendChild(span);
    li.className = "list_item";
                
                
    //this one is to place the function remove on the newly added list item
    for (var i = 0; i < close2.length; i++) {
        close2[i].onclick = function() {
        var div = this.parentElement;
        div.remove();
        }
    }
    
    });
/* -------------------------------------------------- RecipePost.hbs -------------------------------------------------- */
//to follow: Actual Data stuff from database lol 

    if (window.location.href.includes("recipe-post")){

        if (localStorage.getItem('isGuest') == 0){
            $('#accProfile').addClass("disabled")
            $('#create').hide()
            $('#upvote-icon').hide()
            $('#downvote-icon').hide()
            $('#edit_post-btn').hide()
            $('#delete_post-btn').hide()
            $('.post-comments-list').hide()
            
            $('#navbar-dropdown').html("Guest User")
        }
        else{
            $('#accProfile').addClass("enabled")
            $('#create').show()
            $('#upvote-icon').show()
            $('#downvote-icon').show()
            $('#edit_post-btn').show()
            $('#delete_post-btn').show()
            
            $('#post-comments-list').show()
        }

        document.getElementById('upvote-icon').addEventListener('click', function () {
            // TODO: code to increase score

            console.log("plus 1 vote")
        });

        document.getElementById('downvote-icon').addEventListener('click', function () {
            // TODO: code to decrease score
            
            console.log("minus 1 vote")
        });

        $("#delete").click(function () { 
            location.href='home'
        });

        $("#edit_post-btn").click(function () { 
            location.href='edit-recipe'
        });

        // FEATURE FOR ADDING A COMMENT
        function appendComment(item, parentDiv) {
            var user = item.user;    

            //everthing not modal
            var list = document.createElement('li');
            var profileImg = document.createElement('img');
            var bigDiv = document.createElement('div');
                
            var person = document.createElement('span');
            var time = document.createElement('small');
            var anchor = document.createElement('a');
            var horizontal = document.createElement('br');
            var laman = document.createElement('span');

            var smallDiv = document.createElement('div');
            var replyButton = document.createElement('button');
                
            $(list).addClass("media post-comment-thread");

            $(profileImg).addClass("align-self-start mr-3 comment-icon");
            $(profileImg).attr("src", user.profilepic);

            $(bigDiv).addClass("media-body comment-body");

            $(anchor).attr("href", "account-profile");
            $(anchor).addClass("badge badge-light");

            $(time).addClass("text-muted");

            $(smallDiv).addClass("d-flex flex-row justify-content-end");
            $(replyButton).addClass("btn btn-outline-secondary");
            $(replyButton).attr("type", "button");
            $(replyButton).attr("data-toggle", "modal");
            $(replyButton).attr("data-target", "#reply");

            $(anchor).text("By " + user.firstname + " " + user.lastname + " | " + user.username);

            $(time).text(' ' + item.date + " " + item.time);

            $(laman).text(item.content);

            $(replyButton).text("Reply");
                
            smallDiv.append(replyButton);

            person.append(anchor);

            bigDiv.append(person);
            bigDiv.append(time);
            bigDiv.append(horizontal);
            bigDiv.append(laman);
            bigDiv.append(smallDiv);


            list.append(profileImg);
            list.append(bigDiv);

            parentDiv.append(list);


            //something to come

        }


        $.get("getCommentRow", function (data, status) {

            console.log(data);
            console.log(status);
            


            var containerUL = $("#commentList");

            data.forEach((item, i) => {
                appendComment(item, containerUL);
            });
        });




        // FEATURE FOR ADDING A REPLY
        function appendReply(item, parentDiv) {
            // TODO
        }


    };

/* -------------------------------------------------- AccountProfile.hbs -------------------------------------------------- */

if (window.location.href.includes("account-profile"))
{
    if (localStorage.getItem('isGuest') == 0){
        $('#accProfile').addClass("disabled")
        $('#create').hide()
        $('#edit').hide()
        $('#delete_account-btn').hide()

        $('#navbar-dropdown').html("Guest User")
      }
      else{
        $('#accProfile').addClass("enabled")
        $('#create').show()
        $('#edit').show()
        $('#delete_account-btn').show()
      }

      $('#logout').click(function(){
        sessionStorage.clear();
      })

      $('#delete').click(function(){
        sessionStorage.clear();
      })
}
    $("#deleteAccount").click(function () { 
        sessionStorage.clear();
        location.href='/'  
    });

    $("#editAccount").click(function () { 
        location.href='edit-account'
        
    });

/* -------------------------------------------------- EditAccountProfile.hbs -------------------------------------------------- */

$("#updateAccount").click(function () { 
    var first = document.getElementById("EDITfirstName").value;
                var last = document.getElementById("EDITlastName").value;
                var user = document.getElementById("EDITuserName").value;
                var pass = document.getElementById("EDITpassword").value;
                //var pic = document.getElementById("EDITprofilePic").value
                var bio = document.getElementById("EDITbio").value;
                
                if (first == ""){
                    document.getElementById("validFirst").textContent ='Missing first name';
                    document.getElementById("validFirst").style.color = "red";
                    return false;
                }
                else {
                    document.getElementById("validFirst").style.color = "white";
                }
                    
                if(last == ""){
                    document.getElementById("validLast").style.color = "red";
                    document.getElementById("validLast").textContent ='Missing last name';
                    return false;
                    
                }
                else {
                    document.getElementById("validLast").style.color = "white";
                }

                if(user == ""){
                    document.getElementById("validUser").textContent ='Please input your password';
                    document.getElementById("validUser").style.color = "red";
                    return false;
                    
                }
                else{
                    document.getElementById("validUser").style.color = "white";
                }

                if(pass == ""){
                    document.getElementById("validPass").textContent ='Please input your password';
                    document.getElementById("validPass").style.color = "red";
                    return false;
                }
                else {
                    document.getElementById("validPass").style.color = "white";
                }
    
});

function showEditPreview(file) {
    if (file.files && file.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
        $('#EDITpreviewPic').attr('src', e.target.result);
    }
    reader.readAsDataURL(file.files[0]); 
    }
}
  
$("#EDITprofilePic").change(function() {
    showEditPreview(this);
});


/* -------------------------------------------------- EditRecipePost.hbs -------------------------------------------------- */

    $("#editRecipePost").click(function () { 
        var desc = document.getElementById("description").value;
                var ingred = document.getElementById("ingredients").value;
                var instruct = document.getElementById("instructions").value;
                
                if (desc == ""){
                    document.getElementById("warning").textContent ='Please provide a brief description of your recipe';
                    document.getElementById("warning").style.color = "red";
                    return false;
                }
                else {
                    document.getElementById("warning").style.color = "white";
                    document.getElementById("warning").textContent ='';
                }
                    
                if(ingred == ""){
                    document.getElementById("warning").textContent ='Please list down the ingredients used';
                    document.getElementById("warning").style.color = "red";

                    return false;
                }
                else {
                    document.getElementById("warning").style.color = "white";
                    document.getElementById("warning").textContent ='';
                }

                if(instruct == ""){
                    document.getElementById("warning").textContent ='Please list the steps in creating the recipe';
                    document.getElementById("warning").style.color = "red";

                    return false;
                }
                else {
                    document.getElementById("warning").style.color = "white";
                    document.getElementById("warning").textContent ='';
                }
        
    });



    if(window.location.href.includes("edit-recipe")){
        var i;

            // initializing array of ingredients
                var ulist = document.getElementsByTagName("UL")[1];
                var arrIngredients = ulist.getElementsByTagName("LI");

                for (i = 0; i < arrIngredients.length; i++) {
                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close1";
                    span.appendChild(txt);
                    arrIngredients[i].appendChild(span);
                }

                var close1 = document.getElementsByClassName("close1");
                var i;
                for (i = 0; i < close1.length; i++) {
                    close1[i].onclick = function() {
                        var div = this.parentElement;
                        div.remove();
                    }
                }

            // initializing array of instructions
                var olist = document.getElementsByTagName("OL")[0];
                var arrInstructions = olist.getElementsByTagName("LI");

                for (i = 0; i < arrInstructions.length; i++) {
                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close2";
                    span.appendChild(txt);
                    arrInstructions[i].appendChild(span);
                }

                var close2 = document.getElementsByClassName("close2");
                var i;
                for (i = 0; i < close2.length; i++) {
                    close2[i].onclick = function() {
                        var div = this.parentElement;
                        div.remove();
                    }
                }
    }

    $("#EDITingredient").click(function () { 
        var li = document.createElement("li");
                var inputValue1 = document.getElementById("EDITulinput1").value;
                var inputValue2 = document.getElementById("EDITulinput2").value;
                var inputValue3 = document.getElementById("EDITulinput3").value;
            
                var inputALL = inputValue1 + inputValue2 + inputValue3;
            
                var t = document.createTextNode(inputALL);

                li.appendChild(t);
                if (inputValue1 === '' && inputValue2 === '' && inputValue3 === '') {
                    alert("You must write something!");
                } else {
                    document.getElementById("EDITulist").appendChild(li);
                }
                document.getElementById("EDITulinput1").value = "";
                document.getElementById("EDITulinput2").value = "";
                document.getElementById("EDITulinput3").value = "";

                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u00D7");
                span.className = "close1";
                span.appendChild(txt);
                li.appendChild(span);
                li.className = "list_item";


                //this one is to place the function remove on the newly added list item
                for (i = 0; i < close1.length; i++) {
                    close1[i].onclick = function() {
                        var div = this.parentElement;
                        div.remove();
                    }
                }
        
    });

    $("#EDITinstruction").click(function () { 
        var li = document.createElement("li");
                var inputValue = document.getElementById("EDITolinput").value;
                var t = document.createTextNode(inputValue);
                li.appendChild(t);
                if (inputValue === '') {
                    alert("You must write something!");
                } else {
                    document.getElementById("EDITolist").appendChild(li);
                }
                document.getElementById("EDITolinput").value = "";

                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u00D7");
                span.className = "close2";
                span.appendChild(txt);
                li.appendChild(span);
                li.className = "list_item";


                //this one is to place the function remove on the newly added list item
                for (i = 0; i < close2.length; i++) {
                    close2[i].onclick = function() {
                        var div = this.parentElement;
                        div.remove();
                    }
                }

        
    });

/* -------------------------------------------------- SearchPage.hbs -------------------------------------------------- */

if(window.location.href.includes("search")){
    $('.post_preview-container').hide();
    $('.profile-container').hide();

    if (localStorage.getItem('isGuest') == 0){
        $('#accProfile').addClass("disabled")
        $('#create').hide()

        $('#navbar-dropdown').html("Guest User")
              
    }
    else{
        $('#accProfile').addClass("enabled")
        $('#create').show()
        }

    $('#logout').click(function(){
        sessionStorage.clear();
    })

    $('#button-addon2').click(function search()
    {
        var name = "Account Name"
        var post = "Recipe Post"
        var searchThing= $('.search_bar option:selected').text()
        var searchString = $('#searching').val()
        
        
        if(searchString == "") {
          return false;
        }
        if($('.search_bar option:selected').text() == "Search by..."){
          return false;
        }
        
        if(name.localeCompare(searchThing) == 0)
        {
          
          $('.post_preview-container').hide();
          $('.profile-container').show();
          
        }
        
        if(post.localeCompare(searchThing) == 0)
        {
          
          $('.profile-container').hide();
          $('.post_preview-container').show();
          
        }
  
        console.log("searching for " + $('#searching').val())
    })
}

});