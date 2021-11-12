let modInfo = {
	name: "The Universal Tree",
	id: "TheUniversalTree",
	author: "patfr",
	pointsName: "Dark Matter",
	modFiles: [
		"Layers/DarkMatter.js",
		"Layers/Quarks.js",
		"Layers/Photons.js",
		"Layers/Neutrons.js",
		"Layers/Protons.js",
		"Layers/Layers.js",
		"Layers/Choose.js",
		"Layers/Statistics.js",
		"Layers/Achievements.js",
		"tree.js",
	],

	discordName: "My discord server",
	discordLink: "https://discord.gg/7ahtMyv5hX",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3b",
	name: "Bugfixes",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.3b</h3><br>
		- Fixed Photon upgrade 4's tooltip.<br>
		- Fixed Quark upgrades border radius.<br>
		- Fixed Let there be light requirement.<br>
		<br>
	<h3>v0.3a</h3><br>
		- Change the balancing of Quark and Photons layers.<br>
		- Added some stuff in Statistics now stop complaining that this doesn't have a tree :/.<br>
		- Added a side layer for Dark Matter.<br>
		- Added achievements.<br>
		<br>
	<h3>v0.2a Part 2</h3><br>
		- Added added more upgrades and milestones to photon layer.<br>
		- Added finished the 2nd row of quarks upgrades.<br>
		- This is part 2 of 2.<br>
		<br>
	<h3>v0.2a Part 1</h3><br>
		- Added Photon layer.<br>
		- Added 2nd row of quarks upgrades.<br>
		- Added a quark buyable.<br>
		- This is part 1 of 2.<br>
		<br>
	<h3>v0.1a</h3><br>
		- Added Quark layer.<br>
		- Added Statistics layer.`

let winText = `Congratulations! You have reached the end and beaten this game, for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade("q", 11)) gain = gain.mul(upgradeEffect("q", 11))
	if (hasUpgrade("q", 12)) gain = gain.mul(upgradeEffect("q", 12))
	if (hasUpgrade("q", 14)) gain = gain.mul(upgradeEffect("q", 14))
	if (hasUpgrade("q", 15)) gain = gain.mul(upgradeEffect("q", 15))
	if (hasUpgrade("q", 21)) gain = gain.mul(upgradeEffect("q", 21))
	if (hasMilestone("p", 0)) gain = gain.mul(10)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.d.size.gte("3.12e-45")
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
	if (oldVersion == "0.1a" || oldVersion == "0.1b" || oldVersion == "0.2a" || oldVersion == "0.2b") {
		hardReset()
	}
}