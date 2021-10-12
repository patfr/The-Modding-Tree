addLayer("sr", {
    name: "Super Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sr", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#60f7fc",
    requires: new Decimal("e280000000"), // Can be a function that takes requirement increases into account
    resource: "Super Rebirth", // Name of prestige currency
    baseResource: "Rebirth", // Name of resource prestige is based on
    baseAmount() {return player['r'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Super Rebirth", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player['r'].unlocked},
    branches: ['r'],
})
