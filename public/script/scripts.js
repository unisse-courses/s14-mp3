$(document).ready(function () {
    console.log("ready test")

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
            
        
    });

});



