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
        "Dark Matter": {
            embedLayer: "d",
            buttonStyle: { "border-color": "#222222" },
        },
        "Quarks": {
            embedLayer: "q",
            buttonStyle: { "border-color": "#a212fc" },
        },
        "Photons": {
            embedLayer: "p",
            buttonStyle: { "border-color": "#ffff7a" },
            unlocked: function() { return hasUpgrade("q", 15) || player.p.unlocked },
        },
        "Neutrons": {
            embedLayer: "nt",
            buttonStyle: { "border-color": "#5555ff" },
            unlocked: function() { return player.nt.unlocked },
        },
        "Choose a layer": {
            embedLayer: "c",
            buttonStyle: { "border-color": "#ffffff" },
            unlocked: function() {
                /*if (hasUpgrade("p", 15) && !player.nt.unlocked && !player.nt.unlocked) {
                    return true
                }*/
                return false
            },
        }
    },
})