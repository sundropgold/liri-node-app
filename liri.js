// PACKAGES ------------------------------------------- // 

// fs is a core node package for reading, writing, appending to files
var fs = require("fs");

// get the keys for the APIs
var keys = require("./keys.js");

// get npm inquirer
var inquirer = require("inquirer");

// get twitter package
var Twitter = require("twitter");

// KEYS ------------------------------------------- //

// the code to grab the data from keys.js
var twitterConsumerKey = keys.twitterKeys.consumer_key;
console.log("twitterConsumerKey: " + twitterConsumerKey);

var twitterConsumerSecret = keys.twitterKeys.consumer_secret;
console.log("twitterConsumerSecret: " + twitterConsumerSecret);

var twitterAccessTokenKey = keys.twitterKeys.access_token_key;
console.log("twitterAccessTokenKey: " + twitterAccessTokenKey);

var twitterAccessTokenSecret = keys.twitterKeys.access_token_secret;
console.log("twitterAccessTokenSecret: " + twitterAccessTokenSecret);

// TWITTER CLIENT ------------------------------------------- //

var client = new Twitter({
	consumer_key: twitterConsumerKey,
	consumer_secret: twitterConsumerSecret,
	access_token_key: twitterAccessTokenKey,
	access_token_secret: twitterAccessTokenSecret
});

var params = {screen_name: 'orangetxt'};

// PROMPT FOR COMMAND ------------------------------------------- //

// - - - - - from list of prompts using inquirer
/*inquirer.prompt([

	// if no argument entered, then provide list to choose from
	{
		type:"list",
		message:"Pick a command. ",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
		name: "command"
	}

	]).then(function(user){

		// function for chosen command
	});
*/

// - - - - - from command line
var command = process.argv.splice(2).join(" ");
console.log("command: " + command);

// function for chosen command
doThisCommand(command);

// FUNCTION FOR COMMANDS ------------------------------------------- //

function doThisCommand(yourCommand) {

	if (yourCommand === "my-tweets") {

		client.get('statuses/user_timeline', params, function(error, tweets, response) {

			if (error) {
				console.log(error);
			}

			else {

				// show last 20 tweets & when they were created

				for (var i in tweets) {

					if (i < 21) {
					console.log("");
					console.log("");
					console.log("");
					console.log("Tweets By: " + tweets[i].user.screen_name);
					console.log("Tweet Created: " + tweets[i].created_at);
					console.log("Tweets: " + tweets[i].text);
					}
				}

			}
		});	
	}

	else if (yourCommand === "spotify-this-song") {

	}

	else if (yourCommand === "movie-this") {

	}

	else if (yourCommand === "do-what-it-says") {

	}

	else {
		console.log("That option is unavailable. Please try again.");
	}


}