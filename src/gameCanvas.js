function patchData(data) {
    var pref = "const LABLS = {" + data.match(/[^{]+textBox:[^}]+/g).join(",").replace(/,\s*,/g, ",") + "};"
    pref += "const tele = "+data.match(/(?<=onMessage\(.forceTeleport., *)([^{]+{(?:[^{}]+)})/)[0].replaceAll("this", "main") + ";"
    return pref+dataPref+data
        .replace(/(?=this\.networkClient\.sendMove)/, "networkMove()&&")
        .replace(/(getNearbySprite.+?\()(.+?)(?=\.action\.type\))/, "$1checkApply($2)||$2")
        .replace(/(?<=this\.networkClient ?= ?)/, "setMain(this)||")
        .replace(/(?=open_devlog_terminal:)/, `
everythings_fine: () => {},
`)
;
}
