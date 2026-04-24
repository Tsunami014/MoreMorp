function patchData(data) {
    var pref = "";
    // Copy the labels for my usage
    pref += "const LABLS = {" + data.match(/[^{]+textBox:[^}]+/g).join(",").replace(/,\s*,/g, ",") + "};"
    // Copy the teleport function
    pref += "const tele = "+data.match(/(?<=onMessage\(.forceTeleport., *)([^{]+{(?:[^{}]+)})/)[0].replaceAll("this", "main") + ";"
    return pref+dataPref+data
        // Pick up the main class when networkClient is created
        .replace(/(?<=this\.networkClient ?= ?)/, "setMain(this)||")
        // Add a new keybind
        .replace(/(?<={)\s*(?=if ?\(([^=]+)===? ?.KeyF)/, "if ($1 === 'KeyP') { printPos() }")
        // Wrap setting the exit zone handler
        .replace(/(?<=onExitZoneIntercept ?=) ?(.+?)(?=[,)};])/g, "wrapExitZone($1)")
        // Override sending movement to the network
        .replace(/(?=this\.networkClient\.sendMove)/, "networkMove()&&")
        // Override get nearby sprite to send out our sprites too
        .replace(/(getNearbySprite.+?\()(.+?)(?=\.action\.type\))/, "$1checkApply($2)||$2")
        // Override to add an object action that does nothing
        .replace(/(?=open_devlog_terminal:)/, `
everythings_fine: () => {},
`)
;
}
