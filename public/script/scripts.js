$(document).ready(function() {
    console.log("ready test")

    $('#logout').click(function(){
        sessionStorage.clear();
    });

/* -------------------------------------------------- index.hbs -------------------------------------------------- */

    $("#noAccount").click(function () { 
        localStorage.setItem('isGuest', 0);
        var account = {
            username: "Guest",
            remember: false
        }

        $.post('loginACTION', account, function(data,status) {
            
            if(data.success){
                
                window.location.href = "home";

            }
        });
        
    });

    $("#yesAccount").click(function () { 
        
        window.location.href = "log-in";
        
    });

    
/* -------------------------------------------------- UserLogin.hbs -------------------------------------------------- */

    if(window.location.href.includes("log-in")){
        $.post("remember", function (data, status) {
            console.log(data);
            $("#user").val(data.username);
            $("#pass").val(data.password);

            if(data.remember == "true"){
                $("#remember_me").attr("checked", true);
            }
            else{
                $("#remember_me").removeAttr("checked");
            }
            
        });
    }

    $("#loginButton").click(function (event) { 
        event.preventDefault();

        var user = document.getElementById("user").value
        var pass = document.getElementById("pass").value

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
      
        var account = {
            username: user,
            password: pass,
            remember: $('#remember_me').is(":checked")
        }
        console.log(account.remember)
        $.post('loginACTION', account, function(data,status) {
            console.log(data);
            if(!data.success){
                document.getElementById("warning1").textContent = data.message;
                document.getElementById("warning1").style.color = "red";
    
                console.log(data.message);
            }
            else {
                console.log(data.message);
                console.log(data.username);
                localStorage.setItem("activeUser", data.username);
                localStorage.setItem("userFirstname", data.firstname);
                localStorage.setItem("userLastname", data.lastname);
                localStorage.setItem("userProfpic", data.profilepic);
                window.location.href = "/home";
            }
        });

    });


/* -------------------------------------------------- CreateAccount.hbs -------------------------------------------------- */
    
    $("#email").blur(()=> {
        //Empty OR invalid format OR taken
        if ($("#email").val() == ""){
            $("#email").removeClass("is-valid")
            $("#email").addClass("is-invalid")

            $("#validEmail").show()
            $("#validEmail").addClass("invalid-feedback")
            $("#validEmail").removeClass("valid-feedback")
            $("#validEmail").html("Please input your email address").css("color", "black")
        }
        else {
            // gets the email inputted
            var emailInput = $("#email").val();

            // copy paste i found to match the email format
            var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
            if(emailInput.match(emailFormat)) { // if it matches the format
                $.post('uniqueEmailCheck', {email: emailInput}, function(data, status) {
                    console.log(emailInput + " = " + data.success);
        
                    if (data.success) { // if the email inputted is UNIQUE
                        $("#email").addClass("is-valid")
                        $("#email").removeClass("is-invalid")
                            
                        $("#validEmail").addClass("valid-feedback")
                        $("#validEmail").removeClass("invalid-feedback")
                        $("#validEmail").html("Looks good!").css("color", "black")
                    }
                    else { // if the email inputted is NOT UNIQUE
                        $("#email").removeClass("is-valid")
                        $("#email").addClass("is-invalid")
                
                        $("#validEmail").show()
                        $("#validEmail").addClass("invalid-feedback")
                        $("#validEmail").removeClass("valid-feedback")
                        $("#validEmail").html("Email entered is already taken").css("color", "black")
                    }
                });

            }
            else { // if it doesnt match the format
                $("#email").removeClass("is-valid")
                $("#email").addClass("is-invalid")
    
                $("#validEmail").show()
                $("#validEmail").addClass("invalid-feedback")
                $("#validEmail").removeClass("valid-feedback")
                $("#validEmail").html("Email entered is invalid").css("color", "black")
                    
            }
      
        }
    });

    $("#firstname").blur(() => {
        if ($("#firstname").val() == ""){

            $("#firstname").removeClass("is-valid")
            $("#firstname").addClass("is-invalid")

            $("#validFirst").show()
            $("#validFirst").addClass("invalid-feedback")
            $("#validFirst").removeClass("valid-feedback")
            $("#validFirst").html("Please input your first name").css("color", "black")
        }
        //May laman
        else{
            $("#firstname").addClass("is-valid")
            $("#firstname").removeClass("is-invalid")
            
            $("#validFirst").addClass("valid-feedback")
            $("#validFirst").removeClass("invalid-feedback")
            $("#validFirst").html("Looks good!").css("color", "black")
        }
        
    });

    $("#lastname").blur(() => {
        if ($("#lastname").val() == ""){

            $("#lastname").removeClass("is-valid")
            $("#lastname").addClass("is-invalid")

            $("#validLast").show()
            $("#validLast").addClass("invalid-feedback")
            $("#validLast").removeClass("valid-feedback")
            $("#validLast").html("Please input your last name").css("color", "black")
        }
        
        else {
            $("#lastname").addClass("is-valid")
            $("#lastname").removeClass("is-invalid")
            
            $("#validLast").addClass("valid-feedback")
            $("#validLast").removeClass("invalid-feedback")
            $("#validLast").html("Looks good!").css("color", "black")
        }
    })

    $("#username").blur(() => {
        if ($("#username").val() == ""){

            $("#username").removeClass("is-valid")
            $("#username").addClass("is-invalid")

            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Please input your username").css("color", "black")
        }
        
        // if the username is less than 6 characters
        else if($("#username").val().length < 6) {
            $("#username").removeClass("is-valid")
            $("#username").addClass("is-invalid")

            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Username must have at least 6 characters").css("color", "black")
        }

        // if the username is greater than 15 characters
        else if($("#username").val().length > 15) {
            $("#username").removeClass("is-valid")
            $("#username").addClass("is-invalid")
    
            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Username must have at most 15 characters").css("color", "black")
        }    
 
        else {
            // gets the username inputted
            var usernameInput = $("#username").val();

            // copy paste i found to match the username format
            var usernameFormat = /^[a-zA-Z0-9_]*$/;	
        
            if(usernameInput.match(usernameFormat)) { // if it matches the format
                $.post('uniqueUsernameCheck', {username: usernameInput}, function(data, status) {
                    console.log(usernameInput + " = " + data.success);
        
                    if (data.success) { // if the username inputted is UNIQUE  
                        $("#username").addClass("is-valid")
                        $("#username").removeClass("is-invalid")
                        
                        $("#validUser").addClass("valid-feedback")
                        $("#validUser").removeClass("invalid-feedback")
                        $("#validUser").html("Looks good!").css("color", "black")
                    }
                    else { // if the email username is NOT UNIQUE
                        $("#username").removeClass("is-valid")
                        $("#username").addClass("is-invalid")
            
                        $("#validUser").show()
                        $("#validUser").addClass("invalid-feedback")
                        $("#validUser").removeClass("valid-feedback")
                        $("#validUser").html("Username entered is already taken").css("color", "black")
                    }
                });
            }
            else{ // if it doesnt match the format
                $("#username").removeClass("is-valid")
                $("#username").addClass("is-invalid")
    
                $("#validUser").show()
                $("#validUser").addClass("invalid-feedback")
                $("#validUser").removeClass("valid-feedback")
                $("#validUser").html("Username entered is invalid").css("color", "black")
            }
            


        }
    });

    $("#password").blur(() => {
        if ($("#password").val() == ""){
            $("#password").removeClass("is-valid")
            $("#password").addClass("is-invalid")

            $("#validPass").show()
            $("#validPass").addClass("invalid-feedback")
            $("#validPass").removeClass("valid-feedback")
            $("#validPass").html("Please input your password").css("color", "black")
        }

        else if($("#password").val().length < 6){
            $("#password").removeClass("is-valid")
            $("#password").addClass("is-invalid")

            $("#validPass").show()
            $("#validPass").addClass("invalid-feedback")
            $("#validPass").removeClass("valid-feedback")
            $("#validPass").html("Password must have at least 6 characters").css("color", "black")
        }
        
        else {
            // gets the password inputted
            var passwordInput = $("#password").val();

            // copy paste i found to match the password format
            var passwordFormat = /^[a-zA-Z0-9_]*$/;	

            if(passwordInput.match(passwordFormat)) { // if it matches the format
                $("#password").addClass("is-valid")
                $("#password").removeClass("is-invalid")
                
                $("#validPass").addClass("valid-feedback")
                $("#validPass").removeClass("invalid-feedback")
                $("#validPass").html("Looks good!").css("color", "black")
            }
            else { // if it doesnt match the format
                $("#password").removeClass("is-valid")
                $("#password").addClass("is-invalid")

                $("#validPass").show()
                $("#validPass").addClass("invalid-feedback")
                $("#validPass").removeClass("valid-feedback")
                $("#validPass").html("Password entered is invalid").css("color", "black")
            }

        }
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
      
    $("#profilepic").change(function() {
        showPreview(this);
    });

/* -------------------------------------------------- Homepage.hbs -------------------------------------------------- */
    if(window.location.href.includes('home')){
        console.log(localStorage.getItem('isGuest'))
        if (localStorage.getItem('isGuest') == 0){
            $('#accProfile').addClass("disabled")
            $('#create').hide()
        }
        else{
            $('#accProfile').addClass("enabled")
            $('#create').show()

        }
    
        $('#logout').click(function(){
            sessionStorage.clear();
        })

        $.post("getTopFive", function (data, status) {
            var parent = $("#homeContainer")
            data.forEach((item, i) => {
                createPostDiv(item, parent);
            });
        });


        $(document).on("unload", function(){
            $("#homeContainer").empty();
        })
    }

    function createPostDiv(item, parentDiv){
        
        var biggestdiv  = document.createElement('div');

        var imageDiv    = document.createElement('div');
        var image      = document.createElement('img');
        
        var bigdiv      = document.createElement('div');

        var titlediv    = document.createElement('div');
        var title       = document.createElement('h3')
        var user        = document.createElement('p');
        var userspan    = document.createElement('span');

        var descDiv     = document.createElement('div');
        var desc        = document.createElement('p');
        var descBreak   = document.createElement('br')
        var anchor      = document.createElement('a');

        var whenPosted  = document.createElement('div');
        var upvotes     = document.createElement('p');
        var smupvotes   = document.createElement('small');
        var timedate    = document.createElement('p');
        var smtimedate  = document.createElement('small');

        //classes
        $(biggestdiv).addClass("card post_preview-container");

        $(imageDiv).addClass("full-width-container post_preview-row0");
        $(image).addClass("img-fluid");

        $(bigdiv).addClass("d-flex flex-column card-body post_preview-below_image");

        $(titlediv).addClass("d-flex flex-column post_preview-row1");
        $(title).addClass("card-title");
        $(user).addClass("card-subtitle");
        $(userspan).addClass("badge badge-light");

        $(descDiv).addClass("d-flex flex-column post_preview-row2");
        $(desc).addClass("card-text");
        //br
        $(anchor).addClass("stretched-link");

        $(whenPosted).addClass("d-flex justify-content-between flex-wrap post_preview-row3");
        $(upvotes).addClass("card-text");
        $(smupvotes).addClass("text-muted");
        $(timedate).addClass("card-text");
        $(smtimedate).addClass("text-muted");

        //all the text and data
        $(image).attr("src", item.recipe_picture);

        $(title).text(item.title);
  
        $(userspan).text("By " + fullname(item.user.firstname, item.user.lastname) +" | " + userwithatsign(item.user.username));

        $(desc).text(item.description);
        
        $(anchor).attr("href", "recipe-post/"+item._id);
        $(anchor).text("Continue reading...");

        $(smupvotes).text(item.upvotes + " UPVOTES");

        $(smtimedate).text(item.dateposted + " " + item.timeposted);

        //appending all the stuffs

        imageDiv.append(image);

        biggestdiv.append(imageDiv);

        
        user.append(userspan);

        titlediv.append(title);
        titlediv.append(user);

        bigdiv.append(titlediv);


        descDiv.append(desc);
        descDiv.append(descBreak);
        descDiv.append(anchor);


        bigdiv.append(descDiv);

        upvotes.append(smupvotes);
        timedate.append(smtimedate);

        whenPosted.append(upvotes);
        whenPosted.append(timedate);

        bigdiv.append(whenPosted);

        biggestdiv.append(bigdiv);

        parentDiv.append(biggestdiv);


    }   

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
        var name = document.getElementById("post_title").value;
        var thumb = document.getElementById("thumbnail").value;
        var desc = document.getElementById("description").value;
        var ingred =  document.getElementById("ulist").getElementsByTagName("li").length;
        var instruct =  document.getElementById("olist").getElementsByTagName("li").length;


        if (name == ""){
            document.getElementById("ltitle").textContent = 'Please provide a title for your recipe post';
            document.getElementById("ltitle").style.color = "red";
            return false;
        }
        else {
            document.getElementById("ltitle").style.color = "white";
            document.getElementById("ltitle").value ='';
        }

        if (desc == ""){
            document.getElementById("lDesc").textContent ='Please provide a brief description of your recipe';
            document.getElementById("lDesc").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lDesc").style.color = "white";
            document.getElementById("lDesc").value ='';
        }
            
        if(ingred == "0"){
            document.getElementById("lIngred").textContent ='Please provide the list of ingredients for your recipe';
            document.getElementById("lIngred").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lIngred").style.color = "white";
            document.getElementById("lIngred").value ='';
        }

        if(instruct == "0"){
            document.getElementById("lInst").textContent ='Please provide the list of instructions for your recipe';
            document.getElementById("lInst").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lInst").style.color = "white";
            document.getElementById("lInst").value ='';
        }

        var today = new Date();
            var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
            var time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            
        var arrIngred = [];
            var listArray = document.getElementById("ulist").getElementsByTagName("li");   
            var i=0;
                
            for (i = 0; i < listArray.length; i++) {
                var spanArray = listArray[i].getElementsByTagName("span");
                
                var temp_ingred = {
                    quantity: spanArray[0].getElementsByTagName("span")[0].innerHTML,
                    unit: spanArray[0].getElementsByTagName("span")[1].innerHTML,
                    name: spanArray[0].getElementsByTagName("span")[2].innerHTML
                }

                arrIngred.push(temp_ingred);
            };
        
        var arrInstruct = [];
            var listIN = document.getElementById("olist").getElementsByTagName("li");
            
            var i=0;
            
            for (i = 0; i < listIN.length; i++) {
                var spanIN= listIN[i].getElementsByTagName("span");
                var temp = spanIN[0].innerHTML
                    
                arrInstruct.push(temp)
            };
            
        var new_post = {
            title: name,
            upvotes: '0',
            dateposted: date,
            timeposted: time,
            recipe_picture: thumb,
            description: desc,
            ingredients: arrIngred,
            instructions: arrInstruct,
        };

        $.post('addPost', new_post, function(data,status) {
            //console.log(data);
            window.location.href="../recipe-post/" + data._id;
        });
        
    });

    //adding an ingredient to the list
    $("#addIngredient").click(function () { 
        var li = document.createElement("li");
        var inputValue1 = document.getElementById("ulinput1").value + " ";
        var inputValue2 = document.getElementById("ulinput2").value + " ";
        var inputValue3 = document.getElementById("ulinput3").value + " ";

        // i made 1 span per input
        var span1 = document.createElement("SPAN");
        var span2 = document.createElement("SPAN");
        var span3 = document.createElement("SPAN");

        var text1 = document.createTextNode(inputValue1);
        var text2 = document.createTextNode(inputValue2);
        var text3 = document.createTextNode(inputValue3);
       
        span1.appendChild(text1);
        span2.appendChild(text2);
        span3.appendChild(text3);

        var bigspan = document.createElement("SPAN");

        bigspan.appendChild(span1);
        bigspan.appendChild(span2);
        bigspan.appendChild(span3);

        li.appendChild(bigspan);

        if (inputValue1 === ' ' && inputValue2 === ' ' && inputValue3 === ' ') {
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
        var spanContainer = document.createElement("SPAN");
        var text = document.createTextNode(inputValue);

        spanContainer.appendChild(text);

        li.appendChild(spanContainer);
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

    if (window.location.href.includes("recipe-post")){
        
        var str = document.getElementById("unameb").innerText;

        if (localStorage.getItem('isGuest') == 0){
            $('#accProfile').addClass("disabled")
            $('#create').hide()
            $('#upvote-icon').hide()
            $('#downvote-icon').hide()
            $('#edit_post-btn').hide()
            $('#delete_post-btn').hide()
            $('.post-comments-list').hide()
            $('.post-comment-input').hide()
        }
        else{
            
            if(localStorage.getItem("activeUser") != str) { // viewing another person's profile
                $('#accProfile').addClass("enabled")
                $('#create').show()
                $('#upvote-icon').show()
                $('#downvote-icon').show()
                $('#edit_post-btn').hide()
                $('#delete_post-btn').hide()
                $('.post-comments-list').show()
                $('.post-comment-input').show()
            }
            else {
                $('#accProfile').addClass("enabled")
                $('#create').show()
                $('#upvote-icon').show()
                $('#downvote-icon').show()
                $('#edit_post-btn').show()
                $('#delete_post-btn').show()
                $('.post-comment-input').show()
                $('#post-comments-list').show()
            }
        }

        $("#acc_badge").click(function () {
            var username = document.getElementById("unameb").innerText;

            console.log(username);

            console.log("Going to the profile of @" + username);

            window.location.href = "/account-profile/" + username;
        });
        
        $("#upvote-icon").click(function () { 
            
            var url = window.location.href;
            url = url.slice(34)
            url = url.replace(/\D/g,'');
            
            var value = $("#voteCount").text();

            newValue = parseInt(value,10)
            newValue += 1;
            console.log(newValue);

            var stuff = {
                num: url,
                val: newValue
            }
            $.post("../changeVote", stuff ,function (data, status) {
                  
                $("#voteCount").text(data.value);

            });
            
        });

        $("#downvote-icon").click(function () { 
            
            var url = window.location.href;
            url = url.slice(34)
            url = url.replace(/\D/g,'');
            
            var value = $("#voteCount").text();

            newValue = parseInt(value,10)
            newValue -= 1;
            console.log(newValue);

            var stuff = {
                num: url,
                val: newValue
            }
            $.post("../changeVote", stuff ,function (data, status) {
                  
                $("#voteCount").text(data.value);
 
            });
            
        });


        $("#delete").click(function () { 

            var url = window.location.href;
            url = url.slice(34)
            url = url.replace(/\D/g,'');

            var stuff = {
                num: url,
            }

            console.log(stuff.num)

            $.post("../deletePost", stuff ,function (data) {
                if(data){
                    window.location.href="../home"
                }
            });
        });

        $("#edit_post-btn").click(function () {
            var postID = window.location.pathname;
            var str = "";
            var i;
            var x = 0;

            for(i=0; i<postID.length; i++) {
                if(postID[i] == '/') {
                    x = i;
                }
            }
            
            str = postID.substring(x+1, postID.length+1);

            console.log(str);

            window.location.href = "/edit-recipe/" + str;
        });

        function appendComment(item, parentDiv) {
            // We declared a different variable since the object 'user' was NESTED
            // the variable 'post' from the dummy data is represented by 'item'
            var user = item.user; 

            // STEP 1: Create a variable for each tag used (we did ours in order of the original html code)
                var list = document.createElement('li');
                var profileImg = document.createElement('img');
                var bigDiv = document.createElement('div');
                    
                var person = document.createElement('span');
                var time = document.createElement('small');
                var anchor = document.createElement('a');
                var horizontal = document.createElement('br');
                var laman = document.createElement('span');

                var smallDiv = document.createElement('div');
                //var replyButton = document.createElement('button');
                /*
                if (localStorage.getItem("activeUser")== user.username){
                    var deleteButton = document.createElement('button');
                    $(deleteButton).addClass("btn btn-outline-secondary");
                    $(deleteButton).attr("type", "button");
                    $(deleteButton).attr("id", "DELETION");
                    $(deleteButton).attr("data-toggle", "modal");
                    $(deleteButton).attr("data-target", "#delete-comment");
                    $(deleteButton).text("Delete");
                    console.log("same user");
                    smallDiv.append(deleteButton);
                }
                else {
                    console.log("wrong sht men");
                }
                */
            // STEP 2: Add the attributes and classes in each tag (we did it by order rin so its not confusing)
                $(list).addClass("media post-comment-thread");

                $(profileImg).addClass("align-self-start mr-3 comment-icon");
                $(profileImg).attr("src", user.profilepic);

                $(bigDiv).addClass("media-body comment-body");

                $(anchor).attr("href", "account-profile");
                $(anchor).addClass("badge badge-light");

                $(time).addClass("text-muted");

                $(smallDiv).addClass("d-flex flex-row justify-content-end");
                //$(replyButton).addClass("btn btn-outline-secondary");
                //$(replyButton).attr("type", "button");
                //$(replyButton).attr("id", "REPLYIN");
                //$(replyButton).attr("data-toggle", "modal");
               // $(replyButton).attr("data-target", "#reply");

            // STEP 3: We went through each tag that has TEXT inside the tag
                $(anchor).text("By " + item.user.firstname + " " + item.user.lastname + " | " + item.user.username);

                $(time).text(' ' + item.date + " " + item.time);

                $(laman).text(item.content);

                //$(replyButton).text("Reply");

            // STEP 4: We append from the INNERMOST to the OUTERMOST container 
                //smallDiv.append(replyButton);
                
                person.append(anchor);

                bigDiv.append(person);
                bigDiv.append(time);
                bigDiv.append(horizontal);
                bigDiv.append(laman);
                bigDiv.append(smallDiv);
                
                // LIST is the BIGGEST div
                list.append(profileImg);
                list.append(bigDiv);

                
            // STEP 5: Append the BIGGEST div to the PARENT DIV (which is the parameter of this function)
                parentDiv.append(list);

                if ('replies' in item)
                {
                    for ( i = 0 ; i < item.replies.length ; i++)
                    {
                        appendReply(item.replies[i], parentDiv)
                    }
                }
        }
        
        function appendReply(item, parentDiv) {
            // We declared a different variable since the object 'user' was NESTED
            // the variable 'post' from the dummy data is represented by 'item'
            var reply = item;
            var user = item.user;
            console.log(user);
            // STEP 1: Create a variable for each tag used (we did ours in order of the original html code)
                var bigUL = document.createElement('ul');
                var list = document.createElement('li');
                var profileImg = document.createElement('img');
                var bigDiv = document.createElement('div');
                    
                var person = document.createElement('span');
                var time = document.createElement('small');
                var anchor = document.createElement('a');
                var horizontal = document.createElement('br');
                var laman = document.createElement('span');

            // STEP 2: Add the attributes and classes in each tag (we did it by order rin so its not confusing)
                $(bigUL).attr("id","post-replies-list");
                $(list).addClass("media post-reply-thread");

                $(profileImg).addClass("align-self-start mr-3 comment-icon");
                $(profileImg).attr("src", user.profilepic);

                $(bigDiv).addClass("media-body comment-body");

                $(anchor).attr("href", "account-profile");
                $(anchor).addClass("badge badge-light");

                $(time).addClass("text-muted");

            // STEP 3: We went through each tag that has TEXT inside the tag
                $(anchor).text("By " + user.firstname + " " + user.lastname + " | " + user.username);

                $(time).text(' ' + reply.date + " " + reply.time);

                $(laman).text(reply.content);

            // STEP 4: We append from the INNERMOST to the OUTERMOST container 
                person.append(anchor);

                bigDiv.append(person);
                bigDiv.append(time);
                bigDiv.append(horizontal);
                bigDiv.append(laman);

                list.append(profileImg);
                list.append(bigDiv);

                // bigUL is the BIGGEST div
                bigUL.append(list);

            // STEP 5: Append the BIGGEST div to the PARENT DIV (which is the parameter of this function)
                parentDiv.append(bigUL);
        }


        var url = window.location.href;
        url = url.slice(34)
        url = url.replace(/\D/g,'');

        var stuff = {
            _id: url
        }

        $.post("../getComments", stuff, function (data, status) { // This function GETS the existing comments from the DUMMY DATA
            // We just place these in console to make sure there are no errors

            // This variable is the DIV that we want to populate
                var commentsContainer = $("#commentList");
            if (data.comments.length >= 1){
                console.log(data.comments)
                data.comments.forEach((item, i) => { 
                    appendComment(item, commentsContainer);
                });   

            }
        });
    
        $('#addComment-btn').click(function() {  
            var content = $("#olinput").val();
            console.log(content);
            var replies = [{}];

            var url = window.location.href;
            url = url.slice(34);
            url = url.replace(/\D/g,'');
            console.log(url);

            var today = new Date();
            var DATE = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
            var TIME = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            if(content != "") // if comment field is not empty
            {


                var comment = {

                    user: {
                      firstname:    localStorage.getItem("userFirstname"),
                      lastname:     localStorage.getItem("userLastname"),
                      username:     localStorage.getItem("activeUser"),
                      profilepic:   localStorage.getItem("userProfpic")
                    },
                    content:         content,
                    date:            DATE,
                    time:            TIME,
                    replies:         replies,
                    recipe_id:       url,
                    replies:         []
                }
                console.log(comment);

                $.post('/addCommentRow', comment, function(data,status) {
                    console.log(data);
                    var commentsContainer = $("#commentList");
                    appendComment(comment, commentsContainer);
                });
            }
            else{
                window.alert("Please fill up the comment box, or cancel comment!");
            }
        });

        $('#reply-btn').click(function() {
            var content = $('#reply-input').val();
            console.log(content);
            var replies = [{}];

            var url = window.location.href;
            url = url.slice(34);
            
            var today = new Date();
            var DATE = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
            var TIME = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

            if (content!="") {
                var reply = {
                    user: {
                        firstname:    localStorage.getItem("userFirstname"),
                        lastname:     localStorage.getItem("userLastname"),
                        username:     localStorage.getItem("activeUser"),
                        profilepic:   localStorage.getItem("userProfpic")
                    },
                content:              content,
                date:                 DATE,
                time:                 TIME,
                replies:              replies,
                recipe_id:            url
                }

                $.post('/addReplyRow', reply, function(data, status) {
                    var commentsContainer = $("#commentList");
                    appendReply(reply, commentsContainer);
                })
            }
        });

        $('#delete-COMMENT').click(function(){
            var url = window.location.href;
            url = url.slice(34)
            url = url.replace(/\D/g,'');

            var stuff = {
                num: url,
            }

            console.log(stuff.num)

            $.post("../deleteCommentRow", stuff ,function (data) {
                
            });
        });

    };

/* -------------------------------------------------- AccountProfile.hbs -------------------------------------------------- */

    if (window.location.href.includes("account-profile")){

        var path = window.location.pathname;
        var str = "";
        var j;
        var x = 0;

        for(j=0; j<path.length; j++) {
            if(path[j] == '/') {
                x = j;
            }
        }
        
        str = path.substring(x+1, path.length+1);

        if (localStorage.getItem('isGuest') == 0){
            $('#accProfile').addClass("disabled")
            $('#create').hide()
            $('#edit_account-btn').hide()
            $('#delete_account-btn').hide()
        }
        else{

            if(localStorage.getItem("activeUser") != str) { // viewing another person's profile
                $('#accProfile').addClass("enabled")
                $('#create').show()
                $('#delete_account-btn').hide()
                $('#edit_account-btn').hide()
            }
            else { // viewing your own profile
                $('#accProfile').addClass("enabled")
                $('#create').show()
                $('#edit_account-btn').show()
                $('#delete_account-btn').show()
            }
        }

        $('#logout').click(function(){
            sessionStorage.clear();
        })

        $('#delete').click(function(){
            sessionStorage.clear();
        })

        $("#deleteAccount").click(function (e) { 
            //$target = $(e.target);
            //console.log($target.attr('data-id'));

            var data = {
                success: true
            }
            
            $.post("../delete-account", data,function (data, status) {
                sessionStorage.clear();
                location.href='/'
            });
            
        });

        $("#edit_account-btn").click(function () { 
            window.location.href='../edit-account'

        });
    /*
        $.post("../userposts", function (data, status) {
            var parent = $("#main_container")
            if (!data.length < 1){
                
                data.forEach((item, i) => {
                    console.log(item);
                    createPostDiv(item, parent);
                });
            }
        });
    */
    }

    function fullname(firstname, lastname) {
        return firstname + " " + lastname;
    };

    function userwithatsign(username) {
        return "@" + username;
    };

    function addprofilediv(item, parentdiv) {
        var profrowdiv = document.createElement('div');
        //var biggerDiv = document.createElement('div');
        var bigdiv = document.createElement('div');
        var profcol1 = document.createElement('div');
        var profimage = document.createElement('img');
        var anchor      = document.createElement('a');

        var profcol2 = document.createElement('div');

        var rowbet = document.createElement('div');

        var profcol2a = document.createElement('div');
        var Hname = document.createElement('h2');
        var Hfirstname = document.createElement('h2');
        var Hlastname = document.createElement('h2');
        var Pusername = document.createElement('p');

        var profcol2b = document.createElement('div');
        //var Bbutton = document.createElement('button');
        
        var profcol2r2 = document.createElement('div');
        var Pbio = document.createElement('p');

        //containers
        $//(biggerDiv).addClass("d-flex flex-column content");
        $(bigdiv).addClass('card profile-container')
        $(profrowdiv).addClass('d-flex flex-row card-body profile-row');
        $(profcol1).addClass('full-width-container profile-col1');
        $(profcol2).addClass('profile-col2');
        $(rowbet).addClass('d-flex flex-row justify-content-between profile-col2_row1');
        $(profcol2a).addClass('profile-col2_row1a');
        $(profcol2b).addClass('profile-col2_row1b');
        $(profcol2r2).addClass('profile-col2_row2');
        //$(Bbutton).addClass('btn btn-outline-secondary my-2 my-sm-0');
        //$(Bbutton).text('Edit Profile');

        //elements
        $(profimage).addClass('img-fluid');
        if(item.profilepic != "")
            $(profimage).attr('src', item.profilepic);

        $(anchor).attr("href", "account-profile/"+item.username);
        $(anchor).css('text-decoration', 'none'); 
        $(anchor).css('color', '#212529');

        $(Hfirstname).text(item.firstname);
        $(Hlastname).text(item.lastname);
        $(Pusername).text(item.username);
        $(Pbio).text(item.bio);


        profcol2r2.append(Pbio);

        //profcol2b.append(Bbutton);
        
        Hname.append(fullname(Hfirstname.innerHTML, Hlastname.innerHTML));
        profcol2a.append(Hname);
        profcol2a.append(userwithatsign(Pusername.innerHTML));

        rowbet.append(profcol2a);
        rowbet.append(profcol2b);

        profcol2.append(rowbet);
        profcol2.append(profcol2r2);

        if(item.profilepic != "")
            profcol1.append(profimage);

        profrowdiv.append(profcol1);
        profrowdiv.append(profcol2);

        anchor.append(profrowdiv);

        bigdiv.append(anchor);
        //biggerDiv.append(bigdiv);
        parentdiv.append(bigdiv);

    }

/* -------------------------------------------------- EditAccountProfile.hbs -------------------------------------------------- */
    $("#EDITfirstName").blur(() => {
        if ($("#EDITfirstName").val() == ""){

            $("#EDITfirstName").removeClass("is-valid")
            $("#EDITfirstName").addClass("is-invalid")

            $("#validFirst").show()
            $("#validFirst").addClass("invalid-feedback")
            $("#validFirst").removeClass("valid-feedback")
            $("#validFirst").html("Please input your first name").css("color", "black")
        }
        //May laman
        else{
            $("#EDITfirstName").addClass("is-valid")
            $("#EDITfirstName").removeClass("is-invalid")
            
            $("#validFirst").addClass("valid-feedback")
            $("#validFirst").removeClass("invalid-feedback")
            $("#validFirst").html("Looks good!").css("color", "black")
        }
        
    });

    $("#EDITlastName").blur(() => {
        if ($("#EDITlastName").val() == ""){

            $("#EDITlastName").removeClass("is-valid")
            $("#EDITlastName").addClass("is-invalid")

            $("#validLast").show()
            $("#validLast").addClass("invalid-feedback")
            $("#validLast").removeClass("valid-feedback")
            $("#validLast").html("Please input your last name").css("color", "black")
        }
        
        else {
            $("#EDITlastName").addClass("is-valid")
            $("#EDITlastName").removeClass("is-invalid")
            
            $("#validLast").addClass("valid-feedback")
            $("#validLast").removeClass("invalid-feedback")
            $("#validLast").html("Looks good!").css("color", "black")
        }
    })

    $("#EDITuserName").blur(() => {
        if ($("#EDITuserName").val() == ""){

            $("#EDITuserName").removeClass("is-valid")
            $("#EDITuserName").addClass("is-invalid")

            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Please input your username").css("color", "black")
        }
        
        // if the username is less than 6 characters
        else if($("#EDITuserName").val().length < 6) {
            $("#EDITuserName").removeClass("is-valid")
            $("#EDITuserName").addClass("is-invalid")

            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Username must have at least 6 characters").css("color", "black")
        }

        // if the username is greater than 15 characters
        else if($("#EDITuserName").val().length > 15) {
            $("#EDITuserName").removeClass("is-valid")
            $("#EDITuserName").addClass("is-invalid")

            $("#validUser").show()
            $("#validUser").addClass("invalid-feedback")
            $("#validUser").removeClass("valid-feedback")
            $("#validUser").html("Username must have at most 15 characters").css("color", "black")
        }    

        else {
            // gets the username inputted
            var usernameInput = $("#EDITuserName").val();

            // copy paste i found to match the username format
            var usernameFormat = /^[a-zA-Z0-9_]*$/;	

            if(usernameInput.match(usernameFormat)) { // if it matches the format
                $.post('uniqueUsernameCheckEDIT', {username: usernameInput}, function(data, status) {
                    console.log(usernameInput + " = " + data.success);

                    if(data.current == usernameInput) {
                        $("#EDITuserName").addClass("is-valid")
                        $("#EDITuserName").removeClass("is-invalid")
                        
                        $("#validUser").addClass("valid-feedback")
                        $("#validUser").removeClass("invalid-feedback")
                        $("#validUser").html("Looks good!").css("color", "black")
                    }
                    else {
                        if (data.success) { // if the username inputted is UNIQUE  
                            $("#EDITuserName").addClass("is-valid")
                            $("#EDITuserName").removeClass("is-invalid")
                            
                            $("#validUser").addClass("valid-feedback")
                            $("#validUser").removeClass("invalid-feedback")
                            $("#validUser").html("Looks good!").css("color", "black")
                        }
                        else { // if the email username is NOT UNIQUE
                            $("#EDITuserName").removeClass("is-valid")
                            $("#EDITuserName").addClass("is-invalid")
                
                            $("#validUser").show()
                            $("#validUser").addClass("invalid-feedback")
                            $("#validUser").removeClass("valid-feedback")
                            $("#validUser").html("Username entered is already taken").css("color", "black")
                        }
                    }
                });
            }
            else{ // if it doesnt match the format
                $("#EDITuserName").removeClass("is-valid")
                $("#EDITuserName").addClass("is-invalid")

                $("#validUser").show()
                $("#validUser").addClass("invalid-feedback")
                $("#validUser").removeClass("valid-feedback")
                $("#validUser").html("Username entered is invalid").css("color", "black")
            }
            
        }

    });

    $("#EDITpassword").blur(() => {
        if ($("#EDITpassword").val() == ""){

            $("#EDITpassword").removeClass("is-valid")
            $("#EDITpassword").addClass("is-invalid")

            $("#validPass").show()
            $("#validPass").addClass("invalid-feedback")
            $("#validPass").removeClass("valid-feedback")
            $("#validPass").html("Please input your password").css("color", "black")
        }

        else if($("#EDITpassword").val().length < 6){
            $("#EDITpassword").removeClass("is-valid")
            $("#EDITpassword").addClass("is-invalid")

            $("#validPass").show()
            $("#validPass").addClass("invalid-feedback")
            $("#validPass").removeClass("valid-feedback")
            $("#validPass").html("Password must have at least six characters").css("color", "black")
        }
        
        else {
            // gets the password inputted
            var passwordInput = $("#EDITpassword").val();

            // copy paste i found to match the password format
            var passwordFormat = /^[a-zA-Z0-9_]*$/;	

            if(passwordInput.match(passwordFormat)) { // if it matches the format
                $("#EDITpassword").addClass("is-valid")
                $("#EDITpassword").removeClass("is-invalid")
                
                $("#validPass").addClass("valid-feedback")
                $("#validPass").removeClass("invalid-feedback")
                $("#validPass").html("Looks good!").css("color", "black")
            }
            else { // if it doesnt match the format
                $("#EDITpassword").removeClass("is-valid")
                $("#EDITpassword").addClass("is-invalid")

                $("#validPass").show()
                $("#validPass").addClass("invalid-feedback")
                $("#validPass").removeClass("valid-feedback")
                $("#validPass").html("Password entered is invalid").css("color", "black")
            }
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


    $("#updateAccount").click(function () { 
        var first = document.getElementById("EDITfirstName").value;
        var last = document.getElementById("EDITlastName").value;
        var user = document.getElementById("EDITuserName").value;
        var pass = document.getElementById("EDITpassword").value;
        var pic = document.getElementById("EDITprofilePic").value;
        var bio = document.getElementById("EDITbio").value;
        
        console.log("VALUE INSIDE = " + pic);

        var user = {
            editfirstname: first,
            editlastname: last,
            editusername: user,
            editpassword: pass,
            editprofilepic: pic,
            editbio: bio
        }
        
        $.post("edit-account", user, function (data, status) {
                $(document).ready(function () {
                    $("#account-profile-picture").attr("src", data.profilepic);
                    $("#accountname").text(data.firstname + " " + data.lastname);
                    $("#accountusername").text(data.username);
                    $("#accountbio").text(data.bio);


                    //$("#fullnameb").innertext(data.firstname + " " + data.lastname);
                    //$("#unameb").innertext(data.username);
                });
                

                window.location.href = "../account-profile/" + data.username;
        });
    });

/* -------------------------------------------------- EditRecipePost.hbs -------------------------------------------------- */

    $("#editRecipePost").click(function () { 
        var name = document.getElementById("post_title").value;
        var thumb = document.getElementById("EDITthumbnail").value;
        var desc = document.getElementById("EDITdescription").value;
        var ingred =  document.getElementById("EDITulist").getElementsByTagName("li").length;
        var instruct =  document.getElementById("EDITolist").getElementsByTagName("li").length;


        if (name == ""){
            document.getElementById("ltitle").textContent = 'Please provide a title for your recipe post';
            document.getElementById("ltitle").style.color = "red";
            return false;
        }
        else {
            document.getElementById("ltitle").style.color = "white";
            document.getElementById("ltitle").value ='';
        }

        if (desc == ""){
            document.getElementById("lDesc").textContent ='Please provide a brief description of your recipe';
            document.getElementById("lDesc").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lDesc").style.color = "white";
            document.getElementById("lDesc").value ='';
        }
            
        if(ingred == "0"){
            document.getElementById("lIngred").textContent ='Please provide the list of ingredients for your recipe';
            document.getElementById("lIngred").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lIngred").style.color = "white";
            document.getElementById("lIngred").value ='';
        }

        if(instruct == "0"){
            document.getElementById("lInst").textContent ='Please provide the list of instructions for your recipe';
            document.getElementById("lInst").style.color = "red";
            return false;
        }
        else {
            document.getElementById("lInst").style.color = "white";
            document.getElementById("lInst").value ='';
        }

            
        var arrIngred = [];
            var listArray = document.getElementById("EDITulist").getElementsByTagName("li");   
            var i=0;
                
            for (i = 0; i < listArray.length; i++) {
                var spanArray = listArray[i].getElementsByTagName("span");
                
                var temp_ingred = {
                    quantity: spanArray[0].getElementsByTagName("span")[0].innerHTML,
                    unit: spanArray[0].getElementsByTagName("span")[1].innerHTML,
                    name: spanArray[0].getElementsByTagName("span")[2].innerHTML
                }

                arrIngred.push(temp_ingred);
            };
        
        var arrInstruct = [];
            var listIN = document.getElementById("EDITolist").getElementsByTagName("li");
            
            var i=0;
            
            for (i = 0; i < listIN.length; i++) {
                var spanIN= listIN[i].getElementsByTagName("span");
                var temp = spanIN[0].innerHTML
                    
                arrInstruct.push(temp)
            };
            

        var url = window.location.href;
        url = url.slice(34)
        url = url.replace(/\D/g,'');

        var new_post = {
            title: name,
            recipe_picture: thumb,
            description: desc,
            ingredients: arrIngred,
            instructions: arrInstruct,
            _id: url
        };

        $.post('../updatePost', new_post, function(data,status) {
            window.location.href="../recipe-post/" + url
        });

    });

    if(window.location.href.indexOf("edit-recipe") > -1){
        var i;
        console.log("INITIALIZING START");

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

        console.log("INITIALIZING END");

        var postID = window.location.pathname;
        var str = "";
        var j;
        var x = 0;

        for(j=0; j<postID.length; j++) {
            if(postID[j] == '/') {
                x = j;
            }
        }
            
        str = postID.substring(x+1, postID.length+1);

        postidnum = {
            id: str
        }

        console.log("str is = " + str);

        // loading ingredients from db
        $.post("../loadIngredients", postidnum, function(data,status) {
            var arrIngred = data;
            var i;
            
            for(i=0; i < arrIngred.length; i++) {
                console.log(i)
                var li = document.createElement("li");

                var inputValue1 = arrIngred[i].quantity;
                var inputValue2 = arrIngred[i].unit;
                var inputValue3 = arrIngred[i].name;

                var span1 = document.createElement("SPAN");
                var span2 = document.createElement("SPAN");
                var span3 = document.createElement("SPAN");
            
                var text1 = document.createTextNode(inputValue1);
                var text2 = document.createTextNode(inputValue2);
                var text3 = document.createTextNode(inputValue3);
               
                span1.appendChild(text1);
                span2.appendChild(text2);
                span3.appendChild(text3);
            
                var bigspan = document.createElement("SPAN");
            
                bigspan.appendChild(span1);
                bigspan.appendChild(span2);
                bigspan.appendChild(span3);
        
                li.appendChild(bigspan);
            
                document.getElementById("EDITulist").appendChild(li);
            
                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u00D7");
                span.className = "close1";
            
                span.appendChild(txt);
                li.appendChild(span);
                li.className = "list_item";
                    
                
            }
            for (var i = 0; i < close1.length; i++) {
                close1[i].onclick = function() {
                    var div = this.parentElement;
                    div.remove();
                }
            }
            })
            $.post("../loadInstructions", postidnum, function(data,status) {
            // loading instructions from db

            var arrInstruct = data;
            var i;
            
            for(i=0; i < arrInstruct.length; i++) {
                
                var li = document.createElement("li");
                var inputValue = arrInstruct[i];
                var spanContainer = document.createElement("SPAN");
                var text = document.createTextNode(inputValue);
            
                spanContainer.appendChild(text);
            
                li.appendChild(spanContainer);

                document.getElementById("EDITolist").appendChild(li);
            
                var span = document.createElement("SPAN");
                var txt = document.createTextNode("\u00D7");
                span.className = "close2";
                span.appendChild(txt);
                li.appendChild(span);
                li.className = "list_item";
                                
                                
                //this one is to place the function remove on the newly added list item
                
            }
            for (var i = 0; i < close1.length; i++) {
                close1[i].onclick = function() {
                    var div = this.parentElement;
                    div.remove();
                }
            }
        });




    }

    $("#EDITingredient").click(function () { 
        var li = document.createElement("li");
        var inputValue1 = document.getElementById("EDITulinput1").value + " ";
        var inputValue2 = document.getElementById("EDITulinput2").value + " ";
        var inputValue3 = document.getElementById("EDITulinput3").value + " ";

        // i made 1 span per input
        var span1 = document.createElement("SPAN");
        var span2 = document.createElement("SPAN");
        var span3 = document.createElement("SPAN");

        var text1 = document.createTextNode(inputValue1);
        var text2 = document.createTextNode(inputValue2);
        var text3 = document.createTextNode(inputValue3);
       
        span1.appendChild(text1);
        span2.appendChild(text2);
        span3.appendChild(text3);

        var bigspan = document.createElement("SPAN");

        bigspan.appendChild(span1);
        bigspan.appendChild(span2);
        bigspan.appendChild(span3);

        li.appendChild(bigspan);

        if (inputValue1 === ' ' && inputValue2 === ' ' && inputValue3 === ' ') {
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
        var spanContainer = document.createElement("SPAN");
        var text = document.createTextNode(inputValue);

        spanContainer.appendChild(text);

        li.appendChild(spanContainer);
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
        for (var i = 0; i < close2.length; i++) {
            close2[i].onclick = function() {
            var div = this.parentElement;
            div.remove();
            }
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
    
    $("#EDITthumbnail").change(function() {
        showEditPreview(this);
    });

/* -------------------------------------------------- SearchPage.hbs -------------------------------------------------- */

    if(window.location.href.includes("search")){
        $('.post_preview-container').hide();
        $('.profile-container').hide();

        if (localStorage.getItem('isGuest') == 0){
            $('#accProfile').addClass("disabled")
            $('#create').hide()
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
            var name = "Username"
            var post = "Recipe Post Title"

            var searchThing= $('.search_bar option:selected').text()
            var searchString = $('#searching').val()
            
            
            if(searchString == "") {
                console.log("Searching String is empty")
                return false;
            }
            if($('.search_bar option:selected').text() == "Search by..."){
                console.log("No valid option chosen")
                return false;
            }
            
            if ($("#searchList").children().length > 0)
            {
                $("#searchList").empty();
            }
            
            var something = {
                searchingFor: searchString
            }

            if(post == searchThing)
            {
                console.log("Searching for post " + searchString);
                $.post("find-post", something, function (data, status) {
                    if(data.success){
                        var parent = $("#searchList");
                        
                        data.posts.forEach((item, i) => {
                            console.log(item);
                            createPostDiv(item, parent);
                        });
                    }
                    else {
                        var text = document.createElement('p');
                        var container = $("#searchList")
                        $(text).text("Sorry, this post cannot be found");
                        $(text).css("text-align", "center");
                        container.append(text)
                    }
                });
            }
            
            

            if(name == searchThing)
            {
                console.log("Searching for user " + searchString);
                $.post("find-account", something, function (data, status) {
                    if(data.success){
                        var parent = $("#searchList");

                        data.users.forEach((item, i) => {
                            addprofilediv(item, parent);
                        });
                    }
                    else{
                        var text = document.createElement('p');
                        var container = $("#searchList")
                        $(text).text("Sorry, this account cannot be found");
                        $(text).css("text-align", "center");
                        container.append(text)
                    }
                       
                });
            }
    
            
        })

    }

});