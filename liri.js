//for "dotenv"
require("dotenv").config();
// Require Node Packages for Liri.js 
var fs = require("fs");
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

console.log("inside liri js");


var spotify = new Spotify({
	id: '46980b891f07453aa34cabaf90141a04',
	secret: '8dc4dfad7362455c9e35c211c4b61f68'
});

// var keys 	= require('./keys.js');

var nodeArgs = process.argv;

var liriCommand = process.argv[2];

var liriArg = '';
for(var i=3; i<nodeArgs.length; i++){
	liriArg += nodeArgs[i] + '';
}

// function retrieveTweets(){
// 	fs.appendFile('./log.txt', 'User Command: node liri.js my-tweets\n\n', (err) => {
// 		if(err) throw err;
	// });

// 	// var client = new Twitter(keys);
// 	// var params = {screen_name: 'Jaymar_14', count: 20};

// 	// client.get('statuses/user_timeline', params, function(error,tweets,response){
// 	// 	console.log('Tweets: ' + response);
// 	// 	console.log(tweets);
// 	// 	if(error){
// 	// 		var errorStr = 'ERROR: retrieving user tweets -- ' + error;
// 	// 		fs.appendFile('./log.txt', errorStr,(err) => {
// 	// 			if(err) throw err;
// 	// 			console.log(errorStr);
// 	// 		});
// 	// 		return;
// 	// 	} else {
// 	// 		var outputStr = '--------------\n' +
// 	// 									'User Tweets:\n' +
// 	// 										'----------------\n\n';
// 	// 		for(var i=0; i<tweetsLength; i++){
// 	// 			outputStr += 'Created on: ' + tweets[i].created_at + '\n' + 
// 	// 											'Tweets: ' + tweets[i].text + '\n' +
// 	// 											'-------------------------\n';

// 	// 		}
// 			fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n',(err) => {
// 				if(err) throw err;
// 				console.log(outputStr);
// 			});

// 		}
// 	});
// }

function spotifySong(song){

			fs.appendFile('./log.txt', 'User Command: node liri.js spotify-this-song' + song + '\n\n', (err) => {
    //If no song is provided then your program will default to "The Sign" by Ace of Base.
        if(err) throw err;
			});
			var search;
			if(song === ''){
				search = 'The Sign ace of base';
			} else {
				search = song;
			}

			spotify.search({ type: 'track', query: search}, function(error, data){
				if(error) {
					var errorStr1 = 'ERROR: Retrieving Spotify track -- ' + error;
					fs.appendFile('./log.txt', errorStr1, (err) => {
						if(err) throw err;
						console.log(errorStr1);
					});
					return;
				} else{
					var songInfo = data.tracks.items[0];
					if(!songinfo){
						var errorStr2 = 'ERROR: No song info retrieved';
						fs.appendFile('./log.txt', errorStr2, (err) => {
							if(err) throw err;
							console.log(errorStr2);
						});
						return;
					} else {
						var outputStr = '--------------\n'+
													'Song Information:\n' +
													'---------------------\n\n'+
													'Song Name: ' + songInfo.name + '\n'+
													'Artist: ' + songInfo.artist[0].name+ '\n'+
													'Album: ' + songInfo.album.name+ '\n' +
													'Preview Here: ' + songInfo.preview_url + '\n';

						fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr +'\n', (err) => {
							if(err) throw err;
							console.log(outputStr);
						});
					}
				}
			});
		}

	function retrieveOMDBInfo(movie) {
	// Append the command to the log.txt file
	fs.appendFile('./log.txt', 'User Command: node liri.js movie-this ' + movie + '\n\n', (err) => {
		if (err) throw err;
	});

	// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	var search;
	if (movie === '') {
		search = 'Mr. Nobody';
	} else {
		search = movie;
	}
	// Construct the query url and send request to omdb
  request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		if ( error || (response.statusCode !== 200) ) {
      // if (!error && response.statusCode === 200) {
			var errorStr1 = 'ERROR: Retrieving OMDB entry -- ' + error;

			// Append the error string to the log.txt file
			fs.appendFile('./log.txt', errorStr1, (err) => {
				if (err) throw err;
				console.log(errorStr1);
			});
			return;
		} else {
			var data = JSON.parse(body);
			if (!data.Title && !data.Released && !data.imdbRating) {
				var errorStr2 = 'ERROR: No movie info retrieved!';

				// Append the error string to the log.txt file
				fs.appendFile('./log.txt', errorStr2, (err) => {
					if (err) throw err;
					console.log(errorStr2);
				});
				return;
			} else {
		    	// Print the movie information
		    	var outputStr = '------------------------\n' + 
								'Movie Information:\n' + 
								'------------------------\n\n' +
								'Movie Title: ' + data.Title + '\n' + 
								'Year Released: ' + data.Released + '\n' +
								'IMBD Rating: ' + data.imdbRating + '\n' +
								'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
								'Country Produced: ' + data.Country + '\n' +
								'Language: ' + data.Language + '\n' +
								'Plot: ' + data.Plot + '\n' +
								'Actors: ' + data.Actors + '\n'; 
								

				// Append the output to the log.txt file
				fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
					if (err) throw err;
					console.log(outputStr);
				});
			}
		}
	});
}

// Determine the desired command
function doAsTheySay() {
	// Append the command to the log.txt file
	fs.appendFile('./log.txt', 'User Command: node liri.js do-what-it-says\n\n', (err) => {
		if (err) throw err;
	});

	// Read in the file containing the command
	fs.readFile('./random.txt', 'utf8', function (error, data) {
		if (error) {
			console.log('ERROR: Reading random.txt -- ' + error);
			return;
		} else {
			// Split out the command name and the parameter name
			var cmdString = data.split(',');
			var command = cmdString[0].trim();
			var param = cmdString[1].trim();

			switch(command) {
			// 	case 'my-tweets':
			// 		retrieveTweets(); 
			// 		break;

				case 'spotify-this-song':
					spotifySong(param);
					break;

				case 'movie-this':
					retrieveOMDBInfo(param);
					break;
			}
		}
	});
}

// Determine which LIRI command is being requested
// if (liriCommand === 'my-tweets') {
// 	retrieveTweets(); 

if (liriCommand === `spotify-this-song`) {
	spotifySong(liriArg);

} else if (liriCommand === `movie-this`) {
	retrieveOMDBInfo(liriArg);

} else if (liriCommand ===  `do-what-it-says`) {
	doAsTheySay();

} else {
	// Append the command to the log file
	fs.appendFile('./log.txt', 'User Command: ' + nodeArgs + '\n', (err) => {
		if (err) throw err;

		// If the user types in a command that LIRI does not recognize, output the Usage menu 
		// which lists the available commands.
		outputStr = 'Commands:\n' +  
				   '    node liri.js spotify-this-song "<song_name>"\n' + 
				   '    node liri.js movie-this "<movie_name>"\n' + 
				   '    node liri.js do-what-it-says\n';

		// Append the output to the log.txt file
		fs.appendFile('./log.txt', 'LIRI Response:\n\n' + outputStr + '\n', (err) => {
			if (err) throw err;
			console.log(outputStr);
		});
	});
}	