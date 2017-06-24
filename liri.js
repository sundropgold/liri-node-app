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

// get request package
var request = require('request');

// declare log text file
var textFile = "log.txt";

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

// get twitter user orangetxt
var params = {screen_name: 'orangetxt'};

// SPOTIFY ------------------------------------------- //

var spotify = new Spotify({
	id: spotifyClientID,
	secret: spotifyClientSecret
});

// OMDB ------------------------------------------- //

var OMDBKey = "40e9cece";

// PROMPT FOR COMMAND ------------------------------------------- //

// - - - - - from command line
if (process.argv[2] != null || process.argv[2] != "") {
	
	// get the command
	var command = process.argv[2];

	// get the media
	var media = process.argv.splice(3).join(" ");

	// add command and media to file
	fs.appendFile(textFile, "\nCommand: " + command + "\nMedia: " + media, function(err){

		if (err) {
			console.log(err);
		}
	});

	// functions for chosen command


	// FUNCTION FOR COMMANDS ------------------------------------------- //

	if (command === "my-tweets") {

		twitterCommand(command);
	}

	else if (command === "spotify-this-song") {

		if (media == "" || media == null) {
			// default song is Careless Whisper
			media = "Careless Whisper";

			fs.appendFile(textFile, "\nDefault Media: " + media, function(err) {
				// append to log.txt
				if (err) {
					console.log(err);
				}
			});
		}

		spotifyCommand(command, media);
	}

	else if (command === "movie-this") {

		if (media == "" || media == null) {
			// default movie is Shrek
			media = "Shrek";

			fs.appendFile(textFile, "\nDefault Media: " + media, function(err) {
				// append to log.txt
				if (err) {
					console.log(err);
				}
			});
		}

		movieCommand(command, media);
	}

	else if (command === "do-what-it-says") {

		var instructions = process.argv;

		doWhatCommand(instructions);

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
		// get the users's timeline

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

				// append to log.txt
				fs.appendFile(textFile, "\n===============================" +
					"\n \n \nTweets By: " + tweets[i].user.screen_name + 
				"\nTweet Created: " + tweets[i].created_at + 
				"\nTweets: " + tweets[i].text + "\n\n", function(err){

					if (err) {
						console.log(err);
					}
				});
			}

		}
	});	
		
}

function spotifyCommand(yourCommand, yourSong) {

	spotify
		.search({type:'track', query: yourSong, limit: 1}, function(err, response){
			// search for a spotify song

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

				// append to log.txt
				fs.appendFile(textFile, "\n===============================" +
					"\n\n\nSong Title: " + response.tracks.items[0].name + 
					"\nArtist: " + response.tracks.items[0].artists[0].name +
					"\nAlbum: " + response.tracks.items[0].album.name +
					"\nSong Preview: " + response.tracks.items[0].preview_url +
					"\n\n", function(err){

						if (err) {
							console.log(err);
						}
				});
			}
		});
}
	
function movieCommand(yourCommand, yourMovie) {

	// construct url for omdb movie search
	var queryURL = "https://www.omdbapi.com?apikey=" + OMDBKey + "&t=" + media + "&tomatoes=true";

	request(queryURL, function(error, response, body) {

		if (!error && response.statusCode == 200) {

			var info = JSON.parse(body);

			console.log("===============================");
			console.log("");
			console.log("");
			console.log("Title: " + info.Title);
			console.log("Release Year: " + info.Year);
			console.log("IMDB Rating: " + info.imdbRating);
			console.log("Country of Production: " + info.Country);
			console.log("Language of the Movie: " + info.Language);
			console.log("Movie Plot: " + info.Plot);
			console.log("Movie Actors: " + info.Actors);
			console.log("Rotten Tomatoes URL: "  + info.tomatoURL);
			console.log("");
			console.log("");

			fs.appendFile(textFile, "\n===============================" +
				"\n\n\nTitle: " + info.Title +
				"\nRelease Year: " + info.Year +
				"\nIMDB Rating: " + info.imdbRating +
				"\nCountry of Production: " + info.Country +
				"\nLanguage of the Movie: " + info.Language +
				"\nMovie Plot: " + info.Plot +
				"\nMovie Actors: " + info.Actors +
				"\nRotten Tomatoes URL: " + info.tomatoURL +
				"\n\n", function(err){

					if (err) {
						console.log(err);
					}
				});
			
		}
	});
}

function doWhatCommand(yourInstructions) {

	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		else {
			// splits the command in the file based on the comma and space
			var data = data.split(", ");

			command = data[0];
			media = data[1];

			if (command === "my-tweets") {

				twitterCommand(command);

			}

			else if (command === "spotify-this-song") {

				spotifyCommand(command, media);
			}

			else if (command === "movie-this") {

				movieCommand(command, media);

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
	});


}