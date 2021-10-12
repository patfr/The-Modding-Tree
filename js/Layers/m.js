addLayer("m", {
    name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a212fc",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Multiplier", // Name of prestige currency
    baseResource: "Cash", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for Multiplier", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "More Cash",
            description: "Your Multiplier boosts Cash gain at a reduced rate",
            cost: new Decimal(2),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            effect() {
                return Decimal.log(player[this.layer].points.add(1), 2).add(2)
            },
            effectDisplay() { return "x"+format(this.effect()) }, // Add formatting to the effect
            branches: [],
            tooltip: "Log2(x+1)+2\nx is your Multiplier.",
        },
    },
})
