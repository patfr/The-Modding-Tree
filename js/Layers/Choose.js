addLayer("c", {
    name: "Choose",
    symbol: "C",
    position: 1,
    row: 10,
    color: "#ffffff",
    startData() { return {
        unlocked: true,
    }},
    layerShown(){return true},
    tabFormat: {
        "Neutrons": {
            embedLayer: "nt",
            buttonStyle: { "border-color": "#0000ff" },
        },
        "Protons": {
            embedLayer: "pt",
            buttonStyle: { "border-color": "#ff0000" },
        },
    },
})