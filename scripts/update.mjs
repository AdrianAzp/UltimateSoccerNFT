import fs from 'fs'

const ipfs = "put ipfs cid to update json metadata afet upload jpg";
let filePath = "";

function main() {
    jsonUpdateCID(filePath);
}


function jsonUpdateCID(filePath) {

    fs.readFile(filePath, "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
        } 
        let player = JSON.parse(jsonString);
        player.image = `${ipfs}/${player.name}.jpg`;
        fs.writeFile(`./json/${player.name}.json`, JSON.stringify(player, null, 0), err => {
            if (err) console.log("Error writing file:", err);
        });

    });

}

for(let i = 0; i < 5; i++){
    filePath = `./assets/${i}.json`;
    main(filePath);
}
