$(document).ready(function() {
    function fullname(firstname, lastname) {
        return firstname + " " + lastname;
    };

    function userwithatsign(username) {
        return "@" + username;
    };

    function addprofilediv(item, parentdiv) {
        var profrowdiv = document.createElement('div');

        var profcol1 = document.createElement('div');
        var profimage = document.createElement('img');

        var profcol2 = document.createElement('div');

        var rowbet = document.createElement('div');

        var profcol2a = document.createElement('div');
        var Hname = document.createElement('h2');
        var Hfirstname = document.createElement('h2');
        var Hlastname = document.createElement('h2');
        var Pusername = document.createElement('p');

        var profcol2b = document.createElement('div');
        var Bbutton = document.createElement('button');
        
        var profcol2r2 = document.createElement('div');
        var Pbio = document.createElement('p');

        //containers
        $(profrowdiv).addClass('d-flex flex-row card-body profile-row');
        $(profcol1).addClass('full-width-container profile-col1');
        $(profcol2).addClass('profile-col2');
        $(rowbet).addClass('d-flex flex-row justify-content-between profile-col2_row1');
        $(profcol2a).addClass('profile-col2_row1a');
        $(profcol2b).addClass('profile-col2_row1b');
        $(profcol2r2).addClass('profile-col2_row2');
        $(Bbutton).addClass('btn btn-outline-secondary my-2 my-sm-0');
        $(Bbutton).text('Edit Profile');

        //elements
        $(profimage).addClass('img-fluid');
        $(profimage).attr('src', item.profpic);
        $(Hfirstname).text(item.firstname);
        $(Hlastname).text(item.lastname);
        $(Pusername).text(item.username);
        $(Pbio).text(item.bio);


        profcol2r2.append(Pbio);

        profcol2b.append(Bbutton);
        
        Hname.append(fullname(Hfirstname.innerHTML, Hlastname.innerHTML));
        profcol2a.append(Hname);
        profcol2a.append(userwithatsign(Pusername.innerHTML));

        rowbet.append(profcol2a);
        rowbet.append(profcol2b);

        profcol2.append(rowbet);
        profcol2.append(profcol2r2);

        profcol1.append(profimage);

        profrowdiv.append(profcol1);
        profrowdiv.append(profcol2);

        parentdiv.append(profrowdiv);

    }
    
    $.get('getUsers', function(data, status) {
        var Userlistcontainer = $('#profile-container');
        var activeUser = localStorage.getItem("activeUser");
        data.forEach((item, i) => {
            var result = item.username.localeCompare(activeUser);
            console.log(result);
            if (result == 0)
            {
                addprofilediv(item, Userlistcontainer);
            }
        });
    });
});
