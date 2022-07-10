(() => {
	//console.log("Función autoejecutada para tener una closure");


	let rating, pac, sho, pas, dri, def, phy, div, han, kic, ref, spe, pos;
	let id = 0;
	let batch = 5;
	let name;
	let ipfsPath = "pathIpfs" + id;
	const Positions = new Array("GK", "LWB", "LB", "CB", "RB", "RWB", "CDM", "LM", "CM", "RM", "CAM", "LW", "LF", "CF", "RF", "RW", "ST");

	//unique id for every player
	//Constructor
	function generatePlayer() {
		createPlayer();
		id += 1;
	}

	//Podemos pasar nombre por parametro y que cada uno llame a su jugador como quiera
	// y metemos parametro id unico para identificarlos
	//in case you mint with another name
	for (let i = 0; i < batch; i++) {
		ipfsPath = 'pathIpfs' + i;
		console.log("Generate player " + id + " " + ipfsPath + " ");
		generatePlayer();
	}
	//let generatePlayer1 = new generatePlayer("nombre", "path");

	function generateMaxStat() {

		let maxStat = 0;
		let rarity = getRndInteger(1, 100);

		if (rarity < 70) {
			maxStat = 70;
		}
		else if (rarity >= 70 && rarity < 90)
			maxStat = 80;
		else if (rarity >= 90 && rarity < 99)
			maxStat = 95;
		else
			maxStat = 100;

		return maxStat;
	}

	function createPlayer() {

		let maxStat = generateMaxStat();
		let position = Positions[Math.floor(Math.random() * Positions.length)];
		let player = new Map();
		let stats = new Array();
		let randomStatsGK = new Array();
		let randomStats = new Array();
		let maxLevel;



		for (let i = 0; i < 6; i++) {
			stats.push(getRndInteger(1, maxStat));
		}


		//Generate raririty and max stat

		randomStatsGK = stats;
		//general rating
		let rate = stats.reduce((a, b) => a + b, 0) / stats.length;
		rating = Math.trunc(rate);

		stats.sort(function (a, b) { return a - b });
		console.log(stats);
		maxLevel = maxStat - stats.at(5) + 1;

		randomStats = stats.slice(0, 4);
		randomStats = shuffleArray(randomStats);

		//GK everything random
		if ("GK" == position.toString()) {
			div = randomStatsGK.at(0);
			han = randomStatsGK.at(1);
			kic = randomStatsGK.at(2);
			ref = randomStatsGK.at(3);
			spe = randomStatsGK.at(4);
			pos = randomStatsGK.at(5);
			player.set("div", div);
			player.set("han", han);
			player.set("kic", kic);
			player.set("ref", ref);
			player.set("spe", spe);
			player.set("pos", pos);
			genJSONGK(player, position, rating, maxStat, maxLevel);
		}
		//Defender have better def and phy
		else if ("CB" == position.toString() || "LB" == position.toString() || "RB" == position.toString() || "LWB" == position.toString() || "RWB" == position.toString()) {
			def = stats.at(5);
			phy = stats.at(4);
			pac = randomStats.at(0);
			sho = randomStats.at(1);
			pas = randomStats.at(2);
			dri = randomStats.at(3);
			player.set("def", def);
			player.set("phy", phy);
			player.set("pac", pac);
			player.set("sho", sho);
			player.set("pas", pas);
			player.set("dri", dri);
			genJSONPlayer(player, position, rating, maxStat, maxLevel);
		}
		//Midfielder have better pas and dri 
		else if ("CDM" == position.toString() || "LM" == position.toString() || "CM" == position.toString() || "RM" == position.toString() || "CAM" == position.toString()) {
			pas = stats.at(5);
			dri = stats.at(4);
			pac = randomStats.at(0);
			sho = randomStats.at(1);
			def = randomStats.at(2);
			phy = randomStats.at(3);
			player.set("def", def);
			player.set("phy", phy);
			player.set("pac", pac);
			player.set("sho", sho);
			player.set("pas", pas);
			player.set("dri", dri);
			genJSONPlayer(player, position, rating, maxStat, maxLevel);
		}
		//forward have better sho and pac
		else {
			sho = stats.at(5);
			pac = stats.at(4);
			pas = randomStats.at(0);
			dri = randomStats.at(1);
			def = randomStats.at(2);
			phy = randomStats.at(3);
			player.set("def", def);
			player.set("phy", phy);
			player.set("pac", pac);
			player.set("sho", sho);
			player.set("pas", pas);
			player.set("dri", dri);
			genJSONPlayer(player, position, rating, maxStat, maxLevel);
		}

	}


	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function shuffleArray(array) {
		return array.sort(() => Math.random() - 0.5);
	}

	function genJSONPlayer(Map, position, rating, maxStat, maxLevel) {
		var fs = require('fs');
		let player = {
			name: id,
			image: ipfsPath,
			external_url: "UltimateSoccer.com",
			attributes: [
				{
					trait_type: "position",
					value: position
				},
				{
					trait_type: "rating",
					value: rating
				},
				{
					trait_type: "pace",
					value: Map.get("pac"),
					max_value: maxStat
				},
				{
					trait_type: "shooting",
					value: Map.get("sho"),
					max_value: maxStat
				},
				{
					trait_type: "passing",
					value: Map.get("pas"),
					max_value: maxStat
				},
				{
					trait_type: "dribbling",
					value: Map.get("dri"),
					max_value: maxStat
				},
				{
					trait_type: "defending",
					value: Map.get("def"),
					max_value: maxStat
				},
				{
					trait_type: "physicality",
					value: Map.get("phy"),
					max_value: maxStat
				},
				{
					display_type: "Level",
					trait_type: "level",
					value: 1,
					max_value: maxLevel
				}
			]
		};
		let json = id + ".json";
		let jsonString = JSON.stringify(player);
		fs.writeFile(`./assets/${json}`, jsonString, err => {
			if (err) {
				console.log('Error writing file', err);
			} else {
				console.log('Successfully wrote file');
			}
		});
		setImage(id, maxStat);
	}

	function genJSONGK(Map, position, rating, maxStat, maxLevel) {
		var fs = require('fs');
		let player = {
			name: id,
			image: ipfsPath,
			external_url: "UltimateSoccer.com",
			attributes: [
				{
					trait_type: "position",
					value: position
				},
				{
					trait_type: "rating",
					value: rating
				},
				{
					trait_type: "diving",
					value: Map.get("div"),
					max_value: maxStat
				},
				{
					trait_type: "handling",
					value: Map.get("han"),
					max_value: maxStat
				},
				{
					trait_type: "kicking",
					value: Map.get("kic"),
					max_value: maxStat
				},
				{
					trait_type: "reflexes",
					value: Map.get("ref"),
					max_value: maxStat
				},
				{
					trait_type: "speed",
					value: Map.get("spe"),
					max_value: maxStat
				},
				{
					trait_type: "positioning",
					value: Map.get("pos"),
					max_value: maxStat
				},
				{
					display_type: "Level",
					trait_type: "level",
					value: 1,
					max_value: maxLevel
				}
			]
		};
		let json = id + ".json";
		let jsonString = JSON.stringify(player);
		fs.writeFile(`./assets/${json}`, jsonString, err => {
			if (err) {
				console.log('Error writing file', err);
			} else {
				console.log('Successfully wrote file');
			}
		});

		setImage(id, maxStat);
	}


	//images are asigned just for test, there are multiple ways to set images
	function setImage(id, maxStat) {

		destinationPath = "./assets";

		if (maxStat < 70) {
			sourcePath = './images/common1.png'
		}
		else if (maxStat >= 70 && maxStat < 90){
			var num = getRndInteger(2, 8);
			sourcePath = `./images/common${num}.jpg`
		}
		else if (maxStat >= 90 && maxStat < 99)
			sourcePath = './images/common9.jpg'
		else
			sourcePath = './images/common10.jpg'

		const fs = require('fs');

		fs.copyFile(sourcePath, `./imagesJson/${id}.jpg`, (err) => {
			if (err) throw err;
			console.log('success');
		});
	}

})();
