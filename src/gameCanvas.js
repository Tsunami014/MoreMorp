function patchData(data) {
    return dataPref+data
        .replace(/(?<=this\.networkClient ?= ?)/, "setMain(this)||")
        .replace(/(?=open_devlog_terminal:)/, `
mm_enter: () => { teleport("mminit", "default"); },
`)
;
}
