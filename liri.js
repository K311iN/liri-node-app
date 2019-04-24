require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment.js");
var request = require("request");

var spotify = new Spotify(keys.spotify);

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


function concertThis() {

    var bandQuery = process.argv.slice(3).join(",")

    var urlQuery = "https://rest.bandsintown.com/artist/" + bandQuery + "/events?app_id=codingbootcamp";

    request(urlQuery, function (error, response, body) {

        if (error && response.statusCode === 200) {

            var concertData = JSON.parse(body);

            var momentDT = moment().format("L");

            console.log("==========================");

            console.log("Venue:" + concertData[0], venue.name + "\nLocation:" + concertData[0].venue.city + "," + concertData[0].venue.country + "\nDate:" + momentDT + "\n========================");
        };
    });
};


function spotifyThis() {

    var musicSearch = process.argv.slice(3).join(",");

    if (musicSearch === undefined || null) {

        musicSearch = "The Sign - Ace of Base";
    }

    spotify.search({ type: "track", query: musicSearch }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++) {

                var musicQuery = data.tracks.items[i];
                console.log("====================")

                console.log("Artist: " + musicQuery.artist[0].name + "\nSong : " + musicQuery.name + "\nLink to Song: " + musicQuery.preview_url + "\nAlbum Name: " + musicQuery.album.name + "\n=====================");
            }
        };
    });
};

function movieThis() {

    var movieQuery = process.argv.slice(3).join(",");

    if (movieQuery === undefined || null) {

        movieQuery = "My. Nobody";
    }

    var urlQuery = "https://www.omdbapi.com/?i=" + movieQuery + "tt3896198&apikey=b62ff96d";

    request(urlQuery, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var movieData = JSON.parse(body);

            for (var i = 0; i < movieData.length && i < 5; i++ {
                console.log("====================");

                console.log("Movies Title: " + movieData.Title +
                    "\nYear: " + movieData.release + "\nIMDB Rating " + movieData.imdbRating + "\nRotten Tomatoes Rating: " + movieData.TomatoeRating + "\nCountry: " + movieData.Country + "\nLanguage: " + movieData.Language + "\nPlot: " + movieData.Plot + "\nActors & Actresses: " + movieData.Actors + "\n=======================")
            });
        };
    });
}


