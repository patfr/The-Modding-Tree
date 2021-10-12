addLayer("m", {
    name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('r', 11)) mult = mult.mul(upgradeEffect('r', 11))
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
            title: "More Cash I",
            description: "Your Multiplier boosts Cash gain at a reduced rate.",
            cost: new Decimal(2),
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            effect() {
                return Decimal.log(player[this.layer].points.add(1), 2).add(2)
            },
            effectDisplay() { return "x"+format(this.effect()) }, // Add formatting to the effect
            tooltip: "Log2(x+1)+2. x is your Multiplier.",
        },
        12: {
            title: "More Cash II",
            description: "Gain x5 Cash.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('m', 11) }, // The upgrade is only visible when this is true
            effect() {
                return new Decimal(5)
            },
        },
        13: {
            title: "More Cash III",
            description: "Gain x5 Cash.",
            cost: new Decimal(75),
            unlocked() { return hasUpgrade('m', 12) }, // The upgrade is only visible when this is true
            effect() {
                return new Decimal(5)
            },
        },
        14: {
            title: "More Cash IV",
            description: "Gain x10 Cash.",
            cost: new Decimal(200),
            unlocked() { return hasUpgrade('m', 13) && hasMilestone('r', 0) }, // The upgrade is only visible when this is true
            effect() {
                return new Decimal(10)
            },
        },
        15: {
            title: "More Cash V",
            description: "Gain x10 Cash.",
            cost: new Decimal(400),
            unlocked() { return hasUpgrade('m', 14) && hasMilestone('r', 0) }, // The upgrade is only visible when this is true
            effect() {
                return new Decimal(10)
            },
        },
    },
    doReset(layer) {
        let keep = []
        if (layer == "m") return
        if (layer == "r" && hasMilestone('r', 1)) {
            keep.push("points")
            player[this.layer].points = new Decimal(12)
        }
        layerDataReset(this.layer, keep)
    },
})
