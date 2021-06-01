const HTTP = require("http");
const APP = HTTP.createServer(HTTPServer);
const FS = require("fs");

function LoadAll(Path) {
	var Loaded = [];
	
	if(FS.statSync(Path).isDirectory()) {
		var files = FS.readdirSync(Path);
		
		files.forEach((filename) => {
			if(filename.endsWith(".json")) {
				if(FS.statSync(Path+filename).isFile()) {
					Loaded.push(JSON.parse(FS.readFileSync(Path+filename, "utf-8")))
				}
			}
		});
	}
	
	return Loaded;
}

APP.listen(8005, () => {
  console.clear();
  console.log("[INFO]: Listening at *:8005!\n");
  console.log("Precisa de ajuda? Entre no servidor de Discord!");
	console.log("Link: https://discord.gg/");
});

var Sound = 0;
var Sounds = LoadAll("Sounds/");

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