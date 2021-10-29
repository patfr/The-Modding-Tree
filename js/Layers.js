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
    type: "static",
    exponent: 1.5,
    roundUpCost: true,
    autoPrestige() {return hasMilestone("p", 4)},
    resetsNothing() {return hasMilestone(this.layer, 0)},
    canBuyMax() {return hasMilestone("p", 0)},
    baseAmount() {return player.points},
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    gainMult() {
        gain = new Decimal(1)
        gain = gain.div(tmp.p.effect)
        gain = gain.div(buyableEffect(this.layer, 11))
        if (hasUpgrade("p", 11)) gain = gain.div(upgradeEffect("p", 11))
        if (hasUpgrade("q", 22)) gain = gain.div(upgradeEffect("q", 22))
        if (hasUpgrade("p", 14)) gain = gain.div(upgradeEffect("p", 14))
        return gain
    },
    gainExp() {
        let gain = new Decimal(1)
        if (hasUpgrade("q", 23)) gain = gain.add(upgradeEffect("q", 23))
        return gain
    },
    layerShown(){return true},
    effect() {
        let eff = new Decimal(1)
        if (hasUpgrade(this.layer, 13)) {
            eff = Decimal.pow(5, player.q.points)
        } else {
            if (player.q.points.gte(1)) {
                eff = player.q.points.mul(2)
            }
        }
        if (hasUpgrade(this.layer, 14)) eff = eff.pow(2)
        return eff
    },
    effectDescription() {return "which boost Dark Matter gain by <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(tmp.q.effect)+"</h2>"},
    milestones: {
        0: {
            requirementDescription: "32 Quarks",
            unlocked() { return player.q.unlocked },
            done() { return player[this.layer].points.gte(32) },
            effectDescription: "Quark resets nothing.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        1: {
            requirementDescription: "300 Quarks",
            unlocked() { return hasMilestone(this.layer, 0) },
            done() { return player[this.layer].points.gte(300) },
            effectDescription: "Keep Quarks buyables on Photon reset.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        2: {
            requirementDescription: "330 Quarks",
            unlocked() { return hasMilestone(this.layer, 1) },
            done() { return player[this.layer].points.gte(330) },
            effectDescription: "Keep Quarks upgrades on Photon reset.",
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
                if (hasUpgrade("p", 12)) {
                    style['border-radius'] = "10px 0px 0px 0px"
                } else {
                    style['border-radius'] = "10px 0px 0px 10px"
                }
                return style
            },
        },
        12: {
            title: "Dark II",
            description: "100x Dark Matter.",
            cost: new Decimal(4),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(100);
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
            description: "Quarks effect uses a better formula.",
            cost: new Decimal(7),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(100);
            },
            tooltip() { return "2x => 5^x.<br>x is Quarks" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                return style
            },
        },
        14: {
            title: "Dark IV",
            description: "Square the Quark effect.",
            cost: new Decimal(13),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(1);
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
            cost: new Decimal(28),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(100);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                if (hasUpgrade("p", 12)) {
                    style['border-radius'] = "0px 10px 0px 0px"
                } else {
                    style['border-radius'] = "0px 10px 10px 0px"
                }
                return style
            },
        },
        21: {
            title: "Dark VI",
            description: "100x Dark Matter.",
            cost: new Decimal(30),
            unlocked() { return hasUpgrade("p", 12) },
            effect() {
                return new Decimal(100);
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
            description: "Divide Quark price by /5e12.",
            cost: new Decimal(35),
            unlocked() { return hasUpgrade("p", 12) },
            effect() {
                return new Decimal(5e12);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                return style
            },
        },
        23: {
            title: "Dark VIII",
            description: "Raise Quark exponent by 1.1.",
            cost: new Decimal(44),
            unlocked() { return hasUpgrade("p", 12) },
            effect() {
                let eff = new Decimal(1.1)
                if (hasUpgrade(this.layer, 24)) eff = eff.add(upgradeEffect(this.layer, 24))
                return eff;
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                return style
            },
        },
        24: {
            title: "Dark IX",
            description: "The previous upgrade's effect is increased by 0.1.",
            cost: new Decimal(126),
            unlocked() { return hasUpgrade("p", 12) },
            effect() {
                let eff = new Decimal(1.1)
                if (hasUpgrade(this.layer, 25)) eff = eff.mul(upgradeEffect(this.layer, 25))
                return eff;
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                return style
            },
        },
        25: {
            title: "Dark X",
            description: "The previous upgrade's effect is multiplied based on Photons. Hardcap at x2",
            cost: new Decimal(137),
            unlocked() { return hasUpgrade("p", 12) },
            effect() {
                return Decimal.log(player.p.points.add(1), 1e4).add(1).min(2);
            },
            effectDisplay() { return format(this.effect())+"x" },
            tooltip() { return "Log1e4(Photons + 1) + 1" },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] = tmp.q.color
                style['border-radius'] = "0px 0px 10px 0px"
                return style
            },
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(2).pow(x) },
            title: "Quark Replicator",
            display() {
                return "Divide the price of Quarks by /2.<br>Per level.<br>Amount: "+
                format(getBuyableAmount(this.layer, this.id))+".<br>Currently: /"+
                format(this.effect())+".<br>Costs: "+
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
        }
        if (resetLayer == "p") {
            if (hasMilestone("p", 1)) keep.push("milestones")
            if (hasMilestone("q", 1)) keep.push("buyables")
            if (hasMilestone("q", 2)) keep.push("upgrades")
        }
        keep.push("total")
        layerDataReset(this.layer, keep)
    },
})

addLayer("p", {
    name: "Photons",
    resource: "Photons",
    symbol: "P",
    position: 1,
    row: 1,
    color: "#ffff00",
    colorCan: "#ffff7a",
    baseResource: "Quarks",
    requires: new Decimal(30),
    type: "normal",
    exponent: 1,
    roundUpCost: true,
    baseAmount() {return player.q.points},
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        total: new Decimal(0),
        best: new Decimal(0),
    }},
    gainMult() {
        mult = new Decimal(1)
        return mult
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
        if (hasMilestone(this.layer, 3)) {
            if (player.p.best.gte(1)) {
                eff = player.p.best.mul(2)
            }
        } else {
            if (player.p.points.gte(1)) {
                eff = player.p.points.mul(2)
            }
        }
        if (hasMilestone(this.layer, 2)) eff = eff.mul(2)
        return eff
    },
    effectDescription() {return "which divides Quark price by <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(tmp.p.effect)+"</h2>"},
    milestones: {
        0: {
            requirementDescription: "2 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(2) },
            effectDescription: "You can buy max Quarks.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        1: {
            requirementDescription: "4 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(4) },
            effectDescription: "Keep Quark milestones.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        2: {
            requirementDescription: "6 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(6) },
            effectDescription: "Photon effect is doubled.",
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
            effectDescription: "Photon effect is now based on best Photons.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        4: {
            requirementDescription: "100 Photons",
            unlocked() { return player.p.unlocked },
            done() { return player[this.layer].points.gte(100) },
            effectDescription: "Autobuy quarks.",
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
            description: "Quarks boosts Quarks.",
            cost: new Decimal(3),
            unlocked() { return player.p.unlocked },
            effect() {
                return Decimal.log(player.q.points.add(1), 2).add(1);
            },
            effectDisplay() { return format(this.effect())+"x" },
            tooltip() { return "Log2(Quarks + 1) + 1" },
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
            description: "Unlock a new row of quark upgrades.",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade(this.layer, 11) },
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
            description: "Divine the price of Quarks based on Quarks.",
            cost: new Decimal(18),
            unlocked() { return hasUpgrade(this.layer, 13) },
            effect() {
                return player.q.points.max(1);
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
            description: "Unlock 2 new layers.<br>(Not implimented)",
            cost: new Decimal(Infinity),
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

addLayer("s", {
    name: "Statistics",
    symbol: "S",
    position: 1,
    row: 0,
    color: "#a212fc",
    startData() { return {
        unlocked: true,
    }},
    layerShown(){return true},
    tabFormat: [
        ["display-text", "<b>Current endgame: </b>200 Photons"],
        ["blank", "40px"],
        ["display-text", "<h2>Quarks</h2>"],
        ["display-text", function() { return "You have made a total of <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.total)+"</h2> Quarks" }],
        ["display-text", function() { return "You have <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.points)+"</h2> Quarks" }],
        ["blank", "40px"],
        ["display-text", "<h2>Photons</h2>"],
        ["display-text", function() { return "You have made a total of <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(player.p.total)+"</h2> Photons" }],
        ["display-text", function() { return "You have <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(player.p.points)+"</h2> Photons" }],
    ],
})

addLayer("l", {
    name: "Layers",
    symbol: "L",
    position: 1,
    row: 0,
    color: "#000000",
    startData() { return {
        unlocked: true,
    }},
    layerShown(){return true},
    tabFormat: {
        "Quarks": {
            embedLayer: "q",
            buttonStyle: { "border-color": "#a212fc" },
        },
        "Photons": {
            embedLayer: "p",
            buttonStyle: { "border-color": "#ffff00" },
            unlocked: function() { return hasUpgrade("q", 15) || player.p.unlocked },
        },
    },
})