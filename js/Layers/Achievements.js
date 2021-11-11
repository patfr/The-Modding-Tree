addLayer("a", {
    name: "Achievements",
    symbol: "A",
    position: 1,
    row: "side",
    color: "#ffff00",
    colorCan: "#ffff7a",
    startData() { return {
        unlocked: true,
    }},
    layerShown(){return false},
    achievements: {
        11: {
            name: "And so it begins",
            done() { return player.q.unlocked },
            tooltip: "Get your first Quark",
            style() {
                let style = {}
                if (hasAchievement(this.layer, this.id)) style['background-color'] = "#aaffaa"
                    style['border-radius'] = "10px 0px 0px 10px"
                return style
            },
        },
        12: {
            name: "Wow a bad upgrade",
            done() { return hasUpgrade("q", 11) },
            tooltip: "Get your first Quark upgrade.",
            style() {
                let style = {}
                if (hasAchievement(this.layer, this.id)) style['background-color'] = "#aaffaa"
                return style
            },
        },
        13: {
            name: "Let there be light",
            done() { return player.p.unlocked },
            tooltip: "Get your first Quark upgrade.",
            style() {
                let style = {}
                if (hasAchievement(this.layer, this.id)) style['background-color'] = "#aaffaa"
                return style
            },
        },
        14: {
            name: "Ok, why",
            done() { return player.p.points.gte(3) },
            tooltip: "Reach the first Photon price cap.",
            style() {
                let style = {}
                if (hasAchievement(this.layer, this.id)) style['background-color'] = "#aaffaa"
                return style
            },
        },
        15: {
            name: "Completed already?",
            done() { return player.d.size.gte("3.12e-45") },
            tooltip: "Reach the current end of the game.",
            style() {
                let style = {}
                if (hasAchievement(this.layer, this.id)) style['background-color'] = "#aaffaa"
                    style['border-radius'] = "0px 10px 10px 0px"
                return style
            },
        },
    },
    tabFormat: [
        "achievements",
    ],
})