const HTTP = require("http");
const APP = HTTP.createServer(HTTPServer);
const FS = require("fs");

APP.listen(8005, () => {
    console.clear();
    console.log("[INFO]: Listening at *:8005!");
});

var Sound = 0
var Sounds = [
    JSON.parse(FS.readFileSync("Sounds/Geoxor - Euphoria.json", "utf-8")),
    JSON.parse(FS.readFileSync("Sounds/Geoxor - Moonlight.json", "utf-8")),
    JSON.parse(FS.readFileSync("Sounds/Panda Eyes - Lonely Island.json", "utf-8"))
];

function UpdateSound() {
    var CurrentSound = Sounds[Sound];

    setTimeout(function() {
        if(Sound < (Sounds.length - 1)) {
            Sound++;
            UpdateSound();
        } else {
            Sound = 0;
            UpdateSound();
        }
    }, CurrentSound.Duration * 1000);
}

UpdateSound()

function HTTPServer(request, response) {
    if(request.method === "GET") {     
        response.writeHead(200, {"Content-Type": "application/json; utf-8"});
        response.write(JSON.stringify(Sounds[Sound]));
        response.end();
    }
}
