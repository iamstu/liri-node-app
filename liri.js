require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");

var spotify = keys.spotify;


if (process.argv[2] === "my-tweets") {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'KingslyBrad'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 19; i >=0; i--){
        console.log(tweets[i].text);
        // console.log(JSON.stringify(response, null, 2));
        }  
    }
    });
}
