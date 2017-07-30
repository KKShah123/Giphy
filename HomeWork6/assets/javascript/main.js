// Araay of players
var players = ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Manuel Neuer", "Zlatan Ibrahimović", "Luis Suárez", "Gareth Bale", "Andrés Iniesta", "Arjen Robben", "Eden Hazard", "Thomas Müller"];

// creates buttons for each of these
function addButtons(){ 
	// deletes the players prior to adding new players so there are no repeat buttons
	$('#searchInput').empty();
	// loops through the players array
	for (var i = 0; i < players.length; i++){
		// dynamically makes buttons for every player in the array
		var a = $('<button>') 
		a.addClass('player'); // add a class
		a.attr('data-name', players[i]); // add a data-attribute
		a.text(players[i]); 
		$("#buttonView").append(a); 
	}
}

// handles addShow button event
$("#addPlayer").on("click", function(){

	// grabs the user show input
	var player = $("#searchInput").val().trim();
	// that input is now added to the array
	players.push(player);
	// the addButtons function is called, which makes buttons for all my players plus the user show
	addButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})



// function to display gifs
function displayGifs(){
	var player = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&limit=10 &api_key=b5a3d30d219d47309bdd2c4f8a905b61";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
					// players the rating on hover
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(showGif)
				// gifDiv.append(p)

				$("#gifsDisplay").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".player", displayGifs);

// initially calls the addButtons function
addButtons();