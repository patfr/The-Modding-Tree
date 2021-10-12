addLayer("r", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#60c3fc",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "Rebirth", // Name of prestige currency
    baseResource: "Multiplier", // Name of resource prestige is based on
    baseAmount() {return player['m'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for Rebirth", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ['m'],
    milestones: {
        0: {
            requirementDescription: "1 Rebirth",
            done() {return player[this.layer].points.gte(1)}, // Used to determine when to give the milestone
            unlocked() {return true},
            effectDescription: "Unlock 2 new Multiplier upgrades",
        },
        1: {
            requirementDescription: "2 Rebirth",
            done() {return player[this.layer].points.gte(2)}, // Used to determine when to give the milestone
            unlocked() {return true},
            effectDescription: "Start with 12 Multiplier",
        },
    },
    upgrades: {
        11: {
            title: "More Multiplier I",
            description: "Your Rebirth boosts Multiplier gain at a reduced rate.",
            cost: new Decimal(2),
            unlocked() { return  hasMilestone(this.layer, 0) }, // The upgrade is only visible when this is true
            effect() {
                return Decimal.log(player[this.layer].points.add(1), 2).add(2)
            },
            effectDisplay() { return "x"+format(this.effect()) }, // Add formatting to the effect
            tooltip: "Log2(x+1)+2. x is your Rebirth.",
        },
    }
})
