require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var checkTweets = function() {
    var params = {screen_name: 'KingslyBrad'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 19; i >=0; i--){
        console.log(tweets[i].text);
        }  
    }
    });
}

var checkSong = function() {
    var song = "The Sign Ace of Base";
    if (process.argv[3]){
        song = "";
        for ( var i = 3; i < process.argv.length; i++) {
            song += process.argv[i];
            if (i < process.argv.length - 1){
                song += " ";
            }
        }
    }
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
        console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].album.artists[0].external_urls.spotify, null, 2));
        console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
    });
}

var checkMovie = function() {
    var movie = "Mr.Nobody";
    if (process.argv[3]) {
        movie = "";
        for ( var i = 3; i < process.argv.length; i++) {
            movie += process.argv[i];
            if (i < process.argv.length - 1){
                movie += "+";
            }
        }
    }
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).Ratings[0].Value);
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        }
    });
}

var run = function(){
    if (process.argv[2] === "my-tweets") {
       checkTweets();
    }
    
    if (process.argv[2] === "spotify-this-song"){
        checkSong();
    }
    
    if (process.argv[2] === "movie-this"){
        checkMovie();
    };
    };

if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
            var commands= data.split(",");
            if (commands[0] === "my-tweets") {
                checkTweets();
             }
             
             if (commands[0] === "spotify-this-song"){
                 process.argv[3] = commands[1];
                 checkSong();
             }
             
             if (commands[0] === "movie-this"){
                process.argv[3] = commands[1];
                 checkMovie();
             };
            
    })
}
else{
    run();
}


