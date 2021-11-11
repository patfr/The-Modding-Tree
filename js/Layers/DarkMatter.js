const Sizes = {
    photons: new Decimal("1.25e-46"),
}

addLayer("d", {
    name: "Dark Matter",
    symbol: "D",
    position: 1,
    row: 0,
    color: "#222222",
    colorCan: "#333333",
    startData() { return {
        unlocked: true,
        size: new Decimal(0),
    }},
    layerShown(){return true},
    tabFormat: {
        "Dark Matter": {
            content: [
                ["display-text", function() { return "You have <h2 style='color:"+tmp.d.color+";text-shadow:0px 0px 10px;'>" + format(player.points) + "</h2> Dark Matter" }],
            ],
        },
        "Size": {
            content: [
                ["display-text", function() { return "Your Universe is <h2 style='color: #00aaaa;text-shadow:0px 0px 10px;'>" + formatSmall(player.d.size) + "</h2> <h3>m<sup>3</sup></h3> big" }],
                ["display-text", "(Does not account for the space between objects)"],
                ["blank", "40px"],
                ["bar", "size"],
                ["display-text", "(This only shows progress to endgame for the time being)"],
            ],
            unlocked() { return player.d.size.gt(0) }
        },
    },
    bars: {
        size: {
            direction: RIGHT,
            width: 500,
            height: 50,
            progress() {
                return 0
            },
            display() { return "Not implimented" },
            fillStyle() { return {"background-color": "#00aaaa"} }
        }
    },
    calcSize() {
        let newSize = new Decimal(0)
        newSize = newSize.add(player.p.points.mul(Sizes["photons"]))
        player[this.layer].size = newSize
    },
})