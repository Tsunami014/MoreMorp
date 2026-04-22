function patchData(data) {
    const pref = "const LABLS = {" + data.match(/[^{]+textBox:[^}]+/g).join(",") + "};"
    return pref+dataPref+data
        .replace(/(getNearbySprite.+?\()(.+?)(?=\.action\.type\))/, "$1checkApply($2)||$2")
        .replace(/(?<=this\.networkClient ?= ?)/, "setMain(this)||")
        .replace(/(?=open_devlog_terminal:)/, `
everythings_fine: () => {},
`)
;
}
