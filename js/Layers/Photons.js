addLayer("p", {
    name: "Photons",
    resource: "Photons",
    symbol: "P",
    position: 1,
    row: 1,
    color: "#ffff00",
    colorCan: "#ffff7a",
    baseResource: "Quarks",
    requires: new Decimal(5000),
    softcap: new Decimal(3),
    softcapPower: 0.5,
    type: "static",
    exponent() {
        let exp = 1.5
        if (player.p.points.gte(15)) exp = 1.55
        return exp
    },
    roundUpCost: true,
    baseAmount() {return player.q.points},
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    gainMult() {
        let gain = new Decimal(1)
        if (player.p.points.gte(3)) gain = gain.mul(1e9)
        if (player.p.points.gte(4)) gain = gain.mul(1e10)
        if (player.p.points.gte(8)) gain = gain.mul(1e10)
        if (hasUpgrade("q", 22)) gain = gain.div(upgradeEffect("q", 22))
        if (hasUpgrade("p", 14)) gain = gain.div(upgradeEffect("p", 14))
        if (player.p.points.gte(25)) gain = new Decimal(Infinity)
        return gain
    },
    gainExp() {
        return new Decimal(1)
    },
    hotkeys: [
        {key: "p", description: "P: Reset for Photons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        let eff = new Decimal(1)
        eff = Decimal.pow(3, player.p.points)
        return eff.max(1)
    },
    effectDescription() {return "which increases Quark gain by <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(tmp.p.effect)+"</h2>"},
    milestones: {
        0: {
            requirementDescription: "2 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(2) },
            effectDescription: "You gain 2x more Quarks & 10x more Dark Matter.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        1: {
            requirementDescription: "6 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(6) },
            effectDescription: "Keep Quark upgrades on reset.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        2: {
            requirementDescription: "8 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(8) },
            effectDescription: "Keep Quark buyables on reset.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        3: {
            requirementDescription: "10 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(10) },
            effectDescription: "Photons boosts Quark gain",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        4: {
            requirementDescription: "15 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(15) },
            effectDescription: "Gain 1% of your Quarks per second. And keep Quark Milestones on reset.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
    },
    upgrades: {
        11: {
            title: "Light I",
            description: "Unlock a new row of quark upgrades.",
            cost: new Decimal(3),
            unlocked() { return player.p.unlocked },
            effect() {
                return new Decimal(0);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) {
                    style['background-color'] = tmp.p.color
                    style['border-radius'] = "10px 0px 0px 10px"
                } else {
                    style['border-radius'] = "10px 10px 10px 10px"
                }
                return style
            },
        },
        12: {
            title: "Light II",
            description: "Your Universe size boosts your Quarks.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade(this.layer, 11) },
            effect() {
                return player.d.size.add(1).mul(10).max(1);
            },
            effectDisplay() { return format(this.effect())+"x" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) {
                    style['background-color'] = tmp.p.color
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
        13: {
            title: "Light III",
            description: "Unlock a Quark buyable.",
            cost: new Decimal(7),
            unlocked() { return hasUpgrade(this.layer, 12) },
            effect() {
                return new Decimal(1);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) {
                    style['background-color'] = tmp.p.color
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
        14: {
            title: "Light IV",
            description: "Divide the price of Photons by 1e10.",
            cost: new Decimal(18),
            unlocked() { return hasUpgrade(this.layer, 13) },
            effect() {
                return new Decimal(1e10);
            },
            effectDisplay() { return "/"+format(this.effect()) },
            tooltip() { return "Max(Quarks, 1)" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) {
                    style['background-color'] = tmp.p.color
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
        15: {
            title: "Light V",
            description: "Unlock 2 new layers. (Not implemented)",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade(this.layer, 14) },
            effect() {
                return player.q.points.max(1);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) {
                    style['background-color'] = tmp.p.color
                    style['border-radius'] = "0px 10px 10px 0px"
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text", function() { return "Best Photons <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(player.p.best)+"</h2>" }],
                "blank",
                "prestige-button",
                ["blank", "40px"],
                "milestones",
                "upgrades",
            ],
        },
        "Caps": {
            content: [
                "main-display",
                function() {
                    if (!player.p.points.gte(3)) return
                    return ["display-text", "<h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>3</h2><h2> Photons</h2> - Price is multiplied by 1e+9"]
                },
                function() {
                    if (!player.p.points.gte(4)) return
                    return ["display-text", "<h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>4</h2><h2> Photons</h2> - Price is multiplied by 1e+10"]
                },
                function() {
                    if (!player.p.points.gte(8)) return
                    return ["display-text", "<h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>8</h2><h2> Photons</h2> - Price is multiplied by 1e+10"]
                },
                function() {
                    if (!player.p.points.gte(15)) return
                    return ["display-text", "<h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>15</h2><h2> Photons</h2> - Price exponent is increased 1.5 -> 1.55"]
                },
            ],
            unlocked() { return player.p.points.gte(3) }
        },
    },
    doReset(resetLayer) {
        let keep = []
        if (resetLayer == "p") {
            keep.push("points")
            keep.push("milestones")
            keep.push("upgrades")
            keep.push("best")
        }
        keep.push("total")
        layerDataReset(this.layer, keep)
    },
})