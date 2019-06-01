require("dotenv").config();
let keys = require("./keys.js");
let fs = require("fs");
let spotify = require("node-spotify-api");
let moment = require("moment.js");
let request = require("request");

let spotify = new Spotify(keys.spotify);

let commands = process.argv[2]
let search = process.argv.slice(3).join(" ");

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

    let bandQuery = process.argv.slice(3).join(",")

    let urlQuery = "https://rest.bandsintown.com/artist/" + bandQuery + "/events?app_id=codingbootcamp";

    request(urlQuery, function (error, response, body) {

        if (error && response.statusCode === 200) {

            let concertData = JSON.parse(body);

            let momentDT = moment().format("L");

            console.log("==========================");

            console.log("Venue:" + concertData[0], venue.name + "\nLocation:" + concertData[0].venue.city + "," + concertData[0].venue.country + "\nDate:" + momentDT + "\n========================");
        };
    });
};


function spotifyThis() {

    let musicSearch = process.argv.slice(3).join(",");

    if (musicSearch === undefined || null) {

        musicSearch = "The Sign - Ace of Base";
    }

    spotify.search({ type: "track", query: musicSearch }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++) {

                let musicQuery = data.tracks.items[i];
                console.log("====================")

                console.log("Artist: " + musicQuery.artist[0].name +

                    "\nSong : " + musicQuery.name +

                    "\nLink to Song: " + musicQuery.preview_url +

                    "\nAlbum Name: " + musicQuery.album.name +
                    "\n=====================");
            }
        };
    });
};

function movieThis() {

    let movieQuery = process.argv.slice(3).join(",");

    if (movieQuery === undefined || null) {

        movieQuery = "My. Nobody";
    }

    let urlQuery = "https://www.omdbapi.com/?i=" + movieQuery + "tt3896198&apikey=b62ff96d";

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var movieData = JSON.parse(body);


            console.log("===============================");

            console.log("Movie Title: " + movieData.Title +

                "\nYear: " + movieData.released +

                "\nIMDB Rating: " + movieData.imdbRating +

                "\nRotten Tomatoes Rating: " + movieData.tomatoeRating +

                "\nCountry: " + movieData.Country +

                "\nLanguage: " + movieData.Language +

                "\nPlot: " + movieData.Plot +

                "\nActors & Actresses: " + movieData.Actors +
                "\n===============================");

        };
    });
}

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
        let randomText = data.split(",");

        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}

ask(command, input);

