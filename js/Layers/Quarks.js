addLayer("q", {
    name: "Quarks",
    resource: "Quarks",
    symbol: "Q",
    position: 1,
    row: 0,
    color: "#5e00eb",
    colorCan: "#a100ff",
    baseResource: "Dark Matter",
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.5,
    roundUpCost: true,
    baseAmount() {return player.points},
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    gainMult() {
        gain = new Decimal(1)
        if (hasUpgrade("q", 13)) gain = gain.mul(upgradeEffect("q", 13))
        if (hasUpgrade("p", 12)) gain = gain.mul(upgradeEffect("p", 12))
        if (hasMilestone("p", 0)) gain = gain.mul(2)
        if (hasMilestone("p", 3)) gain = gain.mul(player.p.points.pow(2).max(1))
        gain = gain.mul(buyableEffect(this.layer, 11))
        gain = gain.mul(tmp.p.effect)
        return gain
    },
    gainExp() {
        let gain = new Decimal(1)
        return gain
    },
    layerShown(){return true},
    milestones: {
        0: {
            requirementDescription: "1e50 Quarks",
            unlocked() { return hasMilestone("q", 0) },
            done() { return player[this.layer].points.gte(1e50) },
            effectDescription: "Autobuy buyables (Not implimented).",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
    },
    upgrades: {
        11: {
            title: "Dark I",
            description: "Dark Matter boosts Dark Matter.",
            cost: new Decimal(3),
            unlocked() { return player.q.unlocked },
            effect() {
                return Decimal.log(player.points.add(1), 2).add(1);
            },
            effectDisplay() { return format(this.effect())+"x" },
            tooltip() { return "Log2(Dark Matter + 1) + 1" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                if (hasUpgrade("p", 11)) {
                    style['border-radius'] = "10px 0px 0px 10px"
                } else {
                    style['border-radius'] = "10px 0px 0px 10px"
                }
                return style
            },
        },
        12: {
            title: "Dark II",
            description: "5x Dark Matter.",
            cost: new Decimal(7),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(5);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                return style
            },
        },
        13: {
            title: "Dark III",
            description: "Dark Matter boost Quark gain.",
            cost: new Decimal(20),
            unlocked() { return player.q.unlocked },
            effect() {
                return Decimal.log(player.points.add(1), 10).add(1);
            },
            effectDisplay() { return format(this.effect())+"x" },
            tooltip() { return "Log10(Dark Matter + 1) + 1" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                return style
            },
        },
        14: {
            title: "Dark IV",
            description: "5x Dark Matter.",
            cost: new Decimal(100),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(5);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                return style
            },
        },
        15: {
            title: "Dark V",
            description: "Unlock a new layer and 100x Dark Matter.",
            cost: new Decimal(200),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(100);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                if (hasUpgrade("p", 11)) {
                    style['border-radius'] = "0px 10px 10px 0px"
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
        21: {
            title: "Dark VI",
            description: "Quarks boost Dark Matter at an increased rate.",
            cost: new Decimal(1e6),
            unlocked() { return hasUpgrade("p", 11) },
            effect() {
                return player.q.points.mul(2).max(1);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                style['border-radius'] = "0px 0px 0px 10px"
                return style
            },
        },
        22: {
            title: "Dark VII",
            description: "Divide the price of Photons by /1e+10.",
            cost: new Decimal(1e16),
            unlocked() { return hasUpgrade("p", 11) },
            effect() {
                return new Decimal(1e10);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                return style
            },
        },
    },
    buyables: {
        11: {
            cost(x) { return getBuyableAmount(this.layer, this.id).gte(100) ? new Decimal(Infinity) : new Decimal(100).pow(x) },
            title: "Quark Splitter",
            display() {
                return "Increase Quark gain by 2x<br>per level (Max level: 100).<br>Amount: "+
                format(getBuyableAmount(this.layer, this.id))+".<br>Currently: "+
                format(this.effect())+"x.<br>Costs: "+
                format(this.cost())+" Quarks."
            },
            effect() {
                return new Decimal(2).pow(getBuyableAmount(this.layer, this.id))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
                ["blank", "40px"],
                "milestones",
                "upgrades",
            ],
        },
        "Buyables": {
            content: [
                "main-display",
                "prestige-button",
                ["blank", "40px"],
                "buyables",
            ],
            unlocked: function() { return hasUpgrade("p", 13) },
        },
    },
    doReset(resetLayer) {
        let keep = []
        if (resetLayer == "q") {
            keep.push("points")
            keep.push("upgrades")
            keep.push("milestones")
            keep.push("buyables")
        }
        if (resetLayer == "p") {
            if (hasMilestone("p", 1)) keep.push("upgrades")
            if (hasMilestone("p", 2)) keep.push("buyables")
        }
        //if (hasMilestone("nt", 0) && resetLayer != "pt") keep.push("milestones")
        keep.push("total")
        layerDataReset(this.layer, keep)
    },
    hotkeys: [
        {key: "q", description: "Q: Reset for Quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasMilestone("p", 4)) return 0.01
        return 0
    }
})