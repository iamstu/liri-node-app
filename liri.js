require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
    
    var params = {screen_name: 'KingslyBrad'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 19; i >=0; i--){
        console.log(tweets[i].text);
        }  
    }
    });
}

if (process.argv[2] === "spotify-this-song"){
    var song = "The Sign Ace of Base";
    if (process.argv[3]){
        song = process.argv[3];
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