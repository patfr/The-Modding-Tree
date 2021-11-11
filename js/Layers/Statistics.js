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
    tabFormat: {
        "General": {
            content: [
                ["display-text", function() { return "<h3>Current endgame: </h3><h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>25 Photons</h2>" }],
                ["blank", "40px"],
                ["display-text", "<h2>Links & Information</h2>"],
                "blank",
                ["display-text", function() { return "Patfr's discord name: <h3 style='color: #ffffff;text-shadow:0px 0px 2px;'>Hmm#8047</h3>" }],
            ],
            buttonStyle: { "border-color": "#ffffff" },
        },
        "Data": {
            content: [
                ["display-text", "<h2>Quarks</h2>"],
                ["display-text", function() { return "You have made a total of <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.total)+"</h2> Quarks" }],
                ["display-text", function() { return "You have <h2 style='color:"+tmp.q.color+";text-shadow:0px 0px 10px;'>"+format(player.q.points)+"</h2> Quarks" }],
                ["blank", "40px"],
                function() {
                    if (!player.p.unlocked) return
                    return ["display-text", 
                        "<h2>Photons</h2>" + "<br>" +
                        "You have made a total of <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(player.p.total)+"</h2> Photons" + "<br>" +
                        "You have <h2 style='color:"+tmp.p.color+";text-shadow:0px 0px 10px;'>"+format(player.p.points)+"</h2> Photons"
                    ]
                },
                ["blank", "40px"],
                function() {
                    if (!player.nt.unlocked) return
                    return ["display-text", 
                        "<h2>Neutrons</h2>" + "<br>" +
                        "You have made a total of <h2 style='color:"+tmp.nt.color+";text-shadow:0px 0px 10px;'>"+format(player.nt.total)+"</h2> Neutrons" + "<br>" +
                        "You have <h2 style='color:"+tmp.nt.color+";text-shadow:0px 0px 10px;'>"+format(player.nt.points)+"</h2> Neutrons"
                    ]
                },
                ["blank", "40px"],
                function() {
                    if (!player.pt.unlocked) return
                    return ["display-text", 
                        "<h2>Protons</h2>" + "<br>" +
                        "You have made a total of <h2 style='color:"+tmp.pt.color+";text-shadow:0px 0px 10px;'>"+format(player.pt.total)+"</h2> Protons" + "<br>" +
                        "You have <h2 style='color:"+tmp.pt.color+";text-shadow:0px 0px 10px;'>"+format(player.pt.points)+"</h2> Protons"
                    ]
                },
            ],
            buttonStyle: { "border-color": "#ffffff" },
        },
        "Tree": {
            content: [
                ["clickable-tree", [
                    [11, 12], 
                    [21],
                    [31, 32],
                ]],
            ],
            buttonStyle: { "border-color": "#ffffff" },
        }
    },
    clickables: {
        11: {
            display() { return "<h1>"+tmp.d.symbol+"</h1>" },
            tooltip() { return tmp.d.name },
            unlocked() { return true },
            style() { return {
                "border-radius": "25px 25px 25px 25px",
                "border-color": tmp.d.color,
                "color": tmp.d.color,
                "background-color": "#111111",
                "font-size": "25px",
            } },
            canClick() { return true },
            onClick() {
                player.subtabs["tree-tab"].mainTabs = "Layers"
                player.subtabs.l.mainTabs = "Dark Matter"
                player.subtabs.d.mainTabs = "Dark Matter"
            },
            branches: [
                [12, "#aaaaff", 20],
                [21, "#aaaaff", 20],
            ],
        },
        12: {
            display() { return "<h1>"+tmp.q.symbol+"</h1>" },
            tooltip() { return tmp.q.name },
            unlocked() { return player.q.unlocked },
            style() { return {
                "border-radius": "25px 25px 25px 25px",
                "border-color": tmp.q.color,
                "color": tmp.q.color,
                "background-color": "#111111",
                "font-size": "25px",
            } },
            canClick() { return true },
            onClick() {
                player.subtabs["tree-tab"].mainTabs = "Layers"
                player.subtabs.l.mainTabs = "Quarks"
                player.subtabs.q.mainTabs = "Main"
            },
            branches: [
                [21, "#aaaaff", 20],
            ],
        },
        21: {
            display() { return "<h1>"+tmp.p.symbol+"</h1>" },
            tooltip() { return tmp.p.name },
            unlocked() { return player.p.unlocked },
            style() { return {
                "border-radius": "25px 25px 25px 25px",
                "border-color": tmp.p.color,
                "color": tmp.p.color,
                "background-color": "#111111",
                "font-size": "25px",
            } },
            canClick() { return true },
            onClick() {
                player.subtabs["tree-tab"].mainTabs = "Layers"
                player.subtabs.l.mainTabs = "Photons"
                player.subtabs.p.mainTabs = "Main"
            },
            branches: [
                [31, "#aaaaff", 20], 
                [32, "#aaaaff", 20],
            ],
        },
        31: {
            display() { return "<h1>"+tmp.nt.symbol+"</h1>" },
            tooltip() { return tmp.nt.name },
            unlocked() { return player.nt.unlocked },
            style() { return {
                "border-radius": "25px 25px 25px 25px",
                "border-color": tmp.nt.color,
                "color": tmp.nt.color,
                "background-color": "#111111",
                "font-size": "25px",
            } },
            canClick() { return true },
            onClick() {
                player.subtabs["tree-tab"].mainTabs = "Layers"
                player.subtabs.l.mainTabs = "Neutrons"
                player.subtabs.nt.mainTabs = "Main"
            },
            branches: [],
        },
        32: {
            display() { return "<h1>"+tmp.pt.symbol+"</h1>" },
            tooltip() { return tmp.pt.name },
            unlocked() { return player.pt.unlocked },
            style() { return {
                "border-radius": "25px 25px 25px 25px",
                "border-color": tmp.pt.color,
                "color": tmp.pt.color,
                "background-color": "#111111",
                "font-size": "25px",
            } },
            canClick() { return true },
            onClick() {
                player.subtabs["tree-tab"].mainTabs = "Layers"
                player.subtabs.l.mainTabs = "Protons"
                player.subtabs.pt.mainTabs = "Main"
            },
            branches: [],
        },
    },
})