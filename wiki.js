/**
 * Grapevine Project
 * Sandra Rodriguez
 * 2017 UCF Coding Bootcamp
 */

//Google Search Key - AIzaSyByJ2xR0StP_Name6BNMXY2tIUEc82X4eM
// wikipedia id in google search cx = '010171944163159885044:ommzsavsdkm';
/*
 /*
 <script>
 // for google search
 (function() {
 var cx = '010171944163159885044:ommzsavsdkm';
 var gcse = document.createElement('script');
 gcse.type = 'text/javascript';
 gcse.async = true;
 gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
 var s = document.getElementsByTagName('script')[0];
 s.parentNode.insertBefore(gcse, s);
 })();
 </script>
 <gcse:search></gcse:search>
 */

//$.param({'q': 'beyonce knowles'})
//"q=beyonce%20knowles"

/* var settings = {
 "async": true,
 "crossDomain": true,
 "url": "https://www.googleapis.com/customsearch/v1?q=beyonce%20wikipedia&key=AIzaSyByJ2xR0StP_Name6BNMXY2tIUEc82X4eM&cx=010171944163159885044%3Aommzsavsdkm&fields=items(link)",
 "method": "GET",
 "headers": {
 "cache-control": "no-cache",
 "postman-token": "b6c11dce-ae86-cae6-4184-13f81fb111ae"
 }
 }
 */

// Go to actor's wikipedia page
function getWiki(actorName){
    // get input and replace spaces with %20
    var actorNameModified = actorName.replace(/ /g, "%20");

    if(actorNameModified) {

        queryUrl = "https://www.googleapis.com/customsearch/v1?q=" + actorNameModified + "%20wikipedia&key=AIzaSyByJ2xR0StP_Name6BNMXY2tIUEc82X4eM&cx=010171944163159885044%3Aommzsavsdkm&fields=items(link)";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": queryUrl,
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "5c1085b0-051d-9a1e-b0e7-470c8ef53d8f"
            }
        };

        $.ajax(settings).done(function (response) {
            // check if anything was returned
            if (response.items) {
                // console.log(response);
                // console.log(response.items[0].link);

                var win = window.open(response.items[0].link, '_blank');

                if (win) {
                    //Browser has allowed it to be opened
                    win.focus();
                } else {
                    //Browser has blocked it
                    alert('Please allow popups for this website');
                }
            }
            else {
                //$("#errorResponse").html("No Wikipedia found.");
                return;  // add error here
            }
        });
    }
    else
    {
        return;
    }
}

// Create the list of actors
function makeButtons() {
    var actorArray = [
        {
            name: "Robert Di Niro",
            id: "380",
            profile_path: "/8Bgdfv1oN9Mw0YuMHP6fw8KzDkc.jpg"
        },
        {
            name: "Ray Liotta",
            id: "11477",
            profile_path: "/o4jJSH3sri9dSIJwsCgT4de1535.jpg"
        },
        {
            name: "Catherine Scorsese",
            id: "11483",
            profile_path: "/rXFjIQVimKotQUtXwVNGg7XVMeW.jpg"
        }
    ];

    var path = "";

    $.each(actorArray, function (k, value) {
        path = actorArray[k].profile_path;
        var imageUrl = "https://image.tmdb.org/t/p/w500" + path;


        var mediaDiv = $("<div>")
            .addClass("media media-actors");

        var actorPic = $('<img>')
            .addClass("actor-pic media-object")
            .attr("src", imageUrl);

        var actorName = $("<h2>")
            .addClass("h2-text")
            .html(actorArray[k].name);

        $("<div>")
            .addClass("media-left")
            .append(actorPic)
            .appendTo(mediaDiv);

        $("<div>")
            .addClass("media-body")
            .html(actorName)
            // .addClass("target-click")
            .appendTo(mediaDiv);

        var $wrapper = $("<div>")
            .addClass("actor-wrapper")
            .attr("actor-id", actorArray[k].id)
            .append(mediaDiv)
            .on('click', function(event){
                event.preventDefault();
                displayModal($(this).attr('actor-id'));
            });


        $("#response")
            .append($wrapper);

    });


} // END function makeButtons



// this is for testing purposes only
$("#testButton").on("click", function (e) {
    makeButtons();
});


// When actor is clicked, get the actors information and display modal
function displayModal(searchId){
    $('#myModal').modal('show');

    var queryUrl = "https://api.themoviedb.org/3/person/" + searchId + "?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).done(function (response) {

        //console.log(response.biography);

        $(".modal-title").text(response.name + "'s Biography");

        if(response.biography){
            json_data = JSON.stringify(response.biography);
            $(".modal-body > .bio")
                .text(json_data)
                .show();
        }
        else
        {
            $(".modal-body > .bio").text("Sorry, no biography to display.");
        }


        if(response.birthday){
            json_data = JSON.stringify(response.birthday);
            $("#dob")
                .text('Date of Birth: ' + json_data)
                .show();
        }
        else
        {
            $("#dob").hide();
        }


        if(response.place_of_birth) {
            json_data = JSON.stringify(response.place_of_birth);
            $("#birth-place")
                .text('Birthplace: ' + json_data)
                .show();

        }
        else
        {
            $("#birth-place").hide();
        }

        if(response.homepage) {
            json_data = JSON.stringify(response.homepage);
            $("#homepage")
                .text("Go to " + response.name + "'s homepage")
                .show()
                .on('click', function(event){
                    event.preventDefault();
                    document.location = response.homepage;
                    var win = window.open(response.homepage, '_blank');
                    if (win) {
                        //Browser has allowed it to be opened
                        win.focus();
                    } else {
                        //Browser has blocked it
                        alert('Please allow popups for this website');
                    }
                });
        }
        else
        { // hide the button
            $("#homepage").hide();
        }

        $("#goto-wiki")
            .html("Go to " + response.name + "'s Wikipedia Page")
            .on('click', function(event){
                event.preventDefault();
                getWiki(response.name);
            });

    });
}
