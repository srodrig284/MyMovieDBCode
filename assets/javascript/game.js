var actors1 = [];

var actors1id = [];

var actors1pic = [];

var actors2 = [];

var actors2id = [];

var actors2pic = [];

var matches;

var matchesIDs = [];

var matchesPics = [];

var length1 = 0;

// Pre image URL = https://image.tmdb.org/t/p/w1280/<<poster_path>>

var autofillData = [];

var newActorArray = [];

var mediaType1;

var mediaType2;

var myLength1;
var myLength2;


$(function() {

    var input1 = document.getElementById("movie-1-input");

    new Awesomplete(input1, {
        list: []
    });

    var awesomplete = new Awesomplete(input1);

    var input2 = document.getElementById("movie-2-input");

    new Awesomplete(input2, {
        list: []
    });

    var awesomplete2 = new Awesomplete(input2);

    $("#movie-1-input").keyup(function(event) {


        if (event.keyCode === 13 && $("#movie-2-input").val()) {
            $("#submitButton").click();
        }
    });

    $("#movie-1-input").keyup(function(event) {



        if (event.keyCode > 40) {

            if (($("#movie-1-input").val()).length > 3) {

                autofillRequest($("#movie-1-input").val());

            }
        }
    });

    $("#movie-2-input").keyup(function(event) {
        if (event.keyCode === 13 && $("#movie-2-input").val()) {
            $("#submitButton").click();
        }
    });

    $("#movie-2-input").keyup(function(event) {
        if (event.keyCode > 40) {

            if (($("#movie-2-input").val()).length > 3) {

                autofillRequest($("#movie-2-input").val());

            }
        }
    });

    actors1 = [];

    actors1id = [];

    actors1pic = [];

    actors2 = [];

    actors2id = [];

    actors2pic = [];

    matches = [];

    matchesIDs = [];

    matchesPics = [];

    // var movie1 = $("#movie-1-input").val();
    // var movie2 = $("#movie-2-input").val();

    //	tvURL1 = "https://api.themoviedb.org/3/search/tv?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query="+movie1+"&page=1"
    //	tvURL2 = "https://api.themoviedb.org/3/search/tv?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query="+movie2+"&page=1"




    $("#submitButton").on("click", function(e) {

        e.preventDefault();

        var Dmovie1 = $("#movie-1-input").val();
        var Dmovie2 = $("#movie-2-input").val();

        var Pmovie1 = $("#movie-1-input").val();
        var Pmovie2 = $("#movie-2-input").val();

        var Mediamatch1 = Pmovie1.match(/\[(.*?)\]/);

        if (Mediamatch1) {
            var mediaSubmatch1 = Mediamatch1[1];
        }

        var Mediamatch2 = Pmovie2.match(/\[(.*?)\]/);

        if (Mediamatch2) {
            var mediaSubmatch2 = Mediamatch2[1];
        }


        $("#movie-1-input").val(Dmovie1.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^\]]*]/, ''));
        $("#movie-2-input").val(Dmovie2.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^\]]*]/, ''));

        mediaType1 = mediaSubmatch1;
        mediaType2 = mediaSubmatch2;


        var movie1 = $("#movie-1-input").val();
        var movie2 = $("#movie-2-input").val();

        // console.log(movie1);
        // console.log(movie2);

        var movieRequest = "";

        betterURL1 = "https://api.themoviedb.org/3/search/movie?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query=" + movie1 + "&page=1&include_adult=false";

        betterURL2 = "https://api.themoviedb.org/3/search/movie?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query=" + movie2 + "&page=1&include_adult=false";

        betterURL1tv = "https://api.themoviedb.org/3/search/tv?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query=" + movie1 + "&page=1";
        betterURL2tv = "https://api.themoviedb.org/3/search/tv?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query=" + movie2 + "&page=1";
        
        //this is the ajax call on the FIRST input if mediaType1 = "movie"


    if (mediaType1 === "movie") {    

        $.ajax({
            url: betterURL1,
            method: "GET"
        }).done(function(response) {

            // console.log(response);
            // console.log(response.results[0].title);


            movieID1 = (response.results[0].id);
            movieName1 = (response.results[0].title);

            movieRequest1 = "https://api.themoviedb.org/3/movie/" + movieID1 + "/credits?api_key=f1cae2ff0d4dc888acf52ab3335afd83";


            $.ajax({
                url: movieRequest1,
                method: "GET"
            }).done(function(response) {
                // console.log(response);

                actors1 = [];

                actors1id = [];

                actors1pic = [];

                for (var i = 0; i < (response.cast).length; i++) {
                    actors1.push(response.cast[i].name);
                    actors1id.push(response.cast[i].id);
                    actors1pic.push(response.cast[i].profile_path);
                }



                // console.log(actors1);


                getMatch(actors1, actors2);
            	});

        });

    };    

        //this is the ajax call on the SECOND input if mediaType2 = "movie"

    if (mediaType2 === "movie") {
        $.ajax({
            url: betterURL2,
            method: "GET"
        }).done(function(response) {

            // console.log(response.results[0].title);
            // console.log(response);



            movieID2 = (response.results[0].id);
            movieName2 = (response.results[0].title);

            movieRequest2 = "https://api.themoviedb.org/3/movie/" + movieID2 + "/credits?api_key=f1cae2ff0d4dc888acf52ab3335afd83";


            $.ajax({
                url: movieRequest2,
                method: "GET"
            }).done(function(response) {
                // console.log(response);

                actors2 = [];

                actors2id = [];

                actors2pic = [];

                for (var i = 0; i < (response.cast).length; i++) {
                    actors2.push(response.cast[i].name);
                    actors2id.push(response.cast[i].id);
                    actors2pic.push(response.cast[i].profile_path);
                }



                // console.log(actors2);


                getMatch(actors1, actors2);

            });

        });

    }; 

        //this is the ajax call on the FIRST input if mediaType1 = "tv"
    
    if (mediaType1 === "tv") {
         $.ajax({
            url: betterURL1tv,
            method: "GET"
        }).done(function(response) {


            // console.log("our first tv show is " + response.results[0].name);
            // console.log(response.results[0].id)


            TVID1 = (response.results[0].id);
            TVName1 = (response.results[0].name);

            TVRequest1 = "https://api.themoviedb.org/3/tv/" + TVID1 + "/credits?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US";


            $.ajax({
                url: TVRequest1,
                method: "GET"
            }).done(function(response) {
                // console.log(response);


                actors1 = [];

                actors1id = [];

                actors1pic = [];

                for (var i = 0; i < (response.cast).length; i++) {
                    actors1.push(response.cast[i].name);
                    actors1id.push(response.cast[i].id);
                    actors1pic.push(response.cast[i].profile_path);
                }



                // console.log(actors1);


                getMatch(actors1, actors2);
            });

        });

    };

        //this is the ajax call on the FIRST input if mediaType2 = "tv"
    if (mediaType2 === "tv") {
        $.ajax({
            url: betterURL2tv,
            method: "GET"
        }).done(function(response) {


            // console.log(response.results[0].name);
            // console.log(response.results[0].id)


            TVID2 = (response.results[0].id);
            TVName2 = (response.results[0].name);

            TVRequest2 = "https://api.themoviedb.org/3/tv/" + TVID2 + "/credits?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US";


            $.ajax({
                url: TVRequest2,
                method: "GET"
            }).done(function(response) {
                // console.log(response);


                actors2 = [];

                actors2id = [];

                actors2pic = [];

                for (var i = 0; i < (response.cast).length; i++) {
                    actors2.push(response.cast[i].name);
                    actors2id.push(response.cast[i].id);
                    actors2pic.push(response.cast[i].profile_path);
                }



                // console.log(actors2);


                getMatch(actors1, actors2);

            });

        });
    };
	

    });

 


    function getMatch(a, b) {
        matches = [];
        matchesIDs = [];
        matchesPics = [];

        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i] === b[e]) matches.push(a[i]);
            }
        }


        // console.log(matches)
        for (var i = 0; i < matches.length; i++) {

            var hitSpot = actors1.indexOf(matches[i]);


        }


        getMatchP2(actors1, actors2);


    }

    function getMatchP2(a, b) {
        matches = [];
        matchesIDs = [];
        matchesPics = [];

        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i] === b[e]) matches.push(a[i]);
            }
        }


        // console.log(matches)

        newActorArray = [];

        $("#response").html('<div id="response"></div>'); 

        for (var i = 0; i < matches.length; i++) {

            var hitSpot = actors1.indexOf(matches[i]);
            
  

            matchesPics.push(actors1pic[hitSpot]);

            matchesIDs.push(actors1id[hitSpot]);


            newActorArray.push({
                name: matches[i],
                id: actors1id[hitSpot],
                profile_path: actors1pic[hitSpot]
            })

            // console.log(matches);
            // console.log(matchesIDs);
            // console.log(matchesPics);

            makeButtons();

        }


    }



    function autofillRequest(parameter) {




        // console.log("searching");

        //var parameter1 = $('#movie-1-input').val() ;

        var mySearch = "https://api.themoviedb.org/3/search/multi?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US&query=" + parameter + "&page=1&include_adult=false";



        $.ajax({
            url: mySearch,
            method: "GET"
        }).done(function(response) {

            // console.log(response);

            autofillData = [];

            for (var i = 0; i < (response.results).length; i++) {

                if (response.results[i].media_type) {

                    if (response.results[i].media_type === "tv" && response.results[i].poster_path) {

                        // console.log(response.results[i].id + " : " + response.results[i].name + " : " + response.results[i].first_air_date + " : " + response.results[i].media_type +
                        //     " : " + response.results[i].poster_path);

                        autofillData.push(response.results[i].name + " (" + response.results[i].first_air_date + ")" +
                            " [" + response.results[i].media_type + "]");



                    } else if (response.results[i].media_type && response.results[i].media_type === "movie" && response.results[i].poster_path) {

                        // console.log(response.results[i].id + " : " + response.results[i].title + " : " + response.results[i].release_date + " : " + response.results[i].media_type +
                        //     " : " + response.results[i].poster_path);

                        autofillData.push(response.results[i].title + " (" + response.results[i].release_date + ")" + " [" + response.results[i].media_type + "]");
                    }

                }

            }



            // console.log(autofillData);




            myList = autofillData;

            awesomplete.list = autofillData;

            awesomplete2.list = autofillData;

            // Show label but insert value into the input:




        });

    }


    // Go to actor's wikipedia page
    function getWiki(actorName) {
        // get input and replace spaces with %20
        var actorNameModified = actorName.replace(/ /g, "%20");

        if (actorNameModified) {

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

            $.ajax(settings).done(function(response) {
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
                } else {
                    //$("#errorResponse").html("No Wikipedia found.");
                    return; // add error here
                }
            });
        } else {
            return;
        }
    }

    // Create the list of actors
    function makeButtons() {


        $("#response").html('<div id="response"></div>');

        var actorArray = newActorArray;

        var path = "";

        $.each(actorArray, function(k, value) {
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
                .on('click', function(event) {
                    event.preventDefault();
                    displayModal($(this).attr('actor-id'));
                });


            $("#response")
                .append($wrapper);

        });


    } // END function makeButtons



    // this is for testing purposes only
    // $("#testButton").on("click", function (e) {
    //     makeButtons();
    // });


    // When actor is clicked, get the actors information and display modal
      function displayModal(searchId) {
        $(".bio-pic-area").empty();
        $('#myModal').modal('show');

        var queryUrl = "https://api.themoviedb.org/3/person/" + searchId + "?api_key=f1cae2ff0d4dc888acf52ab3335afd83&language=en-US";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {

            //console.log(response.biography);

            $(".modal-title").text(response.name + "'s Biography");

            path = response.profile_path;
            var imageUrl = "https://image.tmdb.org/t/p/w500" + path;
            $('<img>')
                .addClass("media-object bio-pic")
                .attr("src", imageUrl)
                .appendTo(".bio-pic-area");


            if (response.biography) {
                json_data = JSON.stringify(response.biography);
                $(".media-body > .bio")
                    .text(json_data)
                    .show();
            } else {
                $(".media-body > .bio").text("Sorry, actor doesn't have a TMDB Bio.");
            }


            if (response.birthday) {
                json_data = JSON.stringify(response.birthday);
                $("#dob")
                    .text('Date of Birth: ' + json_data)
                    .show();
            } else {
                $("#dob").hide();
            }


            if (response.place_of_birth) {
                json_data = JSON.stringify(response.place_of_birth);
                $("#birth-place")
                    .text('Birthplace: ' + json_data)
                    .show();

            } else {
                $("#birth-place").hide();
            }

            $("#homepage").empty();
            if (response.homepage) {
                json_data = JSON.stringify(response.homepage);
                $("#homepage")
                    .text(response.name + "'s Homepage")
                    .attr("href", response.homepage)
                    .show();
            } else { // hide the button
                $("#homepage").hide();
            }

            $("#goto-wiki")
                .html(response.name + "'s Wikipedia Page")
                .unbind( "click" )
                .on('click', function(event) {
                    event.preventDefault();
                    getWiki(response.name);
                });

        });
    }




var shine = new shinejs.Shine(document.getElementById('shine'));
 
 

function update() {
        window.requestAnimationFrame(update);
        var time = new Date().getTime();
        var speed = 0.00025;  // 1 = 1000 rotations/s
        var phase = time * speed * 2.0 * Math.PI;
        var radiusX = window.innerWidth * 0.5;
        var radiusY = window.innerHeight * 0.5;
        shine.light.position.x = radiusX + radiusX * Math.cos(phase);
        shine.light.position.y = radiusY + radiusY * Math.sin(phase * 0.1);
        shine.draw();
      }

      update();

$('carousel').carousel();


});