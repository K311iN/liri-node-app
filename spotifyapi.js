require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment.js");
var request = require("request");

var commands = process.argv[2]
var search = process.argv.slice[3].join(",");


function action() {

    switch (command) {

        case "concert-this":
            concertThis();
            break;

        case "spotify-this-song":
            spotifyThis();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default:
            console.log("invalid command");

    }
};




var spotify = new spotify({
    id: "35538a27aa634c858353afa8b39668ba",
    secret: "c0a36849ee0842c4a031e65267834324" 

})

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred:' + err);
    }

    console.log(data);
});