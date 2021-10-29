var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", { layerShown: "ghost", position: 0, row: 3 })


addLayer("tree-tab", {
    tabFormat: {
        "Layers": {
            embedLayer: "l",
        },
        "Statistics": {
            embedLayer: "s",
        }
    },
    color: "#99eeee",
    previousTab: "",
    leftTab: true,
})