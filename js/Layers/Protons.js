addLayer("pt", {
    name: "Protons",
    resource: "Protons",
    symbol: "Pt",
    position: 1,
    row: 2,
    color: "#ff0000",
    colorCan: "#ff5555",
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
        {key: "P", description: "Shift + P: Reset for Protons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    effect() {
        let eff = new Decimal(100)
        return eff
    },
    effectDescription() {
        if (player.nt.unlocked) {
            return "which boosts Dark Matter gain by <h2 style='color:"+tmp.pt.color+";text-shadow:0px 0px 10px;'>"+format(tmp.pt.effect)+"</h2>"
        } else return ""
    },
    tabFormat: {
        "Main": {
            content: [
                "main-display",
                "prestige-button",
            ],
        },
    },
    onPrestige() {
        player.subtabs.q.mainTabs = "Main"
        player.subtabs.l.mainTabs = "Quarks"
    },
    doReset(resetLayer) {
        let keep = []
        if (resetLayer == "pt") {
            keep.push("points")
            keep.push("milestones")
            keep.push("upgrades")
            keep.push("best")
        }
        keep.push("total")
        layerDataReset(this.layer, keep)
    },
})