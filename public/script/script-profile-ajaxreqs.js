/*$(document).ready(function() {
    $.get('account-profile', function(data, status) {
        var Userlistcontainer = $('#profile-container');
        var activeUser = localStorage.getItem("activeUser");
        console.log(localStorage.getItem("activeUser"))
        //console.log(data)
        data.forEach((item, i) => {
            var result = item.username.localeCompare(activeUser);
            console.log(result);
            if (result == 0)
            {
                //add here
            }
        });
    });
});
*/