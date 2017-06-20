// PACKAGES ------------------------------------------- // 

// fs is a core node package for reading, writing, appending to files
var fs = require("fs");

// get the keys for the APIs
var keys = require("./keys.js");

// get npm inquirer
//var inquirer = require("inquirer");

// get twitter package
var Twitter = require("twitter");

// get spotify package
var Spotify = require('node-spotify-api');

// KEYS ------------------------------------------- //

// the code to grab the data from keys.js
var twitterConsumerKey = keys.twitterKeys.consumer_key;
var twitterConsumerSecret = keys.twitterKeys.consumer_secret;
var twitterAccessTokenKey = keys.twitterKeys.access_token_key;
var twitterAccessTokenSecret = keys.twitterKeys.access_token_secret;

var spotifyClientID = keys.spotifyKeys.client_id;
var spotifyClientSecret = keys.spotifyKeys.client_secret;
// TWITTER CLIENT ------------------------------------------- //

var client = new Twitter({
	consumer_key: twitterConsumerKey,
	consumer_secret: twitterConsumerSecret,
	access_token_key: twitterAccessTokenKey,
	access_token_secret: twitterAccessTokenSecret
});

var params = {screen_name: 'orangetxt'};

// SPOTIFY ------------------------------------------- //

var spotify = new Spotify({
	id: spotifyClientID,
	secret: spotifyClientSecret
});

// PROMPT FOR COMMAND ------------------------------------------- //

// - - - - - from command line
if (process.argv[2] != null || process.argv[2] != "") {
	var command = process.argv[2];
	console.log("command: " + command);

	var media = process.argv.splice(3).join(" ");
	console.log("media: " + media);

	// functions for chosen command


	// FUNCTION FOR COMMANDS ------------------------------------------- //

	if (command === "my-tweets") {

		twitterCommand(command);
	}

	else if (command === "spotify-this-song") {

		if (media == "" || media == null) {
			media = "Careless Whisper";
		}

		spotifyCommand(command, media);
	}

	else if (yourCommand === "movie-this") {

		movieCommand(command, media);
	}

	else if (yourCommand === "do-what-it-says") {

		doWhatCommand(command);

	}

	else {
		console.log("That option is unavailable. Please try again and type in a command as your third argument.");
		console.log("Your options are: ");
		console.log("==> 'my-tweets'");
		console.log("==> 'spotify-this-song'");
		console.log("==> 'movie-this'");
		console.log("==> 'do-what-it-says'");
	}

}



function twitterCommand(yourCommand) {

	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (error) {
			console.log(error);
		}

		else {

			// show last 20 tweets & when they were created

			for (var i in tweets) {

				if (i < 21) {
				console.log("===============================");
				console.log("");
				console.log("");
				console.log("Tweets By: " + tweets[i].user.screen_name);
				console.log("Tweet Created: " + tweets[i].created_at);
				console.log("Tweets: " + tweets[i].text);
				console.log("");
				console.log("");
				}
			}

		}
	});	
		
}

function spotifyCommand(yourCommand, yourSong) {

	spotify
		.search({type:'track', query: yourSong, limit: 1}, function(err, response){

			if (err) {
				return console.log(err);
			}

			else {

				console.log("===============================");
				console.log("");
				console.log("");
				console.log("Song Title: " + response.tracks.items[0].name);		
				console.log("Artist: " + response.tracks.items[0].artists[0].name);
				console.log("Album: " + response.tracks.items[0].album.name);
				console.log("Song Preview: " + response.tracks.items[0].preview_url);	
				console.log("");
				console.log("");	
			}
		});
}
	
function movieCommand(yourCommand, yourMovie) {

}

function doWhatCommand(yourCommand) {

}