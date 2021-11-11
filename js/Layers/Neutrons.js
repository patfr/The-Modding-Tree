addLayer("nt", {
    name: "Neutrons",
    resource: "Neutrons",
    symbol: "Nt",
    position: 1,
    row: 2,
    color: "#0000ff",
    colorCan: "#5555ff",
    baseResource: "Dark Matter",
    requires: new Decimal("1e515"),
    type: "normal",
    exponent: 0.01,
    roundUpCost: true,
    baseAmount() {return player.points},
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
        {key: "n", description: "N: Reset for Neutrons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        let eff = new Decimal(100)
        return eff
    },
    effectDescription() {
        if (player.nt.unlocked) {
            let HardcapText = hasUpgrade(this.layer, 11) ? "" : "<br><h3>(Hardcapped)</h3>"
            return "which boosts Dark Matter gain by <h2 style='color:"+tmp.nt.color+";text-shadow:0px 0px 10px;'>"+format(tmp.nt.effect)+"</h2>"+HardcapText
        } else return ""
    },
    milestones: {
        0: {
            requirementDescription: "2 Neutrons",
            unlocked() { return player.nt.unlocked },
            done() { return player[this.layer].points.gte(2) },
            effectDescription: "Keep Quark milestones on Neutron and lower layer resets and buy max Quarks.",
            style() {
                let style = {}
                if (hasMilestone(this.layer, this.id)) style['background-color'] = tmp[this.layer].colorCan
                return style
            },
        },
        1: {
            requirementDescription: "3 Neutrons",
            unlocked() { return player.nt.unlocked },
            done() { return player[this.layer].points.gte(3) },
            effectDescription: "Unlock Neutron upgrades.",
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
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text", function() { return "Total Neutrons <h2 style='color:"+tmp.nt.color+";text-shadow:0px 0px 10px;'>"+format(player.nt.total)+"</h2>" }],
                "blank",
                "prestige-button",
                ["blank", "40px"],
                "milestones",
                "upgrades"
            ],
        },
    },
    onPrestige() {
        player.subtabs.q.mainTabs = "Main"
        player.subtabs.l.mainTabs = "Neutrons"
    },
    doReset(resetLayer) {
        let keep = []
        if (resetLayer == "nt") {
            keep.push("points")
            keep.push("milestones")
            keep.push("upgrades")
            keep.push("best")
        }
        keep.push("total")
        layerDataReset(this.layer, keep)
    },
})