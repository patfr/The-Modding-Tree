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
    canBuyMax() {return false},
    baseAmount() {return player.points},
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    gainMult() {
        mult = new Decimal(1)
        return mult
    },
    gainExp() {
        return new Decimal(1)
    },
    hotkeys: [
        {key: "q", description: "Q: Reset for Quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
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
            requirementDescription: "50 Quarks",
            unlocked() { return player.q.unlocked },
            done() { return player[this.layer].points.gte(50) },
            effectDescription: "Quark resets nothing and you can buy max.",
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
            description: "Dark Matter boosts Dark Matter",
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
                style['border-radius'] = "10px 0px 0px 10px"
                return style
            },
        },
        12: {
            title: "Dark II",
            description: "100x Dark Matter",
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
            description: "Quarks effect uses a better formula",
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
            description: "Not implemented.",
            cost: new Decimal(Infinity),
            unlocked() { return player.q.unlocked },
            effect() {
                return new Decimal(1);
            },
            style() {
                let style = {}
                if (tmp[this.layer].upgrades[this.id].cost.lte(player[this.layer].points)) style['background-color'] = tmp[this.layer].colorCan
                if (hasUpgrade(this.layer, this.id)) style['background-color'] =  tmp.q.color
                style['border-radius'] = "0px 10px 10px 0px"
                return style
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
    },
    doReset(resetLayer) {
        let keep = []
        if (resetLayer == "q") {
            keep.push("points")
            keep.push("upgrades")
            keep.push("milestones")
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
        ["display-text", "<b>Current endgame: </b>28 Quarks"],
        ["blank", "40px"],
        ["display-text", "<h2>Quarks</h2>"],
        ["display-text", function() { return "You have made a total of <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.total)+"</h2> Quarks" }],
        ["display-text", function() { return "You have <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.points)+"</h2> Quarks" }],
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
        }
    },
})