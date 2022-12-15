const fs = require("fs");
const path = require("path");
const http = require("http");

const { port, soundsPath } = require("./settings.json");

function loadAll(directory) {
    if(!fs.statSync(directory).isDirectory()) throw new Error(`O caminho '${directory}' não existe ou não é uma pasta!`);

    const loaded = [];

    fs.readdirSync(directory).forEach((filename) => {
        if(!filename.endsWith(".json")) return; // Ignorar tudo que não terminar com '.json'
        let filePath = path.join(directory, filename);

        if(!fs.statSync(filePath).isFile()) return; // Ignorar tudo que não for um arquivo

        try {
            loaded.push(JSON.parse(fs.readFileSync(filePath, "utf-8")));
        } catch (error) {
            console.log(`[!] Erro ao carregar o arquivo '${filePath}'!`);
        }
    });

    return loaded;
}

var soundIndex = 0;
var startedAt = Date.now();
var sounds = loadAll(soundsPath);

function updateSound() {
    const currentSound = sounds[soundIndex];

    setTimeout(function() {
        if(soundIndex < (sounds.length - 1)) {
            soundIndex++;
            startedAt = Date.now();
            updateSound();
        } else {
            soundIndex = 0;
            startedAt = Date.now();
            updateSound();
        }

        console.log("[INFO]: Tocando agora: " + sounds[soundIndex].SoundName + "!");
    }, (currentSound.Duration - ((Date.now() - startedAt) / 1000)) * 1000);
}

const server = http.createServer((request, response) => {
    if(request.method !== "GET") return request.connection.destroy();

    var data = sounds[soundIndex];
    data["TimePosition"] = (Date.now() - startedAt) / 1000;

    response.writeHead(200, {"Content-Type": "application/json; utf-8"});
    response.write(JSON.stringify(data));
    response.end();
});

server.listen(port, () => {
    console.clear();
    console.log(`[*] O servidor está rodando na porta ${port}!`);

    updateSound();
});